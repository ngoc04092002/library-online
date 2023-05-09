import http from '@/config/axiosConfig';

export const updatePassword = (payload) => {
	return http.put('update-password', payload);
};

export const updateProfile = (payload, oldEmail) => {
	return http.put('update-client-info', payload, { params: { oldEmail } });
};

export const getAllFeedbacks = () => {
	return http.get('get-all-feedback');
};

export const getAllEWaitingRs = () => {
	return http.get('get-all-ewaitingr');
};

export const deleteIds = (path, ids) => {
	return http.post(path, ids);
};

export const getAllBooks = () => {
	return http.get('books');
};

export const getBookById = (id) => {
	return http.get(`book/${id}`);
};

export const deleteBookById = (id) => {
	return http.delete(`book/${id}`);
};

export const createBook = (requestBody) => {
	return http.post('add-book', requestBody);
};

export const updateBook = (requestBody) => {
	return http.post('update-book', requestBody);
};

export const updateBookQuantitySold = (requestBody) => {
	return http.put('update-quantity', requestBody);
};

export const filterBook = (params)=>{
	return http.get('filter-book', {params});
}


