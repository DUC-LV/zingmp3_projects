import React, { useCallback, useEffect, useState } from "react";
import getHome from "@/src/services/getHome";
import { BannerSlider, PlaylistSlider } from "../components/Slide";
import ReponsiveContainer from "../components/ReponsiveContainer";
import LoadingHome from "../container/Loading/SkeletonLoading";

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
		playlist: "playlist"
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
							pathname="./playlist/[slugPlaylist]"
						/>
					)
			}
		})
	}, [SectionType?.banner, SectionType.playlist, data])

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
