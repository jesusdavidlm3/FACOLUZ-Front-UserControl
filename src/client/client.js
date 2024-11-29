import { httpMethods } from './httpMethods'

const http = new httpMethods()
let token

export async function login(data){
	const res = await http.post('api/login', null, data)
	if(res.status == 200){
		token = res.data.jwt
	}
	return res
}

export async function getAllUsers() {
	return await http.get('api/getAllUsers', token, null)
}

export async function createUser(data) {
	return await http.post('api/createUser', token, data)
}

export async function deleteUser(id){
	return await http.delete('api/deleteUser', token, id)
}