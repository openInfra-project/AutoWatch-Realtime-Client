import React from 'react'
import { AiFillAudio,AiOutlineVideoCamera,AiOutlineFullscreen,AiOutlineUsergroupAdd} from "react-icons/ai";
import './Footer.scss'
import { BsChatSquareDots } from "react-icons/bs";
function Footer() {
    return (
        <>
           <div className="footer">
               <div className="menu">
                   <p className="user_name">김준영</p>
                    <div className="menu_icon">
                        <AiFillAudio className="icon audio"/>
                         <AiOutlineVideoCamera className="icon video" />
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