import React,{ useContext, useEffect, useState } from 'react'
import { Input, Button, Tooltip } from 'antd'
import {ApiOutlined } from '@ant-design/icons'
import { getAllUsers, getSearchedSDeactivatedUsers,getDeactivatedUsers } from '../client/client'
import { searchOnList, identificationList, userTypeList } from '../context/lists'
import { ReactivateUserModal as ReactivateUser } from '../components/Modals'
import { appContext } from '../context/appContext'

const UserReactivation = () => {
	const {contextHolder} = useContext(appContext)

	//Control de la UI
	const [showList, setShowList] = useState([])
	const [selectedItem, setSelectedItem] = useState('')

	//Control de modals
    const [reactivateModal, setReactivateModal] = useState(false)

	//Funciones
	useEffect(() => {
		getUserList()
	}, [])

	async function getUserList() {
		let res = await getDeactivatedUsers()
		console.log(res)
		setShowList(res.data)
	}

	async function getSearchedUserList(text) {
			let res
			if (text==""){
				res = await getDeactivatedUsers()
			}else{
				res = await getSearchedSDeactivatedUsers(text)
			}
			setShowList(res.data)
		}

	return(
		<div className='UserAdministration'>
			{contextHolder}
			<div className='searchBar' >
				<Input.Search placeholder='Ingrese cedula o nombre de algun usuario' onChange={(a) => {getSearchedUserList(a.target.value)}}/>
			</div>
			<div className='listContainer' >
				{ showList.map(item => (
					<div className='listItem' >
						<div className='info'>
							<h4>{searchOnList(identificationList, item.identificationType)}-{item.id} {item.name} {item.lastname} - {searchOnList(userTypeList, item.type)} </h4>
						</div>
						<div className='buttons'>
							<Tooltip onClick={() => {setSelectedItem(item); setReactivateModal(true)}} title='Reactivar'><Button shape='circle' variant='solid' color='primary' size='large' icon={<ApiOutlined />} /></Tooltip>
						</div>
					</div>
				)) }
			</div>

            <ReactivateUser 
                open={reactivateModal}
                onCancel={() => setReactivateModal(false)}
                updateList={() => getUserList()}
                id={selectedItem.id}
            />
		</div>
	)
}

export default UserReactivation