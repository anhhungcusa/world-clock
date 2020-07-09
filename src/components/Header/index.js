import React from 'react'
import './style.css'
import PropTypes from 'prop-types'
import { ClockCircleOutlined } from '@ant-design/icons'

export function Header({title = 'Title'}) {
  return (
    <header>
      <h1>{title} <ClockCircleOutlined spin={true} /> </h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}