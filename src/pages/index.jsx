import { useEffect, useState } from 'react';
import { createBrowserRouter, Outlet } from 'react-router-dom';

import { Admin, FeedBackForgotPassword } from './Admin';
import DashBoard from './Dashboard';
import FeedBack from './FeedBack';
import ForgotPassword from './ForgotPassword';
import Home from './Home';
import NotFound from './NotFound';
import ProtectedRoute from './ProtectedRoute';
import ResetPassword from './ResetPassword';
import SignIn from './SignIn';
import SignUp from './SignUp';

import {
	Book,
	CalendarContainer,
	DashBoardMain,
	EditPassword,
	EditProfile,
	Profile,
} from '@/components';
import Loading from '@/components/Loading/Loading';
import { AuthProvider, ContextWrapper } from '@/context';

const AuthLayout = () => {
	const [load, setLoad] = useState(true);

	useEffect(() => {
		function isLoaded() {
			setLoad(false);
		}
		window.addEventListener('load', isLoaded);
		return () => {
			window.removeEventListener('load', isLoaded);
		};
	}, []);

	if (load) {
		return <Loading />;
	}
	return (
		<AuthProvider>
			<ContextWrapper>
				<Outlet />
			</ContextWrapper>
		</AuthProvider>
	);
};

export const routes = createBrowserRouter([
	{
		element: <AuthLayout />,
		errorElement: <NotFound />,
		children: [
			{
				path: '/sign-up',
				element: <SignUp />,
			},
			{
				path: '/sign-in',
				element: <SignIn />,
			},
			{
				path: '/forgot-password',
				element: <ForgotPassword />,
			},
			{
				path: '/reset-password/:e',
				element: <ResetPassword />,
			},
			{
				path: '/',
				element: <Home />,
				children: [
					{
						path: 'feedback',
						element: <FeedBack />,
					},
					{
						element: <ProtectedRoute />,
						children: [
							{
								path: 'dash-board',
								element: <DashBoard />,
								children: [
									{
										path: '',
										element: <DashBoardMain />,
									},
									{
										path: 'profile',
										element: <Profile />,
										children: [
											{
												path: 'edit-password',
												element: <EditPassword />,
											},
											{
												path: 'edit-profile',
												element: <EditProfile />,
											},
										],
									},
									{
										path: 'calendar',
										element: <CalendarContainer />,
									},
									{
										path: 'admin',
										element: <Admin />,
										children: [
											{
												path: 'feedback-forgot-password',
												element: <FeedBackForgotPassword />,
											},
											{
												path: 'book/:id?',
												element: <Book />,
											},
										],
									},
								],
							},
						],
					},
				],
			},
		],
	},
]);
