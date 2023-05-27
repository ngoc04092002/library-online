import http from '@/config/axiosConfig';

export const sendFeedback = (payload) => {
	const pathname = window.location.pathname;
	return http.post('send-feedback', payload, {
		params: {
			pathname,
		},
	});
};
