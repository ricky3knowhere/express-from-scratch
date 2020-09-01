const path = require('path')
const rootDir = path.resolve(__dirname + '/../')
const uploadPath = path.join(rootDir,'uploads')

module.exports = {
  rootDir,
  uploadPath
}