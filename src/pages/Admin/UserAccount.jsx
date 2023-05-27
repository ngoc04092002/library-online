import { deleteClientById, getAllClient } from '@/infrastructure/dashboardActions';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';

import { styled } from '@mui/material/styles';
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
} from '@mui/material';
import { tableCellClasses } from '@mui/material/TableCell';
import Loading from '@/components/Loading';
import ButtonWrapper from '@/components/helpers/ButtonWrapper';
import { getToast } from '@/utils/CustomToast';
import DialogConfirm from '@/components/DialogConfirm';
import { BackDropContext } from '../Home';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
	'&:nth-of-type(odd)': {
		backgroundColor: theme.palette.action.hover,
	},
	// hide last border
	'&:last-child td, &:last-child th': {
		border: 0,
	},
}));

const UserAccount = () => {
	const queryClient = useQueryClient();
	const { data, isLoading } = useQuery({
		queryKey: ['getAll-clients'],
		queryFn: () => getAllClient(),
	});

	const { toggleBackDrop, showBackDrop } = useContext(BackDropContext);
	const [open, setOpen] = useState(false);
	const [select, setSelect] = useState(0);

	const { mutate, isLoading: loadingRemove } = useMutation({
		mutationFn: (data) => {
			const res = deleteClientById(data);
			return res;
		},
	});
	const res = data?.data || [];

	const handleDeleteClient = (id) => {
		mutate(id, {
			onError: (res) => {
				if (typeof res.response?.data === 'string') {
					getToast(res.response?.data, 'error');
				}
				getToast('', 'network bad');
			},
			onSuccess: (r) => {
                if(r.data){
                    getToast('Xóa thanh công', 'success');
                    queryClient.invalidateQueries({ queryKey: ['getAll-clients'] });
                    setOpen(false);
                    toggleBackDrop();
                }else{
                    getToast('', 'network bad');
                }
			},
		});
	};

	const handleClose = () => {
		setOpen(false);
		toggleBackDrop();
	};

	const handleConfirm = (id) => {
		toggleBackDrop();
		setOpen(true);
		setSelect(id);
	};

	return (
		<>
			<TableContainer
				component={Paper}
				className='mb-14'
			>
				{isLoading ? (
					<Loading />
				) : (
					<Table
						sx={{ minWidth: 700 }}
						aria-label='customized table'
					>
						<TableHead>
							<TableRow>
								<StyledTableCell>Tên</StyledTableCell>
								<StyledTableCell align='left'>Địa chỉ</StyledTableCell>
								<StyledTableCell align='left'>Email</StyledTableCell>
								<StyledTableCell align='left'>Giới tính</StyledTableCell>
								<StyledTableCell align='left'>Quyền</StyledTableCell>
								<StyledTableCell align='center'>Hành động</StyledTableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{res.map((row) => (
								<StyledTableRow key={row.id}>
									<StyledTableCell
										component='th'
										scope='row'
									>
										{row.username}
									</StyledTableCell>
									<StyledTableCell align='left'>{row.address}</StyledTableCell>
									<StyledTableCell align='left'>{row.email}</StyledTableCell>
									<StyledTableCell align='left'>{row.gender}</StyledTableCell>
									<StyledTableCell align='left'>{row.role}</StyledTableCell>
									<StyledTableCell align='center'>
										<ButtonWrapper
											isLoading={loadingRemove}
											styles='!bg-red-500'
											onClick={()=>handleConfirm(row.id)}
										>
											Xóa
										</ButtonWrapper>
									</StyledTableCell>
								</StyledTableRow>
							))}
						</TableBody>
					</Table>
				)}
			</TableContainer>
			<DialogConfirm
				open={open && showBackDrop}
				handleClose={handleClose}
				handleAccept={() => handleDeleteClient(select)}
			/>
		</>
	);
};

export default UserAccount;
