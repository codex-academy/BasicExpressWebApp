
/***
 * A very basic CRUD example using PostgreSQL
 */

module.exports = function CategoryRoutes(categoryService) {
	
	async function show(req, res, next) {
		try {
			let categories = await categoryService.all();
			res.render('categories/home', {
				no_products: categories.length === 0,
				categories,
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
		const {description} = req.body;
		try {
			
			if (!description) {
				req.flash('error', 'Category is empty!');
				return res.redirect('/categories/add');
			}

			await categoryService.add(description);
			req.flash('info', 'Category added!');
			res.redirect('/categories');
		}
		catch (err) {

			if (err.stack.includes("duplicate key")){
				req.flash('error', 'Category already exists : ' + description);
				return res.redirect('/categories/add');
			}

			next(err)
		}
	};

	async function get(req, res, next) {
		try {
			var id = req.params.id;
			let result = await categoryService.get(id); // pool.query('SELECT * FROM categories WHERE id = $1', [id]);
			res.render('categories/edit', {
				page_title: "Edit Customers - Node.js",
				data: result
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function update(req, res, next) {

		try {

			console.log(JSON.stringify(req.headers));
			console.log(req.params.id);
			let data = req.body;
			let id = req.params.id;
			let description = req.body.description;

			await categoryService.update({
				id,
				description
			})
			req.flash('info', 'Category updated!');
			res.redirect('/categories');
		}
		catch (err) {
			next(err);
		}

	};

	async function deleteOne(req, res, next) {
		var id = req.params.id;
		try{
			await categoryService.delete(id);
			req.flash('info', 'Category deleted!');
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
