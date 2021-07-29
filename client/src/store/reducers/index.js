import {combineReducers} from 'redux'
import toggleVideoAudio from './toggleVideoAudio'
import getinform from './getinform'
const rootReducer = combineReducers({
    toggleVideoAudio,
    getinform
})

export default rootReducer