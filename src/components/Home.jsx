import { useEffect, useState } from 'react'
import './Home.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from './Header.jsx'

export function Home() {

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

    return (

        <>
            <Header />
            <Welcome />
        </>
    )
}

const Welcome = () => {

    return (
        <>
            <div className='welcome'>
                <img src="/assets/home.webp" alt="Foto home" className='welcome__img'/>

                <div className='text'>
                    <h2 className='welcome__h2'>
                        BIENVENIDO A MIX MASTER
                    </h2>
                    <p className="welcome__p">Explora nuevas recetas, cerea tus propios cocktails y comparte tu pasión por las buenas bebidas</p>

                    {/*Redirige a la página de todos los cocktails
                    */}
                    <a href="/explorer" className="welcome__a">Ver cocktails</a>
                </div>
            </div>
        </>
    )
}


