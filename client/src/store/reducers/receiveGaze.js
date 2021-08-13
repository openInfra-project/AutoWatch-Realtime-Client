import { RECEIVE_GAZE_DATA} from "../action"
const initialState = {
    arr:[]
}
function receiveGazeData(state= initialState,action) {
    switch(action.type) {
        case RECEIVE_GAZE_DATA:
            //기존 이메일이 같으면 gazecount만 붙여넣는 작업을 한다.
            
            const checkDuplicate = state.arr.filter(user=>user.email ===action.data.email)

            if(checkDuplicate.length>0) {
                checkDuplicate[0].gazeOption = action.data.gazeOption
                return{
                    ...state,
                    arr:checkDuplicate
                }
            }else {
                return {
                    ...state,
                    arr:state.arr.concat(action.data)
                }
            }
           
        default:
                return state
        }
}
export default receiveGazeData