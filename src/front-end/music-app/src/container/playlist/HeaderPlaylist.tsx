import React from "react";
import {Box, Flex, Image} from "theme-ui";
import {TextLineClamp, TextOnline} from "@/src/components/Text";
export interface DataHeaderPlaylist {
	thumbnail_m?: string,
	title?: string,
	artist_names?: string,
	sort_description?: string,
}
const HeaderPlaylist = ({ thumbnail_m, title, artist_names, sort_description}: DataHeaderPlaylist) => {
	return(
		<Flex
			sx={{
				"@media screen and (min-width: 1200px)":{
					flexDirection: 'column',
					width: '300px',
				}
			}}
		>
			<Image
				alt=""
				src={thumbnail_m}
				sx={{
					height: '300px',
					width: '300px',
					borderRadius: '8px',
					"@media screen and (max-width: 1200px)": {
						height: '200px',
						width: '200px',
					},
				}}
			/>
			<Flex
				sx={{
					"@media screen and (max-width: 1200px)":{
						flexDirection: 'column',
						marginLeft: '25px'
					},
					"@media screen and (min-width: 1200px)":{
						justifyContent: 'center',
						marginTop: '12px',
						flexDirection: 'column',
					}
				}}
			>
				<Flex
					sx={{
						flexDirection: 'column',
						width: '100%',
						height: '100%',
						"@media screen and (min-width: 1200px)":{
							textAlign: 'center'
						}
					}}
				>
					<TextLineClamp
						line={2}
						sx={{
							fontSize: '20px',
							fontWeight: '700',
							color: 'white',
							lineHeight: '30px',
						}}
					>{title}</TextLineClamp>
					<TextOnline
						sx={{
							fontSize: '12px',
							color: '#ffffff80',
							fontWeight: '600',
							lineHeight: '21px',
						}}>
						{artist_names}
					</TextOnline>
					<TextLineClamp
						line={2}
						sx={{
							fontSize: '14px',
							fontWeight: '600',
							color: '#ffffff80',
							lineHeight: '21px',
							"@media screen and (min-width: 1200px)": {
								display: 'none',
							}
						}}
					>{sort_description}</TextLineClamp>
				</Flex>
			</Flex>
		</Flex>
	);
}
export default HeaderPlaylist;
