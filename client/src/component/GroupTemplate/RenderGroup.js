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
                                    <p className="GroupNickname">{data.nickname} </p>
                                    님의
                                    <p className="GroupWarning1"> 시선처리 </p> 
                                    경고는 
                                    <p className="GroupWarning1"> {data.gazeOption.gaze}</p>
                                    번,
                                    <p className="GroupWarning2"> 자리이탈 </p>
                                    경고는
                                    <p className="GroupWarning2"> {data.gazeOption.bound}</p>
                                    번 입니다.



                                </p>    
                        
                        </div>
                    </>
                ))}
            </div>
          
        </>
        
    )
}
export default RenderGroup