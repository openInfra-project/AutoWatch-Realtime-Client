import React from 'react'
import './Group.scss'
import RenderGroup from './RenderGroup'
function Group(props) {
  console.log("Group 상태:"+props.setting)

  return (
    <>
      <div className="GroupContainer" style={{animationName:props.setting.toString()+"s"||"falses"}}>
        <div className="Groupinit">
          <RenderGroup />
        </div>
      </div>
    </>
  )
}
export default Group