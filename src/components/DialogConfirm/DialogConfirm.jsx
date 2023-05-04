import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogConfirm({ open = false, handleAccept, handleClose }) {
	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby='alert-dialog-title'
			aria-describedby='alert-dialog-description'
		>
			<DialogTitle id='alert-dialog-title'>Bạn đã chắc chắn chưa?</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose}>Hủy bỏ</Button>
				<Button
					onClick={handleAccept}
					autoFocus
				>
					Xác nhận
				</Button>
			</DialogActions>
		</Dialog>
	);
}
