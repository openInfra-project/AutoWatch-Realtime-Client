import React, { useState } from 'react'
import Section from './SectionTemplate/Section'
import Header from './Header'
import './Home.scss'
import {AiOutlineAudioMuted, AiOutlineAudio,AiOutlineVideoCamera,AiOutlineFullscreen,AiOutlineUsergroupAdd} from "react-icons/ai";
import {BiVideoOff} from 'react-icons/bi'
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
    const onMouseover= id => {
        const a = document.getElementById(id)
        a.style.animationName="preview_over"
        
        
    }
    const onMouseLeave = (id)=> {
        document.getElementById(id).style.animationName="preview_leave"
    }
    return (
        <>
            <div className="HomeSection">
             
                <Section setting = {setting}/>       
                <div className="footer">
                    <div className="menu">
                        <p className="user_name">김준영</p>
                            <div className="menu_icon">
                                <div className="previewInform">
                                    <div id="zxc1" className="preview_p">마이크 켜기</div>
                                    <div className="circleIcon" style={{backgroundColor:'rgb(8, 142, 195)'}} onClick={e=>onClickAudio(e)} onMouseOver={()=>onMouseover("zxc1")} onMouseLeave={()=>onMouseLeave("zxc1")}>
                                        {        
                                            setting.audio===true ? <AiOutlineAudio  className="icon audio"/> : <AiOutlineAudioMuted className="icon audio" />
                                        }
                                    </div>
                                </div>
                                <div className="previewInform">
                                    <div id = "zxc2" className="preview_p">비디오 켜기</div>
                                    <div className="circleIcon" style={{backgroundColor:'rgb(8, 142, 195)'}} onClick={e=>onClickVideo(e)} onMouseOver={()=>onMouseover("zxc2")} onMouseLeave={()=>onMouseLeave("zxc2")} >
                                        {                                           
                                            setting.video===true ? <AiOutlineVideoCamera  className="icon video" /> : <BiVideoOff className="icon video" />
                                        }
                                    </div>
                                </div>
                                <div className="previewInform">
                                    <div id = "zxc3"className="preview_p">그룹 초대하기</div>
                                    <div className="circleIcon" onClick={onClickgroupadd} onMouseOver={()=>onMouseover("zxc3")} onMouseLeave={()=>onMouseLeave("zxc3")} >
                                        <AiOutlineUsergroupAdd className="icon usergroupadd"/>
                                    </div>
                                </div>
                                <div className="previewInform">
                                    <div id = "zxc4"className="preview_p">채팅하기</div>
                                    <div className="circleIcon" onClick={onClickChat} onMouseOver={()=>onMouseover("zxc4")} onMouseLeave={()=>onMouseLeave("zxc4")}>
                                        <BsChatSquareDots className="icon" />
                                    </div>
                                </div>
                               
                                <div className="previewInform">
                                    <div id = "zxc5" className="preview_p">전체 화면</div>
                                    <div className="circleIcon" onClick={onClickFullScreen} onMouseOver={()=>onMouseover("zxc5")} onMouseLeave={()=>onMouseLeave("zxc5")}>
                                      <AiOutlineFullscreen className="icon fullscreen"/>
                                    </div>      
                                </div>      
                            </div>
                                
                        </div>
                </div>
            
            </div>
            
            
        </>
    )
}




export default Home