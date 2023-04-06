import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import getArtistDetail from "@/src/services/getArtistDetail";
import React from "react";
type Props = {
	data: any,
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getArtistDetail.getAll(query.id);
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
const ArtistDetail = ({ data }: Props) => {
	console.log(data);
	return(
		<ReponsiveContainer></ReponsiveContainer>
	);
}
export default ArtistDetail;
