document.addEventListener('DOMContentLoaded', function() {

    let productListTemplate = document.querySelector('.productListTemplate');
    let categoryListTemplate = document.querySelector('.categoryListTemplate');

    let categoryListTemplateInstance = Handlebars.compile(categoryListTemplate.innerHTML);
    let productListTemplateInstance = Handlebars.compile(productListTemplate.innerHTML);
    
    let productsElem = document.querySelector('.products');
    let categoriesElem = document.querySelector('.categories');

    let productNameElem = document.querySelector('.productName');
    let priceElem = document.querySelector('.price');
    let categoryIdElem = document.querySelector('.categoryId');
    let productBtn = document.querySelector('.addProductBtn');

    // Client side Factory function
    let productService = ProductService();

    function showCategoryDropdown() {
        axios
        .get('/api/categories')
        .then(function(results){
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
        .then(function(results){
            let response = results.data;
            let data = response.data;
            let html = productListTemplateInstance({
                productList : data
            });
            let productTableHTML = html;
            productsElem.innerHTML = productTableHTML;
        });
    }
    
    function clearFields() {
        productNameElem.value = '';
        categoryIdElem.value = '';
        priceElem.value= '';
    }

    productBtn.addEventListener('click', function() {

        let description = productNameElem.value;
        let category_id = categoryIdElem.value;
        let price = priceElem.value;

        productService.addProduct({
                category_id,
                description,
                price
            })
            .then(function() {
                showProducts();
                clearFields();
            })
            .catch(function(err){
                alert(err);
            });
    });

    showCategoryDropdown();
    showProducts();

});

function ProductService() {
    function getProducts(){
        return axios.get('/api/products')
    }

    function addProduct(data) {
        return axios.post('/api/products', data)
    }

    return {
        getProducts
    }
}