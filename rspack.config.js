module.exports = {
    entry: {
      mote: './src/main.js',
    },
    output: {
      path: __dirname + '/dist/',
      filename: 'mote.bundle.js',
    },    
    mode: 'production',
  };
  