import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, Navigate } from 'react-router-dom'




export   const  PrivateRoutes =(props)=> {
    const state = useSelector(state=>state)
    return (
        <>
            {state.loggedIn ? <Outlet  /> : <Navigate to="/login" />};
        </>

    )

}

export  const LoggedInRoute=()=> {
    const state = useSelector(state=>state)
    return (
        <>
            {!state.loggedIn ? <Outlet  /> : <Navigate to="/home" />};
        </>

    )

}