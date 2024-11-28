import { useEffect, useState } from 'react'
import { Input, Button, Tooltip } from 'antd'
import {EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { AddNewUserModal as AddNewUser } from '../components/Modals'
import { getAllUsers } from '../client/client'

const UserAdministration = () => {

	const [showList, setShowList] = useState(['hola', 'hola Tambien'])
	const [addNewUserModal, setNewUserModal] = useState(false)

	useEffect(() => {
		getUserList()
	}, [])

	async function getUserList() {
		let res = await getAllUsers()
		console.log(res)
	}

	return(
		<div className='UserAdministration'>
			<div className='searchBar' >
				<Input.Search placeholder='Ingrese cedula o nombre de algun usuario' />
				<Button variant='solid' color='primary' onClick={() => setNewUserModal(true)}>Agregar usuario</Button>
			</div>
			<div className='listContainer' >
				{ showList.map(item => (
					<div className='listItem' >
						<div className='info'>
							<h4>V-00.000.000 Nombre Apellido</h4>
						</div>
						<div className='buttons'>
							<Tooltip title='Editar'><Button shape='circle' variant='solid' color='primary' size='large' icon={<EditOutlined />} /></Tooltip>
							<Tooltip title='Eliminar'><Button shape='circle' variant='solid' color='danger' size='large' icon={<DeleteOutlined />} /></Tooltip>
						</div>
					</div>
				)) }
			</div>

			<AddNewUser
				open={addNewUserModal}
				onCancel={() => setNewUserModal(false)}
			/>
		</div>
	)
}

export default UserAdministration