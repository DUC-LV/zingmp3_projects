import axiosInstance from "@/src/services/axiosInstance";

const getCategoryVideo = {
	getAll(id:number){
		const url = `category-video/${id}`;
		return axiosInstance.get(url)
	}
}
export default getCategoryVideo;
