import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import { AlbumSlider, PlaylistSlider } from "@/src/components/Slide";
import { TextOnline } from "@/src/components/Text";
import SlideSong from "@/src/components/song/SlideSong";
import getArtistDetail from "@/src/services/getArtistDetail";
import React, { useCallback } from "react";
import { Flex, Image } from "theme-ui";
type Props = {
	data: any,
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getArtistDetail.getAll(query.id);
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
const ArtistDetail = ({ data }: Props) => {
	const SectionType = {
		song: "song",
		playlist: "playlist",
		album: "album",
	};
	const generateContent = useCallback(() => {
		return data?.sections?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null;
			}
			switch (section.sectionType){

				case SectionType?.song:
					return (
						<SlideSong
							data={section?.items}
							key={idx}
							title={section.title}
						/>
					)

				case SectionType.playlist:
					return (
						<PlaylistSlider
							key={idx}
							playlists={section.items}
							title={section.title}
						/>
					)

				case SectionType.album:
					return (
						<AlbumSlider
							key={idx}
							data={section.items}
							title={"Album"}
						/>
					)

				default:
					return null;
			}
		})
	}, [SectionType.album, SectionType.playlist, SectionType?.song, data?.sections])
	return(
		<>
			<Flex
				sx={{
					margin: '70px 0px 0px 240px',
					position: "relative",
					"@media screen and (max-width: 1133px)": {
						margin: '70px 0px 0px 70px',
					},

				}}
			>
				<Image
					alt=""
					src={data?.cover}
					sx={{ width: '100%', height: "100%" }}
				/>
				<TextOnline
					sx={{
						position: "absolute",
						left: "60px",
						color: "white",
						bottom: "100px",
						fontSize: "60px",
						fontWeight: "700"
					}}
					>{data?.name}
				</TextOnline>
			</Flex>
			<ReponsiveContainer>{generateContent()}</ReponsiveContainer>
		</>
	);
}
export default ArtistDetail;
