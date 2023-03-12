import React from "react";
import { Box } from "theme-ui";

const ReponsiveContainer = ({ children }: React.PropsWithChildren<{}>) => {
	return(
		<Box
		sx={{
			margin: '100px 0px 0px 240px',
			padding: '0px 50px',
			"@media screen and (max-width: 1133px)": {
				margin: '100px 0px 0px 70px',
				padding: '0px 10px',
			}
		}}
		>{children}</Box>
	);
}
export default ReponsiveContainer;
