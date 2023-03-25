import React, {PropsWithChildren} from "react";
import {Box, Flex, Image, Text, Button} from "theme-ui";
import { useRouter } from "next/router";
import { BsFillPersonFill, BsMusicNoteBeamed } from "react-icons/bs";
import { BiRadioCircleMarked, BiBarChart, BiListCheck, BiCategoryAlt } from "react-icons/bi";
import { AiOutlineStar, AiOutlineVideoCamera } from "react-icons/ai";
import { TextOnline } from "./Text";

interface ItemProps {
	link?: string,
	isActive?: boolean,
	onClick?: () => void,
	icon?: any,
	name?: string,
	title?: string,
	backgroundColor?: string,
}
const Items = ({ link, isActive, onClick, icon, name }: PropsWithChildren<ItemProps>) => {
	const router = useRouter();
	return(
		<Flex
			sx={{
				height: '32px',
				padding: '8px 25px',
				alignItems: 'center',
				marginY: '5px',
				background: isActive ? '#3a3344' : '',
			}}
			onClick={() => {
				router.push(link ? String(link) : '')
			}}
		>
			<Box sx={{ height: '20px', width: '20px' }}>{icon}</Box>
			<TextOnline
				sx={{
					fontSize: '16.5px',
					fontWeight: '700',
					color: '#DADADA',
					margin: '1px 10px',
					cursor: 'pointer',
					"@media screen and (max-width: 1133px)": {
						display: 'none'
					}
				}}
			>{name}</TextOnline>
		</Flex>
	);
}

const ButtonItems = ({ title, name, backgroundColor }: PropsWithChildren<ItemProps>) => {
	return(
		<Flex
			sx={{
				height: '90px',
				width: '200px',
				margin: '10px 20px',
				flexDirection: 'column',
				borderRadius: '8px',
				background: '#9b4de0',
				alignItems: 'center',
				"@media screen and (max-width: 1133px)": {
					display: 'none'
				}
			}}
		>
			<Text
				as="h6"
				sx={{
					fontSize: '13px',
					fontWeight: '600',
					textAlign: 'center',
					margin: '10px 10px',
					color: 'white'
				}}
			>{title}</Text>
			<Button
				sx={{
					height: '30px',
					width: '145px',
					border: '1px solid white',
					fontSize: '12px',
					margin: '0 auto',
					borderRadius: '20px',
					color: 'black',
					fontWeight: '600',
					cursor: 'pointer',
					backgroundColor: backgroundColor,
				}}
			>{name}</Button>
		</Flex>
	)
}
const Header = () => {
	const router = useRouter();
	const menu = [
		{
			id: 1,
			type: '',
			name: 'Cá Nhân',
			link: '',
			isActive: (pathName: string) => /^\/tv/.test(pathName),
			icon: <BsFillPersonFill color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 2,
			type: '',
			name: 'Khám Phá',
			link: '/',
			isActive: (pathName: string) => router.pathname === '/',
			icon: <BiRadioCircleMarked color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 3,
			type: '',
			name: '#zingchart',
			link: '',
			isActive: (pathName: string) => /^\/tv/.test(pathName),
			icon: <BiBarChart color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 4,
			type: '',
			name: 'Theo Dõi',
			link: '',
			isActive: (pathName: string) => /^\/tv/.test(pathName),
			icon: <BiListCheck color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
	];

	const category = [
		{
			id: 1,
			type: '',
			name: 'Nhạc Mới',
			link: '',
			isActive: (pathName: string) => /^\/tv/.test(pathName),
			icon: <BsMusicNoteBeamed color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 2,
			type: '',
			name: 'Chủ Đề & Thể Loại',
			link: '/hub',
			isActive: (pathName: string) => /^\/hub/.test(pathName),
			icon: <BiCategoryAlt color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 3,
			type: '',
			name: 'Top 100',
			link: '',
			isActive: (pathName: string) => /^\/tv/.test(pathName),
			icon: <AiOutlineStar color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
		{
			id: 4,
			type: '',
			name: 'MV',
			link: '/videos',
			isActive: (pathName: string) => /^\/videos/.test(pathName),
			icon: <AiOutlineVideoCamera color="#DADADA" style={{ height: '18px', width: '18px', cursor: 'pointer'}}/>
		},
	];
	return(
		<Box
			sx={{
				width: '240px',
				height: '100%',
				position: 'fixed',
				top: 0,
				left: 0,
				background: '#231b2e',
				"@media screen and (max-width: 1133px)": {
					width: '70px'
				}
			}}
		>
			<Flex
				onClick={() => router.push('/')}
				sx={{
					height: '70px',
					width: '240px',
					padding: '0px 25px',
					alignItems: 'center',
					marginY: '5px',
					"@media screen and (max-width: 1133px)": {
						display: 'none'
					}
				}}
			>
				<Image
					alt=""
					src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/ZingMP3logo.svg/2560px-ZingMP3logo.svg.png"
					sx={{
						height: '40px',
						width: '120px',
						cursor: 'pointer'
					}}
				/>
			</Flex>
			<Flex
				onClick={() => router.push('/')}
				sx={{
					justifyContent: 'center',
					padding: '10px 10px',
					"@media screen and (min-width: 1133px)": {
						display: 'none'
					}
				}}
			>
				<Image
					alt=""
					src="https://tse1.mm.bing.net/th?id=OIP.ARn_6iasoaMH7Lwk43lmbwHaHa&pid=Api&P=0"
					sx={{
						height: '50px',
						width: '50px',
						borderRadius: '999px',
						cursor: 'pointer'
					}}
				/>
			</Flex>
			<Flex sx={{ flexDirection: 'column', marginTop: '20px' }}>
				{menu?.map((item:any, index) => {
					return(
						<Box key={index}>
							<Items link={item?.link} isActive={item?.isActive(router.pathname)} icon={item?.icon} name={item?.name}/>
						</Box>
					)
				})}
			</Flex>
			<Flex sx={{ height: '0.5px', width: '86%', background: '#393243', margin: '5px auto'}}></Flex>
			<Flex sx={{ flexDirection: 'column', marginTop: '10px' }}>
				{category?.map((item:any, index) => {
					return(
						<Box key={index}>
							<Items link={item?.link} isActive={item?.isActive(router.pathname)} icon={item?.icon} name={item?.name}/>
						</Box>
					)
				})}
			</Flex>
			{/* <ButtonItems
				title={'Đăng nhập để khám phá playlist dành riêng cho bạn'}
				name={'Đăng nhập'}
				backgroundColor={'#a55fe3'}
			/> */}
			<ButtonItems
				title={'Nghe nhạc không quảng cáo cùng kho nhạc VIP'}
				name={'Nâng cấp VIP'}
				backgroundColor={'yellow'}
			/>
		</Box>
	);
}
export default Header;
