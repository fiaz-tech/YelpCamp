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
        const price = Math.floor(Math.random()*150 + 1);
        const camp = new Campground({
            author: '62075030219a66422b5252b3',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,

            geometry: {
                type: "Point",
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude,
                ]
            },

            images: [
                {
                    url: 'https://res.cloudinary.com/fiaztech/image/upload/v1646765520/YelpCamp/nqbcfdqwkoo0n5snr6nw.jpg',
                    filename: 'YelpCamp/nqbcfdqwkoo0n5snr6nw'
                  },
                  {
                    url: 'https://res.cloudinary.com/fiaztech/image/upload/v1646765521/YelpCamp/rcpjzbmbzrvlfuf8vt78.jpg',
                    filename: 'YelpCamp/rcpjzbmbzrvlfuf8vt78'
                  }
              
              ],
            description: "Lorcilis quaeraS porro neque unde nisi at explicabo sit molestias. Laudantium nulla sunt libersoluta repellat cupiditate.",
            price: price
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})