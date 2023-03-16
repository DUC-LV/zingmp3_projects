import { useRouter } from "next/router";
import React, { useState } from "react";
import { Box, Button, Flex, Input, Text } from "theme-ui";
import ReponsiveContainer from "../components/ReponsiveContainer";
import axiosInstance from "../services/axiosInstance";


const useFormInput = (initialValue: string) => {
	const [value, setValue] = useState(initialValue);

	const handleChange = (e:any) => {
		setValue(e.target.value);
	}
	return {
		value,
		onChange: handleChange
	}
}

const LoginPage = () => {
	const username = useFormInput('');
	const password = useFormInput('');
	const router = useRouter();
	const handleLogin = (e:any) => {
		e.preventDefault();
		try {
			axiosInstance.post('api/login/', { username: username.value, password: password.value}).then(res => {
				localStorage.setItem("token", res.data.access);
				setTimeout(() => {
					router.push('/')
				}, 500)
			})
		} catch (err){
		}
	}
	return(
		<ReponsiveContainer>
			<Flex sx={{ justifyContent: 'center', alignContent: 'center'}}>
				<Box
					sx={{
						padding: '14px',
						borderRadius: '16px',
						height: '330px',
						width: '450px',
						backgroundColor: '#34224f',
						marginTop: '40px'
					}}
				>
					<Text as="h1" sx={{ fontSize: '20px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>Đăng nhập</Text>
					<Box>
						<Box sx={{ marginY: '20px'}}>
							<Text sx={{ fontSize: '16px', color: 'white'}}>Tài khoản</Text>
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
								{...username}
							/>
						</Box>
						<Box sx={{ marginY: '20px'}}>
							<Text sx={{ fontSize: '16px', color: 'white'}}>Mật khẩu</Text>
							<Input
								placeholder="Nhập mật khẩu"
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
								type="password"
								{...password}
							/>
						</Box>
						<Button
							sx={{
								width: '100%',
								background: 'red',
								border: 'none',
								height: '40px',
								cursor: 'pointer',
								fontWeight: '600',
								outline: 'none'
							}}
							onClick={handleLogin}
						>Đăng nhập</Button>
						<Flex sx={{ marginY: '20px', justifyContent: 'center'}}>
							<Text
								as="h5"
								sx={{
									color: 'white',
									fontSize: '18px',
									cursor: 'pointer',
									":hover": {
										textDecoration: 'underline',
										color: 'red'
									}
								}}
							>Đăng kí</Text>
						</Flex>
					</Box>
				</Box>
			</Flex>
		</ReponsiveContainer>
	);
}
export default LoginPage;
