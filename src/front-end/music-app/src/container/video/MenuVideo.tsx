import React from "react";
import { Box, Flex } from "theme-ui";
import { MenuVideo } from "@/src/schemas";
import {TextOnline} from "@/src/components/Text";
import {useRouter} from "next/router";
const MenuVideo = (props: { data: Array<MenuVideo> }) => {
	const { data } = props;
	const router = useRouter();
	return(
		<>
			<Flex>
				<TextOnline
					as="h2"
					sx={{
						paddingRight: '15px',
						borderRight: '1px solid #ffffff1a',
						color: 'white',
						fontSize: '24px',
						fontWeight: '600'
					}}
				>MV</TextOnline>
				<Flex
					sx={{ alignItems: 'center'}}
				>
					{data?.map((item:any, index) => {
						return(
							<Box
								key={index}
								onClick={() => {
									router.push(`../videos/${item?.id}?id=${item?.id}`)
								}}
							>
								<TextOnline
									sx={{
										fontSize: '15px',
										margin: '0 30px',
										cursor: 'pointer',
										color: "white",
										fontWeight: '600'
									}}
								>{item.name}</TextOnline>
							</Box>
						)
					})}
				</Flex>
			</Flex>
			<Box sx={{ height: '1px', width: '100%', background: 'grey', margin: '10px 0px'}}></Box>
		</>
	);
}
export default MenuVideo;
