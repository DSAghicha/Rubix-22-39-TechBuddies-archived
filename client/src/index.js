import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Home, Room } from './pages'

ReactDOM.render(
    <Router>
        <Routes>
            <Route path='/' element={ <Home/> }/>
            <Route path='/' element={ <Room/> }/>
        </Routes>
    </Router>,
    document.getElementById('root')
)
