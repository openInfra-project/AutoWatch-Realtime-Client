import React ,{useRef}from 'react'
import {useSelector} from 'react-redux'
function RenderGroup() {
    const gazes = useSelector(state=> state.receiveGazeData)
    var messageEnd = useRef()
      
    if(messageEnd.current) {
        messageEnd.current.scrollTop = messageEnd.current.scrollHeight
    }
    console.log(JSON.stringify(gazes))
    return (
        <>
          <div ref= {messageEnd} className="Groupinit">
                {gazes.arr.map((data,index)=> (
                    
                    <>
                        {console.log("index"+index)} 
                        <div key = {index} className="Groupmessage">
                                <div className="Groupmessageinner">
                                    <p className="Groupmessageinnername">{data.nickname}</p>
                                    <p className="Groupmessageinnertime">오후 10:51</p>
                                </div>
                                <p className="Groupng-binding">
                                 {`${data.nickname} == ${data.email}이가 부정행위를 ${data.gazecount}번 한다!!!`}
                                </p>
                        
                        </div>
                    </>
                ))}
            </div>
        </>
    )
}
export default RenderGroup