import React, { useEffect} from 'react'
import './Render.scss'
import Lottie from 'react-lottie'
import lottieanim from '../../lottie/LottieLoading.json'
import { fetchGetInform } from '../../store/action'
import { useDispatch } from 'react-redux'
import {Link,Redirect, useParams} from 'react-router-dom'
import swal from 'sweetalert'
function Render() {
    //로티 옵션
    const lottieOptions = {
        animationData:lottieanim,
        loop:true,
        autoplay:true,
        
    }

    const {roomname,useremail,roomowner,nickname,roomtype} = useParams()
    console.log(roomname+useremail+roomowner)
    const dispatch = useDispatch()
    
    useEffect(()=> {
        const Data = {
            roomname:roomname,
            useremail:useremail,
            roomowner:roomowner,
            nickname:nickname,
            session:"",
            userimage:"",
            roomtype:roomtype
        }  
        
        fetchGetInform(Data).then((result)=> {
           dispatch(result)
            
  
            // swal("" ,{
            //     title:result.payload.roomname +"에 입장합니다",
            //     icon:"success",
            //     text:result.payload.nickname+"님 환영합니다",
                
                
            // }).then(()=> {
            //     document.getElementsByClassName("")
            //     return (
            //         <>
                        
            //             {console.log( <Link to ={`/home/${result.payload.roomname}`}/>  )}
            //             {<Link to={`/home/${result.payload.roomname}`}  params ={{id:result.payload.roomname}} />}
            //             <Redirect to={`/home/${result.payload.roomname}`} params={{id:result.payload.roomname}} />
            //         </>

            //     )
            // }).catch(e=> {
            //     //여기서 session catch 한다 없으면 django 페이지 돌아가는 로직
            // })
            console.log("result:"+JSON.stringify( result))
        })
    },[])


   
    return (
        <>
            <div className="LenderContainer">
                <Lottie options={lottieOptions}/>
                <div className="swal-overlay swal-overlay--show-modal" tabIndex="-1">
                        <div className="swal-modal" role="dialog" aria-modal="true"><div className="swal-icon swal-icon--success">
                            <span className="swal-icon--success__line swal-icon--success__line--long"></span>
                            <span className="swal-icon--success__line swal-icon--success__line--tip"></span>

                            <div className="swal-icon--success__ring"></div>
                            <div className="swal-icon--success__hide-corners"></div>
                        </div><div className="swal-title" >{roomname}에 입장합니다</div><div className="swal-text" >{nickname}님 환영합니다</div><div className="swal-footer"><div className="swal-button-container">

                            <Link className="swal-button swal-button--confirm" to={`/home/${roomname}`}  params ={{id:roomname}}>OK</Link>

                            <div className="swal-button__loader">
                            <div></div>
                            <div></div>
                            <div></div>
                            </div>

                        </div></div></div></div>
            </div>

        

        </>

    )
}
export default Render