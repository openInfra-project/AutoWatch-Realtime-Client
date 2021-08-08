import React, { useEffect, useRef, useState } from 'react';
import Styled from 'styled-components';

const Container = Styled.div`
    position: relative;
    display: inline-block;
    width: 240px;
    height: 270px;
    margin: 5px;
`;

const VideoContainer = Styled.video`
    width: 240px;
    height: 240px;
    background-color: black;
`;

const UserLabel = Styled.p`
    display: inline-block;
    position: absolute;
    top: 230px;
    left: 0px;
`;



function Video({email, nickname,stream, muted}) {
    const ref = useRef(null);
    const [isMuted, setIsMuted] = useState(false);
    useEffect(() => {
        
        if (ref.current) ref.current.srcObject = stream;
        if (muted) setIsMuted(muted);
    },[])

    return (
        <Container>
            <VideoContainer 
                ref={ref}
                muted={isMuted}
                autoPlay
            ></VideoContainer>
            <UserLabel>{email}</UserLabel>
            <UserLabel>{nickname}</UserLabel>
        </Container>
    );
}

export default Video;