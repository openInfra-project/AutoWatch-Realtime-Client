import React, { useState } from 'react'
import Section from './SectionTemplate/Section'
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
    const [backgroundcolor,Setbackgroundcolor] = useState({
        color:'rgba(0, 0, 0, 0.363)'
    })
    function handlecreate(data) {
        console.log("홈 데이터"+JSON.stringify(data))
    }
    const onClickVideo = (e) => {
        onClickChangeBackgroundColor(e)
        Setsetting({
            ...setting,
            video:!setting.video
        })
        console.log("비디오 활성화 상태:"+setting.video)
        //video상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
       
        
    }
    const onClickAudio = (e)=> {
        onClickChangeBackgroundColor(e)
        Setsetting({
            ...setting,
            audio:!setting.audio
        })
        console.log("오디오 활성화 상태:"+setting.audio)
        //audio상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
        
    }
    const onClickChat=(e)=> {
        onClickChangeBackgroundColor(e)
        
    }
    const onClickChangeBackgroundColor = (e)=> {
        
        if(e.currentTarget.style.backgroundColor==='rgb(8, 142, 195)'){
            e.currentTarget.style.backgroundColor = null
        }else {
             e.currentTarget.style.backgroundColor = 'rgb(8, 142, 195)'
        }
       
    }
    const onClickFullScreen=(e)=> {
        onClickChangeBackgroundColor(e)
    }
    const onClickgroupadd=(e)=> {
        onClickChangeBackgroundColor(e)
    }
    return (
        <>
            <div className="HomeSection">
             
                <Section setting = {setting}/>       
                <div className="footer">
                    <div className="menu">
                        <p className="user_name">김준영</p>
                            <div className="menu_icon">
                                <div className="circleIcon" onClick={e=>onClickAudio(e)}>
                                    <AiFillAudio  className="icon audio"/>
                                </div>
                                <div className="circleIcon" onClick={e=>onClickVideo(e)}>
                                     <AiOutlineVideoCamera  className="icon video" />
                                </div>
                                <div className="circleIcon" onClick={onClickgroupadd}>
                                     <AiOutlineUsergroupAdd className="icon usergroupadd"/>
                                </div>
                               
                             
                                <div className="circleIcon" onClick={onClickChat}>
                                    <BsChatSquareDots className="icon" />
                                </div>
                                
                                <div className="circleIcon" onClick={onClickFullScreen}>
                                      <AiOutlineFullscreen className="icon fullscreen"/>

                                </div>      
                                
                            </div>
                                
                        </div>
                </div>
            
            </div>
            
            
        </>
    )
}




export default Home