import {combineReducers} from 'redux'
import toggleVideoAudio from './toggleVideoAudio'
import getinform from './getinform'
import receiveChatData from './receiveChat'
const rootReducer = combineReducers({
    toggleVideoAudio,
    getinform,
    receiveChatData
})

export default rootReducer