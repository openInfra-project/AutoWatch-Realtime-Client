import React,{useEffect,useState,useRef} from 'react'
import { useSelector } from 'react-redux'
import moment from 'moment'
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
                                    <p className="messageinnername">{data.nickname}님</p>
                                    <p className="messageinnertime">{moment().format('HH:mm:ss')}</p>
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