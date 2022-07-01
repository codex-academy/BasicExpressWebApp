document.addEventListener('DOMContentLoaded', function () {

    function compileTemplate(selector) {
        let template = document.querySelector(selector);
        let templateInstance = Handlebars.compile(template.innerHTML);
        return templateInstance;
    }

    let productListTemplate = document.querySelector('.productListTemplate');
    let categoryListTemplate = document.querySelector('.categoryListTemplate');

    let categoryListTemplateInstance = Handlebars.compile(categoryListTemplate.innerHTML);
    let productListTemplateInstance = Handlebars.compile(productListTemplate.innerHTML);
    let errorsTemplateInstance = compileTemplate('.errorsTemplate');

    let productsElem = document.querySelector('.products');
    let categoriesElem = document.querySelector('.categories');
    let errorsElem = document.querySelector('.errors');

    let productNameElem = document.querySelector('.productName');
    let priceElem = document.querySelector('.price');
    let categoryIdElem = document.querySelector('.categoryId');
    let productBtn = document.querySelector('.addProductBtn');

    // Client side Factory function
    let productService = ProductService();

    function showCategoryDropdown() {
        axios
            .get('/api/categories')
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = categoryListTemplateInstance({
                    categoryList: data
                });
                categoriesElem.innerHTML = html;
            });
    }

    function showProducts() {
        productService
            .getProducts()
            .then(function (results) {
                let response = results.data;
                let data = response.data;
                let html = productListTemplateInstance({
                    productList: data
                });
                let productTableHTML = html;
                productsElem.innerHTML = productTableHTML;
            });
    }

    function clearFields() {
        productNameElem.value = '';
        categoryIdElem.value = '';
        priceElem.value = '';
    }

    productBtn.addEventListener('click', function () {

        let description = productNameElem.value;
        let category_id = categoryIdElem.value;
        let price = priceElem.value;

        let errors = [];
        if (!description) {
            errors.push('Enter a product description');
        }
        if (!category_id) {
            errors.push('Select a Category');
        }
        if (!description) {
            errors.push('Enter a price');
        }

        if (errors.length === 0) {
            errorsElem.innerHTML = '';
            productService.addProduct({
                category_id,
                description,
                price
            })
                .then(function () {
                    showProducts();
                    clearFields();
                })
                .catch(function (err) {
                    alert(err);
                });
        }
        else {
            errorsElem.innerHTML = errorsTemplateInstance({ errors });
        }

    });

    showCategoryDropdown();
    showProducts();


});

function editProduct(id) {
    alert(id);
}

function ProductService() {
    function getProducts() {
        return axios.get('/api/products')
    }

    function addProduct(data) {
        return axios.post('/api/products', data)
    }

    return {
        addProduct,
        getProducts
    }
}