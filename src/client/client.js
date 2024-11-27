import { httpMethods } from './httpMethods'

const http = new httpMethods()

export async function login(data){
	return http.post('api/login', data)
}