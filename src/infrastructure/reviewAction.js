import http from '@/config/axiosConfig';

export const createReview = (requestBody) => {
	const pathname = window.location.pathname;
	return http.post('save-review', requestBody, {
		params: {
			pathname,
		},
	});
};

export const removeReview = (id) => {
	const pathname = window.location.pathname;
	return http.delete(`remove-review/${id}`, {
		params: {
			pathname,
		},
	});
};

export const saveRating = (requestBody) => {
	const pathname = window.location.pathname;
	return http.post('save-rating', requestBody, {
		params: {
			pathname,
		},
	});
};

export const getRating = (id) => {
	const pathname = window.location.pathname;
	return http.get('get-rating', { params: { id, pathname } });
};
