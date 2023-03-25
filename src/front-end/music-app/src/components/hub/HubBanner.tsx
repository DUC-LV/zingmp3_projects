import React from "react";
import {Box, Image} from "theme-ui";
type props = {
	cover: string
}
const HubBanner = ({ cover }: props) => {
	return(
		<Box>
			<Image
				alt=""
				src={cover}
				sx={{
					width: '100%',
					borderRadius: '8px'
				}}
			/>
		</Box>
	);
}
export default HubBanner;
