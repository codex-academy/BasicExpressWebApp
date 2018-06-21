const assert = require('assert');
const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products';

const pool = new Pool({
    connectionString
});


describe('The basic database web app', function(){
    
    beforeEach(async function(){
        await pool.query("delete from products;");
        await pool.query("delete from categories;");
    });

    it('should pass the db test', async function(){

        let categoryService = CategoryService(pool);
        await categoryService.add({
            description : "Diary"
        });


        assert.equal(0, categories.all());

    });

    after(function(){
        pool.end();
    })
});