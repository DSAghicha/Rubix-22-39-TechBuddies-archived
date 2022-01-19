import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import { ContextProvider } from './SocketContext'

// Pages
import { Home, Room } from './pages'

ReactDOM.render(
    <ContextProvider>
        <Router>
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/room' element={ <Room/> }/>
        </Routes>
    </Router>
    </ContextProvider>,
    document.getElementById('root')
)
