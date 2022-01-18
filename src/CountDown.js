import { useCountdown } from 'react-countdown-circle-timer'
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { useState } from 'react'
import React from 'react'



function CountDown(props) {
    const [msg , setMsg] = useState(" ");

    const {
        path,
        pathLength,
        stroke,
        strokeDashoffset,
        remainingTime,
        elapsedTime,
        size,
        strokeWidth,
      } = useCountdown({ isPlaying: true, duration: 7, colors: '#abc' })

    const timeUp = () =>{
        setMsg("time up")
        props.stop("payment expired")
    }

    return (
        <div>
            <br/>
            <CountdownCircleTimer
            isPlaying={true}
            duration={7}
            colors={['#004777', '#F7B801', '#A30000', '#A30000']}
            colorsTime={[7, 5, 2, 0]}
            onComplete={timeUp}
             >

            {({ remainingTime }) => remainingTime}
             </CountdownCircleTimer>
             <h4>{props.msg}</h4>
        </div>
    )
}

export default CountDown

