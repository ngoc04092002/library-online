import { EyeOutlined, EyeInvisibleOutlined, LoadingOutlined } from '@ant-design/icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import React, { useContext, useLayoutEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Link, useNavigate } from 'react-router-dom';

import AuthContainer from '@/components/AuthLayoutWrapper';
import FormGroup from '@/components/AuthLayoutWrapper/FormGroup';
import { schemaSignin } from '@/constants/SchemaYups';
import { initialSigninValues } from '@/constants/initiallValues';
import { AuthContext } from '@/context/AuthProvider';
import HeadTitle from '@/hooks/Head';
import { signInUser, signInWithSocial } from '@/infrastructure/authActions';
import { getImage } from '@/utils/CustomImagePath';
import { getToast } from '@/utils/CustomToast';

const SignIn = () => {
	HeadTitle('Sign In');
	const auth = getAuth();
	const navigation = useNavigate();
	const { setUser } = useContext(AuthContext);

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: initialSigninValues,
		resolver: yupResolver(schemaSignin),
	});

	const { mutate, isLoading } = useMutation({
		mutationFn: (formData) => {
			const res = signInUser({
				email: formData.group_form_email,
				password: formData.group_form_password,
			});

			return res;
		},
	});

	const onSubmit = (data) => {
		mutate(data, {
			onError: (res) => {
				getToast(res.response?.data, 'error');
			},
			onSuccess: (res) => {
				localStorage.setItem('accessToken', res.data.token);
				setUser(res.data);
				navigation('/');
			},
		});
	};

	const [visiblePassword, setVisiblePassword] = useState(false);

	const handleVisibilityChange = () => {
		setVisiblePassword(!visiblePassword);
	};

	const handleLoginWithGoogle = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
			.then(async (result) => {
				const { displayName, email, phoneNumber, photoURL } = result.user;
				const res = await signInWithSocial({
					username: displayName || 'username',
					email: email || 'email',
					sdt: phoneNumber || '',
					avatar: photoURL || getImage('user.png'),
				});
				localStorage.setItem('accessToken', res.data.token);
				setUser(res.data);
				navigation('/');
			})
			.catch(() => {
				getToast('', 'network bad');
			});
	};

	useLayoutEffect(() => {
		if (localStorage.getItem('accessToken')) {
			navigation('/');
			return;
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<AuthContainer id='sign-in'>
			<div className='w-full lg:w-[45%] lg:h-full h-[60%] overflow-hidden'>
				<Link to='/'>
					<img
						src={getImage('vali.gif')}
						alt='vali'
						className='select-none w-full h-full object-center object-cover lg:rounded-l-2xl rounded-t-2xl lg:rounded-tr-none'
					/>
				</Link>
			</div>
			<Form
				onSubmit={handleSubmit(onSubmit)}
				method='post'
				className=' lg:w-[55%] w-full h-full select-none p-3 flex items-center flex-col'
			>
				<h1 className='capitalize font-bold text-3xl lg:mb-12 mb-8'>Đăng nhập</h1>
				<FormGroup
					id='group_form_email'
					label='email'
					placeholder='Nhập email của bạn'
					styleInput='sm:w-fit w-full'
					styleDiv=''
					styleError='left-0 sm:left-[4.6rem] text-sm sm:-bottom-[1.1rem] -bottom-[2.5rem]'
					styleLabel='w-[4.6rem]'
					type='text'
					i18Label='Email'
					errors={errors}
					{...register('group_form_email')}
				/>
				<FormGroup
					id='group_form_password'
					label='password'
					placeholder='Nhập mật khẩu của bạn'
					styleDiv=''
					styleError='left-0 sm:left-[4.6rem] text-sm sm:-bottom-[1.1rem] -bottom-[2.5rem]'
					styleLabel='w-[4.6rem]'
					styleInput='pr-8'
					type={visiblePassword ? 'text' : 'password'}
					i18Label='Mật khẩu'
					errors={errors}
					{...register('group_form_password')}
				>
					<p
						onClick={handleVisibilityChange}
						className='absolute sm:right-[10px] sm:top-[5px] top-[29px] right-[7px] cursor-pointer pb-1'
					>
						{visiblePassword ? <EyeOutlined /> : <EyeInvisibleOutlined />}
					</p>
				</FormGroup>
				<div className='flex items-center justify-between w-full px-3 mt-3'>
					<Link
						to='/forgot-password'
						className='inline-block cursor-pointer font-semibold hover:text-blue-400 text-blue-600'
					>
						Quên mật khẩu?
					</Link>
					<Link
						to='/sign-up'
						className='inline-block cursor-pointer font-semibold hover:text-[#939393]'
					>
						Đăng ký
					</Link>
				</div>
				<button
					type='submit'
					disabled={isLoading}
					className={`mt-3 rounded-xl w-full cursor-pointer p-[0.65rem] text-white font-semibold ${
						isLoading ? 'bg-[#ccc]' : 'bg-[#02dcff] hover:bg-[#62eaffe0]'
					}`}
				>
					{isLoading ? <LoadingOutlined /> : 'Đăng nhập'}
				</button>
				<div
					onClick={handleLoginWithGoogle}
					className='bg-white flex items-center w-full h-10 px-2 rounded-lg cursor-pointer select-none lg:mt-2 mt-1'
				>
					<img
						src={getImage('google.png')}
						alt='google'
						className='h-full object-cover object-center mr-3'
					/>
					<span className='tracking-[0.3em]'>Google</span>
				</div>
			</Form>
		</AuthContainer>
	);
};

export default SignIn;
