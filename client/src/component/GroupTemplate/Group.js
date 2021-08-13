import React from 'react'
import './Group.scss'
import RenderGroup from './RenderGroup'
function Group(props) {
  console.log("Group 상태:"+props.setting)

  return (
    <>
      <div className="GroupContainer" style={{animationName:props.setting.toString()+"s"||"falses"}}>
        <div className="Groupinit">
          <p className="Groupmanager">관리자가 아닐시 보이지 않습니다.</p>
          {
            props.userdata === "EXAM" ?  <RenderGroup /> : <p className="Groupp">STUDY 모드에서는 유효하지 않습니다.</p>
          }
         
        </div>
        
      </div>
    </>
  )
}
export default Group