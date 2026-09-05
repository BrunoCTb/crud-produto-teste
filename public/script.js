const productForm = document.getElementById('productForm');
const productTable = document.getElementById('productTable');
const submitButton = document.getElementById('submitButton');
const cancelButton = document.getElementById('cancelButton');

let editingProductId = null;

productForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const product = {
        user: document.getElementById('user').value,
        description: document.getElementById('description').value,
        quantity: Number(document.getElementById('quantity').value),
        price: Number(document.getElementById('price').value)
    };

    let response;

    if (editingProductId === null) {
        response = await fetch('/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    } else {
        response = await fetch(`/api/products/${editingProductId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        });
    }

    if (!response.ok) {
        alert('Erro ao salvar produto.');
        return;
    }

    resetForm();
    loadProducts();
});

async function loadProducts() {
    const response = await fetch('/api/products');
    const products = await response.json();

    productTable.innerHTML = '';

    document.getElementById('productCount').textContent =
        `${products.length} ${products.length === 1 ? 'produto' : 'produtos'}`;

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td>${new Date(product.registrationDate).toLocaleString('pt-BR')}</td>
            <td>${product.user}</td>
            <td>${product.description}</td>
            <td>${product.quantity}</td>
            <td>R$ ${Number(product.price).toFixed(2)}</td>
            <td>
                <button
                    class="action-button edit-button"
                    onclick="editProduct(${product.id})">
                    Editar
                </button>

                <button
                    class="action-button delete-button"
                    onclick="deleteProduct(${product.id})">
                    Excluir
                </button>
            </td>
        `;

        productTable.appendChild(row);
    });
}

async function editProduct(id) {
    const response = await fetch(`/api/products/${id}`);

    if (!response.ok) {
        alert('Produto não encontrado.');
        return;
    }

    const product = await response.json();

    document.getElementById('user').value = product.user;
    document.getElementById('description').value = product.description;
    document.getElementById('quantity').value = product.quantity;
    document.getElementById('price').value = product.price;

    editingProductId = product.id;

    submitButton.textContent = 'Salvar alterações';
    cancelButton.hidden = false;
}

async function deleteProduct(id) {
    const confirmed = confirm('Deseja realmente excluir este produto?');

    if (!confirmed) {
        return;
    }

    const response = await fetch(`/api/products/${id}`, {
        method: 'DELETE'
    });

    if (!response.ok) {
        alert('Erro ao excluir produto.');
        return;
    }

    loadProducts();
}

function resetForm() {
    productForm.reset();

    editingProductId = null;

    submitButton.textContent = 'Cadastrar';
    cancelButton.hidden = true;
}

cancelButton.addEventListener('click', () => {
    resetForm();
});

loadProducts();