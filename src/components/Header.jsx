import { useEffect, useState } from 'react'
import './Header.css'
import { Navigate, useNavigate } from 'react-router-dom'

export function Header () {

    const navigate = useNavigate()

    return (
        <>
            <header className="header">
                <div className="header__search">
                    <a href='/home' className="header__logo">MIX MASTER</a>
                    <Profile />
                </div>
                <div className="header__nav">
                    <Nav />
                </div>
            </header>

        </>
    )
}

const Search = () => {

    const [searchTerm, setSearchTerm] = useState('')
    const [searchResults, setSearchResults] = useState([])

    const { VITE_API } = import.meta.env


    const handleInputChange = (e) => {
        const value = e.target.value
        setSearchTerm(value)
    }


    const handleSearch = async () => {
        
        try {
            const response = await fetch(VITE_API)

            if(!response.ok){
                throw new Error('Error al cargar los datos')
            }
            const data = await response.json()
            
            const filterCocktails = data.filter(cocktail => {

                const lowerSearchTerm = searchTerm.toLowerCase()
                return cocktail.name.toLowerCase().includes(lowerSearchTerm) 
            }
        )
        setSearchResults(filterCocktails)

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="search">
            
                <input
                    type="text" 
                    placeholder="Buscar cocktail" 
                    value={searchTerm} 
                    onChange={handleInputChange} 
                    className='search__input'
                />
            
            <button onClick={handleSearch}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" className='search__button' viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398l3.85 3.85a1 1 0 1 0 1.415-1.414l-3.85-3.85z"/>
                    <path fillRule="evenodd" d="M6.5 12a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11zm0 1a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13z"/>
                </svg>
            </button>
        </div>
    )
}

const Profile = () => {

    const navigate = useNavigate()
    
    const [showMenu, setShowMenu] = useState(false)

    const toggleMenu = () => {
        setShowMenu(!showMenu)
        console.log(showMenu)
    };

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
                    <li className="nav__li"><a href="/explorer" className='nav__a'>Explorer</a></li>

                    <li className="nav__li"><a href="/create" className='nav__a'>Create</a></li>
                </ul>
            </nav>
        </>
    )
}