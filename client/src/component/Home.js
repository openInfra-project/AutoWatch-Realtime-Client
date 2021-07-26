import React, { useState } from 'react'
import Section from './Section'
import Header from './Header'
import './Home.scss'
import { AiFillAudio,AiOutlineVideoCamera,AiOutlineFullscreen,AiOutlineUsergroupAdd} from "react-icons/ai";

import { BsChatSquareDots } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {toggleVideoAudio} from '../store/action/index'

function Home() {
    const dispatch = useDispatch()
    const [setting,Setsetting] = useState({
        video:true,
        audio:true
    })
    function handlecreate(data) {
        console.log("홈 데이터"+JSON.stringify(data))
    }
    const onClickVideo = () => {
        // Setsetting((previousState)=> {
        //     return {
        //         ...previousState,
        //         video : !(previousState.video)
        //     }
        // })
        Setsetting({
            ...setting,
            video:!setting.video
        })
        console.log("비디오 활성화 상태:"+setting.video)
        //video상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
       
        
    }
    const onClickAudio = ()=> {
        // Setsetting((previousState)=> {
        //     return {
        //         ...previousState,
        //         audio : !(previousState.audio)
        //     }
        // })
        Setsetting({
            ...setting,
            audio:!setting.audio
        })
        console.log("오디오 활성화 상태:"+setting.audio)
        //audio상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
     
    }
    return (
        <>
            <Header />
            <Section setting = {setting}/>       
            <div className="footer">
               <div className="menu">
                   <p className="user_name">김준영</p>
                    <div className="menu_icon">
                        <AiFillAudio onClick={onClickAudio} className="icon audio"/>
                         <AiOutlineVideoCamera onClick={onClickVideo} className="icon video" />
                         <AiOutlineUsergroupAdd className="icon usergroupadd"/>
                         <BsChatSquareDots className="icon chat"/>
                         <AiOutlineFullscreen className="icon fullscreen"/>

                         
                    </div>
                    
               </div>
           </div>
        </>
    )
}




export default Home