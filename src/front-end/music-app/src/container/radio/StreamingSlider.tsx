import React from "react";
import {Box, Flex, Image, Text} from "theme-ui";
import {Swiper, SwiperSlide} from "swiper/react";
import { RiLiveLine } from "react-icons/ri";
import {TextOnline} from "@/src/components/Text";
import {useRouter} from "next/router";

const StreamingSlider = (props: { data: Array<any> }) => {
	const { data } =props;
	const router = useRouter();
	return(
		<Box>
			<Swiper slidesPerView={6} >
				{data?.map((item:any, index) => (
					<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
						<Image
							alt=""
							src={item?.program?.thumbnail}
							sx={{
								borderRadius: '99%',
								border: '3px solid red',
								position: 'relative',
								height: '165px',
								width: '165px'
							}}
						/>
						<Image
							alt=""
							src={item?.host?.thumbnail}
							sx={{
								borderRadius: '99%',
								position: 'fixed',
								bottom: 50,
								right: 15,
								border: '3px solid #170f23',
								height: '60px',
								width: '60px',
							}}
						/>
						<Flex
							sx={{
								alignItems: 'center',
								position: 'fixed',
								bottom: 36,
								left: '36%',
								height: '20px',
								width: '50px',
								background: 'red',
								justifyContent: 'center',
								borderRadius: '4px',
							}}
						>
							<RiLiveLine style={{ marginLeft: '2px', color: 'white' }}/>
							<Text sx={{ fontSize: '10px', color: 'white', margin: '5px 3px', fontWeight: '600'}}>LIVE</Text>
						</Flex>
						<TextOnline
							sx={{ marginY: '10px', textAlign: 'center', fontWeight: '600', fontSize: '16px', color: 'white' }}
						>{item?.program?.title}</TextOnline>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}
export default StreamingSlider;
