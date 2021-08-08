import React ,{ useEffect, useRef,useState}from 'react'
import './Section.scss'
import Video from '../VideoTemplate/index'
import {Grid} from 'semantic-ui-react'
import useMedia from '../../useMedia'
import { useSelector} from 'react-redux';

function Section(props) {
    const io = props.io
    const userdata = props.userdata
    console.log("props 상태"+JSON.stringify( props.setting))
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
                videolocalref.current.srcObject = null
                localStream = null
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
                 
                io.emit('join room',{
                    'room':userdata.roomname,
                    'email':userdata.useremail,
                    'nickname':userdata.nickname,
                    'roomtype':userdata.roomtype
                })
                
                 
             
                
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
          
                createPeerConnection(allUsers[i].id,allUsers[i].email,allUsers[i].nickname,io,localStream)
                let pc = pcs[allUsers[i].id]
                
                if(pc) {
                    //
                    //                     iceRestart 선택 과목
                    // 활성 연결에서 ICE를 다시 시작하려면 이것을 로 설정하십시오 
                    //true. 이렇게 하면 반환된 제안이 이미 있는 것과 다른 자격 증명을 갖게 됩니다.
                    //그런 다음 반환된 제안을 적용하면 ICE가 다시 시작됩니다. false동일한 자격 
                    //증명을 유지하고 ICE를 다시 시작하지 않도록 지정 합니다. 
                    //기본값은 false 입니다.
                    //re rendering 되더라도 자격증명이 똑같으면 offer이 새로 되지 않는다
                    console.log("상태체크 offer"+JSON.stringify(props.setting))
                    console.log("상태체크 offer detail"+ props.setting.video+props.setting.audio)
                    pc.createOffer({
                        // iceRestart : true,
                        offerToReceiveAudio:props.setting.audio,
                        offerToReceiveVideo:props.setting.video
                    })
                    .then(sdp=> {
                       
                        console.log('원격 연결 신청(나 자신):create offer success')
                        pc.setLocalDescription(new RTCSessionDescription(sdp))
                        io.emit('offer',{
                            sdp:sdp,
                            offerSendId:io.id,
                            offerSendEmail:allUsers[i].email,
                            offerSendNickname:allUsers[i].nickname,
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
           
            createPeerConnection(data.offerSendId,data.offerSendEmail,data.offerSendnickname,io,localStream)
           
            let pc = pcs[data.offerSendId]
            if(pc) {
                pc.setRemoteDescription(new RTCSessionDescription(data.sdp)).then(()=> {
                    console.log('원격 연결 완료(연결 받기) answer set remote description success')
                    
                    pc.createAnswer({
                        offerToReceiveVideo:true,
                        offerToReceiveAudio:true})
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
    const createPeerConnection = (socketID, email,nickname ,newSocket, localStream)=> {

        let pc = new RTCPeerConnection(pcConfig);
    
        // add pc to peerConnections object
        pcs = { ...pcs, [socketID]: pc };
    
        pc.onicecandidate = (e) => {
            console.log(e)
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
            nickname:nickname,
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
                <Grid divided = "vertically">
                    <Grid.Row columns = {columnCount}>
                        {users.map((user,index)=> {
                            return (
                           
                                <Video
                                    key={index}
                                    email={user.email}
                                    nickname = {user.nickname}
                                    stream={user.stream}
                                />
                        
                            )
                        })}
                    </Grid.Row>
                </Grid>     
            </div>
        
                
        </>
    )
}

export default Section