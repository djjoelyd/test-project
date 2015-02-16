module.exports = {

    // Task options
    options: {
        limit: 3
    },

    // Dev tasks
    devFirst: [
        'clean',
        'copy',
        'jshint'
    ],
    devSecond: [
        'sass:dev',
        'uglify'
    ],

    // Production tasks
    prodFirst: [
        'clean',
        'copy',
        'jshint'
    ],
    prodSecond: [
        'sass:prod',
        'uglify'
    ],

    // Image tasks
    imgFirst: [
        'imagemin'
    ]
};