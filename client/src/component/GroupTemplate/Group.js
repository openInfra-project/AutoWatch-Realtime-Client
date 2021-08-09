import React, { useEffect } from 'react'
import './Group.scss'
function Group(props) {
  console.log("Group 상태:"+props.setting)
 
  return (
    <>
      <div className="GroupContainer" style={{animationName:props.setting.toString()+"s"||"falses"}}>
        <div className="Groupinit">
          
        </div>
      </div>
    </>
  )
}
export default Group