import React from "react";
import { Box } from "theme-ui";
import Header from "../components/Header";
import SearchBar from "./SearchBar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
	const checkout = typeof window !== 'undefined' ? localStorage.getItem('access_token') : undefined;
	return(
		<Box>
			<Header />
			<SearchBar checkout={checkout ? checkout : ''}/>
			{children}
		</Box>
	)
}
export default Layout;
