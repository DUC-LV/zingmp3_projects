import React from "react";
import { Box } from "theme-ui";
import Header from "../components/Header";
import SearchBar from "./SearchBar";

const Layout = ({ children }: React.PropsWithChildren<{}>) => {
	return(
		<Box>
			<Header />
			<SearchBar />
			{children}
		</Box>
	)
}
export default Layout;
