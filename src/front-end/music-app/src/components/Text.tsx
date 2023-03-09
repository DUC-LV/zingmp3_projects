import React from "react";
import { Box, BoxProps} from "theme-ui";

export const TextOnline = ({ sx, children, ...rest}: BoxProps) => {
	return(
		<Box
			sx={{
				overflow: 'hidden',
				textOverflow: 'ellipsis',
				whiteSpace: 'nowrap',
				fontFamily: 'sans-serif',
				...sx,
			}}
		>{children}</Box>
	);
}
interface TextLineClampType {
	line: number;
}
export const TextLineClamp = ({line, sx, children, ...rest}: TextLineClampType & BoxProps) => {
	return(
		<Box
			sx={{
				display: '-webkit-box',
				WebkitLineClamp: line,
				WebkitBoxOrient: 'vertical',
				overflow: 'hidden',
				...sx,
			}}
			{...rest}
		>{children}</Box>
	);
}
