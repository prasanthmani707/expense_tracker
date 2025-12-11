import React from 'react'
import GoogleLoginButton from '../components/GoogleLoginButton'

const LoginPage = () => {
  return (
    <div className="min-h-screen flex item-center fustify-center bg-gray-300">
        <div>
            <GoogleLoginButton/>
        </div>
    </div>
  )
}

export default LoginPage
