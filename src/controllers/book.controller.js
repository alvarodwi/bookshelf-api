import books from '../data/books.js';
import {nanoid} from 'nanoid';

const BookController = {
	create(req, reply) {
		const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.payload;

		if (!name) {
			return reply.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. Mohon isi nama buku'
			}).code(400);
		}

		if (readPage > pageCount) {
			return reply.response({
				status: 'fail',
				message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
			}).code(400);
		}

		const id = nanoid(16);
		const finished = pageCount === readPage;
		const insertedAt = new Date().toISOString();
		const updatedAt = insertedAt;

		const book = {
			id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt
		};
		books.push(book);

		if (books.filter(it => it.id === book.id).length > 0) {
			return reply.response({
				status: 'success',
				message: 'Buku berhasil ditambahkan',
				data: {
					bookId: book.id
				}
			}).code(201);
		}

		return reply.response({
			status: 'fail',
			message: 'Buku gagal ditambahkan'
		}).code(500);
	},

	getAll(req, reply) {
		const {reading, finished, name} = req.query;
		const data = {};
		data.books = books;

		if (reading) {
			data.books = data.books.filter(it => reading === '1' ? it.reading : !it.reading);
		}

		if (finished) {
			data.books = data.books.filter(it => finished === '1' ? it.finished : !it.finished);
		}

		if (name) {
			data.books = data.books.filter(it => it.name.toLowerCase().includes(name.toLowerCase()));
		}

		data.books = data.books.map(it => {
			const {id, name, publisher} = it;
			return {id, name, publisher};
		});

		return reply.response({
			status: 'success',
			data
		});
	},

	get(req, reply) {
		const {id} = req.params;

		const book = books.filter(it => it.id === id)[0];

		if (book) {
			return reply.response({
				status: 'success',
				data: {
					book
				}
			});
		}

		const response = reply.response({
			status: 'fail',
			message: 'Buku tidak ditemukan'
		});
		response.code(404);
		return response;
	},

	update(req, reply) {
		const {name, year, author, summary, publisher, pageCount, readPage, reading} = req.payload;

		if (!name) {
			return reply.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. Mohon isi nama buku'
			}).code(400);
		}

		if (readPage > pageCount) {
			return reply.response({
				status: 'fail',
				message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
			}).code(400);
		}

		const index = books.findIndex(it => it.id === req.params.id);

		if (index !== -1 && books !== undefined) {
			books[index] = {
				...books[index],
				name,
				year,
				author,
				summary,
				publisher,
				pageCount,
				readPage,
				reading,
				updatedAt: new Date().toISOString()
			};

			return reply.response({
				status: 'success',
				message: 'Buku berhasil diperbarui'
			}).code(200);
		}

		return reply.response({
			status: 'fail',
			message: 'Gagal memperbarui buku. Id tidak ditemukan'
		}).code(404);
	},

	delete(req, reply) {
		const {id} = req.params;

		const index = books.findIndex(it => it.id === id);

		if (index !== -1) {
			books.splice(index, 1);
			return reply.response({
				status: 'success',
				message: 'Buku berhasil dihapus'
			}).code(200);
		}

		return reply.response({
			status: 'fail',
			message: 'Buku gagal dihapus. Id tidak ditemukan'
		}).code(404);
	}
};

export default BookController;
