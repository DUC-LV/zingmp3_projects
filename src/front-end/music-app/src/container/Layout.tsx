import React, { useEffect } from "react";
import { Box } from "theme-ui";
import Header from "../components/Header";
import SearchBar from "./SearchBar";
import axios from "axios";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	// const url = 'http://localhost:8000/user-info/';
	// // eslint-disable-next-line react-hooks/exhaustive-deps
	// const config : object = {
	// 	'Authorization': typeof window !== 'undefined' ? 'Bearer ' + localStorage.getItem('access_token'): '',
	// 	'Content-Type': 'application/json',
	// 	'accept': 'application/json',
	// }
	// useEffect(() => {
	// 	axios.get(url, config).then(res => {
	// 		console.log(res)
	// 	})
	// }, [config])
	return(
		<Box>
			<Header />
			<SearchBar checkout={checkout ? checkout : ''}/>
			{children}
		</Box>
	)
}
export default Layout;
