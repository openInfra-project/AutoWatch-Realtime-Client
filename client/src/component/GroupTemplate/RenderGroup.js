import React ,{useRef}from 'react'
import {useSelector} from 'react-redux'
import moment from 'moment'
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
                                    <p className="Groupmessageinnertime">{moment().format('HH:mm:ss')}</p>
                                </div>
                                <p className="Groupng-binding">
                                 {`${data.nickname} == ${data.email}의 시선처리 경고${data.gazecount}번 자리이탈 경고 ${data.boundcount}`}
                                </p>    
                        
                        </div>
                    </>
                ))}
            </div>
          
        </>
        
    )
}
export default RenderGroup