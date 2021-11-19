const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
// const masterDB = require("./db/masterDB");

// module.exports = function (passport) {
//   passport.use(
//     new localStrategy(async (username, password, done) => {
//       await masterDB.findUser({ username: username }, (err, user) => {
//         if (err) throw err;
//         if (!user) return done(null, false);
//         console.log("find user!");
//         bcrypt.compare(password, user.password, (err, result) => {
//           if (err) throw err;
//           if (result === true) {
//             console.log("password correct!");
//             return done(null, user);
//           } else return done(null, false);
//         });
//       });
//     })
//   );

//   passport.serializeUser((user, callback) => {
//     callback(null, user.id);
//   });

//   passport.deserializeUser((id, callback) => {
//     masterDB.findUser({ id: id }, (err, user) => {
//       callback(err, user);
//     });
//   });
// };

function initialize(passport, getUserByUsername, getUserById) {
  const authenticateUser = async (username, password, done) => {
    const user = await getUserByUsername(username);
    if (user == null) {
      return done(null, false, { message: "No user with that username" });
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      } else {
        return done(null, false, { message: "Password incorrect" });
      }
    } catch (e) {
      return done(e);
    }
  };
  passport.use(
    new LocalStrategy({ usernameField: "username" }, authenticateUser)
  );
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id));
  });
}

module.exports = initialize;
