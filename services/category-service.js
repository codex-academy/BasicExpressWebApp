module.exports = function CategoryService(db) {
    async function all() {
        let categories = await db.manyOrNone('SELECT * from categories');
        return categories
    }
    async function add(description) {
        let dataModel = [
            description
        ];
        let results = await db.oneOrNone(`insert into categories (description)  
            values ($1)
            returning id, description`, dataModel);
        return results;
    }

    async function get(id) {
        let results = await db.oneOrNone('SELECT * FROM categories WHERE id = $1', [id])
        console.log(results);
        return results;
    }

    async function update(category) {
        return await db.none('UPDATE categories SET description = $1 WHERE id = $2', [category.description, category.id]);
    }

    async function deleteOne(id) {
        return await db.none('DELETE FROM categories WHERE id = $1', [id])
    }

    return {
        add,
        all,
        delete: deleteOne,
        get,
        update
    }
}