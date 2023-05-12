import { BookOrders } from '@/components';
import DialogConfirm from '@/components/DialogConfirm';
import Loading from '@/components/Loading';
import HeadTitle from '@/hooks/Head';
import { deleteOrdersByName, getOrdersByName } from '@/infrastructure/dashboardActions';
import { getToast } from '@/utils/CustomToast';
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';

const LaterView = () => {
	HeadTitle('Orders');
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const name = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const { mutate, isLoading: deleteLoading } = useMutation({
		mutationFn: (data) => {
			const res = deleteOrdersByName(data);
			return res;
		},
	});
	const { data, isLoading } = useQuery({
		queryKey: ['orders-name', name],
		queryFn: () => getOrdersByName({ name: name.join(',') }),
		staleTime: 30 * 1000,
		cacheTime: 60 * 1000,
		enabled: !!name,
	});

	const handleDeleteAll = () => {
		setOpen(false);
		mutate(name, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
				if (!r.data) {
					getToast('error delete, try again', 'network bad');
					return;
				}
				localStorage.removeItem('name');
				queryClient.invalidateQueries({ queryKey: [`orders/${name}`] });
				getToast('order success', 'success');
			},
		});
	};

	if (isLoading && !!name) return <Loading />;
	const datas = !!name ? data.data : [];

	if (!datas && !!name) {
		localStorage.removeItem('name');
	}

	return (
		<>
			<div className='py-12 px-10'>
				<h1 className='text-2xl font-bold text-center mb-10'>Orders</h1>
				{datas && !!datas.length ? (
					<Button
						variant='contained'
						color='primary'
						className='mr-2 bg-[#1976d2]'
						onClick={handleOpen}
						disabled={deleteLoading}
					>
						{deleteLoading ? <Loading /> : 'Delete All'}
					</Button>
				) : (
					<a
						href='/'
						className='text-blue-600 text-center underline'
					>
						Order book
					</a>
				)}

				<div>
					<BookOrders fakeDatas={datas} />
				</div>
			</div>
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleDeleteAll}
			/>
		</>
	);
};

export default LaterView;
