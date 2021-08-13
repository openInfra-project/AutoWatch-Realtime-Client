import React from 'react'
function ChatUser(props) {
    return(
        <>
         <div ng-repeat="chat in chats" className="ng-scope">
            <li ng-click="uid(chat.id)">   
                <p className="username ng-binding" style={{fontSize:'18px',textAlign:'center'}}>{props.username}</p>
            </li>
        </div>
        </>
    )
}
export default ChatUser