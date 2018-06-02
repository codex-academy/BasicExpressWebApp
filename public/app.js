document.addEventListener('DOMContentLoaded', function(){
    let messageElem = document.querySelector('.message');
    if (messageElem.innerHTML !== ''){
        setTimeout(function(){
            messageElem.innerHTML = '';
        }, 3000);
    }

});