import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const signOut = () => {
    const navigator = useNavigate()
    useEffect(() => {
        window.localStorage.clear
        navigator('/')
    }, [])
    return (
        <div className='sign-out-container'>
            <h1>Sign Out...</h1>
        </div>
    )
}

export default signOut
