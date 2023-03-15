import axiosInstance from "@/src/services/axiosInstance";

const getPlaylistDetail = {
	getAll(id:number){
		const url = `playlist/${id}/`;
		return axiosInstance.get(url)
	}
}
export default getPlaylistDetail;
