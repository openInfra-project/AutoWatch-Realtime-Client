import React from 'react'
import './ErrorPage.scss'
import Lottie from 'react-lottie'
import lottieanim from '../../lottie/error.json'
function ErrorPage() {
    const lottieOptions = {
        animationData:lottieanim,
        loop:true,
        autoplay:true,
        
    }
    return (
        <>
            <div className="ErrorContainer">
                <Lottie  options={lottieOptions} style ={{width:'90%',height:'90%',display:'flex',justifyContent:'center'}}/>
            </div>
        </>
    )
}
export default ErrorPage