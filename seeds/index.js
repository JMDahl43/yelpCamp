const mongoose = require('mongoose')
const cities = require('./cities')
const { places, descriptors } = require('./seedHelpers')
const Campground = require('../models/campground')

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', () => {
  console.log('Database connected')
})

const sample = (array) => array[Math.floor(Math.random() * array.length)]

const seedDB = async () => {
  // Clear table
  await Campground.deleteMany({})
  // Create new data
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000)
    const price = Math.floor(Math.random() * 20) + 10
    const camp = new Campground({
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: `https://source.unsplash.com/random/camping,${i}`,
      description:
        'Meatball pancetta short loin sirloin, landjaeger swine picanha cupim pork loin ground round tenderloin bacon ham hock ball tip shoulder. Ribeye shank frankfurter rump ham. Pork loin capicola rump spare ribs doner, shank meatball brisket chislic swine. Chislic pancetta strip steak flank.',
      price,
    })
    await camp.save()
  }
}

seedDB().then(() => {
  mongoose.connection.close()
})
