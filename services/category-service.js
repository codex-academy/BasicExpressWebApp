module.exports = function CategoryService(pool){
    async function all(){
        let categories = await pool.query('SELECT id, description from categories');
        return categories.rows;
    }
    async function add(description){
        let data = [
            description
        ];
        let results = await pool.query(`insert into categories (description)  
            values ($1)
            returning id, description`, data);
        return results.rows[0]
    }

    async function get(id){
        let results = await pool.query('SELECT * FROM categories WHERE id = $1', [id]);
        if (results.rows.length > 0) {
            return results.rows[0];
        }
        return null;
    }

    async function update(category){
        return pool.query('UPDATE categories SET description = $1 WHERE id = $2', [category.description, category.id]);
    }

    async function deleteOne (id){
        return pool.query('DELETE FROM categories WHERE id = $1', [id]);
    }

    return {
        add,
        all,
        delete : deleteOne,
        get,
        update
    }
}