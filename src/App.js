import React, { useState } from 'react'
import './App.css'
import 'antd/dist/antd.css'
import { DataProvider } from './context'
import { Header, ClockPanel, ClockList } from './components'
import { Drawer } from 'antd'
import { Scroll } from './utils'
function App() {
  const [isVisibleClockPanel, setIsVisibleClockPanel] = useState(false)
  const bodyScroll = new Scroll(document.body)
  const openPanel = () => {
    bodyScroll.hidden()
    setIsVisibleClockPanel(true)
  }
  const closePanel = () => {
    bodyScroll.show()
    setIsVisibleClockPanel(false)
  }
  return (
    <div className='App'>
      <DataProvider>
        <Header title='WORD CLOCK' />
        <div className='container-fluid'>
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
          <ClockList openPanel={openPanel} />          
        </div>
      </DataProvider>
    </div>
  )
}

export default Appdw
