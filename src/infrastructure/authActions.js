import http from '@/config/axiosConfig';

export const signUpUser = (payload) => {
	return http.post('sign-up', payload);
};

export const signInUser = (payload) => {
	return http.post('sign-in', payload);
};

export const signInWithSocial = (payload) => {
	return http.post('sign-in-social', payload);
};

export const refreshToken = (payload) => {
	return http.get('refresh-cookie', { params: { token: payload } });
};

export const getUserInfo = (payload) => {
	return http.get('get-user-info', {
		params: { access: payload },
	});
};

export const sendMail = (payload) => {
	return http.get('forgot-password', {
		params: { email: payload },
	});
};

export const resetPassword = (payload) => {
	return http.get('reset-password', {
		params: { e: payload },
	});
};
