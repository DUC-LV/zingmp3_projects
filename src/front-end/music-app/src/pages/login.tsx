import { useRouter } from "next/router";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, Button, Flex, Text } from "theme-ui";
import InputItem, { useFormInput } from "../components/InputItem";
import ReponsiveContainer from "../components/ReponsiveContainer";
import axiosInstance from "../services/axiosInstance";


const LoginPage = () => {
	const username = useFormInput('');
	const password = useFormInput('');
	const router = useRouter();
	const handleLogin = (e:any) => {
		e.preventDefault();
		try {
			axiosInstance.post('api/login/', { username: username.value, password: password.value}).then(res => {
				localStorage.setItem("access_token", res.data.access);
				localStorage.setItem('refresh_token', res.data.refresh);
				setTimeout(() => {
					router.push('/')
				}, 1000)
			})
		} catch (err){
		}
		toast.success("Đăng nhập thành công!")
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
							<InputItem
								title="Tài Khoản"
								value={username}
								type="text"
								placeholder="Nhập tài khoản"
							/>
						</Box>
						<Box sx={{ marginY: '20px'}}>
							<InputItem
								title="Mật khẩu"
								value={password}
								type="password"
								placeholder="Nhập mật khẩu"
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
						<Flex
							sx={{ marginY: '20px', justifyContent: 'center'}}
							onClick={() => {
								router.push('/register')
							}}
						>
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
			<ToastContainer />
		</ReponsiveContainer>
	);
}
export default LoginPage;
