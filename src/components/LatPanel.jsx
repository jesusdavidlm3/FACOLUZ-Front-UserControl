import React from 'react'
import { useState, useContext } from 'react'
import {Button, Tooltip} from 'antd'
import {HomeFilled, LogoutOutlined, UserOutlined} from '@ant-design/icons'
import { routerContext } from '../context/routerContext'
import { appContext } from '../context/appContext'
import { LogoutModal } from './Modals'
import Logo_Facoluz from '../assets/Logo_FacoLuz.png'
import Logo_LUZ from '../assets/Logo_LUZ.png'

const LatPanel = () => {
    const [confirmLogout, setConfirmLogout] = useState(false)
    const {userData} = useContext(appContext)
    const {view, setView} = useContext(routerContext)

    return(
        <div className='LatPanel'>
            <div className='info'>
                <img src={Logo_LUZ} draggable={false} className='luzLogo'/>
                <h1>{userData.name} {userData.lastname}</h1>
            </div>

            <div className='buttons'>
                <Button size={'large'} onClick={()=>{setView('Home')}} variant='solid' icon={<HomeFilled />}> Inicio</Button> 
                <Button size={'large'} onClick={()=>{setView('UserAdministration')}} variant='solid' icon={<UserOutlined />}> Administracion de usuarios</Button> 
                <Button size={'large'} onClick={()=>{setView('UserReactivation')}} variant='solid' icon={<HomeFilled />}> Usuario inactivos</Button> 
                <Button size={'large'} onClick={()=>{setView('ChangeLogs')}} variant='solid' icon={<HomeFilled />}> Registro de cambios</Button> 
                <Button size={'large'} onClick={()=>{setConfirmLogout(true)}} variant='solid' icon={<LogoutOutlined />}> Cerrar sesion</Button> 
            </div>

            <img src={Logo_Facoluz} draggable={false} className='facoLogo'/>

            <LogoutModal open={confirmLogout} ocCancel={()=>setConfirmLogout(false)} /> 
        </div>
    )
}

export default LatPanel