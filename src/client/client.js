import { httpMethods } from './httpMethods'

const http = new httpMethods()
let token

export async function login(data){
	const res = await http.post('api/login', data, null)
	if(res.status == 200){
		token = res.data.jwt
	}
	return res
}

export async function getAllUsers() {
	return await http.get('api/getAllUsers', null, token)
}