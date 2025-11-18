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
    'Campus Mart': [
        { id: 'item101', name: 'Notebook', quantity: 25, price: 60.00, imageUrl: '/images/Stationary/Notebook.jpeg' },
        { id: 'item102', name: 'Blue Book', quantity: 150, price: 20.00, imageUrl: '/images/Stationary/BlueBook.jpeg' },
        { id: 'item103', name: 'Calculator', quantity: 12, price: 800.00, imageUrl: '/images/Stationary/Calculator.jpeg' },
        { id: 'item104', name: 'Pen', quantity: 100, price: 50.00, imageUrl: '/images/Stationary/Pen.jpeg' },
    ],
    'GJBC Canteen': [
        { id: 'item201', name: 'Babycorn manchurian', quantity: 45, price: 80.00, imageUrl: '/images/Gjbc/Babycorn_manchurian.jpeg' },
        // --- THIS IS THE LINE THAT WAS FIXED ---
        { id: 'item202', name: 'Fried Rice', quantity: 50, price: 100.00, imageUrl: '/images/Gjbc/Fried_rice.jpeg' },
        { id: 'item203', name: 'Roti', quantity: 70, price: 90.00, imageUrl: '/images/Gjbc/Roti.jpeg' },
    ],
    'Snack Store(BE block)': [
        { id: 'item301', name: 'Maggi', quantity: 80, price: 50, imageUrl: '/images/Snacks/Maggi.jpeg' },
        { id: 'item302', name: 'Bun Samosa', quantity: 60, price: 45, imageUrl: '/images/Snacks/BunSamosa.jpeg' },
        { id: 'item303', name: 'Fries', quantity: 120, price: 60, imageUrl: '/images/Snacks/Fries.jpeg' },
        { id: 'item304', name: 'Puffs', quantity: 200, price: 30, imageUrl: '/images/Snacks/Puffs.jpeg' },
    ],
    'Hornbill': [
        { id: 'item401', name: 'Brownie', quantity: 30, price: 120.00, imageUrl: '/images/Hornbill/Brownie.jpeg' },
        { id: 'item402', name: 'Sandwich', quantity: 50, price: 90.00, imageUrl: '/images/Hornbill/Sandwich.jpeg' },
    ],
    '13th floor': [
        { id: 'item501', name: 'Masala Dosa', quantity: 20, price: 150.00, imageUrl: '/images/13th_floor/Masala_Dosa.jpeg' },
        { id: 'item502', name: 'Panner Roll', quantity: 25, price: 120.00, imageUrl: '/images/13th_floor/Panner_roll.jpeg' },
    ],
    'NonVeg food court(GJBC)': [
        { id: 'item601', name: 'Kebab', quantity: 15, price: 180.00, imageUrl: '/images/Nonveg/Kebab.jpeg' },
        { id: 'item602', name: 'Shawarma', quantity: 40, price: 140.00, imageUrl: '/images/Nonveg/Shawarma.jpeg' },
    ],
};