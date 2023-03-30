import axiosInstance from "@/src/services/axiosInstance";

const getRadio = {
	getAll(){
		const url = 'public/v1/composite/get-radio/';
		return axiosInstance.get(url)
	}
}
export default getRadio;
