const fs = require('fs');
const path = require('path');
const User = require("../model/userModel");

const renderHome = (req, res) => {
  User.find().then((users) => {
    res.render("user", { users: users });
  });
};

const addName = (req, res) => {
 const newUser = new User({
    name: req.body.name,
    file: req.file.filename,
  });

  newUser.save().then((result) => {
    res.redirect("/");
  }).catch((error) => {
    console.log('Error saving user:', error);
    res.status(500).send("Error saving user");
  });
};
const deleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id)
    .then(user => {
      if (user) {
        const filePath = path.join(__dirname, '../public/uploads/', user.file);
        fs.unlink(filePath, (err) => {
          if (err) {
            console.log('Error deleting file:', err);
          }
          res.redirect('/');
        });
      } else {
        res.status(404).send('User not found');
      }
    })
    .catch(err => {
      console.log('Error deleting user:', err);
      res.status(500).send('Error deleting user');
    });
};

module.exports = { renderHome, addName,deleteUser };