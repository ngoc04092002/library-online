import http from '@/config/axiosConfig';

export const createReview = (requestBody) => {
	return http.post('save-review', requestBody);
};

export const removeReview = (id) => {
	return http.delete(`remove-review/${id}`);
};

export const saveRating = (requestBody) => {
	return http.post('save-rating', requestBody);
};

export const getRating = (id) => {
	return http.get('get-rating', { params: { id } });
};
