import { Form, Input, Button } from 'antd'
import { useContext, useState } from 'react'
import { appContext } from '../context/appContext' 
import { encrypt } from '../functions/hash'
import { login } from '../client/client'
import { useNavigate } from 'react-router-dom'

const Login = () => {

	const navigate = useNavigate()
	const { messageApi, setuserData, setLogged } = useContext(appContext)
	const [loading, setLoading] = useState(false)

	const submitLogin = async () => {
		setLoading(true)
		const identification = document.getElementById('identification').value
		const password = document.getElementById('password').value

		const data = {
			identification: identification,
			passwordHash: await encrypt(password)
		}
		console.log(data)
		let res = await login(data)
		if(res.status == 200){
			setLogged(true)
			navigate('/home')
		}else{
			messageApi.open({
				type: 'error',
				content: res.response.data
			})
			setLoading(false)
		}
		console.log(res)
	}

	return(
		<div className='Login'>
			<Form disabled={loading} className='loginForm'>
				<h1>Modulo administrativo</h1>
				<h2>Iniciar sesion</h2>
				<Form.Item name='identification'>
					<Input placeholder='Identificacion'disabled={loading} />
				</Form.Item>
				<Form.Item name='password'>
					<Input.Password placeholder='Contraseña'disabled={loading} />
				</Form.Item>

				<Button onClick={submitLogin}disabled={loading} >Iniciar Sesion</Button>
			</Form>
		</div>
	)
}

export default Login