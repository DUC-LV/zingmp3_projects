import React, {PropsWithChildren, useEffect, useState} from "react";
import {Box, Button, Flex} from "theme-ui";
import { TextOnline} from "@/src/components/Text";
import {toast} from "react-toastify";
import loading = toast.loading;
export const BackDrop = ({
	onClick,
	hidden,
	children,
}: React.PropsWithChildren<{ onClick?: () => void; hidden?: boolean }>) => (
	<Flex
		sx={{
			visibility: hidden ? 'hidden' : 'visible',
			opacity: hidden ? 0 : 1,
			transition: '400ms',
			position: 'fixed',
			top: 0,
			left: 0,
			right: 0,
			bottom: 0,
			zIndex: 1000,
			backgroundColor: 'rgba(0,0,0,0.6)',
			backdropFilter: 'blur(5px)',
			backgroundBlendMode: 'multiply',
		}}>
		<Flex sx={{ position: 'absolute', width: '100%', height: '100%' }} onClick={onClick} />
		<Flex sx={{ width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>{children}</Flex>
	</Flex>
);
type PopupProps = {
	type?: 'default' | 'success' | 'error',
	title?: string,
	isShow?:boolean,
	onClose: () => void,
	showClose?: boolean,
	message?: string,
	actions?: { key: string; title: string; link?: string }[];
	onAction?: (key: string) => void;
}
const Popup = ({
	type = 'default',
	title,
	isShow: showed,
	onClose: handleOnclose,
	showClose,
	message,
	actions: actionsProps,
	onAction,
}: PropsWithChildren<PopupProps>) => {
	const [isShow, setIsShow] = useState(showed)
	useEffect(() => {
		setIsShow(showed);
	}, [showed]);
	if (!showed) return null;
	const onClose = () => {
		setIsShow(false);
		setTimeout(() => {
			handleOnclose();
		}, 400);
	};
	const actions = actionsProps ?? [{ key: 'close', title: 'Đóng' }];
	return(
		<BackDrop hidden={!isShow} onClick={onClose}>
			<Box
				sx={{
					visibility: !isShow ? 'hidden' : 'visible',
					opacity: !isShow ? 0 : 1,
					transition: '400ms',
					borderRadius: '16px',
					backgroundColor: '#34224f',
					boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
					position: 'fixed',
					top: '50%',
					left: '50%',
					transform: 'translate(-50%, -50%)',
					p: '24px',
				}}
			>
				<TextOnline
					sx={{
						fontWeight: 'bold',
						fontSize: '22px',
						color: 'rgba(255,255,255,0.87)',
						lineHeight: '40px',
						mb: '24px',
						paddingX: '30px',
						textAlign: 'center',
					}}
				>{title}</TextOnline>
				{ message && (
					<TextOnline
						sx={{
							textAlign: 'center',
							fontSize: '18px',
							lineHeight: '24px',
							color: 'rgba(255,255,255,0.87)',
							fontWeight: 'bold',
						}}
					>{message}</TextOnline>
				)}
				{actions && actions.length > 0 && (
					<Flex sx={{ justifyContent: 'space-around', mt: '40px' }}>
						{actions.map(action => {
							console.log(action.key)
							const button = (
								<Button
									title={action.title}
									variant="primary"
									key={action.key}
									sx={{
										width: '184px',
										background: action.key === 'ok' ? 'red' : '#34224f',
										cursor: 'pointer',
										border: action.key === 'cancel' ? '1.5px solid white' : '',
										height: '40px',
										borderRadius: '8px',
									}}
									onClick={() => {
										if (onAction) {
											setTimeout(() => {
												onAction(action.key);
											}, 150);
										} else {
											onClose();
										}
									}}>
									{action.title}
								</Button>
							);
							return action.link ? (
								<a key={action.key} href={action.link} target="_blank" rel="noreferrer">
									{button}
								</a>
							) : (
								button
							);
						})}
					</Flex>
				)}
			</Box>
		</BackDrop>
	)
}
export default Popup;
