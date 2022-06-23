const ProductService = require('../services/product-service');

module.exports = function(productService, categoryService) {
	
	async function show(req, res, next) {
		try {
			let results = await productService.all(); 
			res.render('products/home', {
				no_products: results  === 0,
				products: results,
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function showAdd(req, res, next) {
		try {
			let categories = await categoryService.all();
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
			let categories = await categoryService.all();
			let product = await productService.get(id);
			// check which item is selected to make the dropdown work
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
