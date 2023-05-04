/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx}',
		'./src/components/**/*.{js,ts,jsx,tsx}',
		'./src/router/**/*.{js,ts,jsx,tsx}',
	],
	purge: {
		content: [
			'./src/pages/**/*.{js,ts,jsx,tsx}',
			'./src/components/**/*.{js,ts,jsx,tsx}',
			'./src/router/**/*.{js,ts,jsx,tsx}',
			'./public/index.html',
		],
	},
	darkMode: false, // or 'media' or 'class
	theme: {
		extend: {
			boxShadow: {
				'3xl': '2px 2px 30px 8px rgb(0 ,0 ,0,0.28)',
				'sm-cs': '1px 1px 3px 2px #ccc',
				'sm-cs-0': '1px 1px 4px 0px rgba(0, 0, 0, 0.15)',
				'sm-cs-0360': '0px 3px 6px 0px rgba(0, 0, 0, 0.2)',
			},
			gridTemplateColumns: {
				'3r-cus': 'repeat(3, minmax(100px, 1fr))',
				'1/5': '1fr 5fr',
			},
			fontFamily: {
				sans: ['Open Sans'],
			},
		},
		screens: {
			'cus-screen': '840px',
			'sm-500': '500px',
			'sm': '640px',
			// => @media (min-width: 640px) { ... }

			'md': '768px',
			// => @media (min-width: 768px) { ... }

			'lg': '1024px',
			// => @media (min-width: 1024px) { ... }

			'xl': '1280px',
			// => @media (min-width: 1280px) { ... }

			'2xl': '1536px',
			// => @media (min-width: 1536px) { ... }
		},
	},
	plugins: [require('@tailwindcss/forms')],
};
