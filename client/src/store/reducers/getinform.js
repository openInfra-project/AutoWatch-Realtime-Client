import { FETCH_GET_INFORM } from "../action/index";
const initialState = {
    roomname:'',
    useremail:'',
    nickname:'',
    roomtype:0
}
function data(state={},action) {
    switch(action.type) {
        case FETCH_GET_INFORM:
            return {
                ...action.payload
            }
        default:
            return state
    }
}
export default data