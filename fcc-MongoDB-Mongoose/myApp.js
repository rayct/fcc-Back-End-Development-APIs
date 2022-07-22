const mongoose = require('mongoose');
const mongo = process.env['MONGO_URI'];
mongoose.connect(mongo);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Assign Mongoose Schema to a variable
const Schema = mongoose.Schema;

// Create Person schema.
const personSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  age: Number,
  favoriteFoods: [String]
});
// Create Person model from the schema.
var Person = mongoose.model("Person", personSchema);


var createAndSavePerson = function (done) {
  var emmaWatson = new Person({
    name: "Emma Watson",
    age: 32,
    favoriteFoods: ["Vegatables", "fish", "fresh fruit"]
  });

  janeFonda.save(function (err, data) {
    if (err) return console.error(err);
    done(null, data)
  });
};

function createManyPeople(arrayOfPeople, done) {
  Person.create(arrayOfPeople, function (err, people) {
    if (err)
      return console.log(err);
    done(null, people);
  });

}

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, function(err, people) {
    if (err) return console.log(err);
    done(null, people);
  });
  
};

const findOneByFood = (food, done) => {
  Person.findOne({favouriteFoods: food}, (error, food) => {
    if (error) return console.log(error);
    done(null, food);
    
  })
};

const findPersonById = function(personId, done) {
  Person.findById(personId, function (err, data) {
    if (err) return console.log(err);
    done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = 'hamburger';

  // .findById() method to find a person by _id with the parameter personId as search key. 
  Person.findById(personId, (err, person) => {
    if(err) return console.log(err); 
  
    // Array.push() method to add "hamburger" to the list of the person's favoriteFoods
    person.favoriteFoods.push(foodToAdd);

    // and inside the find callback - save() the updated Person.
    person.save((err, updatedPerson) => {
      if(err) return console.log(err);
      done(null, updatedPerson)
    })
  })
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

  Person.findOneAndUpdate({name: personName}, {age: ageToSet}, {new: true}, (err, updatedDoc) => {
    if(err) return console.log(err);
    done(null, updatedDoc);
  })
};

// Solution 1
function removeById(personId, done) {
  Person.findByIdAndRemove(personId, function (error, removedPerson) {
    if (error)
      return console.log(error);
    done(null, removedPerson);
  });
}

// Solution 2
var removeById = function(personId, done) {
  Person.findByIdAndRemove(
    personId,
    (err, removedDoc) => {
      if(err) return console.log(err);
      done(null, removedDoc);
    }
  ); 
};

const removeManyPeople = (done) => {
  const nameToRemove = 'Mary';

  done(null /*, data*/ );
};

const queryChain = (done) => {
  const foodToSearch = 'burrito';

  done(null /*, data*/ );
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