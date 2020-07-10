import React, { useContext, useMemo, useState } from 'react'
import { DataContext } from '../../context'
import { ClockItemMemorized } from '../'
import { Row, Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import './style.css'
import { ClockModal } from '../'
import { useScroll } from '../../hooks'
export function ClockList({ openPanel }) {
  const {
    state: { selectedZones, clickedZone },
    actions: { removeSelectedZone, setClickedZone, resetClickedZone },
  } = useContext(DataContext)
  const bodyScroll = useScroll(document.body)
  const displayZones = useMemo(() => {
    if (selectedZones) {
      return Object.keys(selectedZones)
    }
    return null
  }, [selectedZones])

  const [isOpenClockModal, setIsOpenClockModal] = useState(false)

  const openModal = zone => {
    bodyScroll.hidden()
    setClickedZone(zone)
    setIsOpenClockModal(true)
  }
  const closeModal = () => {
    bodyScroll.show()
    resetClickedZone()
    setIsOpenClockModal(false)
  }

  return (
    <div className="clock-list">
      <Row gutter={[10, 10]}>
        {displayZones &&
          displayZones.map(zone => (
            <Col key={zone} xs={24} sm={12} md={8} lg={6} xl={4}>
              <ClockItemMemorized
                removeSelectedZone={removeSelectedZone}
                zone={zone}
                openClockModal={openModal}
              />
            </Col>
          ))}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Button onClick={openPanel} className="add-clock-btn">
            <PlusOutlined />
          </Button>
        </Col>
        <ClockModal
          visible={isOpenClockModal}
          close={closeModal}
          zone={clickedZone}
        />
      </Row>
    </div>
  )
}

ClockList.propTypes = {
  openPanel: PropTypes.func.isRequired,
}
