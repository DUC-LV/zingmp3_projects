import getPlaylistDetail from "@/src/services/getPlaylistDetail";
import React, { useState, useEffect } from "react";
import {Box, Flex} from "theme-ui";
import {useRouter} from "next/router";
import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import HeaderPlaylist, {DataHeaderPlaylist} from "@/src/container/playlist/HeaderPlaylist";
import ListSong from "@/src/container/playlist/ListSong"
import { ArtistSlider } from "@/src/components/Slide";

type Props = {
	data: any,
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getPlaylistDetail.getAll(query.id);
			return {
				props: {
					data: res.data.data,
				}
			};
		}

	} catch (error) {
		console.log(error)
	}
}
const PlaylistDetail = ({ data }: Props) => {
	return(
		<ReponsiveContainer>
			<Flex
				sx={{
					"@media screen and (max-width: 1200px)":{
						flexDirection: 'column'
					},
					flex: '0 0 auto'
				}}
			>
				<HeaderPlaylist
					thumbnail_m={data?.thumbnail_m}
					title={data?.title}
					artist_names={data?.artist_names}
					sort_description={data?.sort_description}
				/>
				<Flex
					sx={{
						flex: 1,
						marginX: "40px",
					}}
				>
					<ListSong data={data?.song?.items} description={data?.sort_description}/>
				</Flex>
			</Flex>
			<ArtistSlider
				title="Nghệ Sĩ Tham Gia"
				data={data?.artists}
			/>
		</ReponsiveContainer>
	);
}
export default PlaylistDetail;
