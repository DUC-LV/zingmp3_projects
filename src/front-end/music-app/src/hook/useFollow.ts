import React, { useCallback, useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";


export const useFollow = (id:number) => {

	const [follow, setFollow] = useState(false);

	useEffect(() => {
		setFollow(!follow);
	}, [follow, id])

	const toggleFollow = useCallback(async () => {
		setFollow(!follow);
		return (await axiosInstance.post('update-follow/', { id: id })).data.data;
	}, [follow, id])

	return { follow: follow, toggleFollow: toggleFollow }
}
