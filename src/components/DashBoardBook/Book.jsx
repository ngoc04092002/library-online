import { Button, MenuItem, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import './book.scss';
import { useMutation, useQuery } from '@tanstack/react-query';
import Loading from '../Loading';
import { createBook, getBookById } from '@/infrastructure/dashboardActions';
import DialogConfirm from '../DialogConfirm';
import { deleteObject, getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/pages/firebase';
import { getToast } from '@/utils/CustomToast';

const currencies = ['A', 'B', 'C', 'D'];
const initValueImg = {
	url: '',
	file: null,
};
const initValue = {
	title: '',
	author: '',
	des: '',
	releaseDate: '',
	pages: '',
	type: '',
	quantitySold: 0,
};

const Book = () => {
	const { id } = useParams();
	const isEdit = Number.isInteger(+id);

	const [avatar, setAvatar] = useState(initValueImg);
	const [edit, setEdit] = useState(true);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(initValue);

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
		if (isEdit) {
			setEdit(false);
		} else {
			var currentDate = new Date();
			var selectedDate = new Date(value.releaseDate);
			if (![avatar.url, value.title, value.author, value.releaseDate].includes('')) {
				if (currentDate < selectedDate) {
					alert('Thời gian đã vượt qua thời điểm hiện tại');
				} else {
					setOpen(true);
				}
			} else {
				alert('Yêu cầu điền đầy đủ');
			}
		}
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { mutate, isLoading: loadingEdit } = useMutation({
		mutationFn: (data) => {
			const res = createBook(data);
			return res;
		},
	});

	const handleAdd = () => {
		setOpen(false);
		const formData = value;

		const imageRef = ref(storage, `/images/${avatar.file?.name + v4()}`);
		uploadBytes(imageRef, avatar.file)
			.then((d) => {
				getDownloadURL(d.ref)
					.then((url) => {
						formData.src = url;
						mutate(formData, {
							onError: (res) => {
								if (typeof res.response?.data === 'string') {
									getToast(res.response?.data, 'error');
								}
								getToast('', 'network bad');
							},
							onSuccess: (res) => {
								if (res.data === 'ok') {
									getToast('create successfully', 'success');
									setValue(initValue);
									setAvatar(initValueImg);
								} else {
									// Delete the old file
									let ibe = url.indexOf('%2F');
									let ila = url.indexOf('?');
									let res = url.slice(ibe + 3, ila);
									const desertRef = ref(storage, `images/${res}`);
									deleteObject(desertRef);
									
									getToast(res.data, 'warn');
								}
							},
						});
					})
					.catch((err) => {
						getToast('error upload', 'warn');
					});
			})
			.catch((err) => {
				getToast('error upload', 'warn');
			});
	};

	const handleChangeValue = (e) => {
		setValue((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	useEffect(() => {
		return () => {
			avatar && URL.revokeObjectURL(avatar.url);
		};
	}, [avatar]);

	if (isLoading && isEdit) return <Loading />;
	const res = data?.data;

	return (
		<>
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
									value={isEdit ? res?.title : value.title}
									onChange={handleChangeValue}
									required
									className='mr-2 w-[45%]'
								/>
								<TextField
									disabled={isEdit && edit}
									id='author'
									label='Tác giả'
									name='author'
									onChange={handleChangeValue}
									value={isEdit ? res?.author : value.author}
									required
									className='w-[45%]'
								/>
							</div>
							<TextField
								disabled={isEdit && edit}
								id='des'
								required
								label='Mô tả về sách'
								value={isEdit ? res?.des : value.des}
								name='des'
								onChange={handleChangeValue}
								multiline
								className='w-full'
							/>
							<div className='my-6 flex justify-between'>
								<TextField
									disabled={isEdit && edit}
									id='releaseDate'
									label='Ngày phát hàng'
									value={isEdit ? res?.releaseDate : value.releaseDate}
									name='releaseDate'
									required
									onChange={handleChangeValue}
									type='date'
									className='mr-2 w-[45%]'
									focused
								/>
								<TextField
									disabled={isEdit && edit}
									type='number'
									value={isEdit ? res?.pages : value.pages}
									id='pages'
									onChange={handleChangeValue}
									label='Số trang'
									name='pages'
									className='w-[45%]'
								/>
							</div>
							<TextField
								disabled={isEdit && edit}
								id='type'
								select
								required
								label='Thể loại'
								name='type'
								onChange={handleChangeValue}
								value={isEdit ? res?.type : value.type}
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
									required
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
						disabled={(isEdit && isLoading) || loadingEdit}
						className='text-end bg-[#1976d2] float-right mt-3'
					>
						{isEdit ? edit ? 'Edit' : 'Save' : loadingEdit ? <Loading /> : 'Add'}
					</Button>
				</form>
			</div>
			<DialogConfirm
				open={open}
				handleClose={handleClose}
				handleAccept={handleAdd}
			/>
		</>
	);
};

export default Book;
