import React from 'react'
function ChatUser(props) {
    return(
        <>
         <div ng-repeat="chat in chats" className="ng-scope">
            <li ng-click="uid(chat.id)">
                <img className="avatar" src={props.src}/>
                <p className="username ng-binding">{props.username}</p>
            </li>
        </div>
        </>
    )
}
export default ChatUser