const products = [
    { productId: 1, name: "iPhone", price: 20000000, stock: 5 },
    { productId: 2, name: "Samsung", price: 15000000, stock: 3 },
    { productId: 3, name: "Xiaomi", price: 8000000, stock: 0 }
];

function getProduct(productId) {
    return new Promise((resolve, reject) => {

        setTimeout(() => {

            const product = products.find(p => p.productId === productId);

            if (product) {
                resolve(product);
            } else {
                reject("Sản phẩm không tồn tại");
            }

        }, 1000);

    });
}

function processPayment(product) {
    return new Promise((resolve, reject) => {

        console.log("Đang thanh toán...");

        setTimeout(() => {

            if (product.stock > 0) {
                resolve("Thanh toán thành công");
            } else {
                reject("Sản phẩm không tồn tại");
            }

        }, 1500);

    });
}

function createOrder(product) {
    return new Promise((resolve) => {

        console.log("Đang tạo đơn hàng...");

        setTimeout(() => {

            resolve({
                orderId: Date.now(),
                productName: product.name,
                status: "SUCCESS"
            });

        }, 1000);

    });
}

function buyProduct(productId) {

    getProduct(productId)
        .then(product => {
            console.log("Tồn kho hợp lệ");
            return processPayment(product)
                .then(result => {
                    console.log(result);
                    return product;
                });
        })
        .then(product => {
            return createOrder(product);
        })
        .then(order => {
            console.log("Đặt hàng thành công!");
            console.log("Order:", order);
        })
        .catch(err => {
            console.log("Lỗi:", err);
        });

}

buyProduct(1)
buyProduct(2)