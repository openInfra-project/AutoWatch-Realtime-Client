import { RECEIVE_CHAT_DATA } from "../action"
const initialState = {
    arr:[]
}
function receiveChatData(state= initialState,action) {
    switch(action.type) {
        case RECEIVE_CHAT_DATA:
            return {
                ...state,
                arr:state.arr.concat(action.data)
            }
        default:
            return state
    }
}
export default receiveChatData