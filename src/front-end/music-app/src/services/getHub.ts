import axiosInstance from "@/src/services/axiosInstance";

const getHub = {
	getAll(){
		const url = 'public/v1/composite/hub/';
		return axiosInstance.get(url)
	}
}
export default getHub;
