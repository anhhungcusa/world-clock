import React, { useState, useEffect, createContext } from 'react'
import PropTypes from 'prop-types'
import { LocalStorageUtil } from '../utils'
import { env } from '../configs/globals'

const initState = {
  zones: null,
  selectedZones: null,
  clickedZone: null,
}
export const DataContext = createContext(initState)

export function DataProvider({ children }) {
  const [state, setState] = useState(initState)
  const [isInitiate, setIsInitiate] = useState(false)
  useEffect(() => {
    import('moment-timezone/data/meta/latest.json')
      .then(data => {
        const zones = Object.keys(data.zones)
        setZones(zones)
      })
    const data = LocalStorageUtil.getItem(env.STORAGE_KEY)
    if (data) {
      setState(state => ({...state, selectedZones: data}))
    }
    setIsInitiate(true)
  }, [])

  useEffect(() => {
    if (isInitiate) {
      LocalStorageUtil.setItem(env.STORAGE_KEY, state.selectedZones)
    }
  }, [state.selectedZones, isInitiate])

  const setZones = (zones) => {
    setState((state) => ({ ...state, zones }))
  }

  const addSelectedZone = (zone) => {
    setState((state) => {
      const selectedZones = { ...state.selectedZones, [zone]: true }
      return { ...state, selectedZones }
    })
  }

  const removeSelectedZone = (zone) => {
    setState((state) => {
      const selectedZones = { ...state.selectedZones }
      delete selectedZones[zone]
      return { ...state, selectedZones }
    })
  }

  const resetSelectedZones = () => {
    setState((state) => ({ ...state, selectedZones: initState.selectedZones }))
  }

  const setClickedZone = (zone) => {
    setState((state) => ({ ...state, clickedZone: zone }))
  }

  const resetClickedZone = () => {
    setState((state) => ({ ...state, clickedZone: initState.clickedZone }))
  }

  return (
    <DataContext.Provider
      value={{
        state,
        actions: {
          setZones,
          addSelectedZone,
          resetSelectedZones,
          removeSelectedZone,
          setClickedZone,
          resetClickedZone,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  )
}

DataProvider.propTypes = {
  children: PropTypes.node.isRequired,
}
