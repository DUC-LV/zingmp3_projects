import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import React, {useEffect} from "react";
import axios from "axios";

const config : object = {
	headers: {
		'Authorization': typeof window !== 'undefined' ? 'Bearer ' + localStorage.getItem('access_token'): '',
		'Content-Type': 'application/json',
		'accept': 'application/json',
	}
}
const MyMusic = () => {
	useEffect(() => {
		axios.get('http://localhost:8000/favourite/', config).then(res => {
			console.log(res.data.data.items)
		})
	}, [])
	return(
		<ReponsiveContainer></ReponsiveContainer>
	);
}
export default MyMusic;
