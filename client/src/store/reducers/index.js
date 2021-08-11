import {combineReducers} from 'redux'
import toggleVideoAudio from './toggleVideoAudio'
import getinform from './getinform'
import receiveChatData from './receiveChat'
import receiveGazeData from './receiveGaze'
const rootReducer = combineReducers({
    toggleVideoAudio,
    getinform,
    receiveChatData,
    receiveGazeData
})

export default rootReducer