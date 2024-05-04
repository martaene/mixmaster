import { useState , useEffect } from 'react'
import './Create.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from './Header'


export function Create () {

    const navigate = useNavigate()

   { //Comprueba que las credenciales esten guardadas en localStorage

   }
    useEffect(() => {

        const buscar = localStorage.getItem('login')
        console.log(buscar)

       { // Si no estan guardadas redirige a Login

       }
        if (!buscar) {
            navigate('/')
        } else {

        }
    }, [])
    

    return(
        <>
            <Header />
            <Form />
        </>
    )
}


const Form = () => {

    const [ name , setName ] = useState('')
    const [ steps , setSteps ] = useState('')
    const [ ingredients , setIngredients ] = useState('') 

    const { VITE_API } = import.meta.env

    {//Función poder crear un nuevo cocktail en la API mediante un .post

    }
    const formHandler = async (e) => {
        e.preventDefault()

        {//Convertir los ingredients introducidos en un array
        }
        const ingredientsArray = ingredients.split(',').map(ingredient => {
            {// Trim para eliminar espacios en blanco

            }
            ingredient = ingredient.trim();
        
            {// Convertir la primera letra a mayúscula y el resto a minúscula

            }
            return ingredient.charAt(0).toUpperCase() + ingredient.slice(1).toLowerCase();
        });
        
        let controller = new AbortController()
        let options = {
            method : 'POST',
            headers: {
                'Content-Type': 'application/json' 
            },
            body : JSON.stringify({name , steps, ingredients : ingredientsArray }),
            signal: controller.signal
        }
        const response = await fetch( VITE_API , options)

        if(response.ok) {
            try {
                alert('Cocktail creado con éxito')
                setName('')
                setSteps('')
                setIngredients('')
            } catch (error) {
                console.error(error)
                alert('Error al crear el cocktail')
            }
        }
    }

    {//Funciones para recoger los datos recogidos en los input
        
    }
    const handleNameChange = (e) => {
        setName(e.target.value)
    }

    const handleStepsChange = (e) => {
        setSteps(e.target.value)
    }

    const handleIngredientsChange = (e) => {
        setIngredients(e.target.value)
    }

    return(
        <>
        <div className="create">
            <div className="create__text">
            <h2 className="create__h2">¡Crea un nuevo cocktail!</h2>
            <p className="create__p">Ingresa el nombre, los pasos y los ingredientes del cóctel que deseas agregar a nuestra colección. ¡Deja volar tu imaginación y comparte tu receta con la comunidad de MixMaster!</p>
            </div>
        <form action="#" method='get' onSubmit={formHandler} className='create__form'>
                <input type="text" value={name} onChange={handleNameChange} placeholder='Name' className='create__input name'/>
                <input type="text" value={ingredients} onChange={handleIngredientsChange} placeholder='Ingredientes' className='create__input ingredients'/>
                <input type="textarea" value={steps} onChange={handleStepsChange} placeholder='Steps' className='create__input steps'/>
                <input type="submit" placeholder='Guardar' className='create__submit'/>
            </form>
            </div>
        </>
    )
}