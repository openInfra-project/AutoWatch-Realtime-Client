import React ,{useCallback, useEffect, useRef,useState}from 'react'
import './Section.scss'
import socket from 'socket.io-client'

function Section() {
    const io = socket.connect("https://fa4c75997b9a.ngrok.io");
    // const videolocalref = useRef(null)
    // const videoremoteref = useRef(null)
    // let stream;
  
    // useEffect(()=> {
    //     const getUserMedia = async()=> {
    //         try {
    //             stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints).catch(handleLocalMediaStreamError)
    //             videolocalref.current.srcObject = stream
    //             //    localVideo.srcObject = mediaStream;
    //             // localStream = mediaStream
    //             sendMessage('got user media')
    //             //방을 join / create
    //             io.emit('create or join','TEMPROOM')
    //             console.log("몇번수행")
    //             //initiator가 true이면 최초로 만든사람임
    //             // if(isInitiator) {
    //             //     maybeStart()
                    
    //             // }
    //         } catch(err) {
    //             console.log(err)
    //         }
    //     }
        
    //     getUserMedia()

    // },[])
    // //미디어를 얻기 위해 지정할 수 있는 것들
    // //오디오는 기본적으로 비활성화 되어있음
    const mediaStreamConstraints = {
        video: true,
        audio:false,
    }
    // //video태그를 가져온다
    // const localVideo = document.getElementById('localVideo')
    // const remoteVideo = document.getElementById('remoteVideo')
    // let localStream;
    // let localPeerConnection;
    // var pc;
    // var remoteStream
    // var isChannelReady = false
    // var isInitiator = false;
    // var isStarted = false;
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
    var sdpConstraints = {
        offerToReceiveAudio:true,
        offerToReceiveVideo:true
    }
    
    
    // // io.on('connect',()=> {
    // //     io.emit('collabo',io.id)
    // // })
    // // io.on('collabo',(room)=> {
    // //     io.emit('create or join',room)
    // //     console.log("room: ",room)
    // //     console.log("Attempted to create or join room",room)
    // // })
    // io.on('created',(room)=> {
    //     console.log("created room" + room)
    //     isInitiator = true
    // })
    // // io.on('full',(room)=> {
    // //     console.log('Room'+room+" is full")
    // // })
    // // io.on("join",(room)=> {
    // //     console.log("Another peer made a request to join room" + room)
    // //     console.log("This peer is the initiator of room"+room+"!")
    // // })
    // // io.on("joined",(room)=> {
    // //     console.log('joined'+room)
    // //     isChannelReady = true
    // // })
    // // io.on('log',(array=> {
    // //     console.log.apply(console,array)
    // // }))
    // const sendMessage = (message)=> {
    //     console.log("Client sending message",message)
    //     io.emit('message',message)
    
    // }
    // //클라이언트가 메세지를 받으면
    // io.on("message",(message)=> {
    //     console.log("client received message",message)
    //     if(message ==="got user media"){
    //         maybeStart()
    //     }else if(message.type ==="offer") {
    //         if(!isInitiator && !isStarted) {
    //             maybeStart()
    //         }
    //         pc.setRemoteDescription(new RTCSessionDescription(message))
    //         doAnswer()
    //     }else if(message.type ==="answer" && isStarted) {
    //         pc.setRemoteDescription(new RTCSessionDescription(message))

    //     }else if(message.type==="candidate" && isStarted) {
    //         var candidate = new RTCIceCandidate({
    //             sqpMLineIndex : message.label,
    //             candidate:message.candidate
    //         })
    //         pc.addCandidate(candidate)
    //     }
    // })
    // //srcObject 속성을 통해 미디어 요소에서 사용할 수 있다
    // // function gotLocalMediaStream() {
    // //     // localVideo.srcObject = mediaStream;
    // //     // localStream = mediaStream
    // //     sendMessage('got user media')
    // //     //initiator가 true이면 최초로 만든사람임
    // //     if(isInitiator) {
    // //         maybeStart()
    // //     }
    // // }
    // //isstart는 최초 false이며 maybestart가 처음 실행되는 경우 true로 바뀐다
    // //createPeerconnection 함수로 peerconnection을 만들어주고
    // //나의 peerconnection에는 localStream을 붙인다.
    // function maybeStart() {
        
    //     console.log('>>>>>>>maybeStart()',isStarted)
    //     if(!isStarted) {
    //         console.log(">>>>>>>creating peer connection")
    //         createPeerConnection();
    //         navigator.mediaDevices.getUserMedia(mediaStreamConstraints, function(remotestream) {
    //             pc.addStream(remotestream);
    //         });
    //         isStarted = true;
    //         isInitiator = true
    //         console.log('isintiator',isInitiator)
    //         //방을 만들었으면 docall함수를 통해 같은 방에 있는 client에게 rtc
    //         //요청을 하게 된다
    //         if(isInitiator) doCall()
    //     }
    // }
    
    // //pcConfig 값으로 pc(peerconnection)을 만들어 준다
    // //pc에 icecandidate,addstreamremovestream 이벤트 추가
    // //icecandidate는 서로 통신 채널을 확립하기 위한 방법 입니다
    // //onaddstream은 remote 스트림이 들어오면 발생하는 이벤트이다.
    // //RTCPeerConnection 인터페이스는 로컬 컴퓨터와 원격 피어 간의 
    // //WebRTC 연결을 담당하며 원격 피어에 연결하기 위한 메서드들을 제공하고,
    // // 연결을 유지하고 연결 상태를 모니터링하며 더 이상 연결이 필요하지 않을
    // // 경우 연결을 종료합니다.
    // function createPeerConnection() {
    //     try {
    //         pc = new RTCPeerConnection(pcConfig);
    //         pc.onicecandidate = handleiceCandidate;
    //         pc.onaddstream = handleRemoteStreamAdded;
    //         pc.onremovestream = handleRemoteStreamRemoved;
    //         console.log("created RTCPeerConnection")

    //     }catch(e) {
    //         console.log("failed to create PeerConnection, exception:"+e.message)
    //         alert('Cannot create RTCPeerConnection object')
    //         return;
    //     }
    // }
    // //remoteStream이 들어오면, localvideo와 마찬가지로
    // //remoteVideo에 remoteStream을 붙여준다
    // function handleRemoteStreamAdded(event) {
    //     console.log("Remote stream added.")
    //     //event.stream은 MediaStream타입이여야 함
    //     videoremoteref.current.srcObject = event
    //     console.log(""+remoteStream)

    // }
    // //pc.createoffer을 통해 통신 요청을 하게 된다
    // function doCall() {
    //     console.log('Sending offer to peer')
    //     pc.createOffer(setLocalAndSendMessage,handleCreateOfferError)
    // }

    // const handleiceCandidate =(event) => {
    //     console.log('icecandidate event:',event)
    //     if(event.candidate){
    //         sendMessage({
    //             type:'candidate',
    //             label:event.candidate.sdpMLineIndex,
    //             id:event.candidate.sdpMid,
    //             candidate:event.candidate.candidate
    //         })
    //     }else {
    //         console.log("End of candidates")
    //     }
    // }
    // const handleCreateOfferError = (event) => {
    //     console.log('createOffer() error',event)
    // }
    // const doAnswer = ()=> {
    //     console.log('Sending answer to peer')
    //     pc.createAnswer().then(function(answer){
    //         return pc.setLocalDescription(answer)
    //     }).then(
    //         setLocalAndSendMessage
    //     ).catch(onCreateSessionDescriptionError)
    // }
    // function setLocalAndSendMessage(sessionDescription) {
    //     pc.setLocalDescription(sessionDescription)
    //     console.log("setLocalAndSendMessage sending message",sessionDescription)
    //     sendMessage(sessionDescription)
    // }
    // const onCreateSessionDescriptionError= (error) => {
    //     console.log("failed to create session description"+ error.toString())
    // }
    // function handleRemoteStreamRemoved(event) {
    //     console.log("Remote stream removed. Evnet:",event)
    // }
    // function hangup() {
    //     console.log("Haning up")
    //     stop()
    //     sendMessage('bye')
    // }
    // function handleRemoteHangup() {
    //     console.log("session terminated")
    //     stop()
    //     isInitiator = false
    // }
    // function stop() {
    //     isStarted = false
    //     pc.close()
    //     pc = null
    // }





    // function handleLocalMediaStreamError(error) {
    //     console.log('navigator.getUserMedia error:',error)
    // }
    //한개의 video element는 getUserMedia()로부터 스트리밍을 하고 , 나머지는 RTCPEerConnection
    //을 통한 스트리밍
    var isChannelReady = false;
    var isInitiator = false;
    var isStarted = false;
    var localStream;
    var remoteStream;
    var pc;

    const remoteVideo = document.querySelector('video#video2');
    io.on('created',(room)=> {
        console.log("created room" + room)
        isInitiator = true
    })
    io.on("joined",(room)=> {
        console.log('joined'+room)
        isChannelReady = true;
    })
    const offerOptions = {
        offerToReceiveAudio: 1,
        offerToReceiveVideo: 1
    };


    var gotStream,gotremoteStream;
    var videolocalref = useRef(null)
    var videoremoteref = useRef(null)
    let mql = null;
    useEffect(()=> {
        gotStream = async()=> {
            try {
                var stream = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
                .catch(e => console.log('getUserMedia() error: ', e));
                //pc에 넣어주기 위한 변수
                localStream = stream
                //ref 를 통해 바로 화면에 보여줌
                videolocalref.current.srcObject = stream
                io.emit('create or join','TEMPROOM')
          
            } catch(err) {
                console.log(err)
            }
        }
        gotremoteStream = async() => {
            var stream2 = await navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
            .catch(e=>console.log('retmoteStream 에러:',e))
            remoteStream = stream2
            videoremoteref.current.srcObject = stream2
        }
        
      
    },[])  
    function start() {
        console.log('Requesting local stream');
        gotStream()
        maybeStart()
       
    }
    function maybeStart() {
        console.log('-------------pc관련 작업-----------------')
        createPeerConnection()
        pc.onaddstream(localStream)
        isStarted = true
        doCall()

    }
    function createPeerConnection() {
        try {
          pc = new RTCPeerConnection(null);
          pc.onicecandidate = handleIceCandidate;
          pc.onaddstream = handleRemoteStreamAdded;
          pc.onremovestream = handleRemoteStreamRemoved;
          console.log('Created RTCPeerConnnection');
        } catch (e) {
          console.log('Failed to create PeerConnection, exception: ' + e.message);
          alert('Cannot create RTCPeerConnection object.');
          return;
        }
    }
    function doCall() {
        console.log('Sending offer to peer');
        pc.createOffer(setLocalAndSendMessage, handleCreateOfferError);
    }
    function handleCreateOfferError(event) {
        console.log('createOffer() error: ', event);
      }
    function setLocalAndSendMessage(sessionDescription) {
        pc.setLocalDescription(sessionDescription);
        console.log('setLocalAndSendMessage sending message', sessionDescription);
        sendMessage(sessionDescription);
    }
    function handleIceCandidate(event) {
        console.log('icecandidate event: ', event);
        if (event.candidate) {
          sendMessage({
            type: 'candidate',
            label: event.candidate.sdpMLineIndex,
            id: event.candidate.sdpMid,
            candidate: event.candidate.candidate
          });
        } else {
          console.log('End of candidates.');
        }
    }
    function handleRemoteStreamAdded(event) {
        console.log('Remote stream added.');
        gotremoteStream()
    }
    function handleRemoteStreamRemoved(event) {
        console.log('Remote stream removed. Event: ', event);
    }
    function sendMessage(message) {
        console.log('Client sending message: ', message);
        io.emit('message', message);
      }
    
    return (
        <>
            <h1>Realtime communication with WebRTC</h1>
            <video id="video1" ref={videolocalref} playsInline autoPlay muted></video>
            <video id="video2" ref={videoremoteref} playsInline autoPlay></video>
            <video id="video3" playsInline autoPlay></video>

            <div>
                <button id="startButton" onClick={start}  >Start</button>
              
            </div>
         
        </>
    )
}
export default Section