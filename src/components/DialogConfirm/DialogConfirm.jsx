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
			className='!z-[100000]'
		>
			<DialogTitle id='alert-dialog-title'>Are you sure?</DialogTitle>
			<DialogActions>
				<Button onClick={handleClose}>Cancel</Button>
				<Button
					onClick={handleAccept}
					autoFocus
				>
					Confirm
				</Button>
			</DialogActions>
		</Dialog>
	);
}
