import { Link, useNavigate, useParams } from 'react-router-dom'
import './Edit.css'
import { Header } from './Header'
import { useEffect, useState } from 'react'

export function Edit() {

   const { id } = useParams()
   const [cocktail, setCocktail] = useState([])
   const [ name , setName ] = useState(cocktail.name)
    const [ steps , setSteps ] = useState(cocktail.steps)

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
      }
   }, [navigate])


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


{//Funcion para actualizar la informacion del cocktail mediante .put

}
   const handleEdit = async (e) => {
      e.preventDefault()

      let controller = new AbortController()
      let options = {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({cocktail, name, steps}),
          signal: controller.signal
      }
   
      try {
         const response = await fetch(`https://apimixmaster.vercel.app/cocktails/id/${id}`, options)
   
         if (response.ok) {
            alert('Cocktail editado con éxito')
            navigate(`/cocktail/${id}`)
         }
      } catch (error) {
         console.error('Error al editar el cóctel:', error)
      }
   }

   {//Función que recoge los datos escritos en el input
      
   }
   const handleNameChange = (e) => {
      setName(e.target.value)
  }

  const handleStepsChange = (e) => {
      setSteps(e.target.value)
  }

//   const handleIngredientsChange = (e) => {
//       setIngredients(e.target.value)
//   }

  console.log(cocktail)

   return (
      <>
         <Header />
         <div className="edit">
            <img src={cocktail.img} alt={cocktail.name} className='edit__img' />

            <form onSubmit={handleEdit} className='edit__form'>

               <input type="text" name="name" value={name} onChange={handleNameChange}  className='edit__input name' />

               <input type="textarea" name="steps" value={steps} onChange={handleStepsChange}  className='edit__input steps' />

               <input type="submit"  className='edit__button save'/>

               <div className='edit__buts'>
                  <Link type="button" to={`/cocktail/${id}`} className='edit__button cancel'>Cancelar</Link>
               </div>
            </form>
         </div>
      </>
   )
}
