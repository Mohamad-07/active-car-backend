const bcrypt = require('bcrypt');

const saltRounds = 10;
const plainPassword = 'Admin.786';

bcrypt.hash(plainPassword, saltRounds, function (err, hash) {
  if (err) {
    console.error(err);
  } else {
    console.log('Hashed Password:', hash);
  }
});
