
/***
 * A very basic CRUD example using MySQL
 */

module.exports = function(pool) {

	function ProductService(pool){
		async function all(){
			let results = await pool.query('SELECT * from products');
			return result.rows;
		}
		async function create(product){
			let data = [
				product.category_id,
				product.description,
				product.price
			];
			return pool.query(`insert into products(category_id, description, price) 
						values ($1, $2, $3)`, data);
		}
		async function get(id){
			let productResult = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
			let product = productResult.rows[0];
			return product;

		}

		async function update(product){
			var data = [
				product.category_id,
				product.description,
				product.price,
				product.id
			];
			
			let updateQuery = `UPDATE products SET category_id = $1, 
				description = $2, price = $3 WHERE id = $4`;

			return pool.query(updateQuery, data);
		}

		async function deleteById(id) {
			return pool.query('DELETE FROM products WHERE id = $1', [id]);
		}

		return{
			all,
			create,
			delete: deleteById,
			get
		}
	}

	let productService = ProductService(pool);

	async function show(req, res, next) {
		try {
			let results = await productService.all(); 
			res.render('products/home', {
				no_products: results.rows.length === 0,
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
			await productService.create({
				category_id: Number(req.body.category_id),
				description : req.body.description,
				price: Number(req.body.price)
			});
			
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
			let product = await productService.get(id);
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
			await productService.update({
				category_id: Number(req.body.category_id),
				description: req.body.description,
				price: Number(req.body.price),
				id: req.params.id
			});
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
			// await pool.query('DELETE FROM products WHERE id = $1', [id]);
			await productService.delete(id);
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
