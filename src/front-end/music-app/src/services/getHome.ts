import axiosInstance from "@/src/services/axiosInstance";

const getHome = {
	getAll(){
		const url = 'public/v1/composite/get-home/';
		return axiosInstance.get(url)
	}
}
export default getHome;
