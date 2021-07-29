import React, { useEffect } from 'react'
import './Lender.scss'
import Lottie from 'react-lottie'
import lottieanim from '../../lottie/LottieLoading.json'
import axios from 'axios'
function Lender() {
     //로티 옵션
     const lottieOptions = {
        animationData:lottieanim,
        loop:true,
        autoplay:true,
        
    }
    axios.defaults.xsrfCookieName = 'csrftoken'
    axios.defaults.xsrfHeaderName = 'X-CSRFToken'
    axios.post('django 주소',{
        
    })


   
    return (
        <>
            <div className="LenderContainer">
                 <Lottie options={lottieOptions} />
            </div>

           
        </>

    )
}
export default Lender