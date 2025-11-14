// This file simulates our database.
// The "export" keyword makes these variables available to other files.

export const fakeStudents = [
    { srn: 'STUDENT01', password: 'password123', name: 'Alex' },
    { srn: 'STUDENT02', password: 'password456', name: 'Ben' },
];

export const fakeStores = [
    { id: 'store1', name: 'Campus Mart' },
    { id: 'store2', name: 'GJBC Canteen' },
    { id: 'store3', name: 'Snack Store(BE block)' },
    { id: 'store4', name: 'Hornbill' },
    { id: 'store5', name: '13th floor' },
    { id: 'store6', name: 'NonVeg food court(GJBC)' },
];

export const fakeItems = {
    // Items are mapped to a store's ID
    store1: [
        { id: 'item101', name: 'Notebook', quantity: 25, price: 2.50 },
        { id: 'item102', name: 'Blue Pen', quantity: 150, price: 0.50 },
        { id: 'item103', name: 'Calculator', quantity: 12, price: 15.00 },
    ],
    store2: [
        { id: 'item201', name: 'Samosa', quantity: 45, price: 1.00 },
        { id: 'item202', name: 'Coffee', quantity: 'Available', price: 1.25 },
    ],
    store3: [
        { id: 'item301', name: 'Chips', quantity: 80, price: 1.00 },
        { id: 'item302', name: 'Chocolate Bar', quantity: 60, price: 1.50 },
    ],
    store4: [
        { id: 'item401', name: 'Burger', quantity: 30, price: 3.00 },
        { id: 'item402', name: 'Fries', quantity: 50, price: 2.00 },
    ],
    store5: [
        { id: 'item501', name: 'Pasta', quantity: 20, price: 4.00 },
        { id: 'item502', name: 'Salad', quantity: 25, price: 3.50 },
    ],
    store6: [
        { id: 'item601', name: 'Chicken Curry', quantity: 15, price: 5.00 },
        { id: 'item602', name: 'Rice Bowl', quantity: 40, price: 2.50 },
    ],
};