import {TOGGLE_VIDEO_AUDIO} from '../action/index'
const initialState = {
    video:true,
    audio:true,
}
function toggleVideoAudio(state=initialState,action) {
    switch(action.type) {
        case TOGGLE_VIDEO_AUDIO:
            return action.data
        default:
            return state
    }
}
export default toggleVideoAudio