import React, {useCallback, useEffect, useState} from "react";
import {Box} from "theme-ui";
import {useRouter} from "next/router";
import getCategoryVideo from "@/src/services/getCategoryVideo";
import ReponsiveContainer from "@/src/components/ReponsiveContainer";
import MenuVideo from "@/src/container/video/MenuVideo";
import ListVideo from "@/src/container/video/ListVideo";
import { LoadingVideo } from "@/src/container/Loading/SkeletonLoading";
type Props = {
	data: Array<object>
}
export async function getServerSideProps({ query }: any) {
	try {
		if(query?.id){
			const res = await getCategoryVideo.getAll(query.id);
			return {
				props: {
					data: res.data.data,
				}
			};
		}
	} catch (error) {
		console.log(error)
	}
}

const VideoCategoriesPage = ({ data }: Props) => {
	const type = {
		tab: "TAB",
		list: "LIST"
	};
	const router = useRouter();
	console.log(router.pathname)
	const [id, setId] = useState(router.query.id ? Number(router.query.id) : 1);
	const pushRoute = useCallback(
		(id: number) => {
			router.push(`videos/${id}?id=${id}`);
		},
		[router]
	);
	const selectTab = async (id: number) => {
		pushRoute(id);
		setId(id);
	};
	useEffect(() => {
		if (!/videos/.test(router.asPath)) {
			return;
		}
		if(!router.query.id){
			router.replace(
				`videos/[categoryVideo]?id=${id}`,
				`videos/${id}?id=${id}`,
				{ shallow: true}
			)
		}
		else {
			setId(Number(router.query.id))
		}
	}, [id, router]);
	const generateContent = useCallback(() => {
		return data?.map((section:any, idx:number) => {
			if(!section.items || section.items.length === 0){
				return null
			}
			switch (section.type){

				case type?.tab:
					return(
						<MenuVideo
							key={idx}
							data={section?.items}
						/>
					)

				case type?.list:
					return (
						<ListVideo
							key={idx}
							data={section?.items}
						/>
					)

				default:
					return null;
			}
		})
	}, [data, type?.list, type?.tab])
	const hasData = data && data?.length > 0;
	const [loading, setLoading] = useState(hasData);

	useEffect(() => {
		if(hasData){
			setTimeout(() => {
				setLoading(false);
			}, 200)
		}
	}, [hasData])

	if(loading){
		return(
			<ReponsiveContainer>
				<LoadingVideo />
			</ReponsiveContainer>
		);
	}
	return(
		<ReponsiveContainer>
			{generateContent()}
		</ReponsiveContainer>
	);
}
export default  VideoCategoriesPage;
