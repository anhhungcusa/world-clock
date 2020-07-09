import React, { useContext, useMemo } from 'react'
import { DataContext } from '../../context'
import { ClockItemMemorized } from '../'
import { Row, Col, Button } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import {
  Tooltip,
} from 'react-tippy'
import 'react-tippy/dist/tippy.css'
import './style.css'
export function ClockList({openPanel}) {
  const {
    state: { selectedZones },
    actions: {removeSelectedZone}
  } = useContext(DataContext)
  const displayZones = useMemo(() => {
    if (selectedZones) {
      return Object.keys(selectedZones)
    }
    return null
  }, [selectedZones])

  return (
    <div className="clock-list">
      <Row gutter={[10, 10]}>
        {displayZones &&
          displayZones.map(zone => (
            <Col key={zone} xs={24} sm={12} md={8} lg={6} xl={4}>
              <Tooltip 
                title="click to remove"
                trigger="mouseenter"
                followCursor={true}
                size='small'>
                <ClockItemMemorized removeSelectedZone={removeSelectedZone} zone={zone} />
              </Tooltip>
            </Col>
          ))}
        <Col xs={24} sm={12} md={8} lg={6} xl={4}>
          <Button onClick={openPanel} className="add-clock-btn">
            <PlusOutlined />
          </Button>
        </Col>
      </Row>
    </div>
  )
}

ClockList.propTypes = {
  openPanel: PropTypes.func.isRequired
}