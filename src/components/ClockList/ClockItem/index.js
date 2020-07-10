import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TraditionalClock } from '../../'
import { Card } from 'antd'
import moment from 'moment-timezone'
import { CloseOutlined } from '@ant-design/icons'
export function ClockItem({ zone, removeSelectedZone, openClockModal }) {
  const [time, setTime] = useState(null)
  const displayZone = zone.split('/').pop().replace(/_/g, ' ')
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

  const onClickCard = () => {
    openClockModal(zone)
  }
  
  const onRemoveClock = e => {
    e.stopPropagation()
    removeSelectedZone(zone)  
  }
  return (
    <Card
      onClick={onClickCard}
      hoverable={true}
      title={displayZone + (time ? time.format(' - DD/MM/YYYY') : '')}
      loading={time === null ? true : false}
      extra={<CloseOutlined onClick={onRemoveClock} />}
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
  openClockModal: PropTypes.func.isRequired,
}
