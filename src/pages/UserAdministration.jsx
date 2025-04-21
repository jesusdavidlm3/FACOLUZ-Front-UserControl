import React, { useEffect, useState, useContext } from 'react'
import { Input, Button, Tooltip, List } from 'antd'
import {EditOutlined, UnlockOutlined ,DeleteOutlined } from '@ant-design/icons'
import { AddNewUserModal as AddNewUser, DeleteUserModal as DeleteUser, ChangePasswordModal as ChangePassword, ChangeUserTypeModal as ChangeUserType } from '../components/Modals'
import { getAllUsers, getSearchedUsers } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'
import { appContext } from '../context/appContext'

const UserAdministration = () => {
	const {contextHolder} = useContext(appContext)

	//Control de la UI
	const [showList, setShowList] = useState([])
	const [selectedItem, setSelectedItem] = useState('')

	//Control de modals
	const [addNewUserModal, setNewUserModal] = useState(false)
	const [deleteUserModal, setDeleteUserModal] = useState(false)
	const [changePasswordModal, setChangePasswordModal] = useState(false)
	const [changeTypeModal, setChangeTypeModal] = useState(false)

	//Funciones
	useEffect(() => {
		getUserList()
	}, [])

	async function getUserList() {
		let res = await getAllUsers()
		setShowList(res.data)
	}
	async function getSearchedUserList(text) {
		let res
		if (text==""){
			res = await getAllUsers()
		}else{
			res = await getSearchedUsers(text)
		}
		setShowList(res.data)
	}

	return(
		<div className='UserAdministration Page'>
			{contextHolder}
			<div className='searchBar' >
				<Input.Search placeholder='Ingrese cedula o nombre de algun usuario' onChange={(a) => {getSearchedUserList(a.target.value)}}/>
				<Button variant='solid' color='primary' onClick={() => setNewUserModal(true)}>Agregar usuario</Button>
			</div>
			<div className='listContainer' >
				<List bordered className='mainList'>
					{ showList.map(item => (
						<List.Item className='listItem' key={item.id}>
							<div className='info'>
								<h4>{searchOnList(identificationList, item.identificationType)}-{item.id} {item.name} {item.lastname} - {searchOnList(userTypeList, item.type)} </h4>
							</div>
							<div className='buttons'>
								<Tooltip onClick={() => {setSelectedItem(item); setChangePasswordModal(true)}} title='Cambiar contraseña'><Button shape='circle' variant='solid' color='primary' size='large' icon={<UnlockOutlined />} /></Tooltip>
								<Tooltip onClick={() => {setSelectedItem(item); setChangeTypeModal(true)}} title='Cambiar tipo'><Button shape='circle' variant='solid' color='primary' size='large' icon={<EditOutlined />} /></Tooltip>
								<Tooltip onClick={() => {setSelectedItem(item); setDeleteUserModal(true)}} title='Eliminar'><Button shape='circle' variant='solid' color='danger' size='large' icon={<DeleteOutlined />} /></Tooltip>
							</div>
						</List.Item>
					)) }
				</List>
			</div>

			<AddNewUser
				open={addNewUserModal}
				onCancel={() => setNewUserModal(false)}
				updateList={() => getUserList()}
			/>

			<DeleteUser
				open={deleteUserModal}
				onCancel={() => setDeleteUserModal(false)}
				updateList={() => getUserList()}
				id={selectedItem.id}
			/>

			<ChangePassword 
				open={changePasswordModal}
				onCancel={() => setChangePasswordModal(false)}
				info={selectedItem}
			/>

			<ChangeUserType
				open={changeTypeModal}
				onCancel={() => setChangeTypeModal(false)}
				info={selectedItem}
			/>
		</div>
	)
}

export default UserAdministration