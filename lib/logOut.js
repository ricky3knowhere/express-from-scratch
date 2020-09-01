const logOut = (req, res) => {
  req.session.destroy(() => res.redirect('/login'))
}

module.exports = logOut