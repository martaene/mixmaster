import { useEffect, useState } from 'react'
import './Header.css'
import { Link, Navigate, useNavigate } from 'react-router-dom'

export function Header () {

    const navigate = useNavigate()

    return (
        <>
            <header className="header">
                <div className="header__search">
                    <Link to='/home' className="header__logo">MIX MASTER</Link>
                    <Profile />
                </div>
                <div className="header__nav">
                    <Nav />
                </div>
            </header>

        </>
    )
}


const Profile = () => {

    const navigate = useNavigate()
    
    const [showMenu, setShowMenu] = useState(false)


    {//Función para mostrar un menu desplegable

    }
    const toggleMenu = () => {
        setShowMenu(!showMenu)
        console.log(showMenu)
    };

    {//Función para ocultar un menu desplegable
        
    }
    const handleLogout = () => {
        localStorage.removeItem('login')
        navigate('/')
    }

    return (
        <>
            <div className="profile">
                <button onClick={toggleMenu} className="profile__button">Perfil</button>
                {showMenu && (
                    <div className="profile__dropdown">
                        <a href="#" className='profile__a' onClick={handleLogout}>Cerrar Sesión</a>
                    </div>
                )}
            </div>
        </>
    )
}

const Nav = () => {

    const navigate = useNavigate()

    return (
        <>
            <nav className="nav">
                <ul className="nav__ul">
                    <li className="nav__li"><Link to="/explorer" className='nav__a'>Explorer</Link></li>

                    <li className="nav__li"><Link to="/create" className='nav__a'>Create</Link></li>
                </ul>
            </nav>
        </>
    )
}