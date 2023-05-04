import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import './book.scss';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import { getBookById } from '@/infrastructure/dashboardActions';

const currencies = ['A', 'B', 'C', 'D'];
const initValueImg = {
	url: '',
	file: null,
};

const Book = () => {
	const { id } = useParams();
	const [avatar, setAvatar] = useState(initValueImg);
	const [edit, setEdit] = useState(true);
	const isEdit = Number.isInteger(+id);
	const { data, isLoading } = useQuery({
		queryKey: [`book/${id}`, id],
		queryFn: () => getBookById(id),
		staleTime: 10 * 60 * 1000,
		cacheTime: 20 * 60 * 1000,
		enabled: isEdit,
	});

	const handlePreviewAvatar = (e) => {
		if (!e.target.files?.length) {
			return;
		}

		const file = URL.createObjectURL(e.target.files[0]);
		setAvatar({ url: file, file: e.target.files[0] });
	};
	const handleClickEdit = (e) => {
		e.preventDefault();
		setEdit(false);
	};

	useEffect(() => {
		return () => {
			avatar && URL.revokeObjectURL(avatar.url);
		};
	}, [avatar]);

	if (isLoading && isEdit) return <Loading />;
	const res = data?.data;

	return (
		<div className='book_container w-full bg-white p-2 pb-12 mb-12'>
			<h1 className='w-full text-center font-bold text-lg'>Sách</h1>
			<form className='w-full'>
				<div className='flex items-start flex-wrap justify-between'>
					<div className='w-[58%]'>
						<div className='mb-6 flex justify-between'>
							<TextField
								disabled={isEdit && edit}
								id='title'
								label='Tiêu đề'
								name='title'
								value={res?.title || ''}
								required
								className='mr-2 w-[45%]'
							/>
							<TextField
								disabled={isEdit && edit}
								id='author'
								label='Tác giả'
								name='author'
								value={res?.author || ''}
								required
								className='w-[45%]'
							/>
						</div>
						<TextField
							disabled={isEdit && edit}
							id='des'
							label='Mô tả về sách'
							value={res?.des || ''}
							name='des'
							multiline
							className='w-full'
						/>
						<div className='my-6 flex justify-between'>
							<TextField
								disabled={isEdit && edit}
								id='releaseDate'
								label='Ngày phát hàng'
								value={res?.releaseDate || ''}
								name='releaseDate'
								required
								type='date'
								className='mr-2 w-[45%]'
								focused
							/>
							<TextField
								disabled={isEdit && edit}
								type='number'
								value={res?.pages || ''}
								id='pages'
								label='Số trang'
								name='pages'
								className='w-[45%]'
							/>
						</div>
						<TextField
							disabled={isEdit && edit}
							id='type'
							select
							label='Thể loại'
							name='type'
							value={res?.type || ''}
							className='w-1/2'
							defaultValue=''
						>
							{currencies.map((option) => (
								<MenuItem
									key={option}
									value={res?.type || option}
								>
									{res?.type || option}
								</MenuItem>
							))}
						</TextField>
					</div>
					<div className='flex flex-col w-[38%] items-center'>
						<Button
							disabled={isEdit && edit}
							variant='contained'
							component='label'
							className='w-fit mb-4'
						>
							Upload
							<input
								hidden
								accept='image/*'
								multiple
								type='file'
								onChange={handlePreviewAvatar}
							/>
						</Button>
						{avatar.url && (
							<img
								src={avatar.url}
								alt=''
								className='w-full h-[300px]'
							/>
						)}
					</div>
				</div>
				<Button
					onClick={handleClickEdit}
					type='submit'
					variant='contained'
					className='text-end bg-[#1976d2] float-right mt-3'
				>
					{isEdit ? (edit ? 'Edit' : 'Save') : 'Add'}
				</Button>
			</form>
		</div>
	);
};

export default Book;
