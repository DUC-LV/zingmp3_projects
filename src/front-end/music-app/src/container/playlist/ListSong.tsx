import Popup from "@/src/components/Popup";
import { TextLineClamp, TextOnline } from "@/src/components/Text";
import { convertDuration, convertSlug } from "@/src/untils";
import { useRouter } from "next/router";
import React, {useCallback, useEffect, useState} from "react";
import { BiSortAlt2 } from "react-icons/bi";
import { Box, Flex, Grid, Image } from "theme-ui";
import {AiFillHeart} from "react-icons/ai";
import {toast, ToastContainer} from "react-toastify";
import axios from "axios";
type Props = {
	data: Array<object>
	description: string,
}
const ListSong = ({ data, description }: Props) => {
	const router = useRouter();
	const [isShow, setIsShow] = useState(false);
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	const url = 'http://localhost:8000/update-follow/';
	// eslint-disable-next-line react-hooks/exhaustive-deps
	const config : object = {
		headers: {
			'Authorization': typeof window !== 'undefined' ? 'Bearer ' + localStorage.getItem('access_token'): '',
			'Content-Type': 'application/json',
			'accept': 'application/json',
		}
	}
	return(
		<Flex
			sx={{
				marginX: '40px',
				flexDirection: 'column',
				flex: 'auto',
				"@media screen and (max-width: 1200px)": {
					marginX: '0',
					marginTop: '20px'
				}
			}}
		>
			<Flex sx={{
				"@media screen and (max-width: 1200px)": {
					display: 'none',
				},
				marginBottom: '10px',
			}}>
				<TextLineClamp
					line={2}
					sx={{ fontSize: '14px', fontWeight: '600', color: '#fff' }}>
					{description}
				</TextLineClamp>
			</Flex>
			<Grid sx={{ gridTemplateColumns: [3, '4fr 3fr 1fr']}}>
				<Flex sx={{ alignItems: 'center' }}>
					<BiSortAlt2 style={{ height: '20px', width: '14px', color: 'hsla(0,0%,100%,0.5)'}}/>
					<TextOnline
						sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)', marginLeft: '10px' }}
					>Bài Hát</TextOnline>
				</Flex>
				<TextOnline
					sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)'}}
				>Album</TextOnline>
				<TextOnline
					sx={{ fontSize: '14px', fontWeight: '600', color: 'hsla(0,0%,100%,0.5)', textAlign: 'center' }}
				>Thời Gian</TextOnline>
			</Grid>
			<Flex sx={{ flexDirection: 'column'}}>
				{data?.map((item:any, index:any) => {
					const handleShowPopup = () => {
						if(item?.streaming_status === 2){
							setIsShow(true)
						}
					}
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const [like, setLike] = useState(false);
					// eslint-disable-next-line react-hooks/rules-of-hooks
					useEffect(() => {
						if(item?.followed?.length === 0){
							setLike(false);
						} else if(item?.followed?.length === 1){
							setLike(true)
						}
					}, [item?.followed?.length])
					// eslint-disable-next-line react-hooks/rules-of-hooks
					const toggleLike = useCallback(() => {
						setLike(!like)
						if(checkout === null){
							setIsShow(true);
						}
						else {
							axios.post(url, { id_song: item?.id }, config).then(res => {
								toast.success(res.data?.msg)
							})
						}
					}, [item?.id, like])
					return(
						<Grid
							key={index}
							sx={{
								gridTemplateColumns: [3, '4fr 3fr 1fr'],
								height: '60px', paddingY: '10px',
								borderBottom: '1px solid hsla(0,0%,100%,0.05)',
								":hover": {
									background: '#ffffff1a',
									borderRadius: '4px'
								}
							}}
						>
							<Flex sx={{ marginLeft: '25px' }}>
								<Image
									alt=""
									src={item.thumbnail}
									sx={{ height: '40px', width: '40px', borderRadius: '6px', cursor: 'pointer'}}
									onClick={handleShowPopup}
								/>
								<Flex sx={{ marginLeft: '10px', flexDirection: 'column', justifyContent: 'space-around',}}>
									<TextOnline sx={{
											fontSize: '14px',
											fontWeight: '600',
											color: item.streaming_status === 2 ? '#ffffff80' : '#FFF',
										}}
									>{item.title}
									</TextOnline>
									<Flex>
										{item.artists.map((items:any, index:any) => {
											return(
												<Box
													key={index}
													onClick={() => {
														router.push({
															pathname: '../artist/[slugArtist]',
															query: {
																slugArtist: items.alias,
																id: items.id,
															}
														})
													}}
												>
													<TextOnline
														sx={{
															fontSize: '12px',
															color: '#ffffff80',
															fontWeight: '500',
															cursor: 'pointer',
															":hover": {
																color: '#c273ed',
																textDecoration: 'underline',
															}
														}}
													>{items.name}&ensp;</TextOnline>
												</Box>
											)
										})}
									</Flex>
								</Flex>
							</Flex>
							<Flex
								sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
								<Flex
									sx={{ cursor: 'pointer' }}
									onClick={() => {
										router.push({
											pathname: '../album/[slugAlbum]',
											query: {
												slugAlbum: convertSlug(item?.album?.title),
												id: item?.album?.id
											}
										})
									}}>
									<TextOnline
										sx={{
											fontSize: '12px',
											color: '#ffffff80',
											fontWeight: '500',
											":hover": {
												color: '#c273ed',
												textDecoration: 'underline',
											}
										}}>
										{item.album.title}
									</TextOnline>
								</Flex>
								<Flex sx={{ cursor: 'pointer' }}>
									<AiFillHeart
										onClick={toggleLike}
										style={{
											height: '20px',
											width: '20px',
											color: like ? '#9b4de0' : 'white',
										}}
									/>
								</Flex>
							</Flex>
							<Flex sx={{ alignItems: 'center', justifyContent: 'center'}}>
								<TextOnline sx={{fontSize: '12px', color: '#ffffff80'}}>
									{convertDuration(item.duration)}
								</TextOnline>
							</Flex>
						</Grid>
					);
				})}
			</Flex>
			<ToastContainer />
			<Popup
				isShow={isShow}
				onClose={() => setIsShow(false)}
				title="Dành Cho Tài Khoản VIP"
				message="Theo yêu cầu của đơn vị sở hữu bản quyền, bạn cần tài khoản VIP để nghe bài hát này."
				actions={[
					{ key: 'cancel', title: 'Đóng' },
					{ key: 'ok', title: 'Nâng Cấp VIP' },
				]}
				onAction={ key => {
					if(key === 'ok'){
						router.push('/packages');
					} else if (key === 'cancel'){
						setIsShow(false);
					}
				}}
			/>
		</Flex>
	);
}
export default ListSong
