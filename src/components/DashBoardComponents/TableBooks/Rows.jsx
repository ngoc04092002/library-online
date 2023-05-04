import React, { useState } from 'react';
import { Button, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { StyledTableCell } from './TableBooks';
import DialogConfirm from '@/components/DialogConfirm/DialogConfirm';

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
	const [open, setOpen] = useState(false);
	const handleClose = () => {
		setOpen(false);
	};
	const handleOpen = () => {
		setOpen(true);
	};

	const handleDelete = () => {
		console.log('deleted');
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
				<StyledTableCell align='right'>{row.author}</StyledTableCell>
				<StyledTableCell align='right'>{row.type}</StyledTableCell>
				<StyledTableCell align='right'>{row.releaseDate}</StyledTableCell>
				<StyledTableCell align='right'>{row.pages}</StyledTableCell>
				<StyledTableCell align='right'>{row.quantitySold}</StyledTableCell>
				<StyledTableCell align='center'>
					<Link to={`/dash-board/admin/book/${row.id}`}>
						<Button
							variant='contained'
							color='primary'
							className='mr-2 bg-[#1976d2]'
						>
							View
						</Button>
					</Link>
					<Button
						variant='contained'
						color='error'
						className='bg-[#d32f2f]'
						onClick={handleOpen}
					>
						Delete
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
