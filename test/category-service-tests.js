const assert = require("assert");
const CategoryService = require("../services/category-service");
const ProductService = require("../services/product-service");
const pgp = require("pg-promise")();

// we are using a special test database for the tests
const connectionString =
    process.env.DATABASE_URL || "postgresql://localhost:5432/my_products_test";

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

            // the categoryService.add(string) function receives a string as a param
            // the changes could have been cause from updating the queries from pg to pg-promise

            await categoryService.add("Diary");
            await categoryService.add("Bread");

            let categories = await categoryService.all();

            assert.equal(2, categories.length);
        } catch (err) {
            console.log(err);
        }
    });

    it("should able to update a category", async function () {
        // assemble
        let categoryService = CategoryService(db);

        // the categoryService.add(string) function receives a string as a param
        // the changes could have been cause from updating the queries from pg to pg-promise

        let category = await categoryService.add("Diary");

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
        // assemble
        let categoryService = CategoryService(db);

        // the categoryService.add(string) function receives a string as a param
        // the changes could have been cause from updating the queries from pg to pg-promise

        let category = await categoryService.add("Diary");

        // act
        await categoryService.delete(category.id);

        // assert
        let updateCategory = await categoryService.get(category.id);
        assert.equal(null, updateCategory);
    });

    it("should able to add a products", async function () {
        try {
            let productService = ProductService(db);
            let categoryService = CategoryService(db);

            // the categoryService.add(string) function receives a string as a param
            // the changes could have been cause from updating the queries from pg to pg-promise

            let data1 = await categoryService.add("Diary");

            let data2 = await categoryService.add("Bread");

            //the productService.create(object) function receives an object as a param
            // object structure =>
            // category_id => the id of the category the product belongs to
            // description => the description of the product being added 
            // price       => the price of the product beng added
            await productService.create({
                category_id: data1.id,
                description: "Milk",
                price: 20
            });

            await productService.create({
                category_id: data2.id,
                description: "Banana Loaf",
                price: 20
            });

            let products = await productService.all();

            assert.equal(2, products.length);
        } catch (err) {
            console.log(err);
        }
    });

    after(function () {
        db.$pool.end();
    });
});
