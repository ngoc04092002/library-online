import { toast } from 'react-toastify';

const dispayForm = {
	position: 'top-right',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
	theme: 'light',
};
export function getToast(name, status) {
	switch (status) {
		case 'warn':
			toast.warn(name, dispayForm);
			break;
		case 'success':
			toast.success(name, dispayForm);
			break;
		case 'error':
			toast.error(name, dispayForm);
			break;
		default:
			toast.error('Đã có lỗi xảy ra, vui lòng thử lại!', dispayForm);
			break;
	}
}
