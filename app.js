require('./bootstrap');

const User = require('./src/Entities/User');
const { find, create } = require('./src/Services/User');

const user = new User({ name: 'Diogo', birthdate: '1994-04-20' });

create(user)
  .then((user) => find(user.id))
  .then((user) => {
    console.log(user.created_at.format())
  });
