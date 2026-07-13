import React, { useContext, useState } from 'react'
import { AuthContext } from '../../context/AuthProvider'

const Login = () => {

    const { login } = useContext(AuthContext)

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [submitting, setSubmitting] = useState(false)

    const submitHandler = async (e) => {
        e.preventDefault()
        setError('')
        setSubmitting(true)

        const result = await login(email, password)

        setSubmitting(false)

        if (!result.success) {
            setError(result.message)
            return
        }

        setEmail('')
        setPassword('')
    }

    return (
        <div className='flex h-screen w-screen items-center justify-center'>
            <div className='border-2 rounded-xl border-emerald-600 p-20'>
                <form
                    onSubmit={submitHandler}
                    className='flex flex-col items-center justify-center'
                >
                    <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full placeholder:text-gray-400' type="email" placeholder='Enter your email'
                    />
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className='outline-none bg-transparent border-2 border-emerald-600 font-medium text-lg py-2 px-6 rounded-full mt-3 placeholder:text-gray-400' type="password" placeholder='Enter password' />

                    {error && (
                        <p className='text-red-500 text-sm mt-3'>{error}</p>
                    )}

                    <button
                        disabled={submitting}
                        className='mt-7 text-white border-none outline-none hover:bg-emerald-700 font-semibold bg-emerald-600 text-lg py-2 px-8 w-full rounded-full disabled:opacity-60'>
                        {submitting ? 'Logging in...' : 'Log in'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Login
