import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignOut = () => {
    const navigator = useNavigate()
    const [click, setClick] = useState<boolean>(false)
    const sighOut = () => {
        setClick(true)
        window.localStorage.removeItem('my-auth-token')
        navigator('/')
        setClick(false)
    }
    return (
        <div className='sign-out-container'>
            <h1 onClick={sighOut}>Sign Out{click && '...'}</h1>
        </div>
    )
}

export default SignOut
