import React, { useEffect } from 'react'
import Section from './Section'
import Footer from './Footer'
import Header from './Header'
var mediaStreamConstraints = {
    video: true,
    audio:true,
}
function Home() {
    
    function handlecreate(data) {
        mediaStreamConstraints= data;
        console.log("홈 데이터"+JSON.stringify(data))
        render(mediaStreamConstraints)
    }

    return (
        <>
            <Header />
            {/*render은 section부분 */}
            {render(mediaStreamConstraints)}
            <Footer onCreate={handlecreate} />
        </>
    )
}
function render (mediaStreamConstraints) {
    console.log('aaa')
    return (
        <Section mediaStreamConstraints={mediaStreamConstraints}/>
    )
}
export default Home