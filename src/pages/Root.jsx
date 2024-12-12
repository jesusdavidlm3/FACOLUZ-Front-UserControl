import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useContext } from 'react'
import { appContext } from '../context/appContext'
import NavBar from '../components/NavBar'
import React from 'react'

const Root = () => {

	const navigate = useNavigate()
	const location = useLocation()
	const { logged, contextHolder } = useContext(appContext)

	useEffect(() => {
		navigate('/login')
	}, [])

	return(
		<>
			{ contextHolder }
			{ logged && <NavBar/>}
			<Outlet/>
		</>
	)	
}

export default Root