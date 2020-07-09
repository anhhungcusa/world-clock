import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
} from 'react'
import './style.css'
import { DataContext } from '../../context'
import { Input, Checkbox, Button, message, Row, Col, Divider } from 'antd'
import { ZoneCheckboxMemorized } from '../'

export function ClockPanel() {
  const {
    state: { zones, selectedZones },
    actions: { addSelectedZone, removeSelectedZone, resetSelectedZones },
  } = useContext(DataContext)
  const [displayZones, setDisplayZones] = useState(null)
  const [filter, setFilter] = useState({
    text: '',
    isShowSelectedZones: false,
  })
  const onChangeFilter = (key, value) => {
    setFilter(filter => ({ ...filter, [key]: value }))
  }
  useEffect(() => {
    if (zones) {
      setDisplayZones(zones)
    }
  }, [zones])

  const onFilterZones = (isShowSelectedZones = false) => {
    if (!zones) return message.warn('Zones is empty')
    let filteredZones = zones.slice()
    if (isShowSelectedZones) {
      filteredZones = Object.keys(selectedZones || {})
    }
    filteredZones = filteredZones.filter(zone => {
      const search = filter.text.trim().replace(/\s+/g, '')
      const source = zone.toLowerCase().replace(/_/g, '')
      return source.includes(search.toLowerCase())
    })
    setDisplayZones(filteredZones)
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

  const onChangeShowSelectedZones = e => {
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
    <div className="clock-panel">
      <div className="filter-panel">
        <div>
          <Input.Search
            name="text"
            value={filter.text}
            onChange={({ target: { value, name } }) =>
              onChangeFilter(name, value)
            }
            onSearch={() => onFilterZones(filter.isShowSelectedZones)}
            placeholder="enter a zone"
          />
        </div>
        <Checkbox
          name="isShowSelectedZones"
          onChange={onChangeShowSelectedZones}
          checked={filter.isShowSelectedZones}
        >
          show selected zones
        </Checkbox>
        <Button onClick={onResetFilter}>Reset</Button>
        <Button disabled={isDisableDeselect} onClick={resetSelectedZones}>
          Deselect All
        </Button>
      </div>
      <Divider />
      <Row direction="horizontal" size="middle">
        {displayZones &&
          displayZones.map(value => (
            <Col key={value} span={24} xs={12} md={8} lg={6} xl={4} xxl={2}>
              <ZoneCheckboxMemorized
                zone={value}
                isSelected={selectedZones ? selectedZones[value] : false}
                onChangeStatusZone={onChangeSelectedZones}
              />
            </Col>
          ))}
      </Row>
    </div>
  )
}
