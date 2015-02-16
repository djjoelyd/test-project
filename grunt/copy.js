module.exports = {
  copy: {
    files: [{
        expand: true,
        cwd: 'src/fonts',
        src: '**',
        dest: 'dist/fonts'
    },
    {
        expand: true,
        cwd: 'src/html',
        src: '**',
        dest: 'dist/html'
    }]
  }
};