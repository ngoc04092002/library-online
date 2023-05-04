import { useEffect } from 'react';

const HeadTitle = (title) => {
	useEffect(() => {
		document.title = title;
	}, [title]);
};

export default HeadTitle;
