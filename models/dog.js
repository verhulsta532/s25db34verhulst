const mongoose = require("mongoose");
const dogController = require("../controllers/dogCollection");
const { router } = require("../routes/dog");

// Define the schema
const dogSchema = new mongoose.Schema({
  dog_name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters'],
    maxlength: [30, 'Name cannot exceed 30 characters'],
    trim: true
  },
  breed: {
    type: String,
    required: [true, 'Breed is required'],
    enum: {
      values: ['Labrador', 'Poodle', 'Bulldog', 'Beagle', 'Other'],
      message: '{VALUE} is not a valid breed'
    }
  },
  age: {
    type: Number,
    required: [true, 'Age is required'],
    min: [0, 'Age cannot be negative'],
    max: [30, 'Dogs rarely live beyond 30 years']
  }, 
  weight: {
    type: Number,
    required: [true, 'Weight is required'],
    min: [1, 'Weight must be at least 1kg'],
    max: [100, 'Weight cannot exceed 100kg'],
    validate: {
      validator: Number.isInteger,
      message: 'Weight must be a whole number'
    }
  }
}, { timestamps: true });


// Create and export the model
const Dog = mongoose.model('Dog', dogSchema);

// Seed function (only runs when executed directly)
async function seedDB() {
  try {
    await Dog.deleteMany();
    
    const initialDogs = [
      {
        dog_name: "Goldie",
        breed: "Labrador",
        age: 3
      },
      {
        dog_name: "Ralph",
        breed: "Bulldog",
        age: 1
      },
      {
        dog_name: "Marus",
        breed: "Husky", // Note: Husky not in enum, will fail
        age: 1
      }
    ];

    // Filter out invalid breeds first
    const validDogs = initialDogs.filter(dog => 
      dogSchema.path('breed').enumValues.includes(dog.breed)
    );

    await Dog.insertMany(validDogs);
    console.log(`Database seeded with ${validDogs.length} dogs`);
    
  } catch (err) {
    console.error('Seeding error:', err);
  }
}

// Only run seed if executed directly
if (require.main === module) {
  require('dotenv').config();
  mongoose.connect(process.env.DB_URI)
    .then(() => {
      console.log('Connected to MongoDB');
      return seedDB();
    })
    .catch(err => console.error('Connection error:', err))
    .finally(() => mongoose.disconnect());
}

module.exports = Dog;
// In your routes file:
router.get('/', dogController.dog_list);
