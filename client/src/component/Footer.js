import React ,{useEffect, useState}from 'react'
import { AiFillAudio,AiOutlineVideoCamera,AiOutlineFullscreen,AiOutlineUsergroupAdd} from "react-icons/ai";
import './Footer.scss'
import { BsChatSquareDots } from "react-icons/bs";
import { useDispatch } from 'react-redux';
import {toggleVideoAudio} from '../store/action/index'

const setting = {
    video:false,
    audio:false
}
function Footer(props) {
  
    const dispatch = useDispatch()
    // const [setting,Setsetting] = useState({
    //     video:false,
    //     audio:false
    // })
    const onClickVideo = () => {
        // Setsetting((previousState)=> {
        //     return {
        //         ...previousState,
        //         video : !(previousState.video)
        //     }
        // })
        setting.video =  !(setting.video)
        console.log("비디오 활성화 상태:"+setting.video)
        //video상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
        props.onCreate(setting)
        
    }
    const onClickAudio = ()=> {
        // Setsetting((previousState)=> {
        //     return {
        //         ...previousState,
        //         audio : !(previousState.audio)
        //     }
        // })
        setting.audio = !(setting.audio)
        console.log("오디오 활성화 상태:"+setting.audio)
        //audio상태를 전부 store에 저장
        dispatch(toggleVideoAudio(setting))
        props.onCreate(setting)
    }
    return (
        <>
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
export default Footer