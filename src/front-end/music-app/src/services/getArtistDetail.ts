import axiosInstance from "@/src/services/axiosInstance";

const getArtistDetail = {
	getAll(id:number){
		const url = `artist/${id}/`;
		return axiosInstance.get(url)
	}
}
export default getArtistDetail;
