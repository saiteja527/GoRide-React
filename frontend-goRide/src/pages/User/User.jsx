import React from 'react'
import UserUi from '../../Components/UserUi/UserUi'
import { ToastContainer } from 'react-toastify'

const User = () => {
    return (
        <div className='user'>
            <ToastContainer/>
            <UserUi />
        </div>
    )
}

export default User
