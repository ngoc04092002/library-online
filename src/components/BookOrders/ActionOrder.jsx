import React, { useState } from 'react';
import DialogConfirm from '../DialogConfirm/DialogConfirm';
import { useMutation } from '@tanstack/react-query';
import ButtonWrapper from '../helpers/ButtonWrapper';
import { updateBookQuantitySold } from '@/infrastructure/dashboardActions';
import { getToast } from '@/utils/CustomToast';

const ActionOrder = ({ setDatas }) => {
	const [open, setOpen] = useState(false);

	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (data) => {
			console.log(data);
			const res = updateBookQuantitySold(data);
			return res;
		},
	});

	const handleOrder = () => {
		const orders = JSON.parse(localStorage.getItem('orderBooks'));
		const newOrderFormat = orders.map((o) => {
			const { order, ...rest } = o;
			return {
				...rest,
				quantitySold: +order,
			};
		});
		console.log(newOrderFormat);
		mutate(newOrderFormat, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				if (r.data === 'ok') {
					setDatas([]);
					getToast('order successfully', 'success');
				} else {
					getToast(r.data, 'error');
				}
			},
		});
		setOpen(false);
	};
	return (
		<>
			<ButtonWrapper
				styles='mr-2 !bg-[#1976d2] w-full h-[50px]'
				onClick={handleOpen}
				isLoading={isLoading}
			>
				Order
			</ButtonWrapper>
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleOrder}
			/>
		</>
	);
};

export default ActionOrder;
