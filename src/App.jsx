import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import ErrorPage from './error-page';
import Contact, { loader as contactLoader } from './routes/contact';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Root />,
		errorElement: <ErrorPage />,
		loader: rootLoader,
		action: rootAction,
		children: [
			{
				path: 'contacts/:contactId',
				element: <Contact />,
				loader: contactLoader
			}
		]
	}
]);

function App() {
	return <RouterProvider router={router} />;
}

export default App;
