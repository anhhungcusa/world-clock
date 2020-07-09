import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TraditionalClock } from '../../'
import { Card } from 'antd'
import moment from 'moment-timezone'
export function ClockItem({ zone, removeSelectedZone }) {
  const [time, setTime] = useState(null)
  const displayZone = zone.split('/').pop()
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(time => {
        if (time === null) return setTime(moment().tz(zone))
        return time.clone().add(1, 's')
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <Card
      onClick={() => removeSelectedZone(zone)}
      hoverable={true}
      title={displayZone + (time ? time.format(' - DD/MM/YYYY') : '')}
      loading={time === null ? true : false}
      // extra={<CloseOutlined onClick={} />}
    >
      <TraditionalClock zone={zone} time={time} />
      <div className="text-center"> {time && time.format('hh:mm:ss - A')} </div>
    </Card>
  )
}

export const ClockItemMemorized = React.memo(ClockItem)

ClockItem.propTypes = {
  zone: PropTypes.string.isRequired,
  removeSelectedZone: PropTypes.func.isRequired,
}
