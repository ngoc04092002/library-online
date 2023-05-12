import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale nếu bạn muốn sử dụng ngôn ngữ khác
import relativeTime from 'dayjs/plugin/relativeTime'; // Import plugin relativeTime

dayjs.locale('vi'); // Thiết lập ngôn ngữ mặc định
dayjs.extend(relativeTime); // Sử dụng plugin relativeTime để sử dụng tính năng from now

export function getTimeAgo(createdAt) {
	const date = dayjs(createdAt);
	const day = Math.ceil(dayjs().diff(date, 'day', true)); // Tính số ngày chênh lệch giữa hai ngày
	const month = Math.ceil(dayjs().diff(date, 'month', true)); // Tính số ngày chênh lệch giữa hai ngày
	const year = Math.ceil(dayjs().diff(date, 'year', true)); // Tính số ngày chênh lệch giữa hai ngày
	const hour = Math.ceil(dayjs().diff(date, 'hour', true)); // Tính số ngày chênh lệch giữa hai ngày
	const minute = Math.ceil(dayjs().diff(date, 'minute', true)); // Tính số ngày chênh lệch giữa hai ngày
	if (minute <= 60) {
		return `${minute} minute ago`;
	}
	if (hour <= 24) {
		return `${hour} hour ago`;
	}
	if (day <= 31) {
		return `${day} day ago`;
	}
	if (month <= 12) {
		return `${month} month ago`;
	}
	return `${year} year ago`;
}
