import React from 'react';
import { Button, TableRow } from '@mui/material';
import { styled } from '@mui/material/styles';
import { StyledTableCell } from './TableBooks';
import Loading from '@/components/Loading/Loading';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const Rows = ({ row, isLoading, handleOpen }) => {
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
					align='left'
				>
					{row.author}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='left'
				>
					{row.type}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='left'
				>
					{row.releaseDate}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='left'
				>
					{row.pages}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='left'
				>
					{row.price}
				</StyledTableCell>
				<StyledTableCell
					className='whitespace-nowrap'
					align='left'
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
						onClick={() => handleOpen(row)}
						disabled={isLoading}
					>
						{isLoading ? <Loading /> : 'Delete'}
					</Button>
				</StyledTableCell>
			</StyledTableRow>
		</>
	);
};

export default Rows;
