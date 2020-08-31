const db = require('../models')

const checkConnection = async (res) => {
  try {
    await db.sequelize.authenticate()
    res.send('connected')
    
  }catch(e) {
    res.send('failed to connect')
  }
}

const checkDb = async (req, res) => {
  checkConnection(res)
}

module.exports = checkDb