import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form } from 'react-router-dom';
import { v4 } from 'uuid';

import FormGroup from '@/components/AuthLayoutWrapper/FormGroup';
import Button from '@/components/helpers/ButtonWrapper';
import { schemaFormEditProfie } from '@/constants/SchemaYups';
import { dataFormGroupEditProfile, dataFormGroupTextEditProfile } from '@/constants/SignUpConstant';
import { initialFormEditProfile } from '@/constants/initiallValues';
import { AuthContext } from '@/context/AuthProvider';
import { updateProfile } from '@/infrastructure/dashboardActions';
import { storage } from '@/pages/firebase';
import { getImage } from '@/utils/CustomImagePath';
import { getToast } from '@/utils/CustomToast';
import { deleteFirebaseImgPath } from '@/utils/DeleteFirebaseImgPath';

const EditProfile = () => {
	const { user, setUser } = useContext(AuthContext);

	const {
		handleSubmit,
		register,
		formState: { errors },
		reset,
		setValue,
	} = useForm({
		defaultValues: initialFormEditProfile,
		resolver: yupResolver(schemaFormEditProfie),
	});

	const [avatar, setAvatar] = useState({
		url: '',
		file: null,
	});

	const handlePreviewAvatar = (e) => {
		if (!e.target.files?.length) {
			return;
		}

		const file = URL.createObjectURL(e.target.files[0]);
		setAvatar({ url: file, file: e.target.files[0] });
	};

	const { mutate, isLoading } = useMutation({
		mutationFn: (formData) => {
			const res = updateProfile(formData, user.email);
			return res;
		},
	});
	const onSubmit = (data) => {
		const imageRef = ref(storage, `/images/${avatar.file?.name + v4()}`);
		uploadBytes(imageRef, avatar.file)
			.then((d) => {
				getDownloadURL(d.ref)
					.then((url) => {
						const oldAvatar = user.avatar;
						if (oldAvatar) {
							// Delete the old file
							deleteFirebaseImgPath(oldAvatar);
						}
						if (!avatar.file) {
							deleteFirebaseImgPath(url);
						}
						const formData = {
							username: data.username,
							email: data.email,
							address: data.address,
							sdt: data.sdt,
							gender: data.male ? 'male' : 'female',
							avatar: avatar.file ? url : '',
						};
						mutate(formData, {
							onError: (res) => {
								if (typeof res.response?.data === 'string') {
									getToast(res.response?.data, 'error');
								}
								getToast('', 'network bad');
							},
							onSuccess: (res) => {
								getToast('Cập nhật thành công!', 'success');
								setUser(res.data);
								reset();
							},
						});
					})
					.catch((err) => {
						getToast('Lỗi khi upload hình ảnh', 'warn');
					});
			})
			.catch((err) => {
				getToast('Lỗi khi upload hình ảnh', 'warn');
			});
	};

	useEffect(() => {
		return () => {
			avatar && URL.revokeObjectURL(avatar.url);
		};
	}, [avatar]);

	return (
		<Form
			onSubmit={handleSubmit(onSubmit)}
			method='post'
			className='flex items-center md:px-10 px-4 justify-between flex-wrap'
		>
			<div className='flex flex-col items-center mx-auto mb-8'>
				<div>
					<img
						src={avatar.url || getImage('user.png')}
						alt='user'
						className='w-60 h-60 object-cover object-center mb-6 rounded-full'
					/>
				</div>
				<label
					htmlFor='upload'
					className='cursor-pointer'
				>
					<Button
						styles='overflow-hidden relative'
						isLoading={isLoading}
					>
						Thay đổi{' '}
						<input
							type='file'
							accept='video/*,image/*'
							id='upload'
							className='absolute left-0 cursor-pointer top-0 h-full opacity-0'
							onChange={handlePreviewAvatar}
						/>
					</Button>
				</label>
			</div>
			<div className='mx-auto sm:w-[66%] w-full flex flex-col'>
				{!!dataFormGroupTextEditProfile &&
					dataFormGroupTextEditProfile.map((text) => (
						<FormGroup
							key={text.id}
							id={text.id}
							label={text.label}
							placeholder={text.placeholder}
							styleDiv={text.styleDiv}
							styleInput={'border-solid border-2 border-[#005aff47] '}
							styleLabel={text.styleLabel}
							type={text.type}
							styleError='sm-500:left-32 left-0 text-xs sm-500:-bottom-4 -bottom-[2.4rem]'
							i18Label={text.i18Label}
							errors={errors}
							{...register(text.id)}
						/>
					))}
				<div className='flex sm:mt-0 mt-5 items-center self-baseline h-4 w-48 pt-2'>
					{!!dataFormGroupEditProfile &&
						dataFormGroupEditProfile.map((checkBox) => (
							<FormGroup
								key={checkBox.id}
								id={checkBox.id}
								label={checkBox.label}
								styleDiv={checkBox.styleDiv}
								styleInput='flex-none focus:ring-transparent'
								type={checkBox.type}
								styleError='left-0 text-xs -bottom-4'
								i18Label={checkBox.i18Label}
								errors={errors}
								{...register(checkBox.id, {
									onChange(e) {
										const myId = e.target.id;
										const allCheckBox = document.querySelectorAll('input[type="checkbox"]');
										const input1 = allCheckBox[0];
										const input2 = allCheckBox[1];
										if (e.target.checked) {
											if (myId === 'male') {
												input2.checked = false;
												setValue('female', false);
											} else {
												input1.checked = false;
												setValue('male', false);
											}
										} else {
											if (myId === 'male' && !input2.checked) {
												input2.checked = true;
												setValue('female', true);
											} else {
												input1.checked = true;
												setValue('male', true);
											}
										}
									},
								})}
							/>
						))}
				</div>
				<Button
					styles='mt-4 self-end'
					isLoading={isLoading}
				>
					Xác nhận
				</Button>
			</div>
		</Form>
	);
};

export default EditProfile;
