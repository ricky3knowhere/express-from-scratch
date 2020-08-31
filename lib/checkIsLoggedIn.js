const checkIsLogin = (req, res, next) => {
  isLoggedIn = true
  if(isLoggedIn) next()
  else res.redirect('/login')
}

module.exports = checkIsLogin