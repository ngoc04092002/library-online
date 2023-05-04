import axios from 'axios';


class HttpClient {
	#axiosInstance;
	constructor() {
		const baseURL = process.env.REACT_APP_BASE_URL || 'http://localhost:8080/api/v1/';
		this.#axiosInstance = axios.create({
			baseURL,
			timeout: process.env.REACT_APP_TIMEOUT ? Number(process.env.REACT_APP_TIMEOUT) : 90000,
			headers: {
				'Content-Type': 'application/json',
			},
		});
		this.#setRequestConfig();
	}

	getConfigure() {
		return this.#axiosInstance;
	}

	#setRequestConfig() {
		this.#axiosInstance.interceptors.request.use((config) => {
			config.withCredentials = true;
			return config;
		});
	}
}

const http= new HttpClient().getConfigure();

export default http;
