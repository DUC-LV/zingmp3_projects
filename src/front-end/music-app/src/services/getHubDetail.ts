import axiosInstance from "@/src/services/axiosInstance";

const getHubDetail = {
	getAll(id:number){
		const url = `hub/${id}/`;
		return axiosInstance.get(url)
	}
}
export default getHubDetail;
