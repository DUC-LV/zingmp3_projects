import React, { useState, useEffect } from "react";
import {GetServerSideProps} from "next";
import getHome from "@/src/services/getHome";

type Props = {
	data: Array<object>
}
export const getServerSideProps: GetServerSideProps<Props> = async () => {
	const res = await getHome.getAll();
	return {
		props: {
			data: res.data.data,
		}
	}
}
const Home = ({ data }: Props) => {
	console.log(data)
	return(
		<div></div>
	);
}
export default Home;
