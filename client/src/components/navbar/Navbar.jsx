import './Navbar.scss'
import { ReactComponent as Logo } from '../../assets/images/logo.svg'
import { ReactComponent as SearchIcon } from '../../assets/images/icons/search.svg'


import React from 'react'
import { Link } from 'react-router-dom'


const Navbar = () => {
    return <nav>
        <div className="logo-cr">
            <Link to='/'>
                <Logo className='logoSvg'/>
            </Link>
        </div>
        <div className="search-box">
            <SearchIcon/>
            <input type="text" placeholder='Search on ParaMate'/>
        </div>
        <ul className="nav-items">
            <li>
                <Link to='/'>About ParaMate</Link>                
            </li>
            <li>
                <Link to='/blogs'>Blogs</Link>
            </li>
            <li>
                <Link to='/login'>Login</Link>
            </li>
            <li>
                <Link to='/register'>Sign Up</Link>
            </li>
        </ul>
    </nav>
}

export default Navbar
