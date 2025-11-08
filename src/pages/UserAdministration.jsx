import React, { useEffect, useState, useContext } from 'react'
import { Input, Button, Tooltip, List, Divider } from 'antd'
import {EditOutlined, UnlockOutlined ,DeleteOutlined } from '@ant-design/icons'
import { AddNewUserModal as AddNewUser, DeleteUserModal as DeleteUser, ChangePasswordModal as ChangePassword, ChangeUserTypeModal as ChangeUserType } from '../components/Modals'
import { getAllUsers, getSearchedUsers } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'
import { appContext } from '../context/appContext'
import Pagination from '../components/Pagination'

const UserAdministration = () => {
	const {contextHolder} = useContext(appContext)

	//Control de la UI
	const [showList, setShowList] = useState([])
	const [selectedItem, setSelectedItem] = useState('')
	const [page, setPage] = useState(1)

	//Control de modals
	const [addNewUserModal, setNewUserModal] = useState(false)
	const [deleteUserModal, setDeleteUserModal] = useState(false)
	const [changePasswordModal, setChangePasswordModal] = useState(false)
	const [changeTypeModal, setChangeTypeModal] = useState(false)

	//Funciones
	useEffect(() => {
		getContent()
	}, [page])

	async function getContent(){
		const searchInput = document.getElementById("searchInput").value
		let res
		if(searchInput == ""){
			res = await getAllUsers(page)
		}else{
			res = await getSearchedUsers(searchInput, page)
		}
		setShowList(res.data)
	}

	return(
		<div className='UserAdministration Page'>
			<Divider className='PageTitle'><h1>Administracion de usuarios</h1></Divider>
			{contextHolder}
			<div className='searchBar' >
				<Input.Search placeholder='Ingrese cedula o nombre de algun usuario' id='searchInput' onChange={() => getContent()}/>
				<Button variant='solid' color='primary' onClick={() => setNewUserModal(true)}>Agregar usuario</Button>
			</div>
			<div className='listContainer Content' >
				<List bordered className='mainList' size='small'>
					{ showList.map(item => (
						<List.Item className='listItem' key={item.id}>
							<div className='info'>
								<h3>{searchOnList(identificationList, item.identificationType)}-{item.id} {item.name} {item.lastname} - {searchOnList(userTypeList, item.type)} </h3>
							</div>
							<div className='buttons'>
								<Tooltip onClick={() => {setSelectedItem(item); setChangePasswordModal(true)}} title='Cambiar contraseña'><Button shape='circle' variant='solid' color='primary' size='large' icon={<UnlockOutlined />} /></Tooltip>
								<Tooltip onClick={() => {setSelectedItem(item); setChangeTypeModal(true)}} title='Cambiar tipo'><Button shape='circle' variant='solid' color='primary' size='large' icon={<EditOutlined />} /></Tooltip>
								<Tooltip onClick={() => {setSelectedItem(item); setDeleteUserModal(true)}} title='Eliminar'><Button shape='circle' variant='solid' color='danger' size='large' icon={<DeleteOutlined />} /></Tooltip>
							</div>
						</List.Item>
					)) }
					<Pagination page={page} setPage={setPage}/>
				</List>
			</div>

            <div className='EmptyFooter'/>


			<AddNewUser
				open={addNewUserModal}
				onCancel={() => setNewUserModal(false)}
				updateList={() => getContent()}
			/>

			<DeleteUser
				open={deleteUserModal}
				onCancel={() => setDeleteUserModal(false)}
				updateList={() => getContent()}
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