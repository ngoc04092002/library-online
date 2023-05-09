import React, { useState } from 'react';
import { Button, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledTableCell } from './TableBooks';
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteBookById } from '@/infrastructure/dashboardActions';
import { getToast } from '@/utils/CustomToast';
import Loading from '@/components/Loading/Loading';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/pages/firebase';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Rows = ({ row }) => {
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (id) => {
			const res = deleteBookById(id);
			return res;
		},
	});

	const handleDelete = () => {
		setOpen(false);
		mutate(row.id, {
			onError: (res) => {
				getToast('', 'network bad');
			},
			onSuccess: (res) => {
				if (res.data) {
					let ibe = row.src.indexOf('%2F');
					let ila = row.src.indexOf('?');
					let res = row.src.slice(ibe + 3, ila);
					const desertRef = ref(storage, `images/${res}`);
					deleteObject(desertRef);
					getToast('Xóa thành công!', 'success');
					queryClient.invalidateQueries({ queryKey: ['books'] });
				} else {
					getToast('Đã có lỗi!', 'error');
				}
			},
		});
	};
	return (
		<>
			<StyledTableRow key={row.title}>
				<StyledTableCell
					component='th'
					scope='row'
				>
					{row.title}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='right'
				>
					{row.author}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='right'
				>
					{row.type}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='right'
				>
					{row.releaseDate}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='right'
				>
					{row.pages}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='right'
				>
					{row.quantitySold}
				</StyledTableCell>
				<StyledTableCell
					className='flex'
					align='center'
				>
					<a href={`/dash-board/admin/book/${row.id}`}>
						<Button
							variant='contained'
							color='primary'
							className='mr-2 bg-[#1976d2]'
						>
							View
						</Button>
					</a>
					<Button
						variant='contained'
						color='error'
						className='bg-[#d32f2f]'
						onClick={handleOpen}
						disabled={isLoading}
					>
						{isLoading ? <Loading /> : 'Delete'}
					</Button>
				</StyledTableCell>
			</StyledTableRow>
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleDelete}
			/>
		</>
	);
};

export default Rows;
