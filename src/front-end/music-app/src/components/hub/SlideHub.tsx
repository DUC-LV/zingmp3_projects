import { convertSlug } from "@/src/untils";
import { useRouter } from "next/router";
import React from "react";
import {Box, Grid, Image, Text} from "theme-ui";
type props = {
	title?: string,
	data?: any,
}
const SlideHub = ({ title, data }: props) => {
	const router = useRouter();
	return(
		<Box sx={{ marginY: '10px' }}>
			<Text
				as="h3"
				sx={{ fontSize: '20px', marginY: '20px', color: 'white' }}
			>{title}</Text>
			<Grid columns={1}>
				<Grid columns={4} gap={30}>
					{data?.map((item:any, index:number) => {
						return(
							<Box
								key={index}
								onClick={() => {
									router.push({
										pathname: './hub/[slugHub]',
										query: {
											slugHub: convertSlug(item?.title),
											id: item?.id,
										}
									})
								}}
							>
								<Image
									alt=""
									src={item?.thumbnail_has_text}
									sx={{
										borderRadius: '6px',
										cursor: 'pointer',
									}}
								/>
							</Box>
						);
					})}
				</Grid>
			</Grid>
		</Box>
	);
}
export default SlideHub;
