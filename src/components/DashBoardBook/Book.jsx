import { Button, MenuItem, TextField } from '@mui/material';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { v4 } from 'uuid';

import './book.scss';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loading from '../Loading';
import { createBook, getBookById, updateBook } from '@/infrastructure/dashboardActions';
import DialogConfirm from '../DialogConfirm';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/pages/firebase';
import { getToast } from '@/utils/CustomToast';
import { types, initValue, initValueImg } from '@/constants/initialValueBook';
import { validateFromBook } from '@/utils/ValidateForm';
import { deleteFirebaseImgPath } from '@/utils/DeleteFirebaseImgPath';
import { BackDropContext } from '@/pages/Home';

const Book = () => {
	const queryClient = useQueryClient();
	const { id } = useParams();
	const isEdit = Number.isInteger(+id);
	const { showBackDrop, toggleBackDrop } = useContext(BackDropContext);

	const [avatar, setAvatar] = useState(initValueImg);
	const [edit, setEdit] = useState(true);
	const [open, setOpen] = useState(false);
	const [value, setValue] = useState(initValue);

	const { data, isLoading } = useQuery({
		queryKey: [`book/${id}`, id],
		queryFn: () => getBookById(id),
		enabled: isEdit,
	});

	const handlePreviewAvatar = (e) => {
		if (!e.target.files?.length) {
			return;
		}

		const file = URL.createObjectURL(e.target.files[0]);
		setAvatar({ url: file, file: e.target.files[0] });
	};

	const handleClose = () => {
		toggleBackDrop();
		setOpen(false);
	};

	const { mutate, isLoading: loadingEdit } = useMutation({
		mutationFn: (data) => {
			const result = isEdit ? updateBook(data, res) : createBook(data);
			return result;
		},
	});

	const handleSubmit = () => {
		setOpen(false);
		toggleBackDrop();
		const formData = {
			title: value.title || res?.title,
			author: value.author || res?.author,
			des: value.des || res?.des,
			releaseDate: value.releaseDate || res?.releaseDate,
			pages: value.pages || res?.pages,
			type: value.type || res?.type,
			quantitySold: 0,
		};
		if (isEdit) {
			formData.id = res?.id;
		}

		const imageRef = ref(storage, `/images/${avatar.file?.name + v4()}`);
		uploadBytes(imageRef, avatar.file)
			.then((d) => {
				getDownloadURL(d.ref)
					.then((url) => {
						formData.src = avatar.file ? url : res?.src;
						console.log(formData);
						mutate(formData, {
							onError: (res) => {
								if (typeof res.response?.data === 'string') {
									getToast(res.response?.data, 'error');
								}
								deleteFirebaseImgPath(url);
								getToast('', 'network bad');
							},
							onSuccess: (r) => {
								if (r.data === 'ok') {
									if (isEdit) {
										// Delete the old file
										if (!avatar.file) {
											deleteFirebaseImgPath(url);
										} else {
											deleteFirebaseImgPath(res?.src);
										}
									}
									getToast(`${isEdit ? 'Sửa' : 'Tạo'} successfully`, 'success');
									if (!isEdit) {
										setValue(initValue);
										setAvatar(initValueImg);
									}
									queryClient.invalidateQueries({ queryKey: ['books'] });
								} else {
									// Delete the old file
									deleteFirebaseImgPath(url);
									getToast(r.data, 'warn');
								}
							},
						});
					})
					.catch((err) => {
						getToast('Lỗi tải ảnh', 'warn');
					});
			})
			.catch((err) => {
				getToast('Lỗi tải ảnh', 'warn');
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

	console.log(res, value);
	console.log('type==>', value.type || res?.type);

	const handleClickEdit = (e) => {
		e.preventDefault();
		if (isEdit) {
			if (edit) setEdit(false);
			if (!edit) {
				validateFromBook(
					value.releaseDate || res.releaseDate,
					value.author || res.author,
					value.title || res.title,
					avatar.url || res.src,
					() => {
						toggleBackDrop();
						setOpen(true);
					},
				);
			}
		} else {
			validateFromBook(value.releaseDate, value.author, value.title, avatar.url, () => {
				toggleBackDrop();
				setOpen(true);
			});
		}
	};

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
									value={value.title || (res ? res?.title : '')}
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
									value={value.author || (res ? res?.author : '')}
									required
									className='w-[45%]'
								/>
							</div>
							<TextField
								disabled={isEdit && edit}
								id='des'
								required
								label='Mô tả về sách'
								value={value.des || (res ? res?.des : '')}
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
									value={value.releaseDate || (res ? res?.releaseDate : '')}
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
									value={value.pages || (res ? res?.pages : '')}
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
								value={value.type || res?.type}
								className='w-1/2'
								defaultValue=''
							>
								{types.map((option) => (
									<MenuItem
										key={option}
										value={option}
									>
										{option}
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
							{(avatar.url || res?.src) && (
								<img
									src={avatar.url || res?.src}
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
			{showBackDrop && (
				<DialogConfirm
					open={open}
					handleClose={handleClose}
					handleAccept={handleSubmit}
				/>
			)}
		</>
	);
};

export default Book;
