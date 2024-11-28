import { Button, Tooltip, Drawer, Modal } from 'antd'
import { LogoutOutlined, MenuOutlined, LeftOutlined } from '@ant-design/icons'
import { useState, useContext } from 'react'
import { appContext } from '../context/appContext'
import { useLocation, useNavigate } from 'react-router-dom'
import { LogoutModal } from './Modals'

const NavBar = () => {

	const [menuOpen, setMenuOpen] = useState(false)
	const [confirmLogout, setConfirmLogout] = useState(false)
	const {userData} = useContext(appContext)
	const navigate = useNavigate()
	const location = useLocation()

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
							onClick={() => navigate(-1)}
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
				<Button variant='solid' color='primary' onClick={() => {navigate('/userAdministration'); setMenuOpen(false)}} >Administracion de usuarios</Button>
			</Drawer>

			<LogoutModal
				open={confirmLogout}
				onCancel={() => setConfirmLogout(false)}
			/>

		</div>
	)
}

export default NavBar