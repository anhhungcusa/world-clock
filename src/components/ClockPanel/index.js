import React, { useContext, useState, useEffect, useCallback, useMemo } from 'react'
import './style.css'
import { DataContext } from '../../context'
import { Input, Space, Checkbox, Button, message, Row, Col, Divider } from 'antd'
import { ZoneCheckboxMemorized } from '../'

export function ClockPanel() {
  const {
    state: { zones, selectedZones },
    actions: { addSelectedZone, removeSelectedZone, resetSelectedZones },
  } = useContext(DataContext)
  const [displayZones, setDisplayZones] = useState(null)
  const [filter, setFilter] = useState({ text: '', isShowSelectedZones: false })
  const [isFiltering, setIsFiltering] = useState(false)
  const onChangeFilter = (key, value) => {
    setFilter((filter) => ({ ...filter, [key]: value }))
  }
  useEffect(() => {
    if (zones) {
      setDisplayZones(zones)
    }
  }, [zones])

  const onFilterZones = (isShowSelectedZones = false) => {
    if (!zones) return message.warn('Zones is empty')
    const search = filter.text.trim()
    if (search === '') return message.warn('You should be enter the zone')
    setIsFiltering(true)
    let filteredZones = zones.slice()
    if (isShowSelectedZones) {
      filteredZones = Object.keys(selectedZones || {})
    }
    filteredZones = filteredZones.filter((zone) => {
      const search = filter.text.trim()
      return zone.toLowerCase().includes(search.toLowerCase())
    })

    setDisplayZones(filteredZones)
    setIsFiltering(false)
  }

  useEffect(() => {
    if (filter.isShowSelectedZones) {
      onFilterZones(filter.isShowSelectedZones)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedZones, filter.isShowSelectedZones])

  const onResetFilter = () => {
    setFilter({ text: '', isShowSelectedZones: false })
    setDisplayZones(zones)
  }

  const onChangeShowSelectedZones = (e) => {
    const checked = e.target.checked
    onChangeFilter(e.target.name, e.target.checked)
    onFilterZones(checked)
  }

  const onChangeSelectedZones = useCallback((zone, checked) => {
    if (checked) {
      addSelectedZone(zone)
    } else {
      removeSelectedZone(zone)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isDisableDeselect = useMemo(() => {
    if (selectedZones === null) return true
    if (Object.keys(selectedZones).length === 0) return true
    return false
  }, [selectedZones])

  return (
    <Space className='clock-panel' direction='vertical'>
      <div className='filter-panel'>
        <div>
          <Input.Search
            loading={isFiltering}
            name='text'
            value={filter.text}
            onChange={({ target: { value, name } }) =>
              onChangeFilter(name, value)
            }
            onSearch={() => onFilterZones(filter.isShowSelectedZones)}
            placeholder='enter the zone'
          />

        </div>
        <Checkbox
          name='isShowSelectedZones'
          onChange={onChangeShowSelectedZones}
          checked={filter.isShowSelectedZones}
        >
          show selected zones
        </Checkbox>
        <Button onClick={onResetFilter}>Reset</Button>
        <Button disabled={isDisableDeselect} onClick={resetSelectedZones}>Deselect All</Button>
      </div>
      <Divider />
      <Row direction='horizontal' size='middle'>
        {displayZones &&
          displayZones.map((value) => (
            <Col key={value} span={24} xs={12} md={8} lg={6} xl={4} xxl={2}>
              <ZoneCheckboxMemorized
                zone={value}
                isSelected={selectedZones ? selectedZones[value] : false}
                onChangeStatusZone={onChangeSelectedZones}
              />
            </Col>
          ))}
      </Row>
    </Space>
  )
}
