import http from '@/config/axiosConfig';

export const updatePassword = (payload) => {
	const pathname = window.location.pathname;
	return http.put('update-password', payload, {
		params: {
			pathname,
		},
	});
};

export const updateProfile = (payload, oldEmail) => {
	const pathname = window.location.pathname;
	return http.put('update-client-info', payload, { params: { pathname, oldEmail } });
};

export const getAllFeedbacks = () => {
	const pathname = window.location.pathname;
	return http.get('get-all-feedback', {
		params: {
			pathname,
		},
	});
};

export const getAllEWaitingRs = () => {
	const pathname = window.location.pathname;
	return http.get('get-all-ewaitingr', {
		params: {
			pathname,
		},
	});
};

export const deleteIds = (path, ids) => {
	const pathname = window.location.pathname;
	return http.post(path, ids, {
		params: {
			pathname,
		},
	});
};

export const getAllBooks = (params) => {
	const pathname = window.location.pathname;
	return http.get('books', { params: { ...params, pathname } });
};

export const getBookById = (id) => {
	const pathname = window.location.pathname;
	return http.get(`book/${id}`, {
		params: {
			pathname,
		},
	});
};

export const deleteBookById = (id) => {
	const pathname = window.location.pathname;
	return http.delete(`book/${id}`, {
		params: {
			pathname,
		},
	});
};

export const createBook = (requestBody) => {
	const pathname = window.location.pathname;
	return http.post('add-book', requestBody, {
		params: {
			pathname,
		},
	});
};

export const updateBook = (requestBody, res) => {
	const pathname = window.location.pathname;
	return http.post(
		'update-book',
		{ ...requestBody, oldTitle: res.title, oldAuthor: res.author },
		{
			params: {
				pathname,
			},
		},
	);
};

export const filterBook = (params) => {
	const pathname = window.location.pathname;
	return http.get('filter-book', { params: { ...params, pathname } });
};

export const getOrders = () => {
	const pathname = window.location.pathname;
	return http.get('orders', {
		params: {
			pathname,
		},
	});
};

export const getOrdersByName = (params) => {
	const pathname = window.location.pathname;
	return http.get(`orders-name`, { params: { ...params, pathname } });
};

export const createOrder = (requestBody) => {
	const pathname = window.location.pathname;
	return http.post('add-order', requestBody, {
		params: {
			pathname,
		},
	});
};

export const updateOrder = (params) => {
	const pathname = window.location.pathname;
	return http.put(`update-order?id=${params.id}&quantity=${params.quantity}`, {
		params: {
			pathname,
		},
	});
};

export const deleteOrdersByName = (name) => {
	const pathname = window.location.pathname;
	return http.post(`delete-order`, name, {
		params: {
			pathname,
		},
	});
};

export const deleteOrderById = (id) => {
	const pathname = window.location.pathname;
	return http.delete(`delete-order/${id}`, {
		params: {
			pathname,
		},
	});
};

export const updateBooksSold = (requestBody) => {
	const pathname = window.location.pathname;
	return http.post('update-books_sold', requestBody, {
		params: {
			pathname,
		},
	});
};

export const getBooksSold = () => {
	const pathname = window.location.pathname;
	return http.get('get-books_sold-info', {
		params: {
			pathname,
		},
	});
};

export const getBookAndFeedbackReport = () => {
	const pathname = window.location.pathname;
	return http.get('get-book-feedback-report', {
		params: {
			pathname,
		},
	});
};

export const getAllClient = () => {
	const pathname = window.location.pathname;
	return http.get('getAll-clients', {
		params: {
			pathname,
		},
	});
};

export const deleteClientById = (id) => {
	const pathname = window.location.pathname;
	return http.delete(`delete-client/${id}`, {
		params: {
			pathname,
		},
	});
};
