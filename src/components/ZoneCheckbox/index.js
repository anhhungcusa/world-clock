import React, { useMemo } from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'

export function ZoneCheckbox({ zone, isSelected = false, onChangeStatusZone }) {
  const onChange = (e) => {
    const checked = e.target.checked
    onChangeStatusZone(zone, checked)
  }
  const displayZone = useMemo(() => {
    const words = zone.split('/')
    if (words.length < 2) {
      return zone
    }
    return `${words[0]}/${words[words.length - 1]}`
  }, [zone])
  return (
    <Checkbox checked={isSelected} onChange={onChange}>
      {displayZone}
    </Checkbox>
  )
}

export const ZoneCheckboxMemorized = React.memo(ZoneCheckbox)

ZoneCheckbox.propTypes = {
  zone: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onChangeStatusZone: PropTypes.func.isRequired,
}

ZoneCheckboxMemorized.propTypes = {
  zone: PropTypes.string.isRequired,
  isSelected: PropTypes.bool,
  onChangeStatusZone: PropTypes.func.isRequired,
}
