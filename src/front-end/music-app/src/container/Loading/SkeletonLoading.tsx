import React from "react";
import { Grid, AspectRatio, Box } from "theme-ui";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import 'react-loading-skeleton/dist/skeleton.css';

const LoadingHome = () => {
	const arr = new Array(3).fill(0);
	return(
		<SkeletonTheme baseColor="rgba(244,246,248,0.05)" highlightColor="rgba(244,246,248,0.05)">
			<SkeletonSlider />
			<Box>
				{arr.map(() => (
					<SkeletonItem key={Math.random()}/>
				))}
			</Box>
		</SkeletonTheme>
	);
}
export default LoadingHome;

export const LoadingVideo = () => {
	const arr = new Array(4).fill(0);
	const arrMenu = new Array(5).fill(0);
	return(
		<SkeletonTheme baseColor="rgba(244,246,248,0.05)" highlightColor="rgba(244,246,248,0.05)">
			<Box>
				<Grid columns={9} gap={20} sx={{ marginBottom: '30px' }}>
					{arrMenu.map(() => (
						<Box key={Math.random()} sx={{ maxWidth: '100px' }}>
							<Skeleton width={'100%'} height={'25px'}/>
						</Box>
					))}
				</Grid>
				{arr.map(() => (
					<Box key={Math.random()} sx={{ marginY: '10px'}}>
						<SkeletonVideo />
					</Box>
				))}
			</Box>
		</SkeletonTheme>
	);
}
const SkeletonVideo = () => {
	const arrVideo = new Array(3).fill(0);
	return(
		<Grid
			columns={3}
			gap={20}
			style={{
				cursor: 'wait',
			}}>
				{arrVideo.map(() => (
					<Box key={Math.random()}>
						<AspectRatio ratio={16 / 9}>
							<Skeleton width={'100%'} height={'100%'} borderRadius={10} />
						</AspectRatio>
						<Grid
							columns={6}
							sx={{ paddingY: '5px', alignItems: 'center'}}
						>
							<Skeleton circle={true} height={40} width={40}/>
							<Box>
								<Skeleton width={'150px'} height={'40%'}/>
								<Skeleton width={'150px'} height={'40%'}/>
							</Box>
						</Grid>
					</Box>
				))}
		</Grid>
	)
}

const SkeletonSlider = () => {
	const arrSliider = new Array(3).fill(0);
	return(
		<Grid
			columns={3}
			gap={20}
			style={{
				cursor: 'wait',
			}}>
				{arrSliider.map(() => (
					<Box key={Math.random()}>
						<AspectRatio ratio={16 / 9}>
							<Skeleton width={'100%'} height={'100%'} borderRadius={10} />
						</AspectRatio>
					</Box>
				))}
		</Grid>
	)
}


const SkeletonItem = () => {
	const arrSkeletonItem = new Array(5).fill(0);
	return(
		<Box sx={{ marginY: '40px'}}>
			<Skeleton
				width={'40%'}
				height={'100%'}
				baseColor="rgba(244,246,248,0.05)"
				highlightColor="rgba(244,246,248,0.05)"
				style={{ marginBottom: '15px'}}
			/>
			<Grid
				columns={5}
				gap={20}
				style={{
					cursor: 'wait',
				}}
			>
				{arrSkeletonItem.map(() => (
					<Box key={Math.random()}>
						<AspectRatio ratio={1/1}>
							<Skeleton width={'100%'} height={'100%'} borderRadius={10}/>
						</AspectRatio>
						<Skeleton width={'80%'} height={'8%'} style={{ margin: '8px 0'}}/>
						<Skeleton width={'100%'} height={'8%'} />
						<Skeleton width={'100%'} height={'8%'} />
					</Box>
				))}
			</Grid>
		</Box>
	)
}
