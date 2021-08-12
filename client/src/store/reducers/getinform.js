import { FETCH_GET_INFORM } from "../action/index";
//roomtype 이 0이면 exam모드 1이면 study 모드

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