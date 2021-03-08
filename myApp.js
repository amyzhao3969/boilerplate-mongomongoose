/** 1) Install & Set up mongoose */

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URI, {
        dbName: process.env.DB_NAME,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(()=>{
        console.log('database connected.')
    }).catch((err) => console.log(err.message))

/** 2) Create a 'Person' Model */
var personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  favoriteFoods: [String]
});

/** 3) Create and Save a Person */
var Person = mongoose.model('Person', personSchema);

var createAndSavePerson = function(done) {
  var janeFonda = new Person({name: "Jane Fonda", age: 84, favoriteFoods: ["eggs", "fish", "fresh fruit"]});
  try{
  janeFonda.save(function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
  } catch(e) {
    console.log(e);
  }
};

let arrayOfPeople = [
  {name: "John", age: 90, favoriteFoods: ['eggs', 'chicken', 'mushroom']}, 
  {name: "Lucy", age: 80, favoriteFoods: ['eggs', 'chicken', 'mushroom']}];

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({name: personName}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findOneByFood = (food, done) => {
  Person.findOne({favoriteFoods: food}, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

const findEditThenSave = (personId, done) => {
    const foodToAdd = "hamburger";
    Person.findById(personId, function(err, person) {
      if (err) return console.log(err);

      person.favoriteFoods.push(foodToAdd);

      person.save(function(err, updatedPerson) {
      if (err) return console.error(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;
  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, function(err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc);
  });
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, updatedDoc) {
    if (err) return console.log(err);
    done(null, updatedDoc)
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";
  Person.remove({name: nameToRemove}, function(err, removedDoc) {
    if (err) return console.log(err);
    done(null, removedDoc)
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";
  Person
  .find({favoriteFoods: foodToSearch})
  .sort({name: 1})
  .limit(2)
  .select({age: 0})
  .exec(function(err, people) {
    if (err) return console.log(err);
    done(null, people)
  });
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
