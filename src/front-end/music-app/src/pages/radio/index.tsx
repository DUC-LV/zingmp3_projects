import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import React, {useCallback} from "react";
import getRadio from "@/src/services/getRadio";
import PodCastSlider from "@/src/container/radio/PodCastSlider";
import StreamingSlider from "@/src/container/radio/StreamingSlider";
import PodCastCategory from "@/src/container/radio/PodCastCategory";

type Props = {
	data: Array<object>
}
export async function getServerSideProps() {
	try {
		const res = await getRadio.getAll();
		return {
			props: {
				data: res.data.data.items,
			}
		};
	} catch (error) {
		console.log(error)
	}
}
const RadioPage = ({ data }: Props) => {
	const SectionType = {
		livestream: "livestream",
		podcast_category: "podcast_category",
		podcastH: "podcastH"
	};
	const generateContent = useCallback(() => {
		return data?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null;
			}
			switch (section?.sectionType) {
				case SectionType?.livestream:
					return(
						<StreamingSlider
							key={idx}
							data={section?.items}
						/>
					)
				case SectionType.podcast_category:
					return (
						<PodCastCategory
							key={idx}
							data={section?.items}
							title={section?.title}
						/>
					)
				case SectionType.podcastH:
					return (
						<PodCastSlider
							key={idx}
							data={section?.items}
							title={section?.title}
						/>
					)
			}
		})
	}, [SectionType?.livestream, SectionType.podcastH, SectionType.podcast_category, data])
	return(
		<ReponsiveContainer>
			{generateContent()}
		</ReponsiveContainer>
	);
}
export default RadioPage;
