import { useEffect, useState } from 'react'
import './Home.css'
import { Navigate, useNavigate } from 'react-router-dom'
import { Header } from './Header.jsx'

export function Home() {

    const navigate = useNavigate()

    useEffect(() => {

        const buscar = localStorage.getItem('login')
        console.log(buscar)

        if (!buscar) {
            navigate('/')
        } else {

        }
    }, [])

    return (

        <>
            <Header />
        </>
    )
}


