import React, { useEffect, useState } from "react";
import { Box } from "theme-ui";
import Header from "../components/Header";
import SearchBar from "./SearchBar";
import axios from "axios";
import axiosInstance from "../services/axiosInstance";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	const [data, setData] = useState();
	useEffect(() => {
		if(!localStorage.getItem('access_token')){
			return;
		}
		axiosInstance.get('user-info/').then(res => {
			setData(res.data.data);
		})
	}, [])
	return(
		<Box>
			<Header />
			<SearchBar
				checkout={checkout ? checkout : ''} data={data}/>
			{children}
		</Box>
	)
}
export default Layout;
