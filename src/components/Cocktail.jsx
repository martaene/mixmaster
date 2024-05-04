import { useEffect, useState } from 'react'
import { Header } from './Header'
import { Navigate, useNavigate, useParams } from 'react-router-dom'
import './Cocktail.css'

export function Cocktail() {

    const [cocktail, setCocktail] = useState({ ingredients: [] })
    const { id } = useParams()
    const navigate = useNavigate()

     {//Comprueba que las credenciales esten guardadas en localStorage

     }
    useEffect(() => {

        const buscar = localStorage.getItem('login')
        console.log(buscar)

        {// Si no estan guardadas redirige a Login

        }
        if (!buscar) {
            navigate('/')
        } else {

        }
    }, [])

    {//LLamada a la API para mostrar el cocktail con ese id

    }

    useEffect(() => {
        const getCocktail = async () => {
            try {
                const response = await fetch(`https://apimixmaster.vercel.app/cocktails/id/${id}`)
                if (response.ok) {
                    const data = await response.json()
                    setCocktail(data)
                }
            } catch (error) {
                console.error('Error al cargar el cóctel desde la API:', error)
            }
        }

        getCocktail()
    }, [id])

   { //Función para eliminar un cocktail de la API mediante un .delete
    
   }
    const handleDelete = async () => {


        let controller = new AbortController()
        let options = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            signal: controller.signal
        }
        const response = await fetch(`https://apimixmaster.vercel.app/cocktails/id/${id}`, options)

        if (response.ok) {
            alert('Cocktail eliminado con éxito')
            navigate('/explorer')
        }

    }


    return (
        <>
            <Header />
            <div className="info">

                <img src={cocktail.img} alt={cocktail.name} className='info__img' />

                <div className="info__detail">
                    <h2 className='info__h2'>{cocktail.name}</h2>
                    <h3 className='info__h3'>Steps:</h3>
                    <p className='info__p'>{cocktail.steps}</p>
                    <h3 className='info__h3'>Ingredients:</h3>
                    <ul className='info__ul'>
                        {cocktail.ingredients.map((eachIngr, index) => (
                            <li key={index} className='info__li'>{eachIngr}</li>
                        ))}
                    </ul>
                    <div className='info__buts'>
                        <button onClick={handleDelete} className='info__button delete'>Eliminar</button>
                        <a href={`/edit/${cocktail._id}`} className='info__button edit'>Editar</a>
                    </div>
                </div>
            </div>
        </>
    )
}