const bar = document.getElementById('bar');
const close = document.getElementById('close');
const nav = document.getElementById('navbar');
const cartItem = document.querySelectorAll('.add-to-cart');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    })
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    })
}

document.getElementById('shop-now-btn').addEventListener('click', function() {
    window.location.href = 'shop.html';
});

