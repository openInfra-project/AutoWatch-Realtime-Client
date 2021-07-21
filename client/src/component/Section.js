import React ,{createFactory, useCallback, useEffect, useRef,useState}from 'react'
import './Section.scss'
import socket from 'socket.io-client'
import Video from './Video/index'
import { ThemeConsumer } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'


function Section(props) {
    //video audio 상태관리
    const myvideoaudio = useSelector(state=>state.toggleVideoAudio)

    // var testid = document.getElementById('id')
    // var stream = navigator.mediaDevices.getUserMedia({
    //     video:true,
    //     audio:true,
    // })
    // testid.srcObject = stream

    const [users,setUsers] = useState([])
    let pcs = {}
    console.log("그냥 props 테스트:"+JSON.stringify(myvideoaudio))
    const io = socket.connect("https://fee7121ec8aa.ngrok.io");
   
    var videolocalref = useRef(null)
    var videoremoteref = useRef(null)
    //props를 통해 받아줌
    
  
    // //pcConfig에는 stun turn 서버를 적게되는데 rtc 중계를 끊어지는 걸 대비한
    // // 임시서버이다 https://gist.github.com/yetithefoot/7592580
    var pcConfig = {
        'iceServers':[{
            urls:'stun:stun.l.google.com:19302'
        },
        {
            urls:"turn:numb.viagenie.ca",
            credential:"muazkh",
            username:"webrtc@live.com"
        }
    ]}
    let localStream;
    const gotmedia= async() => {
        try {
            console.log("테스트 활성화")
            var stream= await navigator.mediaDevices.getUserMedia(myvideoaudio)
            videolocalref.current.srcObject = stream
            localStream = stream
        }catch(error){
            console.log(error)
        }
       
    }
    gotmedia()
    useEffect(()=> {
        console.log("UseEffect props 테스트:"+JSON.stringify(props))
        //비디오 스트림
      
        console.log("처음 useEffect")
        io.on('all_users',(allUsers)=> {
            let len = allUsers.length
            for(let i=0; i<len; i++){
                console.log("현재 방의 참가자는 :"+allUsers[i].id)
                createPeerConnection(allUsers[i].id,allUsers[i].email,io,localStream)
                let pc = pcs[allUsers[i].id]
                if(pc) {
                    pc.createOffer({offerToReceiveAudio:true,offerToReceiveVideo:true})
                    .then(sdp=> {
                        console.log('create offer success')
                        pc.setLocalDescription(new RTCSessionDescription(sdp))
                        io.emit('offer',{
                            sdp:sdp,
                            offerSendId:io.id,
                            offerSendEmail:'offerSendSample@sample.com',
                            offerReciveID:allUsers[i].id
                        })
                    }).catch(error=> {
                        console.log(error)
                    })
                }
            }
        })
        io.on('getOffer',(data)=> {
            console.log('get offer')
            createPeerConnection(data.offerSendId,data.offerSendEmail,io,localStream)
            let pc = pcs[data.offerSendId]
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=> {
                    console.log('answer set remote description success')
                    pc.createAnswer({offerToReceiveVideo:true,offerToReceiveAudio:true})
                    .then(sdp=> {
                        console.log('create answer success')
                        pc.setLocalDescription(new RTCSessionDescription(sdp))
                        io.emit('answer',{
                            sdp:sdp,
                            answerSendID:io.id,
                            answerREceiveID:data.offerSendId
                        })
                    }).catch(error=> {
                        console.log(error)
                    })
                })
            }
        })
        io.on('getAnswer',(data)=> {
            console.log('get answer')
            let pc = pcs[data.answerSendID]
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp))
            }
        })
        io.on('getCandidate',(data)=> {
            console.log('get candidate')
            let pc=  pcs[data.candidateSendID]
            if(pc) {
                pc.addIceCandidate(new RTCIceCandidate(data.candidate)).then(()=> {
                    console.log('candidate add success')
                })
            }
        })
        io.on('user_exit',data=> {
            pcs[data.id].close()
            delete pcs[data.id]
            setUsers(oldUsers=>oldUsers.filter(user=> user.id!==data.id))

        })
        gotmedia()
      
    },[])
    const createPeerConnection=(socketID,email,io,localStream)=> {
        let pc = new RTCPeerConnection(pcConfig)
        pcs = {...pcs,[socketID]:pc};
        pc.onicecandidate=(e)=> {
            if(e.candidate) {
                console.log('onicecandidate')
                io.emit('candidate',{
                    candidate:e.candidate,
                    candidateSendID:io.id,
                    candidateReceiveID:socketID
                })
            }
        }
        pc.oniceconnectionstatechange=(e)=> {
            console.log(e)
        }
        pc.ontrack=(e)=> {
            console.log('ontrack success')
            setUsers(oldUsers=>oldUsers.filter(user=>user.id!==socketID))
            setUsers(oldUsers=>[...oldUsers,{
                id:socketID,
                email:email,
                stream:e.streams[0]
            }])
        }
        if(localStream){
            console.log('localstream add')
            localStream.getTracks().forEach(track=> {
                pc.addTrack(track,localStream)
            })
        }else {
            console.log('no local stream')
        }
        return pc;
    }
    const gotconnect = ()=> {
        try {
            io.emit('join room',{'room':'1234','email':'sample@naver.com'})
            console.log('joinroom 성공?')
        }catch(error) {
            console.log(error)
        }
       
    }
    function click() {
        gotconnect()
    }




    // var gotStream
    // gotStream = async()=> {
    //     try {
    //         var stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    //         .catch(e => console.log('getUserMedia() error: ', e));
    //         //pc에 넣어주기 위한 변수
    //         localStream = stream
    //         //ref 를 통해 바로 화면에 보여줌
    //         videolocalref.current.srcObject = stream
    //         io.emit('create or join',roomname)
        
    //     } catch(err) {
    //         console.log(err)
    //     }
    // }

    return (
        <>

            <div>
                <button onClick={click}>연결</button>
                <video
                    style={{
                    width: 240,
                    height: 240,
                    margin: 5,
                    backgroundColor: 'black'
                    }}
                    muted
                    ref={videolocalref}
                    autoPlay>
                </video>
                    {users.map((user, index) => {
                        return (
                        <Video
                            key={index}
                            email={user.email}
                            stream={user.stream}
                        />
                        );
                })}
            </div>
        
                
        </>
    )
}
export default Section