import React, { useEffect, useState } from 'react'
import Section from './SectionTemplate/Section'
import socket from 'socket.io-client'
import './Home.scss'
import {AiOutlineAudioMuted, AiOutlineAudio,AiOutlineVideoCamera} from "react-icons/ai";
import {BiVideoOff} from 'react-icons/bi'
import {ImExit} from 'react-icons/im'
import { BsChatSquareDots ,BsPersonCheck} from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import {toggleVideoAudio} from '../store/action/index'
import Chat from './ChatTemplate/Chat';
import { useParams } from 'react-router-dom'
import swal from 'sweetalert'

import Group from './GroupTemplate/Group';
//배포용 서버 주소
// const SERVERPATH = "https://118.67.131.138:30010/";
// 테스트용 서버주소
//const SERVERPATH = "https://localhost:4000/";
const SERVERPATH = "https://118.67.131.138:30010/";
const io = socket.connect(SERVERPATH);

let start =Date.now()
function Home() {
 
    const dispatch = useDispatch()
    //비디오 마이크 상태관리
    const [setting,Setsetting] = useState({
        video:true,
        audio:true
    })
    // 그룹초대 채팅 전체화면 상태관리
    const [otherGroupsetting,SetotherGroupSetting] = useState({
        group:false
        
    })
    const [otherChatsetting,SetOtherChatSetting] = useState({
        chat:false
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
        // if(window.performance.navigation.type ===1) {
        //    window.location.assign("https://cranky-bohr-e0f18a.netlify.app/errorpage")
        // }
        // if(userdata.roomname!==id) {
        //     window.location.assign("https://cranky-bohr-e0f18a.netlify.app/errorpage")
        //     //userdata가 다르다고  에러페이지로 전송
        // }
        

    },[])

    console.log("테스트용 userdata:"+JSON.stringify( userdata))

    const onClickVideo = (e) => {
        e.preventDefault()
        onClickChangeBackgroundColor(e)
        Setsetting({
            ...setting,
            video:!setting.video
        })
        dispatch(toggleVideoAudio(setting))
       
        
    }
    const onClickAudio = (e)=> {
        e.preventDefault()
        onClickChangeBackgroundColor(e)
        Setsetting({
            ...setting,
            audio:!setting.audio
        })
        dispatch(toggleVideoAudio(setting))
   
        
    }
    const onClickChat=(e)=> {
        e.preventDefault()
        onClickChangeBackgroundColor(e)
        SetOtherChatSetting({
            ...otherChatsetting,
            chat:!otherChatsetting.chat
        })

        
    }
    const onClickChangeBackgroundColor = (e)=> {
        
        if(e.currentTarget.style.backgroundColor==='rgb(8, 142, 195)'){
            e.currentTarget.style.backgroundColor = null
        }else {
             e.currentTarget.style.backgroundColor = 'rgb(8, 142, 195)'
        }
       
    }
    const onClickGroup=(e)=> {
        e.preventDefault()
        onClickChangeBackgroundColor(e)
        SetotherGroupSetting({
            ...otherGroupsetting,
            group:!otherGroupsetting.group
        })
        
       
        
       
//        exitFull()

    }
    const onClickExit=(e)=> {
        
        //방에서 나가시겠습니까 알람 표시를 뜨게 한다.
        swal("" ,{
            title:"회의에서 나가시겠습니까?",
            icon:"warning",
            text:"",
            dangerMode:true
            
        }).then((value)=> {
            //나중에 장고 페이지로 고치기
            if(value) {
                // window.location.assign("https://cranky-bohr-e0f18a.netlify.app/errorpage")
                let end = Date.now()
                //django 서버로 연결되어있던 시간을 보내주기 위함.
                window.location.assign(`https://118.67.131.138:30000/main/roomout/${end-start}`)
            }else {
                //아무 동작 하지 않는다.
                return;
            }
           
          
        })
        
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
            <div className="HomeSection" >
                <Section  setting = {setting} io = {io} userdata = {userdata}/> 
                <Group setting = {otherGroupsetting.group} userdata=  {userdata.roomtype}/>
                <Chat  setting = {otherChatsetting.chat} io = {io} userdata = {userdata}/>      
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
                                    <div id = "zxc4"className="preview_p">채팅하기</div>
                                    <div className="circleIcon" onClick={onClickChat} onMouseOver={()=>onMouseover("zxc4")} onMouseLeave={()=>onMouseLeave("zxc4")}>
                                        <BsChatSquareDots className="icon" />
                                    </div>
                                </div>
                               
                                <div className="previewInform">
                                    <div id = "zxc5" className="preview_p">관리자 모드</div>
                                    <div className="circleIcon" onClick={onClickGroup} onMouseOver={()=>onMouseover("zxc5")} onMouseLeave={()=>onMouseLeave("zxc5")}>
                                      <BsPersonCheck className="icon fullscreen"/>
                                    </div>      
                                </div>
                                <div className="previewInform">
                                    <div id = "zxc3"className="preview_p">회의 나가기</div>
                                    <div className="exit" onClick={onClickExit} onMouseOver={()=>onMouseover("zxc3")} onMouseLeave={()=>onMouseLeave("zxc3")} >
                                        <ImExit className="exiticon icon"/>
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