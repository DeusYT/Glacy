const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const del = require('del');


 function styles(){
    return gulp.src('./src/css/**/*.css')
        .pipe(concat('all.css'))
        .pipe(autoprefixer())
        .pipe(cleanCSS({
            level: 2
        }))
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
}

function scripts(){
    return gulp.src('./src/js/**/*.js')
            .pipe(concat('all.js'))
            .pipe(uglify({
                toplevel: true
            }))
            .pipe(gulp.dest('./build/js')) 
            .pipe(browserSync.stream());
}

function htmlConc(){
    return gulp.src('./src/*.html')
            .pipe(concat('index.html'))
            .pipe(gulp.dest('./build'))
            .pipe(browserSync.stream());
}

function clean(){
    return del(['build/*']);
}

function watch(){
    browserSync.init({
                server: {
                    baseDir: "./build"
                }
            });

    gulp.watch('./src/*.html', htmlConc);        
    gulp.watch('./src/css/**/*.css', styles);
    gulp.watch('./src/js/**/*.js', scripts);
    gulp.watch('./src/*.html', browserSync.reload);
}

gulp.task('scripts', scripts);
gulp.task('styles', styles);
gulp.task('watch', watch);
gulp.task('htmlConc', htmlConc);

gulp.task('build', gulp.series(clean,
                        gulp.parallel(styles)
                    ));

gulp.task('dev', gulp.series('build', 'watch'));
