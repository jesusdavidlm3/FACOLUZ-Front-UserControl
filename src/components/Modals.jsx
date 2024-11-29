import { Modal, Button, Input, InputNumber, Select, Form, Space } from 'antd'
import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { appContext } from '../context/appContext'
import * as lists from '../context/lists'
import { encrypt } from '../functions/hash'
import { createUser } from '../client/client'

export const LogoutModal = ({open, onCancel}) => {

	const {setUserData, setLogged} = useContext(appContext)
	const navigate = useNavigate()

	const logout = () => {
		setUserData('')
		setLogged(false)
		navigate('/login')
	}

	return(
		<Modal
			title='Cerrar sesion?'
			open={open}
			onCancel={onCancel}
			footer={[
				<Button variant='solid' color='danger' onClick={logout} >Cerrar sesion</Button>,
				<Button onClick={onCancel} variant='text' >Cancelar</Button>
			]}
		>
		</Modal>
	)
}

export const AddNewUserModal = ({open, onCancel, updateList}) => {

	const {messageApi} = useContext(appContext)
	const [idType, setIdType] = useState('')
	const [idNumber, setIdNumber] = useState('')
	const [name, setName] = useState('')
	const [lastname, setLastname] = useState('')
	const [password, setPassword] = useState('')
	const [userType, setUserType] = useState('')

	const submitNewUser = async () => {
		const data = {
			idType: idType,
			idNumber: `${idNumber}`,
			name: name,
			lastname: lastname,
			password: await encrypt(password),
			userType: userType
		}

		const res = await createUser(data)
		if(res.status == 200){
			messageApi.open({
				type: 'success',
				content: 'Usuario creado con exito'
			})
			updateList()
			onCancel()
		}else{
			messageApi.open({
				type: 'error',
				content: res.response.data
			})
		}
	}

	return(
		<Modal
			title='Agregar nuevo usuario'
			open={open} 
			onCancel={onCancel}
			destroyOnClose
			footer={[
				<Button onClick={onCancel} variant='link' color='danger'>Cancelar</Button>,
				<Button onClick={submitNewUser} variant='solid' color='primary'>Agregar</Button>
			]}
		>
			<div style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
				<Space.Compact style={{width: '100%'}}>
					<Select onChange={(e) => setIdType(e)} placeholder='Tipo de identificacion' style={{width: '50%'}} options={lists.identificationList.slice(0, 2)}/>
					<InputNumber onChange={(e) => setIdNumber(e)} placeholder='Numero' style={{width: '50%'}}/>
				</Space.Compact>
				<Space.Compact style={{width: '100%'}}>
					<Input onChange={(e) => setName(e.target.value)} placeholder='Nombre' style={{width: '50%'}}/>
					<Input onChange={(e) => setLastname(e.target.value)} placeholder='Apellido' style={{width: '50%'}}/>
				</Space.Compact>
				
				<Input.Password placeholder='Contraseña' onChange={(e) => setPassword(e.target.value)}/>
				<Select onChange={(e) => setUserType(e)} placeholder='Tipo de Usuario' options={lists.userTypeList}/>
			</div>
		</Modal>
	)
}