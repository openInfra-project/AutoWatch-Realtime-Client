import React, { useEffect, useState } from 'react'
import Section from './SectionTemplate/Section'
import Header from './Header'
import socket from 'socket.io-client'
import './Home.scss'
import {AiOutlineAudioMuted, AiOutlineAudio,AiOutlineVideoCamera,AiOutlineFullscreen,AiOutlineUsergroupAdd} from "react-icons/ai";
import {BiVideoOff} from 'react-icons/bi'
import { BsChatSquareDots } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {receiveChatData, toggleVideoAudio} from '../store/action/index'
import Chat from './ChatTemplate/Chat';
import { useParams } from 'react-router-dom'
// const SERVERPATH = "https://118.67.131.138:32218";
// 테스트용 서버주소
const SERVERPATH = "https://localhost:4000/";
const io = socket.connect(SERVERPATH);

function Home() {
 
    const dispatch = useDispatch()
    //비디오 마이크 상태관리
    const [setting,Setsetting] = useState({
        video:true,
        audio:true
    })
    // 그룹초대 채팅 전체화면 상태관리
    const [othersetting,SetotherSetting] = useState({
        group:false,
        chat:false,
        full:false
    })
    //roomname , username, nickname call
    const userdata = useSelector(state=>state.getinform)
    //userdata를 검사하여 
    //1.roomname이 다르거나 
    //2.page reload시 session이 없으면
    //3.useremail이 같으면
    // 장고페이지로 이동하게 로직 작성
    const {id} = useParams() // roomname
    useEffect(()=> {
        //roomname을 잘못 치고 들어온경우
        if(window.performance.navigation.type ===1) {
            window.location.assign("https://cranky-bohr-e0f18a.netlify.app/errorpage")
            //reload 메세지와 함께 에러페이지로 전송
            
        }
        if(userdata.roomname!==id) {
            window.location.assign("https://cranky-bohr-e0f18a.netlify.app/errorpage")
            //userdata가 다르다고  에러페이지로 전송
        }
        
        console.log(window.performance)
    },[])

    console.log("테스트용 userdata:"+JSON.stringify( userdata))

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
        e.preventDefault()
        onClickChangeBackgroundColor(e)
        SetotherSetting({
            ...othersetting,
            chat:!othersetting.chat
        })

        
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
             
                <Section setting = {setting} io = {io} userdata = {userdata}/> 
                <Chat  setting = {othersetting.chat} io = {io} userdata = {userdata}/>      
                <div className="footer">
                    <div className="menu">
                        <p className="user_name">{userdata.nickname}</p>
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