import BookController from './src/controllers/book.controller.js';

const routes = [
	{
		method: 'POST',
		path: '/books',
		handler: BookController.create
	},
	{
		method: 'GET',
		path: '/books',
		handler: BookController.getAll
	},
	{
		method: 'GET',
		path: '/books/{id}',
		handler: BookController.get
	},
	{
		method: 'PUT',
		path: '/books/{id}',
		handler: BookController.update
	},
	{
		method: 'DELETE',
		path: '/books/{id}',
		handler: BookController.delete
	}
];

export default routes;
