import axios from 'https://cdn.jsdelivr.net/npm/axios@1.13.2/+esm';

const URL = 'https://dummyjson.com/products';

// Modal Update
const editModal = document.getElementById('edit-modal');
const editTitle = document.getElementById('edit-title');
const editDescription = document.getElementById('edit-description');
const saveEditBtn = document.getElementById('save-edit');
const closeEditBtn = document.getElementById('close-edit');

let currentEditId = null;
let currentElement = null;

let products = [];

const productsList = document.getElementById('products-list');

// START
const start = async () => {
    try {
        const response = await axios.get(URL);
        products = response.data.products;

        products.forEach(product => renderProduct(product));

    } catch (error) {
        console.error(error);
    }
};

start()
    .then(() => {
        console.log('Get products all done');
    })
.catch((error) => {
    console.error(error);
});

// ADD
const addBtn = document.getElementById('add-btn');
const titleInput = document.getElementById('title-input');
const descriptionInput = document.getElementById('description-input');
const errMsg = document.getElementById('error-message');

addBtn.addEventListener('click', async () => {
    const title = titleInput.value.trim();
    const description = descriptionInput.value.trim();

    if (!title || !description) {
        errMsg.textContent = "Bạn chưa nhập tiêu đề hoặc nội dung";
        errMsg.style.color = "red";
        return;
    }

    errMsg.textContent = "";

    try {
        const { data } = await axios.post(URL + '/add', {
            title,
            description
        });

        products.push(data);
        renderProduct(data);

        titleInput.value = '';
        descriptionInput.value = '';
        titleInput.focus();

    } catch (error) {
        console.error(error);
    }
});

function renderProduct(product) {
    const div = document.createElement('div');
    div.style.marginBottom = '10px';

    const p = document.createElement('p');
    const btn = document.createElement('button');
    const updateBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    p.textContent = product.title;
    btn.textContent = 'Chi tiết';
    updateBtn.textContent = 'Update';
    deleteBtn.textContent = 'Xóa';

    // DETAIL
    btn.addEventListener('click', () => {
        window.location.href = `detail.html?id=${product.id}`;
    });

    // UPDATE
    updateBtn.addEventListener('click', () => {
        editModal.classList.add('active');

        currentEditId = product.id;
        currentElement = p;

        editTitle.value = product.title;
        editDescription.value = product.description || '';
    });

    // DELETE
    deleteBtn.addEventListener('click', async () => {
        const isConfirm = confirm('Bạn có chắc chắn muốn xoá không?');
        if (!isConfirm) return;

        try {
            await axios.delete(`${URL}/${product.id}`);
            div.remove();
            products = products.filter(p => p.id !== product.id);
        } catch (error) {
            console.error(error);
        }
    });

    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(updateBtn);
    div.appendChild(deleteBtn);

    productsList.appendChild(div);
}

// SAVE
saveEditBtn.addEventListener('click', async () => {
    const newTitle = editTitle.value.trim();
    const newDescription = editDescription.value.trim();

    if (!newTitle || !newDescription) {
        alert('Chưa nhập tiêu đề hoặc nội dung');
        return;
    }

    try {
        const { data } = await axios.put(`${URL}/${currentEditId}`, {
            title: newTitle,
            description: newDescription
        });

        if (currentElement) {
            currentElement.textContent = data.title;
        }

        const index = products.findIndex(p => p.id === currentEditId);
        if (index !== -1) {
            products[index] = { ...products[index], ...data };
        }

        closeModal();
        console.log('Đã update:', data);
    } catch (error) {
        console.error(error);
    }
});

closeEditBtn.addEventListener('click', () => {
    closeModal();
});

editModal.addEventListener('click', (e) => {
    if (e.target === editModal) {
        closeModal();
    }
});

function closeModal() {
    editModal.classList.remove('active');

    editTitle.value = '';
    editDescription.value = '';

    currentEditId = null;
    currentElement = null;
}
