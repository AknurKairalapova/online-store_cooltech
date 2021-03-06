var gulp = require("gulp"),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber');
    jade = require('gulp-jade'),
    compass = require('gulp-compass');

//Paths
var paths = {
    configRb: './config.rb',
    jade: './app/templates/*.jade',
    html: './app/',
    css: './app/css',
    scss: './app/scss',
    allScssFiles: './app/scss/**/*.scss',
    mainScss: './app/scss/main.scss',
    browserSync: ['./app/templates/**/*.jade', './app/js/**/*.js']
};


//Tasks
gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(paths.jade)
        .pipe(plumber())
        .pipe(jade({
            locals: YOUR_LOCALS,
            pretty : '\t'
        }))
        .pipe(gulp.dest(paths.html))
        //.pipe(browserSync.reload())
});

gulp.task('server', ['jade'],  function () {
    browserSync({
        port: 9000,
        server: { baseDir: 'app' }
    });
    gulp.watch('./app/templates/**/*.jade', ['jade']);
});

gulp.task('browserReload', function () {
    browserSync.reload();
});

//gulp.task('compass', function() {
//    gulp.src(paths.mainScss)
//        .pipe(plumber())
//        .pipe(compass({
//            config_file: './config.rb',
//            css: './app/css',
//            sass: './app/scss'
//        }))
//});

gulp.task('watch', function(){
    gulp.watch('./app/templates/**/*.jade', ['jade']);
    //gulp.watch(paths.allScssFiles, ['compass']);
    gulp.watch(paths.browserSync).on('change', browserSync.reload);
});

//Default task
gulp.task('default', ['jade', 'server', 'watch']);