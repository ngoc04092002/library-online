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

export const getAllBooks = (params) => {
	return http.get('books', { params });
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

export const filterBook = (params) => {
	return http.get('filter-book', { params });
};

export const getOrders = () => {
	return http.get('orders');
};

export const getOrdersByName = (params) => {
	return http.get(`orders-name`, { params });
};

export const createOrder = (requestBody) => {
	return http.post('add-order', requestBody);
};

export const updateOrder = (params) => {
	return http.put(`update-order?id=${params.id}&quantity=${params.quantity}`);
};

export const deleteOrdersByName = (name) => {
	return http.post(`delete-order`, name);
};

export const deleteOrderById = (id) => {
	return http.delete(`delete-order/${id}`);
};

export const updateBooksSold = (requestBody) => {
	return http.post('update-books_sold', requestBody);
};

export const getBooksSold = () => {
	return http.get('get-books_sold-info');
};

export const getBookAndFeedbackReport = () => {
	return http.get('get-book-feedback-report');
};

export const getAllClient = () => {
	return http.get('getAll-clients');
};

export const deleteClientById = (id) => {
	return http.delete(`delete-client/${id}`);
};