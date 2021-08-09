import React ,{ useEffect, useRef,useState}from 'react'
import './Section.scss'
import Video from '../VideoTemplate/index'
import {Grid} from 'semantic-ui-react'
import useMedia from '../../useMedia'
import { useSelector} from 'react-redux'
import { BiLeftArrow } from 'react-icons/bi'
let tempdata= {
    test1:'',
    test2:'',
    test3:''

};
function Section(props) {
    //Gaze.js에관한내용
    let success = "fail";
    // 초기 video 화면 크기 >> 이후 방 입장인원따라 다르게 해주기
    localStorage.setItem('width',"600px");
    localStorage.setItem('height',"400px");
    useEffect(() => {
        const script = document.createElement("script");
        
        script.innerHTML = `
                var calibrated = false;
                var gc_started = false;
                var hm_left = 0;
                var hm_top = 0;
                var hm_created = false;
                var count = 0;
                window.onload = async function () {
                    setInnerText('title','초점을 맞추겠습니다.');
                    //////set callbacks for GazeCloudAPI/////////
                    GazeCloudAPI.OnCalibrationComplete = function () {
                        console.log('gaze Calibration Complete');
                        calibrated = true;
                    }
                    GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
                    GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
                    GazeCloudAPI.UseClickRecalibration = true;
                    GazeCloudAPI.OnResult = PlotGaze;

                    GazeCloudAPI.StartEyeTracking(); 
                
                }
     
                function PlotGaze(GazeData) {
                    // Init setting
                    document.getElementById('facemaskimgok').style.display="none";
                    
                    var docx = GazeData.docX;
                    var docy = GazeData.docY;
                
                    var gaze = document.getElementById("gaze");
                    docx -= gaze.clientWidth / 2;
                    docy -= gaze.clientHeight / 2;
                
                    gaze.style.left = docx + "px";
                    gaze.style.top = docy + "px";
                
                    setInnerText('log_div',gaze.style.left)
                    setInnerText('log_div2',gaze.style.top)
                    setInnerText('log_div3',screen.width)
                    setInnerText('log_div4',screen.height)
                
                    if (GazeData.state != 0) {
                        if (gaze.style.display == 'block')
                            gaze.style.display = 'none';
                    }
                    else {
                        var video =  document.getElementById('showvideoid');

                        count = count + 1;
                        if (count == 1){
                            //초점 확인 단계
                            if (gaze.style.display == 'none')
                                gaze.style.display = 'block';
                            console.log("Gaze CHECK");

                            setInnerText('title',"Check Your Gaze. If your gaze isn't correct, reset calibration");
                            console.log("change title")
                            video.style.display = "none";
                            video.style.margin = "auto";
                            document.getElementById('check_calibration').style.display = "block";

                           //일정시간지나면 버튼클릭안해도 SET으로
                            setTimeout(() => {
                                console.log("CHECK_TIMEOUT")
                                document.getElementById('check_calibration').style.display = "none";
                                document.getElementById('title').style.display = "none";
                                document.getElementById('gaze').style.display = "none";
                                video.style.display = "block";
                            }, 10000)
                            
                            
                        }
                        
                        var maskno = document.getElementById('facemaskimgno');
                        document.getElementById('camid').style.opacity = "1";
                        video.style.height = localStorage.getItem('height');
                        video.style.width = localStorage.getItem('width');

                        maskno.style.height = localStorage.getItem('height');
                        maskno.style.width = localStorage.getItem('width');

                        if(maskno.style.display == "block"){
                            console.log("자리이탈시");
                        }
                                            
                        

                        // Eyetracking - 이상시선감지 기능
                        if (-80 > docx || docx > 1280 || -80 > docy || docy > 720 ){
                            setInnerText('log_div6','OUT')
                            // 감독관에게 알람!
                        }else{
                            setInnerText('log_div6','IN')
                        }
                    }
                }
                
                // Kalman Filter defaults to on. Can be toggled by user.
                window.applyKalmanFilter = true;
                
                // Set to true if you want to save the data even if you reload the page.
                window.saveDataAcrossSessions = true;

                // div 내용 바꾸기
                function setInnerText(id,log) {
                    const element = document.getElementById(id);
                    element.innerText 
                        = log ;
                } 
                
       `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script)
        success = "success"
        console.log(success)
      });
   
    const gazeStyle={
        position: "absolue",
        display:"none",
        width:"100px",
        height:"100px",
        borderRadius:"50%",
        border: "solid 2px rgba(255, 255,255, .2)",
        boxShadow: " 0 0 100px 3px rgba(125, 125,125, .5)",
        pointerEvents: "none",
        zIndex: "999999",
    }
    const titleStyle={
        color:"white"
    }
    const videoStyle={
        display:"none"
    }
    const buttonStyle={
        fontSize: "32px",
        padding: "10px 10px",
        float: "left"
    }
    function reset(){
        window.location.reload();
        console.log("RESET");
    }
    function set(){
        document.getElementById('check_calibration').style.display = "none";
        document.getElementById('title').style.display = "none";
        document.getElementById('gaze').style.display = "none";
        document.getElementById('showvideoid').style.display = "block";        
        console.log("SET");
    }
    


    const io = props.io
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
            <div id="log_div"></div>
            <div id="log_div2"></div>
            <div id="log_div3"></div>
            <div id="log_div4"></div>
            <div id="log_div5"></div>
            <div id="log_div6"></div>
            <h1 id="title" align="center" style={titleStyle}></h1>
            <div id="check_calibration" style={videoStyle}>
                {/* <h1 id="check_calibration" align="center" style={titleStyle}></h1> */}
                <button id="reset_calibration" align="center" style={buttonStyle} onClick={reset}>RESET</button>
                <button id="set_calibration" align="center" style={buttonStyle} onClick={set}>SET</button>
            </div>
            
            <div id="gaze"  style={gazeStyle}>            
            </div>
            <div className="SectionContainer">
                
                <video
                    className="video"
                    id="showvideoid"
                    muted
                    ref={videolocalref}
                    style={videoStyle}
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