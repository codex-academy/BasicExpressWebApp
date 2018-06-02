
/***
 * A very basic CRUD example using PostgreSQL
 */

module.exports = function CategoryRoutes(pool) {

	async function show(req, res, next) {
		try {
			let results = await pool.query('SELECT * from categories');
			res.render('categories/home', {
				no_products: results.length === 0,
				categories: results.rows,
			});
		}
		catch (err) {
			next(err);
		}
	};

	function showAdd(req, res, next) {
		res.render('categories/add');
	}

	async function add(req, res, next) {
		try {
			let input = req.body;
			let data = [
				input.description
			];
			let results = await pool.query('insert into categories (description)  values ($1)', data);
			res.redirect('/categories');
		}
		catch (err) {
			next(err)
		}
	};

	async function get(req, res, next) {
		try {
			var id = req.params.id;
			let result = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
			res.render('categories/edit', {
				page_title: "Edit Customers - Node.js",
				data: result.rows[0]
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {

		try {
			let data = req.body;
			let id = req.params.id;
			let description = req.body.description;

			await pool.query('UPDATE categories SET description = $1 WHERE id = $2', [description, id]);
			res.redirect('/categories');
		}
		catch (err) {
			next(err);
		}

	};

	async function deleteOne(req, res, next) {
		var id = req.params.id;
		try{
			await pool.query('DELETE FROM categories WHERE id = $1', [id]);
			res.redirect('/categories');
		}
		catch(err){
			next(err);
		}
	};

	return {
		add,
		delete: deleteOne,
		update,
		get,
		showAdd,
		show
	}
}
