module.exports = {
  apps : [
  {
    name: 'server',
    script: 'index.js',
    watch: '.',
    ignore_watch: ['./uploads', './tmp']
  }
]
};
