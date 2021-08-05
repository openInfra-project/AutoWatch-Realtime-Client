import React, { useEffect} from 'react'
import './Render.scss'
import Lottie from 'react-lottie'
import lottieanim from '../../lottie/LottieLoading.json'
import { fetchGetInform } from '../../store/action'
import { useDispatch } from 'react-redux'
import {Link} from 'react-router-dom'
import swal from 'sweetalert'
function Render() {
    //로티 옵션
    const lottieOptions = {
        animationData:lottieanim,
        loop:true,
        autoplay:true,
        
    }

    const dispatch = useDispatch()
    
    useEffect(()=> {
        fetchGetInform().then((result)=> {
            dispatch(result)
            //then 뒤에 url 넘겨주어야 해
            swal("" ,{
                title:result.payload.roomname +"에 입장합니다",
                icon:"success",
                text:result.payload.nickname+"님 환영합니다"
                
            }).then(()=> {
                return (
                    <>
                        {console.log( <Link to ={`/home/${result.payload.roomname}`}/>  )}
                        <Link to={`/home/${result.payload.roomname}`}  params ={{id:result.payload.roomname}} />
                        {window.location.assign(`http://localhost:3000/home/${result.payload.roomname}`)}
                    </>
                )
            })
            console.log("result:"+JSON.stringify( result))
        })
    },[])


   
    return (
        <>
            <div className="LenderContainer">
                 <Lottie options={lottieOptions} />
            </div>

           
        </>

    )
}
export default Render