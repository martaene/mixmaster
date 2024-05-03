import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

export function Login() {

    const navigate = useNavigate()
    const user = useRef()
    const pass = useRef()

    const formSubmit = (e) => {
        e.preventDefault()

        //Recoger valor de los input
        const { current: userInput } = user
        const { current: passInput } = pass

        //comparar valores (fetch + API Express)
        if ((userInput.value === 'admin' && passInput.value === 'admin') || (userInput.value === 'edu' && passInput.value === 'thebest') || (userInput.value === 'cei' && passInput.value === 'cei')) {

            localStorage.setItem("login", "true")
            navigate('/home')
        } else {
            console.log('No puedes entrar :)')
        }
    }

    return (
        <>

            <div className='login'>
                <div className='login__container'>
                    <h2 className='login__h2'>Login</h2>

                    <form className='form' onSubmit={formSubmit}>

                        <input type="text" className='form__input' name='user' placeholder='Usuario' ref={user} />
                        <input type="password" className="form__input" name='pass' placeholder='Contraseña' ref={pass} />
                        <input type="submit" className='form__submit' value="iniciar" />
                    </form>
                </div>
            </div>
        </>
    )
}