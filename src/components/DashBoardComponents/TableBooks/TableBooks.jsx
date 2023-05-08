import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { getAllBooks } from '@/infrastructure/dashboardActions';
import Loading from '@/components/Loading';
import Rows from './Rows';
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

export default function TableBooks() {
    const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ['books'],
		queryFn: () => getAllBooks(),
		staleTime: 10 * 60 * 1000,
		cacheTime: 20 * 60 * 1000,
	});
	if (isLoading) return <Loading />;
	const res = data?.data;

    const clickAddBook = ()=>{
        navigate('/dash-board/admin/book/add-book');
    }
	return (
		<section className='bg-white w-full p-2'>
			<Button
				variant='contained'
				color='primary'
                className='bg-[#1976d2] mb-4'
				onClick={clickAddBook}
			>
				Add book
			</Button>
			<TableContainer component={Paper}>
				<Table
					sx={{ minWidth: 700 }}
					aria-label='customized table'
				>
					<TableHead>
						<TableRow>
							<StyledTableCell>Tiêu đề</StyledTableCell>
							<StyledTableCell className='whitespace-nowrap' align='right'>Tác giả</StyledTableCell>
							<StyledTableCell className='whitespace-nowrap' align='right'>Thể loại</StyledTableCell>
							<StyledTableCell className='whitespace-nowrap' align='right'>Ngày phát hàng</StyledTableCell>
							<StyledTableCell className='whitespace-nowrap' align='right'>Số trang</StyledTableCell>
							<StyledTableCell className='whitespace-nowrap' align='right'>Số lượng đã bán</StyledTableCell>
							<StyledTableCell align='center'>Hành động</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{res.map((row) => (
							<Rows
								row={row}
								key={row.id}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</section>
	);
}
