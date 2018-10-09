
module.exports = function(productService) {
	
	async function all(req, res) {
		try {
			let results = await productService.all(); 
			res.json({
				status: 'success',
				data: results
			});
		}
		catch (err) {
			next(err);
		}
	};

	async function add(req, res) {

		try {
			await productService.create({
				category_id: Number(req.body.category_id),
				description : req.body.description,
				price: Number(req.body.price)
			});
			
			res.json({
				status: "success",
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function get(req, res) {
		try {
			let id = req.params.id;
			let product = await productService.get(id);
			res.json({
				status: "success",
				data: product
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
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
			res.json({
				status: "success"
			});
		}
		catch(err){
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function deleteProduct (req, res, next) {
		try{
			var id = req.params.id;
			await productService.delete(id);
			res.json({
				status: "success"
			});
		}
		catch(err){
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	return {
		all,
		add,
		get,
		delete : deleteProduct,
		update
	}
}
