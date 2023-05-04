import http from '@/config/axiosConfig';

export const sendFeedback = (payload) => {
	return http.post('send-feedback', payload);
};
