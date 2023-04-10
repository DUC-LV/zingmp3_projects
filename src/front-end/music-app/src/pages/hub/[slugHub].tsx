import React, {useCallback} from "react";
import getHubDetail from "@/src/services/getHubDetail";
import {Box, Flex, Image} from "theme-ui";
import {PlaylistSlider} from "@/src/components/Slide";
import SlideSong from "@/src/components/song/SlideSong";
type Props = {
	data: any,
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getHubDetail.getAll(query.id);
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
const HubDetail = ({ data }: Props) => {
	const sectionType = {
		playlist: "playlist",
		song: "song",
	}
	const generateContent = useCallback(() => {
		return data?.sections?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null;
			}
			switch (section?.sectionType){

				case sectionType?.song:
					return (
						<SlideSong
							key={idx}
							data={section?.items}
							title={section?.title}
						/>
					)

				case sectionType?.playlist:
					return (
						<PlaylistSlider
							key={idx}
							playlists={section?.items}
							title={section.title}
						/>
					)
				default:
					return null;
			}
		})
	}, [data?.sections, sectionType?.playlist, sectionType?.song])
	return(
		<>
			<Flex
				sx={{
					margin: '100px 0px 0px 240px',
					"@media screen and (max-width: 1133px)": {
						margin: '100px 0px 0px 70px',
					}
				}}
			>
				<Image
					alt=""
					src={data?.cover}
					sx={{ width: '100%' }}
				/>
			</Flex>
			<Box
				sx={{
					margin: '10px 0px 0px 240px',
					padding: '0px 50px',
					"@media screen and (max-width: 1133px)": {
						margin: '10px 0px 0px 70px',
						padding: '0px 10px',
					}
				}}
			>
				{generateContent()}
			</Box>
		</>
	);
}
export default HubDetail;
