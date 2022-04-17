const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '6253e0b04ae988aabb3fa16a',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sapiente illo voluptates quaerat. Ipsa id dolores totam cupiditate libero quod, a possimus voluptatem ducimus sint, temporibus ad beatae eveniet doloremque commodi.',
            price,
            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/digamthuv/image/upload/v1649749901/YelpCamp/pwxc3jhnzmjpkmhbgjc8.jpg',
                  filename: 'YelpCamp/pwxc3jhnzmjpkmhbgjc8',
                },
                {
                  url: 'https://res.cloudinary.com/digamthuv/image/upload/v1649749902/YelpCamp/kc7znhhylzmu47r2dev1.jpg',
                  filename: 'YelpCamp/kc7znhhylzmu47r2dev1',
                }
            ]      
        })
        await camp.save();
    }
}


seedDB().then(() => {
    mongoose.connection.close();
});