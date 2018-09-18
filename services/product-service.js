module.exports = function ProductService(pool){
    async function all(){
        const query = `select p.id, p.description, p.price, c.id as category_id, 
            c.description as category_description from products p
            join categories c on c.id = p.category_id`;
        let results = await pool.query(query);
        return results.rows;
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
        
        let updateQuery = `UPDATE products 
            SET category_id = $1, 
                description = $2, 
                price = $3 
            WHERE id = $4`;

        return pool.query(updateQuery, data);
    }

    async function deleteById(id) {
        return pool.query('DELETE FROM products WHERE id = $1', [id]);
    }

    return{
        all,
        create,
        delete: deleteById,
        get,
        update
    }
}