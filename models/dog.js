const mongoose = require("mongoose");

// Define the schema
const dogSchema = new mongoose.Schema({
    dog_name: String,
    breed: String,
    age: Number
});

// Create and export the model
const Dog = mongoose.model('Dog', dogSchema, 'dog');
module.exports = Dog;

// Seed function
async function recreateDB() {
    try {
        // Delete all existing documents
        await Dog.deleteMany();
  
        // Create new dog instances
        const dog = [
            {
                dog_name: "Goldie",
                breed: "Golden Lab",
                age: 3
            },
            {
                dog_name: "Ralph",
                breed: "Pitbull",
                age: 1
            },
            {
                dog_name: "Marus",
                breed: "Husky",
                age: 1
            }
        ];

        // Save all dogs
        await Dog.insertMany(dog);
        console.log(`${dog.length} dogs saved successfully!`);
        
    } catch (err) {
        console.error('Error seeding data:', err);
    } finally {
        mongoose.disconnect(); // Disconnect in all cases
    }
}

// Conditional execution
if (require.main === module) {
    const reseed = true;
    if (reseed) {
        recreateDB();
    }
}