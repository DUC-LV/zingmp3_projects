import React, { useCallback, useEffect, useState } from "react";
import getHome from "@/src/services/getHome";
import { BannerSlider, PlaylistSlider } from "../components/Slide";
import ReponsiveContainer from "../components/ReponsiveContainer";
import LoadingHome from "../container/Loading/SkeletonLoading";
import StreamingSlider from "../container/radio/StreamingSlider";
import { Box } from "theme-ui";
import { TextOnline } from "../components/Text";

type Props = {
	data: Array<object>
}
export async function getServerSideProps() {
	try {
		const res = await getHome.getAll();
		return {
			props: {
				data: res.data.data.items,
			}
		};
	} catch (error) {
		console.log(error)
	}
}
const Home = ({ data }: Props) => {

	const SectionType = {
		banner: "banner",
		playlist: "playlist",
		livestream: "livestream",
	};

	const generateContent = useCallback(() => {
		return data?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null;
			}
			switch (section.sectionType){

				case SectionType?.banner:
					return (
						<BannerSlider
							banners={section?.items}
							key={idx}
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

				case SectionType.livestream:
					return(
						<Box key={idx} sx={{ marginTop: '40px' }}>
							<TextOnline
								sx={{
									margin: '40px 10px 20px 10px',
									fontSize: '20px',
									fontWeight: '700',
									color: 'white',
								}}>Radio Nổi Bật
							</TextOnline>
							<StreamingSlider
								data={section?.items}
							/>
						</Box>
					)

				default:
					return null;
			}
		})
	}, [SectionType?.banner, SectionType.livestream, SectionType.playlist, data])

	const hasData = data && data?.length > 0;
	const [loading, setLoading] = useState(hasData);

	useEffect(() => {
		if(hasData){
			setTimeout(() => {
				setLoading(false);
			}, 200)
		}
	}, [hasData])

	if(loading){
		return(
			<ReponsiveContainer>
				<LoadingHome />
			</ReponsiveContainer>
		);
	}

	return(
		<ReponsiveContainer>
			{generateContent()}
		</ReponsiveContainer>
	);
}
export default Home;
