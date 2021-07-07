import React from 'react'
import './Section.scss'

function Section() {
    //미디어를 얻기 위해 지정할 수 있는 것들
    //오디오는 기본적으로 비활성화 되어있음
    const mediaStreamConstraints = {
        video: true,
        audio:false,
    }
    //video태그를 가져온다
    const localVideo = document.getElementById('localVideo')
    let localStream;
    let localPeerConnection;
    //srcObject 속성을 통해 미디어 요소에서 사용할 수 있다
    localPeerConnection = new RTCPeerConnection(servers)
    function gotLocalMediaStream(mediaStream) {
        localVideo.srcObject = mediaStream;
        localStream = mediaStream
        sendMessage('got user media')
        //initiator가 true이면 최초로 만든사람임
        if(isInitiator) {
            maybeStart()
        }
    }
    function maybeStart() {
        console.log('>>>>>>>maybeStart()',isStarted,localStream,isChannelReady)
        if(isStarted && typeof localStream !=="undefined" && isChannelReady){
            console.log(">>>>>>>creating peer connection")
            createPeerConnection();
        }
    }
    function handleLocalMediaStreamError(error) {
        console.log('navigator.getUserMedia error:',error)
    }
    //사용자에게 카메라에 엑세스 할수있는 권한을 요청
    //성공하면 mediaStream이 반환
    navigator.mediaDevices.getUserMedia(mediaStreamConstraints)
    .then(gotLocalMediaStream).catch(handleLocalMediaStreamError)

    return (
        <>
            <h1>Realtime communication with WebRTC</h1>
            <video id="localVideo" autoplay playsinline></video>
            <video id="remoteVideo" autoplay playsinline></video>


            <div>
                <button id="startButton">Start</button>
                <button id="callButton">Call</button>
                <button id="hangupButton">Hang Up</button>
            </div>
         
        </>
    )
}
export default Section