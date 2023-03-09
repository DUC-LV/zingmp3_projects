import axios from 'axios';
const baseURL = 'http://127.0.0.1:8000/';

let axiosInstance = axios.create({
	baseURL: baseURL,
	timeout: 500,
	headers: {
		Authorization: '*',
		'Content-Type': 'application/json',
		accept: 'application/json',
		'Access-Control-Allow-Origin': '*',
		'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS'
	},
	// proxy: {
	// 	host: 'proxy-tct:3128',
	// 	port: 3000,
	// }
});
export default axiosInstance;
