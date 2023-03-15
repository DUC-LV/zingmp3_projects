import React from "react";
import {Box, Flex, Image} from "theme-ui";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import {Banner, Playlist } from "@/src/schemas";
import {TextLineClamp, TextOnline} from "@/src/components/Text";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { convertSlug } from "../untils";
import { Autoplay } from "swiper";


export const BannerSlider = (props: { banners: Array<Banner> }) => {
	const { banners } = props;
	return(
		<Box>
			<Swiper
			modules={[ Autoplay ]}
				slidesPerView={3}
				autoplay={true}
			>
				{banners?.map((item, index) => (
					<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
						<Image
							alt=""
							src={item.banner}
							sx={{ borderRadius: '8px' }}
						/>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	);
}


export const PlaylistSlider = (props: { playlists: Array<Playlist>, title: string} ) => {
	const { playlists, title } = props;
	const router = useRouter();
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
			<Swiper
				slidesPerView={5}
			>
				{playlists.map((item, index) => (
					<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
						<Image
							alt=""
							src={item.thumbnail_m}
							sx={{ borderRadius: '8px' }}
							onClick={() => {
								router.push({
									pathname:"playlist/[slugPlaylist]",
									query: {
										slugPlaylist: convertSlug(String(item.title)),
										id: item?.id,
									}
								})
							}}
						/>
						<Box sx={{ mt: '10px' }}>
							<TextOnline
								sx={{
									fontSize: '14px',
									fontWeight: '700',
									color: 'white',
									marginBottom: '6px',
								}}
							>{item.title}</TextOnline>
							<TextLineClamp
								line={2}
								sx={{
									fontSize: '14px',
									color: '#ffffff80',
								}}
							>{item.sort_description}</TextLineClamp>
						</Box>
					</SwiperSlide>
				))}
			</Swiper>
		</Box>
	)
}
