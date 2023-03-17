import { useRouter } from "next/router";
import React from "react";
import { toast, ToastContainer } from "react-toastify";
import { Box, Flex, Text, Button } from "theme-ui";
import InputItem, { useFormInput } from "../components/InputItem";
import ReponsiveContainer from "../components/ReponsiveContainer";
import axiosInstance from "../services/axiosInstance";


const Register = () => {
	const username = useFormInput('');
	const email = useFormInput('')
	const password = useFormInput('');
	const router = useRouter();
	const handleRegister = (e:any) => {
		e.preventDefault();
		try {
			axiosInstance.post('api/register/', { username: username.value, email: email.value, password: password.value}).then(res => {
				console.log(res)
				setTimeout(() => {
					router.push('/login')
				}, 1000)
			})
		} catch (err){
		}
		toast.success("Đăng kí thành công!")
	}
	return(
		<ReponsiveContainer>
			<Flex sx={{ justifyContent: 'center', alignContent: 'center'}}>
				<Box
					sx={{
						padding: '14px',
						borderRadius: '16px',
						height: '400px',
						width: '450px',
						backgroundColor: '#34224f',
						marginTop: '40px'
					}}
				>
					<Text as="h1" sx={{ fontSize: '20px', color: 'white', marginBottom: '20px', textAlign: 'center' }}>Đăng kí</Text>
					<Box>
						<Box sx={{ marginY: '20px'}}>
							<InputItem
								title="Tài Khoản"
								type="text"
								placeholder="Nhập tài khoản"
								value={username}
							/>
						</Box>
						<Box sx={{ marginY: '20px'}}>
							<InputItem
								title="Email"
								type="text"
								placeholder="Nhập Email"
								value={email}
							/>
						</Box>
						<Box sx={{ marginY: '20px'}}>
							<InputItem
								title="Mật khẩu"
								type="password"
								placeholder="Nhập mật khẩu"
								value={password}
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
							onClick={handleRegister}
						>Đăng kí</Button>
					</Box>
				</Box>
			</Flex>
			<ToastContainer />
		</ReponsiveContainer>
	);
}
export default Register;
