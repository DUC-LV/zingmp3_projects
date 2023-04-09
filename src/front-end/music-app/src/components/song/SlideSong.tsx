import React from "react";
import {Text, Flex, Image, Box} from "theme-ui";
import {TextOnline} from "@/src/components/Text";
import {convertDuration} from "@/src/untils";
type Props = {
	data: Array<object>
	title?: string
}

const SlideSong = ({ data, title }: Props) => {
	return(
		<>
			<Text
				as={"h3"}
				sx={{ margin: '30px 10px 10px 10px', color: 'white'}}
			>{title}</Text>
			<Flex sx={{ justifyContent: 'space-between' }}>
				<Box sx={{ width: '100%', marginX: '10px' }}>
					<ItemSong dataSong={data?.slice(0,1)} />
				</Box>
				<Box sx={{ width: '100%', marginX: '10px' }}>
					<ItemSong dataSong={data?.slice(1,2)} />
				</Box>
				<Box sx={{ width: '100%', marginX: '10px' }}>
					<ItemSong dataSong={data?.slice(2,3)} />
				</Box>
			</Flex>
		</>
	);
}
export default SlideSong;


export const ItemSong = (props: { dataSong: Array<object> }) => {
	const { dataSong } = props;
	return(
		<Flex sx={{ flexDirection: 'column' }}>
			{dataSong?.map((item:any, index:number) => {
				return(
					<Flex
						key={index}
						sx={{
							justifyContent: 'space-between',
							padding: '10px',
							borderRadius: '6px',
							":hover": {
								background: '#ffffff1a',
							}
						}}>
						<Flex
							sx={{ marginY: '5px'}}>
							<Image
								alt=""
								src={item?.thumbnail}
								sx={{ height: '40px', width: '40px', borderRadius: '6px', cursor: 'pointer' }}
							/>
							<Flex sx={{ flexDirection: 'column', justifyContent: 'center', marginX: '10px' }}>
								<TextOnline
									sx={{ fontSize: '14px', fontWeight: '600', color: 'white',marginY: '5px'}}
								>{item?.title}</TextOnline>
								<Flex>
									{item?.artists?.map((items: any, index:number) => {
										return(
											<TextOnline
												key={index}
												sx={{
													fontSize: '12px',
													color: 'rgba(255, 255, 255, 0.5)',
													cursor: 'pointer',
													":hover": {
														color: '#c273ed',
														textDecoration: 'underline',
													}
												}}
											>{items?.name}&ensp;</TextOnline>
										)
									})}
								</Flex>
							</Flex>
						</Flex>
						<Flex sx={{ justifyContent: 'center', alignItems: 'center'}}>
							<Text
								sx={{
									fontSize: '12px',
									color: 'rgba(255, 255, 255, 0.5)'
								}}
							>{convertDuration(item?.duration)}</Text>
						</Flex>
					</Flex>
				);
			})}
		</Flex>
	)
}
