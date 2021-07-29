import React ,{ useEffect, useRef,useState}from 'react'
import './Section.scss'
import socket from 'socket.io-client'
import Video from '../VideoTemplate/index'
import {Grid} from 'semantic-ui-react'
import useMedia from '../../useMedia'
import { useSelector} from 'react-redux'
const SERVERPATH = "https://118.67.131.138:32218/";
const io = socket.connect(SERVERPATH);
let tempdata= {
    test1:'',
    test2:'',
    test3:''

};
function Section(props) {
    console.log(props.setting)
    //video audio 상태관리
    // const {video,audio}= useSelector((state)=> ({
    //     video:state.toggleVideoAudio.video,
    //     audio:state.toggleVideoAudio.audio
    // }),(prev,next)=> {
    //     return prev.video ===next.video && prev.audio === next.audio
    // })


    // console.log("Section 비디오 상태:"+video+"\n Section 오디오 상태"+audio)


    const [users,setUsers] = useState([])
    let pcs = {}

    var videolocalref = useRef(null)
    var videoremoteref = useRef(null)
    let localStream;
    let len;
    
  
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

    const columnCount = useMedia(
        // Media queries
        ['(min-width: 1024px)', '(min-width: 768px)', '(min-width: 400px)'],
        // Column counts (relates to above media queries by array index)
        [3, 2, 1],
        // Default column count
        1
    )






  
    //footer부분을 home으로 다 옮기고
    //비디오와 오디오를 props로 section으로 보내주기 !
    useEffect(()=> {
        if(props.setting.video ===false && props.setting.audio ===false) {
            try {
                videolocalref.current.srcObject.getTracks()[0].stop()
                localStream.getTracks()[0].stop()
            }catch(err) {
                console.log(err)
            }
          
        }else {
            navigator.mediaDevices.getUserMedia(
                props.setting
             ).then((stream)=> {
                 console.log(stream.getTracks())
                 localStream = stream
                 videolocalref.current.srcObject = stream
                 
                 io.emit('join room',{'room':'1234','email':'sample@naver.com'})
                
                 
             
                 console.log("성공 시 localstream 상태: "+Object.toString(stream))
             }).catch((err)=> {
                 //console.log(err); /* handle the error */
                 //사용자가 웹캠을 가지고 있지 않은경우
                    if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
                        alert("캠을 찾을 수 없습니다.")
                    //다른곳에서 웹캠이나 마이크에 엑세스를 이미 하고 있는 경우
                    } else if (err.name === "NotReadableError" || err.name === "TrackStartError") {
                        //webcam or mic are already in use 
                        alert("다른 곳에서 마이크 또는 웹캠을 사용중입니다")
                    } else if (err.name === "OverconstrainedError" || err.name === "ConstraintNotSatisfiedError") {
                        //-----------------????-------------------
                        //사용자가 웹캠또는 마이크에 액세스를 거부 한 경우
                    } else if (err.name === "NotAllowedError" || err.name ==="PermissionDeniedError") {
                        //둘다 false로 되어있는 경우
                        alert('카메라 또는 마이크를 탐색할 수 없습니다.')
                    } else if (err.name === "TypeError" || err.name === "TypeError") {
                        //alert대신 custom alert 하는게 나을 것 같다. lotti 라던가
                        alert('비디오와 마이크가 꺼져있습니다')
                        console.log("aa"+localStream)
                        
                    
            
                    } else {
                        //other errors 
                    }
             })
        }

    },[props])
   
  
    useEffect(()=> {

        
        io.on('all_users',(allUsers)=> {
        
            len = allUsers.length
            console.log("allUsers :"+JSON.stringify(allUsers))
            
            for(let i=0; i<len; i++){
                console.log("현재 방의 참가자는 :"+allUsers[i].id)
                console.log('io의 아이디'+io.id)
                tempdata  = {
                    test1:allUsers[i].id,
                    test2:allUsers[i].email
                }
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
            console.log("offer쪽 localStream"+localStream)
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
        
       
        
      
    },[])
    const createPeerConnection = (socketID, email, newSocket, localStream)=> {

        let pc = new RTCPeerConnection(pcConfig);
    
        // add pc to peerConnections object
        pcs = { ...pcs, [socketID]: pc };
    
        pc.onicecandidate = (e) => {
          if (e.candidate) {
            console.log('onicecandidate');
            newSocket.emit('candidate', {
              candidate: e.candidate,
              candidateSendID: newSocket.id,
              candidateReceiveID: socketID
            });
          }
        }
    
        pc.oniceconnectionstatechange = (e) => {
          console.log(e);
        }
    
        pc.ontrack = (e) => {
          console.log('ontrack success');
          setUsers(oldUsers => oldUsers.filter(user => user.id !== socketID));
          setUsers(oldUsers => [...oldUsers, {
            id: socketID,
            email: email,
            stream: e.streams[0]
          }]);
        }
    
        if (localStream) {
          console.log('localstream add');
          localStream.getTracks().forEach(track => {
            pc.addTrack(track, localStream);
          });
        } else {
          console.log('no local stream');
        }
    
        // return pc
        return pc;
    
      }
    // const gotconnect = ()=> {
    //     try {
           
    //         io.emit('join room',{'room':'1234','email':'sample@naver.com'})
       
    //     }catch(error) {
    //         console.log(error)
    //     }
       
    // }

 





    return (
        <>

            <div className="SectionContainer">
                
                <video
                    className="video"
                  
                    muted
                    ref={videolocalref}
                    autoPlay>
                </video>
                    {console.log("길이"+users.length)}
                    {users.map((user, index) => {
                        {console.log("users체크:"+JSON.stringify(user))}
                        {console.log("index 체크"+index)}
                        return (
                            <Video
                                key={index}
                                email={user.email}
                                stream={user.stream}
                            />
                        )
                      
                        
                })}
            </div>
        
                
        </>
    )
}

export default Section