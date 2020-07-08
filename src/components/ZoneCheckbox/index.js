import React from 'react'
import { Checkbox } from 'antd'
import PropTypes from 'prop-types'

export function ZoneCheckbox({ zone, isSelected = false, onChangeStatusZone }) {
  const onChange = (e) => {
    const checked = e.target.checked
    onChangeStatusZone(zone, checked)
  }
  return (
    <Checkbox checked={isSelected} onChange={onChange}>
      {zone}
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
