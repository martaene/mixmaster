import { useState , useEffect } from 'react'
import './Create.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from './Header'


export function Create () {

    const navigate = useNavigate()

    useEffect(() => {

        const buscar = localStorage.getItem('login')
        console.log(buscar)

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

    const formHandler = async (e) => {
        e.preventDefault()

        const ingredientsArray = ingredients.split(',').map(ingredient => {
            // Trim para eliminar espacios en blanco
            ingredient = ingredient.trim();
        
            // Convertir la primera letra a mayúscula y el resto a minúscula
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
        <form action="#" method='get' onSubmit={formHandler}>
                <input type="text" value={name} onChange={handleNameChange} placeholder='Name'/>
                <input type="textarea" value={steps} onChange={handleStepsChange} placeholder='Steps' />
                <input type="text" value={ingredients} onChange={handleIngredientsChange} placeholder='Ingredientes' />
                <input type="submit" placeholder='Enviar'/>
            </form>
        </>
    )
}