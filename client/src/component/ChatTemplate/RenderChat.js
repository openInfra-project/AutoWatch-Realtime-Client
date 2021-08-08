import React,{useEffect,useState,useRef} from 'react'
import { useSelector } from 'react-redux'
var testdata = []
function RenderChat() {
  
    
    const chats = useSelector((state)=> (state.receiveChatData))
    console.log(JSON.stringify(chats))

    // const[chat,SetChat] = useState([])
    //채팅 추가시 아래로 자동으로 스크롤되기 위한 변수
    var messageEnd = useRef()
      
    if(messageEnd.current) {
        messageEnd.current.scrollTop = messageEnd.current.scrollHeight
    }
        
    
  
    return (
        <>
          <div ref= {messageEnd} className="init">
                {chats.arr.map((data,index)=> (
                    
                    <>
                        {console.log("index"+index)} 
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
                ))}
            </div>
        </>

       
    )
}
export default RenderChat