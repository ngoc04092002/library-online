import http from '@/config/axiosConfig';

export const signUpUser = (payload) => {
	const pathname = window.location.pathname;
	return http.post('sign-up', payload, {
		params: {
			pathname,
		},
	});
};

export const signInUser = (payload) => {
	const pathname = window.location.pathname;
	return http.post('sign-in', payload, {
		params: {
			pathname,
		},
	});
};

export const signInWithSocial = (payload) => {
	const pathname = window.location.pathname;
	return http.post('sign-in-social', payload, {
		params: {
			pathname,
		},
	});
};

export const refreshToken = (payload) => {
	const pathname = window.location.pathname;
	return http.get('refresh-cookie', { params: { token: payload,pathname } });
};

export const getUserInfo = (payload) => {
	const pathname = window.location.pathname;
	return http.get('get-user-info', {
		params: { access: payload,pathname  },
	});
};

export const sendMail = (payload) => {
	const pathname = window.location.pathname;
	return http.get('forgot-password', {
		params: { email: payload ,pathname },
	});
};

export const resetPassword = (payload) => {
	const pathname = window.location.pathname;
	return http.get('reset-password', {
		params: { e: payload,pathname  },
	});
};
