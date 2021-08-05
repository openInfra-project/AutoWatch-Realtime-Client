import React,{useEffect, useState} from 'react'
import './Chat.scss'
import ChatUser from '../ChatUserTemplate/ChatUser'
import TextSizeAutoSize from 'react-textarea-autosize'
import {AiOutlineArrowRight} from 'react-icons/ai'
var chatdata= ""
// user data의 imageurl을 넣기
function Chat(props) {
    const io = props.io
    const {roomname,useremail,nickname,roomtype} = props.userdata
    console.log("채팅 활성화 상태:"+props.setting)
    const [chat,SetChat] = useState([])
    useEffect(()=> {
        io.on("message",data=> {
            SetChat(oldValue => [...chat,data])
            console.log("메세지 받음"+JSON.stringify(data))
            // console.log("chat 상태:"+JSON.stringify(chat))
        })
    },[chat])
   
   




    const submit = (e)=> {
        e.preventDefault()
        io.emit('message',{
            nickname,
            chatdata
        })
        document.getElementById('chatinput').value=""
        return false;
    }
 
    const onChange = (e) => {
        chatdata = e.target.value
    }
    const renderChat = ()=> {
        return chat.map((data,index)=> (
            <>
                <div key = {index} className="message">
                        <div className="messageinner">
                            <p className="messageinnername">{data.nickname}</p>
                            <p className="messageinnertime">오후 10:51</p>
                        </div>
                        <p className="ng-binding">
                            {data.chatdata}
                        </p>
                  
                </div>
            </>
        ))
    }

    return (
        <>
           
            <div className="inbox" style={{animationName:props.setting.toString()||"false"}}>
                <aside >
                    {/* 
                        //userdata에 따라 chatuser갯수를 변경한다.
                        props.userdata.map((data,index)=> {
                            <ChatUser key= {index} username={data.nickname} src={data.userimage || "여기 기본 사진 url 가져다 놓기"}/>
                        })
                    */}
                    <ul ng-controller="chatCtrl as chat" className="ng-scope">
                        <ChatUser username="김준영" src="https://imgflip.com/s/meme/Futurama-Leela.jpg"/>
                        <ChatUser username="황한식" src="https://imgflip.com/s/meme/Futurama-Leela.jpg"/>
                        <ChatUser username="김유림" src="https://imgflip.com/s/meme/Futurama-Leela.jpg"/>
                        <ChatUser username="김혜원" src="https://imgflip.com/s/meme/Futurama-Leela.jpg"/>
                      
                    </ul>
                </aside>
                
                <main ng-controller="chatCtrl as chat" className="ng-scope">
                    <div className="init">
                        {renderChat()}
                    </div>
                    
                    <footer>
                        <form onSubmit={e=>submit(e)} className="ng-pristine ng-valid">
                            {/* <ValueInput/> */}
                            <input  
                                id="chatinput"
                                onChange={e=>onChange(e)}
                                className = "textarea_input" 
                                
                                type ="text" 
                                placeholder="메세지를 입력하세요" />
                            <input type = "submit" value ="=>" className="submitIcon"/>
                        </form>
                    </footer>
                </main>
            </div>
     
        </>
    )
}

export default Chat