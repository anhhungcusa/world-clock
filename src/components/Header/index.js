import React from 'react'
import './style.css'
import PropTypes from 'prop-types'

export function Header({title = 'Title'}) {
  return (
    <header>
      <h1>{title}</h1>
    </header>
  )
}

Header.propTypes = {
  title: PropTypes.string
}