import React, { useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { DataProvider } from './context'
import { Header, ClockPanel, ClockList } from './components'
import { Button, Drawer } from 'antd'
function App() {
  const [isVisibleClockPanel, setIsVisibleClockPanel] = useState(false)
  const openPanel = () => {
    setIsVisibleClockPanel(true)
  }
  const closePanel = () => {
    setIsVisibleClockPanel(false)
  }
  return (
    <div className='App'>
      <DataProvider>
        <Header title='World Clock' />
        <div className='container-fluid'>
          <Button onClick={openPanel}>Select Clocks</Button>
          <Drawer
            height='70vh'
            title='Clock Panel'
            closable={true}
            visible={isVisibleClockPanel}
            onClose={closePanel}
            placement='top'
          >
            <ClockPanel />
          </Drawer>
          <ClockList />          
        </div>
      </DataProvider>
    </div>
  )
}

export default App
