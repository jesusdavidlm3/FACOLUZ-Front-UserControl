import { Button, Tooltip, Drawer, Modal } from 'antd'
import { LogoutOutlined, MenuOutlined, LeftOutlined } from '@ant-design/icons'
import { useState, useContext } from 'react'
import { appContext } from '../context/appContext'
import { LogoutModal } from './Modals'
import React from 'react'
import { routerContext } from '../context/routerContext'

const NavBar = () => {

	const [menuOpen, setMenuOpen] = useState(false)
	const [confirmLogout, setConfirmLogout] = useState(false)
	const {userData} = useContext(appContext)
	const {setView} = useContext(routerContext)

	return(
		<div className='NavBar'>
			<div className='info'>
				<h1>Bienvenido {userData.name} {userData.lastname} </h1>
			</div>
			<div className='buttons'>
				{ location.pathname != '/home' && (
					<Tooltip title='Volver'>
						<Button
							shape='circle'
							// onClick={() => navigate(-1)}
							variant='solid'
							icon={<LeftOutlined />}
							size='large' 
						/>
					</Tooltip>
				) }
				<Tooltip title='Menu'>
					<Button
						shape='circle'
						onClick={() => setMenuOpen(true)}
						variant='filled'
						icon={<MenuOutlined/>}
						size='large' 
					/>
				</Tooltip>
				<Tooltip title='Cerrar sesion'>
					<Button
						shape='circle'
						onClick={() => setConfirmLogout(true)}
						icon={<LogoutOutlined/>}
						variant='solid'
						color="danger"
						size='large'
					/>
				</Tooltip>
			</div>

			<Drawer title='Menu' open={menuOpen} onClose={() => setMenuOpen(false)} >
				<div style={{display: 'flex', flexDirection: 'column', alignItems: 'start', gap: '5px'}}>
					<Button variant='solid' color='primary' onClick={() => {setView('UserAdministration'); setMenuOpen(false)}} >Administracion de usuarios</Button>
					<Button variant='solid' color='primary' onClick={() => {setView('UserReactivation'); setMenuOpen(false)}} >Reactivacion de usuarios</Button>
					<Button variant='solid' color='primary' onClick={() => {setView('ChangeLogs'); setMenuOpen(false)}} >Registro de cambios</Button>
				</div>
			</Drawer>

			<LogoutModal
				open={confirmLogout}
				onCancel={() => setConfirmLogout(false)}
			/>

		</div>
	)
}

export default NavBar