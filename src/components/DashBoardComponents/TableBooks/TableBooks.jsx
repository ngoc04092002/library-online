import React, { useContext, useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { deleteBookById, getAllBooks } from '@/infrastructure/dashboardActions';
import Loading from '@/components/Loading';
import Rows from './Rows';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm';
import { BackDropContext } from '@/pages/Home';
import { getToast } from '@/utils/CustomToast';
import { deleteObject, ref } from 'firebase/storage';
import { storage } from '@/pages/firebase';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const head = ['Tác giả', 'Thể loại', 'Phát hàng', 'Số trang', 'Giá', 'Đã bán'];

export default function TableBooks() {
	const navigate = useNavigate();
	const queryClient = useQueryClient();
	const [open, setOpen] = useState(false);
	const [row, setRow] = useState({});
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);

	const { data, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getAllBooks(),
	});

	const { mutate, isLoading: loadingDelete } = useMutation({
		mutationFn: (id) => {
			const res = deleteBookById(id);
			return res;
		},
	});

	if (isLoading) return <Loading />;
	const res = data?.data;

	const clickAddBook = () => {
		navigate('/dash-board/admin/book/add-book');
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};
	const handleOpen = (value) => {
		setRow(value);
		setOpen(true);
		toggleBackDrop();
	};

	const handleDelete = () => {
		toggleBackDrop();
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
		<section className='bg-white w-full p-2 mb-20'>
			<Button
				variant='contained'
				color='primary'
				className='bg-[#1976d2] mb-4'
				onClick={clickAddBook}
			>
				Add book
			</Button>
			<TableContainer
				component={Paper}
				className='h-[600px] overflow-auto'
			>
				<Table
					sx={{ minWidth: 700 }}
					aria-label='customized table'
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Tiêu đề</StyledTableCell>
							{head.map((h) => (
								<StyledTableCell
									key={h}
									className='whitespace-nowrap'
									align='left'
								>
									{h}
								</StyledTableCell>
							))}
							<StyledTableCell align='center'>Hành động</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{res.map((row) => (
							<Rows
								row={row}
								key={row.id}
								isLoading={loadingDelete}
								handleOpen={handleOpen}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			{showBackDrop && (
				<DialogConfirm
					open={open}
					handleClose={handleClose}
					handleAccept={handleDelete}
				/>
			)}
		</section>
	);
}
