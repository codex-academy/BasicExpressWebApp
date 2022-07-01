
/***
 * A very basic CRUD example using PostgreSQL
 */

module.exports = function (categoryService) {
	
	async function all(req, res) {
		try {
			let categories = await categoryService.all();
			res.json({
				status: 'success',
				data: categories
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};


	async function add(req, res) {
		try {
			let input = req.body;
			await categoryService.add(input);
			res.json({
				status: 'success',
				data: categories
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
			var id = req.params.id;
			let result = await categoryService.get(id);
			res.json({
				status: 'success',
				data: result.rows[0]
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}
	};

	async function update(req, res) {

		try {
			const data = req.body;
			const id = req.params.id;
			const description = data.description;

			await categoryService.update({
				id,
				description
			})
			res.json({
				status: 'success'
			});
		}
		catch (err) {
			res.json({
				status: "error",
				error: err.stack
			});
		}

	};

	async function deleteOne(req, res) {
		try{
			const id = req.params.id;
			await categoryService.delete(id);
			res.json({
				status: 'success'
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
		add,
		delete: deleteOne,
		update,
		get,
		all
	}
}
