import React, { useState } from "react";
import { Box, Text, Input } from "theme-ui";

export const useFormInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e:any) => {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange
	}
}
type Props = {
	title?: string,
	value?: any,
	type?: string,
	placeholder?: string,
}
const InputItem = ({ title, value, type, placeholder }: Props) => {
	return(
		<Box>
			<Text sx={{ fontSize: '16px', color: 'white'}}>{title}</Text>
			<Input
				placeholder={placeholder}
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
