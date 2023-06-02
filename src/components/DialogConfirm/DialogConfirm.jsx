import * as React from 'react';
import Button from '@mui/material/Button';

export default function DialogConfirm({ open = false, handleAccept, handleClose }) {
	if (!open) {
		return null;
	}
	return (
		<div className='!z-[100000] bg-white fixed top-[50%] left-[50%] -translate-y-1/2 -translate-x-1/2 p-3 rounded-md'>
			<h1
				id='alert-dialog-title'
				className='cursor-default font-bold text-lg mb-4'
			>
				Bạn đã chắc chắn chưa
			</h1>
			<div className='flex items-center justify-around'>
				<Button
					className='cursor-pointer'
					onClick={handleClose}
				>
					Hủy
				</Button>
				<Button
					onClick={handleAccept}
					autoFocus
					className='cursor-pointer'
				>
					Xác nhận
				</Button>
			</div>
		</div>
	);
}
