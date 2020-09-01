const db = require('../models')
const path = require('path')
const { uploadPath } = require('../helpers/path')

const list = (req, res) => {
  const data = { data: 'this is data'}
  res.render('pages/users/list', data)
}

const create_get = (req, res) => {
  res.render('pages/users/create')
}

const create_post = async (req, res) => {
  let avatar = ''
  const userData = req.body

  if(req.files && req.files.avatar) {
    const upload = req.files.avatar

    const { v4: uuid4 } = require('uuid')
    let nameArr = upload.name.split('.')
    const ext = '.' + nameArr[nameArr.length - 1]

    avatar = uuid4() + ext
    upload.mv(path.join(uploadPath, avatar))

  }

  userData.avatar = avatar
  const newUser = await db.User.create(userData)

  if(newUser) res.redirect('/users/' + newUser.id)
  else res.send('Failed')
}

const details = async (req, res) => {
  const id = req.params.id
  const user = await db.User.findByPk(id, { raw: true, nest: true })
  user.avatar = '/uploads/' + user.avatar
  res.render('pages/users/details', { user })
}

module.exports = {
  list,
  create_get,
  create_post,
  details
}
