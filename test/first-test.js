const assert = require('assert');
const CategoryService = require('../services/category-service');
const pg = require("pg");
const Pool = pg.Pool;

const connectionString = process.env.DATABASE_URL || 'postgresql://localhost:5432/my_products';

const pool = new Pool({
    connectionString
});


describe('The basic database web app', function(){
    it('should pass the db test', async function(){

        let categoryService = CategoryService(pool);

        await categoryService.all();
    });

    after(function(){
        pool.end();
    })
});