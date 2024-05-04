import './Explorer.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Header } from './Header.jsx'

export function Explorer() {

    const navigate = useNavigate()

    useEffect(() => {
        //Comprueba que las credenciales esten guardadas en localStorage
        const buscar = localStorage.getItem('login')
        console.log(buscar)
        
        // Si no estan guardadas redirige a Login
        if (!buscar) {
            navigate('/')
        } else {

        }
    }, [])

    return (
        <>
            <Header />
            <CocktailGrid />
        </>
    )
}

const CocktailGrid = () => {

    const [cocktails, setCocktails] = useState([])

    const { VITE_API } = import.meta.env

    useEffect(() => {
        // Función para cargar los cocktails desde la API de Mongo
        const fetchCocktails = async () => {
            try {
                const response = await fetch(VITE_API)
                if (response.ok) {
                    const data = await response.json()
                    setCocktails(data)
                } else {
                    console.error('Error al cargar los cocktails desde la API')
                }
            } catch (error) {
                console.error('Error al cargar los cocktails desde la API:', error)
            }
        }

        fetchCocktails()
    }, [])

    return (
        <div className="cocktail">
            {cocktails.map((cocktail, index) => (
                <div key={index} className="cocktail__item">
                    <a href={`/cocktail/${cocktail._id}`} className='cocktail__a'>
                        <img src={cocktail.img} alt={cocktail.name} className="cocktail__img" />
                        <div className="cocktail__details">
                            <h3 className="cocktail__h3">{cocktail.name}</h3>
                            <ul className='cocktail__ul'>
                                {cocktail.ingredients.map((eachIngr, index) => (
                                    <li key={index} className='cocktail__li'>{eachIngr}</li>
                                ))}
                            </ul>
                        </div>
                    </a>
                </div>
            ))}
        </div>
    );
};


