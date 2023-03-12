import React from "react";
import { Box } from "theme-ui";

type Props = {
	data: Array<object>
}
export async function getServerSideProps({ query }: any) {
	console.log(query?.id);
	return {
		props: {
			data: [],
		}
	}
}
const PlaylistDetail = ({ data }: Props) => {
	return(
		<Box></Box>
	);
}
export default PlaylistDetail;
