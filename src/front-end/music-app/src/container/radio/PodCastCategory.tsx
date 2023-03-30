import React from "react";
import {Box, Grid, Image, Text} from "theme-ui";
import {useRouter} from "next/router";
import {Swiper, SwiperSlide} from "swiper/react";

type props = {
	title?: string,
	data?: any,
}
const PodCastCategory = ({ title, data }: props) => {
	const router = useRouter();
	return(
		<Box sx={{ marginY: '10px' }}>
			<Text
				as="h3"
				sx={{ fontSize: '20px', margin: '20px 10px', color: 'white' }}
			>{title}</Text>
			<Swiper slidesPerView={4}>
				{data?.map((item:any, index:number) => {
					return(
						<SwiperSlide
							key={index}
							style={{ padding: '0 10px', cursor: "pointer"}}
						>
							<Image
								alt=""
								src={item?.thumbnail}
								sx={{
									borderRadius: '6px',
									cursor: 'pointer',
								}}
							/>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</Box>
	);
}
export default PodCastCategory;
