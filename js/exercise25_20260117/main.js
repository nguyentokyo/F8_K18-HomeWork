const products = [
    { id: 1, name: "Gạo ST25", price: 180000, remaining: 20 },
    { id: 2, name: "Dầu ăn", price: 65000, remaining: 15 },
    { id: 3, name: "Nước mắm", price: 45000, remaining: 30 },
    { id: 4, name: "Sữa tươi", price: 38000, remaining: 25 },
    { id: 5, name: "Trứng gà", price: 42000, remaining: 18 }
];

// {
//     id: number,
//         productId: number,
//     quantity: number
// }

// LOGIC
// ①The product table's stock quantity must be updated immediately after successfully creating or deleting an order.
// ②The total quantity of orders for a product, no matter how many times it is ordered,
// 　must not exceed the available stock. If it does, an error should be reported.
// ③When an order is deleted, the product's stock quantity should be restored accordingly.
// ④In practice, there are cases where many people order the same product at the same time,
// 　which could result in insufficient stock.
// 　However, for now, we will temporarily ignore this scenario.
// ⑤Create an empty order table with the starting orderId = 1.
// 　Each time a product is ordered, the orderId should increment by 1.
// ⑥The orders table is linked to the product table through productID.

const orders = []

let maxOrderId = 1

// function getProduct(products, productId) {
//     return products.find(p => p.id === productId)
// }
// console.log(getProduct(products, 2))

const createOrder = (productId, quantity) => {
    // product find
    const product = products.find(p => p.id === productId)

    // undefined
    if (!product) return "product not found"

    // quantity <= 0
    if (quantity <= 0) return "The order quantity must be greater than 0."

    if (product.remaining < quantity) return "out of stock"

    product.remaining -= quantity

    const order = {
        id: maxOrderId++,
        productId,
        quantity
        // productName: product.name
    }

    orders.push(order)

    return order
}

const updateOrder = (orderId, quantity) => {
    const order = orders.find(o => o.id === orderId)
    // check orderID
    if (!order) return "Order not found"
    // check update quantity
    if (quantity <= 0) return "The order quantity must be greater than 0."

    // find productID and update remaining
    for (const product of products) {
        if (product.id === order.productId) {
            const oldRemaining = product.remaining
            const currentQuantity = order.quantity

            // Not changed
            if (quantity === (oldRemaining + currentQuantity)) return "Order quantity has not changed from the previous order"

            // out of stock
            if (quantity > (oldRemaining + currentQuantity)) return "out of stock"

            // update remaining in products
            product.remaining = (oldRemaining + currentQuantity) - quantity
            order.quantity = quantity

            // difference between old remaining and new remaining
            let messageRemainingDifference = ''
            const diff = product.remaining - oldRemaining

            if (diff > 0) {
                messageRemainingDifference = `remaining increased by ${diff}`
            } else {
                messageRemainingDifference = `remaining decreased by ${-diff}`
            }

            return {order, messageRemainingDifference}
        }
    }
}

const deleteOrder = (orderId) => {
    const index = orders.findIndex(o => o.id === orderId)

    // check orderID
    if (index === -1) return "Order not found"

    // get the order before deleting it
    const order = orders[index]
    const oldQuantity = order.quantity

    // Delete orders by orderID
    orders.splice(index, 1)

    // update remaining in products
    const product = products.find(p => p.id === order.productId)
    if (product) {
        product.remaining = product.remaining + oldQuantity
    }

    return orders
}


// create order Dầu ăn quantity: 0 or quantity: -2
console.log(createOrder(2, 0))
console.log(createOrder(2, -2))
// The order quantity must be greater than 0.       ⇒ Ok

// create order Gạo quantity: 4 ⇒ OK
console.log(createOrder(1, 4))
// create order Dầu ăn quantity: 7 ⇒ OK
console.log(createOrder(2, 7))

// result
// orders
// { id: 1, productId: 1, quantity: 4 }  ⇒ Ok
// { id: 2, productId: 2, quantity: 7 }  ⇒ Ok

// console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 16 },   ⇒remaining 20 -4 = 16 Ok
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 8 },   ⇒remaining 15 -7 = 8 Ok
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]

// create order Dầu ăn quantity: 3 ⇒ OK
console.log(createOrder(2, 3))

// result
// orders
// { id: 1, productId: 1, quantity: 4 }  ⇒ Ok
// { id: 2, productId: 2, quantity: 7 }  ⇒ Ok
// { id: 3, productId: 2, quantity: 3 }  ⇒ Ok  ⇒ productID = 2 : quantity :10

// console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 16 },
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 5 },      ⇒remaining　15 - 10 = 5 ⇒ OK
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]

// create order Dầu ăn quantity: 8
console.log(createOrder(2, 8))
// out of stock (because remaining 5) OK

console.log(orders)
// { id: 1, productId: 1, quantity: 4 }
// { id: 2, productId: 2, quantity: 7 }
// { id: 3, productId: 2, quantity: 3 }

console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 16 },
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 5 },   ⇒ OK
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]
console.log("------------------Create Order End----------------")
//
console.log("------------------Update Order Start----------------")
let result = updateOrder(1, 15)

console.log(result.order)
// { id: 1, productId: 1, quantity: 15 } ⇒ Update quantity: 4 ⇒ 15 OK
console.log(orders)
// [
//     { id: 1, productId: 1, quantity: 15 },
//     { id: 2, productId: 2, quantity: 7 },
//     { id: 3, productId: 2, quantity: 3 }
// ]
console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 5 },        remaining 20 - 15 = 5 OK
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 5 },
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]

result = updateOrder(3, 5)

console.log(result.order)
// { id: 3, productId: 2, quantity: 3 } ⇒ { id: 3, productId: 2, quantity: 5 } ⇒ Update quantity: 3 ⇒ 5 OK
console.log(orders)
// [
// { id: 1, productId: 1, quantity: 15 },
//     { id: 2, productId: 2, quantity: 7 },
//     { id: 3, productId: 2, quantity: 5 }
// ]
console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 5 },
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 3 },       remaining : 15 - 7 -5 = 3 OK
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]
console.log("------------------Update Order End----------------")

console.log("------------------Delete Order Start----------------")

console.log(deleteOrder(4))
// Order not found  ⇒ Ok

console.log(deleteOrder(2))
// [
// { id: 1, productId: 1, quantity: 15 },
//     { id: 3, productId: 2, quantity: 5 }
// ]

// delete { id: 2, productId: 2, quantity: 7 } ⇒ ok

console.log(products)
// [
// { id: 1, name: 'Gạo ST25', price: 180000, remaining: 5 },
//     { id: 2, name: 'Dầu ăn', price: 65000, remaining: 10 },  ⇒ remaining 15 - 5 = 10 OK
//     { id: 3, name: 'Nước mắm', price: 45000, remaining: 30 },
//     { id: 4, name: 'Sữa tươi', price: 38000, remaining: 25 },
//     { id: 5, name: 'Trứng gà', price: 42000, remaining: 18 }
// ]
