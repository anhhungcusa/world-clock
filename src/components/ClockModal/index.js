import React, { useState, useEffect, useMemo } from 'react'
import { Modal, Spin } from 'antd'
import PropTypes from 'prop-types'
import moment from 'moment'
import { TraditionalClock } from '../'
import { useWindowSize } from '../../hooks'

export function ClockModal({ visible, close, zone }) {
  const [time, setTime] = useState(null)
  const windowSize = useWindowSize()
  useEffect(() => {
    const interval = setInterval(() => {
      if (zone === null || visible === false) return
      setTime(time => {
        if (time === null) return setTime(moment().tz(zone))
        return time.clone().add(1, 's')
      })
    }, 1000)
    return () => {
      clearInterval(interval)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, zone])
  const onCancel = () => {
    setTime(null)
    close()
  }
  const modalTitle =
    zone && zone.replace(/_/g, ' ') + (time ? time.format(' - DD/MM/YYYY') : '')

  const clockSize = useMemo(() => Math.min(windowSize.width, windowSize.height), [windowSize.height, windowSize.width])
  
  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      title={modalTitle}
      footer={null}
      width={clockSize + 50}
      centered={true}
    >
      <Spin spinning={time === null ? true : false} tip="Loading...">
        <TraditionalClock time={time} size={clockSize * 0.7} />
        <div className="text-center">
          <b style={{ fontSize: '2em' }}>
            {time && time.format('hh:mm:ss - A')}
          </b>
        </div>
      </Spin>
    </Modal>
  )
}

const {string, bool, func} = PropTypes
ClockModal.propTypes = {
  visible: bool.isRequired,
  close: func.isRequired,
  zone: string,
}
