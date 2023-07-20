/* eslint-disable no-undef */
const assert = require("assert");
const CategoryService = require("../services/category-service");
const ProductService = require("../services/product-service");
const pgp = require("pg-promise")();

// we are using a special test database for the tests
const connectionString = process.env.DATABASE_URL || "postgresql://localhost:5432/my_products_tests";

const db = pgp(connectionString);

describe("The basic database web app", function () {
    beforeEach(async function () {
        try {
            // clean the tables before each test run
            await db.none("TRUNCATE TABLE products RESTART IDENTITY CASCADE;");
            await db.none("TRUNCATE TABLE categories RESTART IDENTITY CASCADE;");
        } catch (err) {
            console.log(err);
            throw err;
        }
    });

    it("should able to add a category", async function () {
        try {
            let categoryService = CategoryService(db);

            await categoryService.add({
                description: "Diary",
            });
            await categoryService.add({
                description: "Bread",
            });
            let categories = await categoryService.all();
            assert.equal(2, categories.length);
        } catch (err) {
            console.log(err);
        }
    });

    it("should able to update a category", async function () {
        // assemble
        let categoryService = CategoryService(db);
        let category = await categoryService.add({
            description: "Diary"
        });

        // act
        category.description = "Milk products";
        await categoryService.update(category);

        // assert

        let updateCategory = await categoryService.get(category.id);

        assert.deepEqual({
            description: "Milk products",
            id: 1
        }, updateCategory);
    });

    it("should able to delete a category", async function () {
        try {

            // assemble
            let categoryService = CategoryService(db);
            let category = await categoryService.add({
                description: "Diary"
            });

            const productList = await categoryService.all();

            // check added 
            assert.deepEqual([{
                description: "{\"description\":\"Diary\"}",
                id: 1
            }], productList);

            // act
            await categoryService.delete(category.id);
            const productResult = await categoryService.all();

            // assert
            assert.deepEqual([], productResult);
        } catch (err) {
            console.log(err);
        }
    });

    it("should able to add a products", async function () {
        try {
            let productService = ProductService(db);
            let categoryService = CategoryService(db);

            await categoryService.add({
                description: "Diary",
            });

            await categoryService.add({
                description: "Bread",
            });

            let product_list = await categoryService.all();

            for (const product of product_list) {
                await productService.create(product);
            }

            let result = await productService.all();
            assert.equal(2, result.length);
        } catch (err) {
            console.log(err);
        }
    });

    after(function () {
        db.$pool.end;
    });
});