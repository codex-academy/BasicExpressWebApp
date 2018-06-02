
/***
 * A very basic CRUD example using MySQL
 */

module.exports = function(pool) {

	async function show(req, res, next) {
		try {
			let result = await pool.query('SELECT * from products');
			let results = result.rows;
			res.render('products/home', {
				no_products: results.length === 0,
				products: results,
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function showAdd(req, res, next) {
		try {
			let result = await pool.query('SELECT * from categories');
			let categories = result.rows;
			res.render('products/add', {
				categories: categories,
			});
		}
		catch (err) {
			next(err);
		}

	};

	async function add(req, res, next) {

		try {
			var data = [
				Number(req.body.category_id),
				req.body.description,
				Number(req.body.price)
			];
			await pool.query(`insert into products(category_id, description, price) 
						values ($1, $2, $3)`, data);
			
			req.flash('info', 'Product added!')
			res.redirect('/products');
		}
		catch (err) {
			next(err);
		}
	};

	async function get(req, res, next) {
		try {
			let id = req.params.id;
			let result = await pool.query('SELECT * FROM categories');
			let categories = result.rows;
			let productResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
			let product = productResult.rows[0];

			categories = categories.map(function (category) {
				category.selected = category.id === product.category_id ? "selected" : "";
				return category;
			});

			res.render('products/edit', {
				categories: categories,
				data: product
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {
		try{
			var data = [
				Number(req.body.category_id),
				req.body.description,
				Number(req.body.price),
				req.params.id // product_id
			];
			let updateQuery = `UPDATE products SET category_id = $1, 
				description = $2, price = $3 WHERE id = $4`;

			await pool.query(updateQuery, data);
			req.flash('info', 'Product updated!')

			res.redirect('/products');
		}
		catch(err){
			next(err.stack);
		}
	};

	async function deleteProduct (req, res, next) {
		try{
			var id = req.params.id;
			await pool.query('DELETE FROM products WHERE id = $1', [id]);
			req.flash('info', 'Product deleted!')
			res.redirect('/products');
		}
		catch(err){
			next(err);
		}
	};

	return {
		show,
		showAdd,
		add,
		get,
		delete : deleteProduct,
		update
	}
}
