import getPlaylistDetail from "@/src/services/getPlaylistDetail";
import React from "react";
import { Box } from "theme-ui";

type Props = {
	data: Array<object>
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPlaylistDetail.getAll(query.id);
			return {
				props: {
					data: res.data,
				}
			};
		}

	} catch (error) {
		console.log(error)
	}
}
const PlaylistDetail = ({ data }: Props) => {
	console.log(data)
	return(
		<Box></Box>
	);
}
export default PlaylistDetail;
