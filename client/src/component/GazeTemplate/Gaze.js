import React, { useEffect } from 'react'
import './Gaze.scss'
// import { ReactDOM  } from 'react';
const Gaze=()=> {
    let success = "fail"
    
    useEffect(() => {
        const script = document.createElement("script");
        
        script.innerHTML = `
                var calibrated = false;
                var gc_started = false;
                var hm_left = 0;
                var hm_top = 0;
                var hm_created = false;
                window.onload = async function () {
                    //////set callbacks for GazeCloudAPI/////////
                    GazeCloudAPI.OnCalibrationComplete = function () {
                        console.log('gaze Calibration Complete');
                        calibrated = true;
                    }
                    GazeCloudAPI.OnCamDenied = function () { console.log('camera  access denied') }
                    GazeCloudAPI.OnError = function (msg) { console.log('err: ' + msg) }
                    GazeCloudAPI.UseClickRecalibration = true;
                    GazeCloudAPI.OnResult = PlotGaze;

                    GazeCloudAPI.StartEyeTracking();
                    setTimeout(() => {
                        var video =  document.getElementById('showvideoid');
                        if(video){
                            console.log("here_video");
                            // video.style.display = "none";
                            video.style.height = "240px";
                            video.style.width = "320px";
                            setInnerText('log_div','HW CHANGE');
                        }  
                    }, 2000)
                                    
                }
     
                function PlotGaze(GazeData) {
                    /*
                        GazeData.state // 0: valid gaze data; -1 : face tracking lost, 1 : gaze uncalibrated
                        GazeData.docX // gaze x in document coordinates
                        GazeData.docY // gaze y in document cordinates
                        GazeData.time // timestamp
                    */

                    var docx = GazeData.docX;
                    var docy = GazeData.docY;
                
                    var gaze = document.getElementById("gaze");
                    docx -= gaze.clientWidth / 2;
                    docy -= gaze.clientHeight / 2;
                
                    gaze.style.left = docx + "px";
                    gaze.style.top = docy + "px";
                
                    setInnerText('log_div',gaze.style.left)
                    setInnerText('log_div2',gaze.style.top)
                    setInnerText('log_div3',screen.width)
                    setInnerText('log_div4',screen.height)
                
                
                
                    if (GazeData.state != 0) {
                        if (gaze.style.display == 'block')
                            gaze.style.display = 'none';
                    }
                    else {
                        var video =  document.getElementById('showvideoid')
                        if(video){
                            video.style.height = "240px";
                            video.style.width = "320px";
                        }
                        if (gaze.style.display == 'none')
                            gaze.style.display = 'block';
                        // 예측가능 gaze일때 (gaze==0)
                        setInnerText('log_div5','HERE')

                        if (-80 > docx || docx > 1280 || -80 > docy || docy > 720 ){
                            setInnerText('log_div6','OUT')
                        }else{
                            setInnerText('log_div6','IN')
                        }
                    }
                }
                
                // Kalman Filter defaults to on. Can be toggled by user.
                window.applyKalmanFilter = true;
                
                // Set to true if you want to save the data even if you reload the page.
                window.saveDataAcrossSessions = true;

                // div 내용 바꾸기
                function setInnerText(id,log) {
                    const element = document.getElementById(id);
                    element.innerText 
                      = log ;
                  } 
       `;
        script.type = "text/javascript";
        script.async = "async";
        document.head.appendChild(script)
        success = "success"
        console.log(success)
      });
   
    const gazeStyle={
        position: "absolue",
        display:"none",
        width:"100px",
        height:"100px",
        borderRadius:"50%",
        border: "solid 2px rgba(255, 255,255, .2)",
        boxShadow: " 0 0 100px 3px rgba(125, 125,125, .5)",
        pointerEvents: "none",
        zIndex: "999999",
    }

        
    return (
        <>
            <div id="log_div"></div>
            <div id="log_div2"></div>
            <div id="log_div3"></div>
            <div id="log_div4"></div>
            <div id="log_div5"></div>
            <div id="log_div6"></div>
            <label id="et2_label">GazeCloudAPI</label>
            <video
                id="showvideoid"
                width="320"
                height="240"
                className="video"
                autoPlay>
            </video>


            <div id="gaze"  style={gazeStyle}>            
            </div>
        </>
    )
}
export default Gaze