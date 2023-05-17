import { useQuery } from '@tanstack/react-query';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Loading from '@/components/Loading';
import { getUserInfo, refreshToken } from '@/infrastructure/authActions';
import { getToast } from '@/utils/CustomToast';

export const AuthContext = createContext({
	user: {},
	setUser: () => {},
});

const userFetch = {
	username: 'Vũ Văn Ngọc',
	email: 'vungoc23387@gmail.com',
	address: 'Ngõ 25, số nhà 13, Từ Sơn, Bắc Ninh',
	sdt: '0338787233',
	gender: 'male',
	avatar: 'https://tse1.explicit.bing.net/th?id=OIP.Xwquh7b39vo0RocyWVTvuQHaHH&pid=Api&P=0',
};

const AuthProvider = ({ children }) => {
	const accessToken = localStorage.getItem('accessToken') || '';
	// const [user, setUser] = useState(userFetch);
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const { data, isLoading } = useQuery({
		queryKey: ['refresh-cookie', accessToken],
		queryFn: () => refreshToken(accessToken),
		staleTime: 10 * 60 * 1000,
		cacheTime: 20 * 60 * 1000,
	});

	useEffect(() => {
		function getUser() {
			if (data?.data === 'no') {
				localStorage.clear();
				setUser({});
				// navigate('/sign-in');
				return;
			}

			if (accessToken && !Object.keys(user).length) {
				getUserInfo(accessToken)
					.then((data) => {
						setUser(data.data);
					})
					.catch((e) => {
						localStorage.removeItem('accessToken');
						getToast(e?.response?.data, 'error');
						navigate('/sign-in');
					});
			}
		}
		getUser();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [data]);

	if (isLoading) {
		return <Loading />;
	}

	return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
