
import 'https://cdn.jsdelivr.net/npm/axios@1.13.2/dist/axios.min.js'

// lấy id từ URL
const params = new URLSearchParams(window.location.search);
const id = params.get('id');
console.log(params);

console.log(params.get('name'));

const renderDetail = async () => {
    try {
        const response = await axios.get(`https://dummyjson.com/products/${id}`);
        const product = response.data;

        const title = document.getElementById('title');
        const body = document.getElementById('body');

        title.textContent = product.title;
        body.textContent = product.description;

    } catch (error) {
        console.error(error);
    }
};

renderDetail().then(() => {
    console.log('Get products detail done');
})

// nút back
document.getElementById('back').addEventListener('click', () => {
    window.history.back();
});