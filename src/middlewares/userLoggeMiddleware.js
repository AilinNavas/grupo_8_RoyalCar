const db = require('../database/models')

// async function userLoggedMiddleware(req, res, next) {
//     res.locals.isLogged = false;

//     let emailInCookie = req.cookies.userEmail;
//     if(!emailInCookie) return next();

//     let userFromCookie =  await db.User.findOne ({where: {email:emailInCookie },attributes:{exclude:['password']}, include: {model:db.Rol, as: "rol" } });


//     if(userFromCookie) {
//         req.session.userLogged = userFromCookie;
//     }

//     if (req.session.userLogged) {
//         res.locals.isLogged = true;
// 		res.locals.userLogged = req.session.userLogged;
//     }

//     next();
// }
// module.exports = userLoggedMiddleware;

async function userLoggedMiddleware(req, res, next) {
  res.locals.isLogged = false;
  if (req.cookies && req.cookies.userEmail) {
    let emailInCookie = req.cookies.userEmail;
    if (!emailInCookie) return next();

    let userFromCookie = await db.User.findOne({ where: { email: emailInCookie }, attributes: { exclude: ['password'] }, include: { model: db.Rol, as: "rol" } });


    if (userFromCookie) {
      req.session.userLogged = userFromCookie;
    }

    if (req.session.userLogged) {
      res.locals.isLogged = true;
      res.locals.userLogged = req.session.userLogged;
    }
  }

  next();
}
module.exports = userLoggedMiddleware;