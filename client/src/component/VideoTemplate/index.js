import React, { useEffect, useRef, useState } from 'react';
import Styled from 'styled-components';
import './index.scss'
import {GiChessKing} from 'react-icons/gi'
const Container = Styled.div`
    position: relative;
    display: inline-block;
    width: 240px;
    height: 270px;
    margin: 5px;
`;

const VideoContainer = Styled.video`
   
`;




function Video({email, nickname,stream, roomowner,audio,video}) {
    const ref = useRef(null);
    const [aa,saa] = useState(false)
    console.log(typeof audio)
    console.log(!audio)
    useEffect(() => {
        console.log("audio와 video "+audio +" , "+video)
        if (ref.current) ref.current.srcObject = stream;
        if(audio===false) {
            ref.current.defaultMuted = true;
            ref.current.muted = true
            document.getElementById("videoindex").muted = true
            saa(!aa)

        }else {
            document.getElementById("videoindex").muted = false
            saa(!aa)
            // ref.current.muted = false
            // document.getElementById("videoindex").muted = true
        }
        if(video===false) {
            ref.current.srcObject = null
        }else {
            ref.current.srcObject = stream;
        }
    },[])

    return (
        <Container>
            {console.log("마지막 오디오 체크"+audio)}
            <video
                style={{width:"240px" ,height:"240px",
                    backgroundColor: "black"}}
                id ="videoindex"
                ref={ref}
                muted = {!audio}
                autoPlay
            ></video>
            <div className="infocontainer">
                <div>
                    {roomowner===email ? <GiChessKing className="GIICON"/>:<p className="info_p">{nickname}</p> }
                    
                </div>
                <p className="info_p">{email}</p>    
            </div>

        </Container>
    );
}

export default Video;