import React from "react";
import {Box, Flex, Image} from "theme-ui";
import { TextOnline} from "@/src/components/Text";
import { AiOutlineArrowRight} from "react-icons/ai";
import { Swiper, SwiperSlide } from 'swiper/react';

const PodCastSlider = (props: { data: Array<any>, title: string}) => {
	const { data, title } = props;
	return(
		<Box>
			<Flex sx={{ justifyContent: 'space-between'}}>
				<TextOnline
					sx={{
						margin: '40px 10px 20px 10px',
						fontSize: '20px',
						fontWeight: '700',
						color: 'white',
					}}>{title}
				</TextOnline>
				<Flex sx={{ margin: '40px 10px 20px 10px', alignItems: 'center' }}>
					<TextOnline
						sx={{
							fontSize: '12px',
							color: '#ffffff80',
							fontWeight: '500',
							marginRight: '10px'
						}}
					>Tất cả</TextOnline>
					<AiOutlineArrowRight style={{ height: '20px', width: '20px', color: '#ffffff80' }}/>
				</Flex>
			</Flex>
			<Swiper slidesPerView={5}>
				{data.map((item:any, index) => (
					<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
						<Image
							alt=""
							src={item.thumbnail_m}
							sx={{
								borderRadius: '8px',
								position: 'relative',
							}}
						/>
						<TextOnline
							sx={{
								fontSize: '14px',
								fontWeight: '700',
								color: 'white',
								marginBottom: '6px',
								textAlign: 'center',
								mt: '10px'
							}}
						>{item.title}</TextOnline>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
}
export default PodCastSlider;
