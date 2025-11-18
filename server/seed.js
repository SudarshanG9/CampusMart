const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config();

const Store = require('./models/store.model');
const Item = require('./models/item.model');

// This is the key: We import the single source of truth from your frontend's data file.
const { fakeStores, fakeItems } = require(path.join(__dirname, '..', 'mini-project', 'src', 'data', 'mockData.js'));

const seedDB = async () => {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Database connected for seeding...');

    // Clear existing data
    await Store.deleteMany({});
    await Item.deleteMany({});
    console.log('Cleared existing data.');

    // Prepare the stores for insertion from fakeStores
    const storesToCreate = fakeStores.map(store => ({ name: store.name }));
    const createdStores = await Store.insertMany(storesToCreate);
    console.log(`${createdStores.length} stores seeded successfully.`);
    
    // Create a map of store names to their new MongoDB _id's
    const storeMap = createdStores.reduce((map, store) => {
        map[store.name] = store._id;
        return map;
    }, {});

    // Prepare all items using the fakeItems object and the storeMap
    const itemsToCreate = [];
    // The keys in your fakeItems object (e.g., 'Campus Mart') must EXACTLY match
    // the 'name' properties in your fakeStores array.
    for (const storeName in fakeItems) {
        const storeId = storeMap[storeName]; // Look up the ID using the name
        if (storeId) {
            fakeItems[storeName].forEach(item => {
                itemsToCreate.push({
                    name: item.name,
                    quantity: item.quantity,
                    price: item.price,
                    imageUrl: item.imageUrl,
                    store: storeId // Link the item to the correct store's new ID
                });
            });
        } else {
            console.log(`Warning: Could not find a matching store for items listed under "${storeName}". These items will be skipped.`);
        }
    }
    
    // Insert all items into the database
    await Item.insertMany(itemsToCreate);
    console.log(`${itemsToCreate.length} items seeded successfully.`);

    mongoose.connection.close();
    console.log('Seeding complete. Database connection closed.');
};

seedDB().catch(err => {
    console.error('Seeding failed:', err);
    mongoose.connection.close();
});