import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Loading from './components/Loading';
import { routes } from './pages/index';
import './index.scss';
import 'react-toastify/dist/ReactToastify.css';
import '@/pages/firebase';

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
				<RouterProvider
					router={routes}
					fallbackElement={<Loading />}
				/>
				<ToastContainer />
			</QueryClientProvider>
  </React.StrictMode>
);

