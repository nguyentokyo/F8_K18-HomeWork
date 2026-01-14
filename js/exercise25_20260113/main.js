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
            { productId: 2, quantity: 8 }
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

/**
 * Logic idea
 * Step 1: Calculate the total quantity sold for each product from the order table
 *         and store it in a new table called `quantityMap`
 * Step 2: Combine the `quantityMap` table with the `product` table
 *         to calculate the total revenue of each product
 *         └ Formula: Product total revenue = quantity sold × product price
 * Step 3: Find the product name with the highest revenue
 *         and determine the maximum revenue amount
 */

const quantityMap = {};

for (let i = 0; i < orders.length; i++) {
    // get items of orders
    const items = orders[i].items;

    // sum quantity
    for (let j = 0; j < items.length; j++) {
        const productId = items[j].productId;
        const quantity = items[j].quantity;

        // console.log(productId, quantity);
        if (quantityMap[productId]) {
            quantityMap[productId] = quantityMap[productId] + quantity;
        } else {
            quantityMap[productId] = quantity;
        }
        //
    }
}

console.log('get quantity table :',quantityMap);
console.log('get products table :', products);
//
// console.log(products[0].price * quantityMap[1]);
// console.log(products[1].price * quantityMap[2]);
// console.log(products[2].price * quantityMap[3]);
// console.log(products[3].price * quantityMap[4]);

for (const product of products) {
    // productQuantityMap[product.id] = product.price;

    //console.log('productID', product.id);

    for (const quantity in quantityMap) {

        // console.log('quantity', typeof quantity, Number(quantity));
        if (product.id === Number(quantity)) {
            // console.log('quantity', quantity, typeof quantity);

            products[product.id - 1].quantity = quantityMap[quantity];
            products[product.id - 1].totalPrice = products[product.id - 1].price * quantityMap[quantity];
        }
    }
}

console.log('get product revenue table :', products);

function getMaxTotalPrice(arr) {
    if (!(Array.isArray(arr))) {
        return 'Is Not Array';
    }
    if (arr.length === 0) {
        return 'Array is Empty'
    }

    let max = arr[0].totalPrice;
    let name = arr[0].name;

    for (let i = 0; i < arr.length; i++) {
        if (max < arr[i].totalPrice) {
            max = arr[i].totalPrice;
            name = arr[i].name;
        }
    }
    return {name , max};
}

console.log('---result---');
console.log('Product Name :', getMaxTotalPrice(products).name);
console.log('Total Price :', getMaxTotalPrice(products).max);

// Print result:
// get quantity table : { '1': 3, '2': 10, '3': 3, '4': 1 }
// get products table : [
//     { id: 1, name: 'iPhone', price: 2000 },
//     { id: 2, name: 'Samsung', price: 1500 },
//     { id: 3, name: 'Xiaomi', price: 1000 },
//     { id: 4, name: 'Oppo', price: 1200 }
// ]
// get product revenue table : [
//     { id: 1, name: 'iPhone', price: 2000, quantity: 3, totalPrice: 6000 },
//     { id: 2, name: 'Samsung', price: 1500, quantity: 10, totalPrice: 15000},
//     { id: 3, name: 'Xiaomi', price: 1000, quantity: 3, totalPrice: 3000 },
//     { id: 4, name: 'Oppo', price: 1200, quantity: 1, totalPrice: 1200 }
// ]
// ---result---
// Product Name : Samsung
// Total Price : 15000


