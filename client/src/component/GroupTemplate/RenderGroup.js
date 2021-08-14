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
                                    
                                </div>
                                <p className="Groupng-binding">
                                 {`${data.nickname}님의 시선처리 경고${data.gazeOption.gaze}번 자리이탈 경고 ${data.gazeOption.bound}번 하였습니다.`}
                                </p>    
                        
                        </div>
                    </>
                ))}
            </div>
          
        </>
        
    )
}
export default RenderGroup