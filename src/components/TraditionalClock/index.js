import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment-timezone'
import './style.css'
import { DrawLockUtil } from '../../utils'
export function TraditionalClock({
  zone,
  size = 200,
  timeFormat = 'standard',
  hourFormat = 'standard',
}) {
  const [time, setTime] = useState(moment().tz(zone))
  const [radius, setRadius] = useState(size / 2)
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => {
        return time.clone().add(1, 's')
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])
  const [drawingContext, setDrawingContext] = useState(null)
  const clockCanvasRef = useRef()

  // constants
  const isDraw24hour = timeFormat === '24h' ? true : false
  const isDrawRoman = isDraw24hour && hourFormat === 'roman'

  useEffect(() => {
    if (drawingContext === null) {
      setDrawingContext(clockCanvasRef.current.getContext('2d'))
      setRadius(radius => radius * 0.9)
    } else {
      drawingContext.translate(size / 2, size / 2)
    }
  }, [drawingContext, radius, size])

  useEffect(() => {
    if (drawingContext === null) return
    const ctx = drawingContext
    DrawLockUtil.drawFace(ctx, radius)
    DrawLockUtil.drawTicks(ctx, radius)
    const hours = time.get('hours')
    const minute = time.get('minutes')
    const seconds = time.get('seconds')
    const meridiem = hours >= 12 ? 'PM' : 'AM' 
    DrawLockUtil.drawNumbers(ctx, radius, isDrawRoman, isDraw24hour, meridiem)
    DrawLockUtil.drawTime(ctx, radius, hours, minute, seconds)
  }, [time, drawingContext, radius, isDrawRoman, isDraw24hour])

  return (
    <div className="d-flex flex-column justify-content-center align-item-center ">
      <div className="traditional-clock" style={{ width: String(size) + 'px' }}>
        <canvas width={size} height={size} ref={clockCanvasRef} />
      </div>
      <div> {time.format('hh:mm:ss - A')} </div>
    </div>
  )
}

export const TraditionalClockMemorized = React.memo(TraditionalClock)

TraditionalClock.propTypes = {
  zone: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  timeFormat: PropTypes.oneOf(['standard', '24h']).isRequired,
  hourFormat: PropTypes.oneOf(['roman', 'standard']).isRequired,
}
