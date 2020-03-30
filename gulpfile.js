
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');


//Compile scss into css.

function style() {
    //1. where is my scss file.
    return gulp.src(['./scss/**/*.scss'])
        //2. pass that file through the sass compiler.
        .pipe(sass())//.on('error', sass.logError())
        //3. Apply post CSS and write sourcemaps
        .pipe(postcss([autoprefixer(), cssnano()]))
        //.pipe(sourcemaps.write('.'))
        //4. where do I save the compiled css?
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./**/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);
}

exports.style = style;
exports.watch = watch;