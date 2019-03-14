/**
 * Created by gaoguoqing on 2018/12/10.
 *
 */
const gulp = require('gulp')
const cleanCSS = require('gulp-clean-css')
const sass = require('gulp-sass')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')

gulp.task('css', function () {
    gulp.src('../styles/index.scss')
        .pipe(sass())
        .pipe(autoprefixer({
            browsers: ['last 3 versions', 'ie > 8']
        }))
        .pipe(cleanCSS())
        .pipe(rename('bwUi.css'))
        .pipe(gulp.dest('../dist/styles'))
})

gulp.task('font', function () {
    gulp.src('../styles/iconfont/*.*')
        .pipe(gulp.dest('../dist/styles/iconfont'))
})

gulp.task('default', ['css', 'font'])