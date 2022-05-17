const S = require("sequelize");
const db = require("../db");
const bcrypt = require("bcrypt");

class User extends S.Model {
  hasher(password, salt) {
    return bcrypt.hash(password, salt);
  }
}

User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    email: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.STRING,
      allowNull: false,
    },
    salt: {
      type: S.STRING,
    },
    favoriteMovies: {
      type: S.ARRAY(S.STRING),
    },
  },
  { sequelize: db, modelName: "users", timestamps: true }
);

User.beforeCreate((user) => {
  return bcrypt
    .genSalt(6)
    .then((salt) => {
      user.salt = salt;
      return user.hasher(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
