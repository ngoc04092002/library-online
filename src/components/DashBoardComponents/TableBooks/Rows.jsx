import React, { useContext, useState } from 'react';
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
import { BackDropContext } from '@/pages/Home';

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
