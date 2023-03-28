import React, { useEffect, useState } from "react";
import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import getHub from "@/src/services/getHub";
import HubBanner from "@/src/components/hub/HubBanner";
import SlideHub from "@/src/components/hub/SlideHub";
import { Button, Flex } from "theme-ui";
import { LoadingTopicCategory } from "@/src/container/Loading/SkeletonLoading";
type props = {
	data: any,
}
export async function getServerSideProps() {
	try {
		const res = await getHub.getAll();
		return {
			props: {
				data: res.data.data,
			}
		};
	} catch (error) {
		console.log(error)
	}
}
const HubPage = ({ data }: props) => {
	const [seenMore, setSeenMore] = useState(true);
	const toggleSeenMore = () => {
		setSeenMore(!seenMore);
	}
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
				<LoadingTopicCategory />
			</ReponsiveContainer>
		);
	}
	return(
		<ReponsiveContainer>
			<HubBanner cover={data?.banners?.cover}/>
			<SlideHub title={data?.featured?.title} data={data?.featured?.items}/>
			<SlideHub title={data?.nations?.title} data={data?.nations?.items}/>
			{ seenMore ?
				<SlideHub title={data?.topic?.title} data={data?.topic?.items}/> :
				<SlideHub title={data?.topTopic?.title} data={data?.topTopic?.items}/>
			}
			<Flex sx={{ justifyContent: 'center'}}>
				{ seenMore &&
					<Button
						sx={{
							fontSize: '12px',
							fontWeight: '600',
							background: '#00000000',
							border: '1px solid grey',
							marginY: '10px',
							borderRadius: '10px',
							cursor: 'pointer',
							":active": {
								opacity: 0.8
							}
						}}
						onClick={toggleSeenMore}
					>Xem thêm</Button>
				}
			</Flex>
		</ReponsiveContainer>
	);
}
export default HubPage;
