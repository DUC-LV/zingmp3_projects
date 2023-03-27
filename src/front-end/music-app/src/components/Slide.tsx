import React, { useState } from "react";
import {Box, Flex, Image} from "theme-ui";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import {Artist, Banner, Playlist } from "@/src/schemas";
import {TextLineClamp, TextOnline} from "@/src/components/Text";
import { AiOutlineArrowRight } from "react-icons/ai";
import { useRouter } from "next/router";
import { convertSlug } from "../untils";
import { Autoplay } from "swiper";
import Popup from "./Popup";


export const BannerSlider = (props: { banners: Array<Banner> }) => {
	const { banners } = props;
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	const [isShow, setIsShow] = useState(false);
	const [checkType, setCheckType] = useState(false);
	const router = useRouter();
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
							onClick={() => {
								if(checkout === null){
									setIsShow(true);
								}
								if(item?.type == 1 && checkout !== null){
									setCheckType(true);
									setIsShow(false);
								}
								if(item?.type == 4 && checkout !== null){
									router.push({
										pathname: '../album/[slugAlbum]',
										query: {
											slugAlbum: item?.id,
											id: item?.id
										}
									})
								}
							}}
						/>
					</SwiperSlide>
				))}
			</Swiper>
			<Popup
				isShow={isShow}
				onClose={() => setIsShow(false)}
				title="Thông Báo"
				message="Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ."
				actions={[
					{ key: 'cancel', title: 'Đóng' },
					{ key: 'ok', title: 'Đăng nhập' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/login');
					} else if (key === 'cancel'){
						setIsShow(false);
					}
				}}
			/>
			<Popup
				isShow={checkType}
				onClose={() => setIsShow(false)}
				title="Thông Báo"
				message="Bạn có muốn phát bài hát này? Danh sách phát hiện tại sẽ bị thay thế."
				actions={[
					{ key: 'cancel', title: 'Bỏ qua' },
					{ key: 'ok', title: 'Phát bài hát' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/login');
					} else if (key === 'cancel'){
						setCheckType(false);
					}
				}}
			/>
		</Box>
	);
}


export const PlaylistSlider = (props: { playlists: Array<Playlist>, title: string, pathname: string} ) => {
	const { playlists, title , pathname} = props;
	const router = useRouter();
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	const [isShow, setIsShow] = useState(false);
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
								if(checkout === null){
									setIsShow(true);
								}
								else {
									router.push({
										pathname:pathname,
										query: {
											slugPlaylist: convertSlug(String(item.title)),
											id: item?.id,
										}
									})
								}
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
			<Popup
				isShow={isShow}
				onClose={() => setIsShow(false)}
				title="Thông Báo"
				message="Vui lòng đăng nhập lại để tiếp tục sử dụng dịch vụ."
				actions={[
					{ key: 'cancel', title: 'Đóng' },
					{ key: 'ok', title: 'Đăng nhập' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/login');
					} else if (key === 'cancel'){
						setIsShow(false);
					}
				}}
			/>
		</Box>
	)
}

export const ArtistSlider = (props: { title: string, data: Array<Artist> }) => {
	const { title, data } = props;
	return(
		<Box sx={{ marginY: '40px', width: '100%' }}>
			<TextOnline
				sx={{
					marginLeft: '10px',
					fontSize: '20px',
					fontWeight: '700',
					color: 'white',
				}}>{title}
			</TextOnline>
			<Swiper
				slidesPerView={data?.length < 5 ? data.length : 5 }
			>
				{data.map((item, index) => {
					return(
						<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer", maxWidth: 'fit-content'}}>
							<Box sx={{ marginTop: '20px', width: 'fit-content' }}>
								<Image
									alt=""
									src={item.thumbnail_m}
									sx={{
										borderRadius: '8px',
										height: '250px',
										width: '250px'
									}}
								/>
								<TextOnline
									sx={{
										fontSize: '14px',
										fontWeight: '700',
										color: 'white',
										marginY: '6px',
										textAlign: 'center'
									}}
								>{item.name}</TextOnline>
								<TextLineClamp
									line={2}
									sx={{
										fontSize: '14px',
										color: '#ffffff80',
										textAlign: 'center',
									}}
								>{item.total_follow} quan tâm</TextLineClamp>
							</Box>
						</SwiperSlide>
					)
				})}
			</Swiper>
		</Box>
	);
}
