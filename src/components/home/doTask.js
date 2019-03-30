
import React from 'react'
import ReactDOM from 'react-dom'
import { useSpring, animated, interpolate } from 'react-spring'
import { useGesture } from 'react-with-gesture'
import '../../style/doTask.css'

function DoTask({ children }) {
  const [bind, { delta, down }] = useGesture()
  const { x, bg, size } = useSpring({
    x: down ? delta[0] : 0,
    bg: `linear-gradient(120deg, ${delta[0] < 0 ? '#f9f586 0%, #96fbc4' : '#f5576c 0%, #f093fb'} 100%)`,
    size: down ? 1.1 : 1,
    immediate: name => down && name === 'x'
  })
  const avSize = x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
  const avxSize = x.interpolate({ map: Math.abs, range: [50, 300], output: ['scale(0.5)', 'scale(1)'], extrapolate: 'clamp' })
  return (
    <animated.div {...bind()} className="item" style={{ background: bg }}>
      <animated.div className="av" style={{ transform: avSize, justifySelf: 'end' }} />
      <animated.div className="avx" style={{ transform: avxSize, justifySelf: 'start' }} />
      <animated.div className="fg" style={{ transform: interpolate([x, size], (x, s) => `translate3d(${x}px,0,0) scale(${s})`) }}>
        {children}
      </animated.div>
    </animated.div>
  )
}

export default DoTask;