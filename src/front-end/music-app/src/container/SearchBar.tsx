import React, {PropsWithChildren, useState, useRef, useEffect} from "react";
import { Box, Flex, Input, Text } from 'theme-ui';
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineSearch, AiFillSetting } from "react-icons/ai";
import { BsArrowBarUp } from "react-icons/bs";
import { RxAvatar } from "react-icons/rx";
import {useRouter} from "next/router";
import useOnClickOutside from "use-onclickoutside";
import Popup from "../components/Popup";

interface ItemProps {
	icon?: string,
}
const IconSearchBar = ({ icon }: PropsWithChildren<ItemProps>) => {
	return(
		<Flex
			sx={{
				height: '40px',
				width: '40px',
				borderRadius: '999px',
				background: '#ffffff1a',
				alignItems: 'center',
				justifyContent: 'center',
				cursor: 'pointer',
				":hover": {
					background: '#ffffff0d',
				},
				marginRight: '10px',
			}}
		>
			<Flex sx={{ justifyContent: 'center', alignItems: 'center'}}>{icon}</Flex>
		</Flex>
	)
}

const InputSearch = () => {
	const router = useRouter();
	const [searchTxt, setSearchTxt] = useState('');
	const searchBoxRef = React.useRef(null);
	const [dropdownSearchVisible, setDropdownSearchVisible] = React.useState(false);
	useOnClickOutside(searchBoxRef,() => {
		setDropdownSearchVisible(false);
	})
	const focusSearch = () => {
		setDropdownSearchVisible(true);
	};
	const gotoSearchPage = () => {
		if(!searchTxt){
			return;
		}else {
			router.push('')
		}
	}
	return(
		<Flex
			sx={{
				height: '40px',
				width: '400px',
				background: '#ffffff1a',
				borderRadius: '20px',
				position: 'relative',
			}}
		>
			<Box>
				<AiOutlineSearch
					style={{
						height: '20px',
						width: '20px',
						color: '#DADADA',
						position: 'absolute',
						left: '10px',
						top: '10px',
					}}
				/>
			</Box>
			<Input
				placeholder="Tìm kiếm bài hát, nghệ sĩ, lời bài hát ..."
				sx={{
					position: 'absolute',
					left: '38px',
					right: '10px',
					top: '0',
					height: '98%',
					maxWidth: '350px',
					width: '100%',
					border: 'none',
					outline: 'none',
					color: 'white',
					"::placeholder": {
						color: 'rgba(255, 255, 255, 0.5)',
						whiteSpace: 'nowrap',
						overflow: 'hidden',
						textOverflow: 'ellipsis',
					}
				}}
			/>
		</Flex>
	)
}

type Props = {
	checkout: string;
	data: any;
}
const SearchBar = ({ checkout, data }: Props) => {
	const icon = [
		// {
		// 	icon: <BsArrowBarUp style={{ color: 'white'}}/>
		// },
		// {
		// 	icon: <AiFillSetting style={{ color: 'white'}}/>
		// },
		{
			icon: <RxAvatar style={{ color: 'white'}}/>
		}
	]
	const router = useRouter();
	const [isShow, setIsShow] = useState(false);
	const ref = React.useRef(null);
	useOnClickOutside(ref, () => {
		setIsShow(false);
	});
	return(
		<Flex
			sx={{
				height: '70px',
				position: 'fixed',
				left: '240px',
				top: '0',
				right: '0',
				padding: '0px 60px',
				justifyContent: 'space-between',
				boxShadow: '',
				"@media screen and (max-width: 1133px)": {
					left: '70px',
					padding: '0 20px',
				},
				zIndex: 1000,
				backdropFilter: 'blur(10px)',
				backgroundColor: '#170f23cc',
			}}
		>
			<Flex
				sx={{
					alignItems: 'center',
					justifyContent: 'flex-start',
					flexGrow: '1',
				}}
			>
				<AiOutlineArrowLeft
					style={{
						height: '24px',
						width: '24px',
						color: '#DADADA',
						marginRight: '20px'
					}}
				/>
				<AiOutlineArrowRight
					style={{
						height: '24px',
						width: '24px',
						color: '#DADADA',
						marginRight: '20px'
					}}
				/>
				<InputSearch />
			</Flex>
			<Flex sx={{ justifyContent: 'flex-end', alignItems: 'center'}}>
				{icon?.map((item:any, index) => {
					return(
						<Flex
							key={index}
							onClick={() => {
								setIsShow(!isShow)
							}}
							sx={{ position: 'relative' }}
							><IconSearchBar icon={item.icon}/>
							{ isShow && (
								!checkout ? (
									<Flex
										sx={{
											position: 'absolute',
											top: '120%',
											height: '50px',
											width: '180px',
											backgroundColor: '#34224f',
											right: '20%',
											transition: 'opacity 2000ms ease-in-out',
											padding: '15px',
											alignItems: 'center',
											cursor: 'pointer',
											borderRadius: '8px'
										}}
										onClick={() => {
											router.push('/login')
										}}
									>
										<Text
										sx={{
											fontSize: '16px',
											fontWeight: '600',
											color: 'white'
										}}
										>Đăng nhập</Text>
									</Flex>
								):
								<Flex
									sx={{
										flexDirection: 'column',
										position: 'absolute',
										top: '120%',
										height: '145px',
										width: '180px',
										backgroundColor: '#34224f',
										right: '20%',
										transition: 'opacity 2000ms ease-in-out',
										borderRadius: '8px'
									}}
								>
									<Text
										sx={{
											fontSize: '16px',
											fontWeight: '600',
											color: 'white',
											padding: '15px',
										}}
									>Xin Chào, {data?.userName}</Text>
									<Box sx={{ height: '1px', width: '100%', background: 'grey' }}></Box>
									<Flex
										onClick={() => {
											router.push('/packages')
										}}
										sx={{
											padding: '15px',
											":hover": {
												background: 'hsla(0,0%,100%,0.1)',
											},
											cursor: 'pointer',
										}}
									>
										<Text
											sx={{
												fontSize: '16px',
												fontWeight: '600',
												color: 'white',
											}}
										>Nâng Cấp VIP</Text>
									</Flex>
									<Flex
										onClick={() => {
											localStorage.removeItem("access_token");
											localStorage.removeItem("refresh_token");
											setTimeout(() => {
												router.push('/')
											}, 500)
										}}
										sx={{
											padding: '15px',
											":hover": {
												background: 'hsla(0,0%,100%,0.1)',
												borderRadius: '0 0 8px 8px'
											},
											cursor: 'pointer',
										}}
									>
										<Text
											sx={{
												fontSize: '16px',
												fontWeight: '600',
												color: 'white',
											}}
										>Đăng Xuất</Text>
									</Flex>
								</Flex>
							)}
						</Flex>
					);
				})}
			</Flex>
		</Flex>
	);
}
export default SearchBar;
