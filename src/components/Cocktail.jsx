import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './Cocktail.css'

export function Cocktail () {

    const [ cocktail, setCocktail] = useState({ ingredients: [] })
    const { id } = useParams()
    const navigate = useNavigate()

    useEffect(() => {

        const buscar = localStorage.getItem('login')
        console.log(buscar)

        if (!buscar) {
            navigate('/')
        } else {

        }
    }, [])

    useEffect (() => {
        const getCocktail = async () => {
            try {
                const response = await fetch(`https://apimixmaster.vercel.app/cocktails/id/${id}`)
                if(response.ok){
                    const data = await response.json()
                    setCocktail(data)
                }
            } catch (error) {
                console.error('Error al cargar el cóctel desde la API:', error)
            }
        }

        getCocktail()
    } , [id])

    const handleDelete = async () => {


        let controller = new AbortController()
        let options = {
            method : 'DELETE',
            headers: {
                'Content-Type': 'application/json' 
            },
            signal: controller.signal
        }
        const response = await fetch(`https://apimixmaster.vercel.app/cocktails/id/${id}` , options)

        if(response.ok){
            alert('Cocktail eliminado con éxito')
            navigate('/explorer')
        }
        
    }


    return(
        <>
            <Header />
            <div className="cocktail-detail">
            <div className="cocktail-detail__image">
                <img src="" alt={cocktail.name} />
            </div>
            <div className="cocktail-detail__info">
                <h2>{cocktail.name}</h2>
                <h3>Steps:</h3>
                <p>{cocktail.steps}</p>
                <h3>Ingredients:</h3>
                <ul>
                    {cocktail.ingredients.map((eachIngr, index) => (
                        <li key={index}>{eachIngr}</li>
                    ))}
                </ul>
                <button onClick={handleDelete}>Eliminar</button>
            </div>
        </div>
        </>
    )
}