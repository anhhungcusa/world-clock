import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react'
import PropTypes from 'prop-types'
import './style.css'
import { DrawLockUtil } from '../../utils'
export function TraditionalClock({
  time,
  size = 200,
  timeFormat = 'standard',
  hourFormat = 'standard',
}) {
  const [radius, setRadius] = useState(size / 2)
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
    if (drawingContext === null || time === null) return
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
    <div className="traditional-clock d-flex justify-content-center align-item-center">
      <canvas width={size} height={size} ref={clockCanvasRef} />
    </div>
  )
}

export const TraditionalClockMemorized = React.memo(TraditionalClock)

TraditionalClock.propTypes = {
  time: PropTypes.object.isRequired,
  size: PropTypes.number.isRequired,
  timeFormat: PropTypes.oneOf(['standard', '24h']).isRequired,
  hourFormat: PropTypes.oneOf(['roman', 'standard']).isRequired,
}
