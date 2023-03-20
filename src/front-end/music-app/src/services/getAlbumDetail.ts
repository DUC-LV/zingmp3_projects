import axiosInstance from "@/src/services/axiosInstance";

const getAlbumDetail = {
	getAll(id:number){
		const url = `album/${id}/`;
		return axiosInstance.get(url)
	}
}
export default getAlbumDetail;
