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
    extend: {},
  },
  plugins: [],
}