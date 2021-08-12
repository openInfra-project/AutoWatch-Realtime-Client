import Axios from 'axios'
export const TOGGLE_VIDEO_AUDIO ="TOGGLE_VIDEO_AUDIO"
export const FETCH_GET_INFORM = "FETCH_GET_INFORM"
export const RECEIVE_CHAT_DATA = "RECEIVE_CHAT_DATA"
export const RECEIVE_GAZE_DATA = "RECEIVE_GAZE_DATA"

export const toggleVideoAudio = (data)=> {
    return {
        type:'TOGGLE_VIDEO_AUDIO',
        data:data
    }
}
export const receiveChatData = (data) => {
    return {
        type:"RECEIVE_CHAT_DATA",
        data : data
    }
}
export const fetchGetInform = async() => {
   
    const Data = {
        roomname:'1234',
        useremail:'junyoung@naver.com',
        roomowner:"junyoung@naver.com",
        nickname:'김준영',
        session:"",
        userimage:"",
        roomtype:0
    }
    Axios.defaults.xsrfCookieName = 'csrftoken'
    Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    const response = Axios.post('http://118.67.131.138:30000/main/enteroom/study2').then(response=> {
        console.log(response.data)
    }).catch(e=>{
        console.log(e)
    })
    console.log(response)
   
    
    // console.log(Data)

    return {
        type:"FETCH_GET_INFORM",
        payload : Data
    }
}
export const receiveGazeData = (data)=> {
    return {
        type:'RECEIVE_GAZE_DATA',
        data:data
    }
}