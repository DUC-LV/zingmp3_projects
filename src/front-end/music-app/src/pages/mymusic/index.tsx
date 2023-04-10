import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import React, {useCallback, useEffect, useState} from "react";
import axios from "axios";
import { TextOnline } from "@/src/components/Text";
import { PlaylistSlider } from "@/src/components/Slide";
import ListSong from "@/src/container/playlist/ListSong";
import { Box } from "theme-ui";

const config : object = {
	headers: {
		'Authorization': typeof window !== 'undefined' ? 'Bearer ' + localStorage.getItem('access_token'): '',
		'Content-Type': 'application/json',
		'accept': 'application/json',
	}
}
const MyMusic = () => {
	const SectionType = {
		song: "song",
		playlist: "playlist"
	};
	const [data, setData] = useState<any>();
	useEffect(() => {
		axios.get('http://localhost:8000/favourite/', config).then(res => {
			setData(res.data.data.items)
		})
	}, [])
	const generateContent = useCallback(() => {
		return data?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null;
			}
			switch (section.sectionType){

				case SectionType?.playlist:
					return (
						<PlaylistSlider
							playlists={section?.items}
							key={idx} title={section?.title}
						/>
					)

				case SectionType.song:
					return (
						<>
							<TextOnline sx={{ fontSize: '20px', fontWeight: '700', color: 'white', margin: "40px 10px 20px 10px"}}>{section?.title}</TextOnline>
							<Box sx={{ marginX: '10px'}}>
								<ListSong
									key={idx} data={section?.items} description={""}
								/>
							</Box>
						</>
					)

				default:
					return null;
			}
		})
	}, [SectionType?.playlist, SectionType.song, data])
	return(
		<ReponsiveContainer>
			<TextOnline sx={{ fontSize: '40px', fontWeight: '700', color: 'white'}}>Thư Viện</TextOnline>
			{generateContent()}
		</ReponsiveContainer>
	);
}
export default MyMusic;
