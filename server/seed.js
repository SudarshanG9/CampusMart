const mongoose = require('mongoose');
const path = require('path');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// --- THE CACHE-BUSTING FIX ---
// This tells Mongoose to delete the "User" model from its internal memory cache.
// This forces it to re-read your user.model.js file from scratch.
if (mongoose.models.User) {
    delete mongoose.models.User;
}
if (mongoose.models.Store) {
    delete mongoose.models.Store;
}
if (mongoose.models.Item) {
    delete mongoose.models.Item;
}
// --- END OF FIX ---

// Now we can safely import our models, knowing we'll get the latest version
const Store = require('./models/store.model');
const Item = require('./models/item.model');
const User = require('./models/user.model');
const { fakeStores, fakeItems, fakeStudents } = require(path.join(__dirname, '..', 'mini-project', 'src', 'data', 'mockData.js'));

const seedDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('Database connected for seeding...');

        // Clear existing data
        await Store.deleteMany({});
        await Item.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing data.');

        // Seed Stores and Items
        const storesToCreate = fakeStores.map(store => ({ name: store.name }));
        const createdStores = await Store.insertMany(storesToCreate);
        console.log(`${createdStores.length} stores seeded successfully.`);
        
        const storeMap = createdStores.reduce((map, store) => {
            map[store.name] = store._id;
            return map;
        }, {});

        const itemsToCreate = [];
        for (const storeName in fakeItems) {
            const storeId = storeMap[storeName];
            if (storeId) {
                fakeItems[storeName].forEach(item => {
                    itemsToCreate.push({
                        name: item.name,
                        quantity: item.quantity,
                        price: item.price,
                        imageUrl: item.imageUrl,
                        store: storeId
                    });
                });
            }
        }
        await Item.insertMany(itemsToCreate);
        console.log(`${itemsToCreate.length} items seeded successfully.`);

        // Seed Student Users
        console.log('Seeding student users...');
        const usersToCreate = [];
        for (const student of fakeStudents) {
            const hashedPassword = await bcrypt.hash(student.password, 10); 
            usersToCreate.push({
                srn: student.srn,
                password: hashedPassword
            });
        }
        await User.insertMany(usersToCreate);
        console.log(`${usersToCreate.length} student users seeded successfully.`);

    } catch (err) {
        console.error('Seeding failed:', err);
    } finally {
        mongoose.connection.close();
        console.log('Seeding complete. Database connection closed.');
    }
};

seedDB();