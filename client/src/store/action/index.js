import Axios from 'axios'
export const TOGGLE_VIDEO_AUDIO ="TOGGLE_VIDEO_AUDIO"
export const FETCH_GET_INFORM = "FETCH_GET_INFORM"

export const toggleVideoAudio = (data)=> {
    return {
        type:'TOGGLE_VIDEO_AUDIO',
        data:data
    }
}
export const fetchGetInform = async() => {
    Axios.defaults.xsrfCookieName = 'csrftoken'
    Axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    const Data = {
        roomname:'1234',
        useremail:'junyoung@naver.com',
        nickname:'김준영',
        roomtype:0
    }
    //await Axios.post('http://localhost:4000')
    
    // console.log(Data)

    return {
        type:"FETCH_GET_INFORM",
        payload : Data
    }
}