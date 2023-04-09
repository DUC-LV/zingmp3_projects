/* eslint-disable react-hooks/rules-of-hooks */
import React, {useCallback, useEffect, useState} from "react";
import {Box, Flex, Image } from "theme-ui";
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import {Album, Artist, Banner, Playlist } from "@/src/schemas";
import {TextLineClamp, TextOnline} from "@/src/components/Text";
import { AiOutlineArrowRight, AiFillHeart } from "react-icons/ai";
import { useRouter } from "next/router";
import { convertSlug } from "../untils";
import { Autoplay } from "swiper";
import Popup from "./Popup";
import { BsPlayFill, BsThreeDots } from "react-icons/bs";
import { toast, ToastContainer } from "react-toastify";
import axiosInstance from "../services/axiosInstance";


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


export const PlaylistSlider = (props: { playlists: Array<Playlist>, title: string} ) => {
	const { playlists, title } = props;
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
			<Swiper slidesPerView={5}>
				{playlists.map((item, index) => {
					const [like, setLike] = useState(false);
					useEffect(() => {
						if(item?.followed?.length === 0){
							setLike(false);
						} else if(item?.followed?.length === 1){
							setLike(true)
						}
					}, [item?.followed?.length])
					const toggleLike = useCallback(() => {
						setLike(!like)
						if(checkout === null){
							setIsShow(true);
						}
						else {
							axiosInstance.post('update-follow/', { id_playlist: item?.id }).then(res => {
								toast.success(res.data?.msg)
							})
						}
					}, [item?.id, like])
					return(
						<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
							<Image
								className="image_playlist"
								alt=""
								src={item.thumbnail_m}
								sx={{
									borderRadius: '8px',
									position: 'relative',
								}}
							/>
							<Box className="control_playlist" sx={{ position: 'absolute', top: '35%', width: '91%'}}>
								<Flex
									sx={{
										justifyContent: 'space-around',
										alignItems: 'center',
										margin: '0 30px'
									}}>
									<AiFillHeart
										style={{
											height: '20px',
											width: '20px',
											color: like ? '#9b4de0' : 'white',
										}}
										onClick={toggleLike}
									/>
									<Flex
										sx={{
											height: '40px',
											width: '40px',
											borderRadius: '999px',
											border: '1px solid white',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										onClick={() => {
											if(checkout === null){
												setIsShow(true);
											}
											else {
												router.push({
													pathname:'/playlist/[slugPlaylist]',
													query: {
														slugPlaylist: convertSlug(String(item.title)),
														id: item?.id,
													}
												})
											}
										}}
									>
										<BsPlayFill style={{ color: 'white', height: '20px', width: '20px' }}/>
									</Flex>
									<BsThreeDots style={{ height: '20px', width: '20px', color: 'white' }}/>
								</Flex>
							</Box>
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
					)
				})}
			</Swiper>
			<ToastContainer />
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
export const AlbumSlider = (props: { data: Array<Album>, title: string} ) => {
	const { data, title } = props;
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
			<Swiper slidesPerView={5}>
				{data.map((item, index) => {
					const [like, setLike] = useState(false);
					useEffect(() => {
						if(item?.followed?.length === 0){
							setLike(false);
						} else if(item?.followed?.length === 1){
							setLike(true)
						}
					}, [item?.followed?.length])
					const toggleLike = useCallback(() => {
						setLike(!like)
						if(checkout === null){
							setIsShow(true);
						}
						else {
							axiosInstance.post('update-follow/', { id_playlist: item?.id }).then(res => {
								toast.success(res.data?.msg)
							})
						}
					}, [item?.id, like])
					return(
						<SwiperSlide key={index} style={{ padding: '0 10px', cursor: "pointer"}}>
							<Image
								className="image_playlist"
								alt=""
								src={item.thumbnail}
								sx={{
									borderRadius: '8px',
									position: 'relative',
									width: '100%'
								}}
							/>
							<Box className="control_playlist" sx={{ position: 'absolute', top: '35%', width: '91%'}}>
								<Flex
									sx={{
										justifyContent: 'space-around',
										alignItems: 'center',
										margin: '0 30px'
									}}>
									<AiFillHeart
										style={{
											height: '20px',
											width: '20px',
											color: like ? '#9b4de0' : 'white',
										}}
										onClick={toggleLike}
									/>
									<Flex
										sx={{
											height: '40px',
											width: '40px',
											borderRadius: '999px',
											border: '1px solid white',
											justifyContent: 'center',
											alignItems: 'center',
										}}
										onClick={() => {
											if(checkout === null){
												setIsShow(true);
											}
											else {
												router.push({
													pathname:'/album/[slugAlbum]',
													query: {
														slugAlbum: convertSlug(String(item.title)),
														id: item?.id,
													}
												})
											}
										}}
									>
										<BsPlayFill style={{ color: 'white', height: '20px', width: '20px' }}/>
									</Flex>
									<BsThreeDots style={{ height: '20px', width: '20px', color: 'white' }}/>
								</Flex>
							</Box>
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
					)
				})}
			</Swiper>
			<ToastContainer />
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
