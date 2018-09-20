document.addEventListener('DOMContentLoaded', function() {

    let productListTemplate = document.querySelector('.productListTemplate');
    let productListTemplateInstance = Handlebars.compile(productListTemplate.innerHTML);
    let productsElem = document.querySelector('.products');

    // Client side Factory function
    let productService = ProductService();

    productService
        .getProducts()
        .then(function(results){
            let response = results.data;
            let data = response.data;
            // console.log(data);
            let productTableHTML = productListTemplateInstance({
                productList : data
            });
            productsElem.innerHTML = productTableHTML;
        });
});


function ProductService() {
    function getProducts(){
        return axios.get('/api/products')
    }

    return {
        getProducts
    }
}