import React, { useState } from "react";
import { Box, Text, Input } from "theme-ui";


type Props = {
	title?: string,
	value?: any,
	type?: string,
}
const InputItem = ({ title, value, type }: Props) => {
	return(
		<Box>
			<Text sx={{ fontSize: '16px', color: 'white'}}>{title}</Text>
			<Input
				placeholder="Nhập tài khoản"
				sx={{
					marginY: '5px',
					height: '45px',
					"::placeholder": {
						color: 'rgba(255,255,255,0.87)',
						fontSize: '14px',
						padding: '12px'
					},
					border: '1px solid rgba(255,255,255,0.87)',
					color: 'rgba(255,255,255,0.87)',
				}}
				{...value}
				type={type}
			/>
		</Box>
	);
}
export default InputItem
