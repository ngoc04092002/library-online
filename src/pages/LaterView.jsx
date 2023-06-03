import { BookOrders } from '@/components';
import DialogConfirm from '@/components/DialogConfirm';
import Loading from '@/components/Loading';
import HeadTitle from '@/hooks/Head';
import { deleteOrdersByName, getOrdersByName } from '@/infrastructure/dashboardActions';
import { getToast } from '@/utils/CustomToast';
import { Button } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useEffect, useState } from 'react';
import { BackDropContext } from './Home';

const LaterView = () => {
	HeadTitle('Orders');
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);
	const name = localStorage.getItem('name') ? JSON.parse(localStorage.getItem('name')) : [];
	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};
	const handleOpen = () => {
		setOpen(true);
		toggleBackDrop();
	};

	useEffect(() => {
		if (!showBackDrop) {
			setOpen(false);
		}
	}, [showBackDrop]);

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
				getToast('Xóa thành công', 'success');
				toggleBackDrop();
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
			<div className='py-20 px-10'>
				<h1 className='text-2xl font-bold text-center mb-10'>Các đơn đặt</h1>
				{datas && !!datas.length ? (
					<Button
						variant='contained'
						color='primary'
						className='mr-2 !bg-[#f03c3c] !mb-4'
						onClick={handleOpen}
						disabled={deleteLoading}
					>
						{deleteLoading ? <Loading /> : 'Hủy tất cả'}
					</Button>
				) : (
					<a
						href='/'
						className='text-blue-600 text-center underline'
					>
						Quay lại đặt sách
					</a>
				)}

				<div>
					<BookOrders fakeDatas={datas} />
				</div>
			</div>
			{showBackDrop && (
				<DialogConfirm
					open={open}
					handleClose={handleClose}
					handleAccept={handleDeleteAll}
				/>
			)}
		</>
	);
};

export default LaterView;
