const assert = require('assert');
const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products_tests';

const pool = new Pool({
    connectionString
});

describe('The basic database web app', function(){

    beforeEach(async function(){
        await pool.query("delete from products;");
        await pool.query("delete from categories;");
    });

    it('should able to add a category', async function(){
        let categoryService = CategoryService(pool);
        await categoryService.add({
            description : "Diary"
        });
        let categories = await categoryService.all();
        assert.equal(1, categories.length);
    });

    it('should able to update a category', async function(){
        // assemble
        let categoryService = CategoryService(pool);
        let category = await categoryService.add({
            description : "Diary"
        });

        // act
        category.description = 'Milk products';
        await categoryService.update(category);
        
        // assert
        let updateCategory = await categoryService.get(category.id);
        assert.equal('Milk products', updateCategory.description);
    });

    after(function(){
        pool.end();
    })
});