//ex1
const products = [
    { id: 1, name: 'iPhone', price: 2000 },
    { id: 2, name: 'Samsung', price: 1500 },
    { id: 3, name: 'Xiaomi', price: 1000 },
    { id: 4, name: 'Oppo', price: 1200 }
]

const orders = [
    {
        id: 1,
        items: [
            { productId: 1, quantity: 2 },
            { productId: 2, quantity: 1 }
        ]
    },
    {
        id: 2,
        items: [
            { productId: 1, quantity: 1 },
            { productId: 3, quantity: 3 }
        ]
    },
    {
        id: 3,
        items: [
            { productId: 2, quantity: 2 },
            { productId: 4, quantity: 1 }
        ]
    }
]

const getHighestRevenueProduct = (x, y)=> {
    const productMap = {};
    for(const product of x) {
        productMap[product.id] = product.price;
    }
    const priceMap = {}
    for(const order of y) {
        for(const item of order.items){
            const price = productMap[item.productId]
            if (priceMap[item.productId] === undefined) {
                priceMap[item.productId] = 0;
            }
            priceMap[item.productId] += price * item.quantity;
        }
    }
    // return priceMap;
    let maxKey = null;
    let maxValue = -Infinity;
    for (const key in priceMap) {
        if (priceMap[key] > maxValue) {
            maxValue = priceMap[key];
            maxKey = Number(key);
        }
    }

    let result = null;
    for (const product of y) {
        if (product.id === maxKey) {
            result = product;
            break;
        }
    }
    return result;
}
console.log(getHighestRevenueProduct(products, orders))