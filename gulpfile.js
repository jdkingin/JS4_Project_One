const {src, dest, watch, series, parallel} = require('gulp');
const sass = require('gulp-sass');
const browSync = require('browser-sync');
const concat = require('gulp-concat');
//const markdown = require('gulp-markdown');
const minify = require('gulp-terser');
const typescript = require("gulp-typescript");
const remove = require('delete');

function watch_task()
{
    watch('source/*.html', series(html_task, reload_task));
    watch(['source/scripts/*.js', 'source/scripts/*.ts'], series(js_task, reload_task));
    watch(['source/images/*.jpg', 'source/images/*.png'], series(images_task, reload_task));
    watch('source/styles/*.scss', series(css_task, reload_task));
}

function html_task()
{
    return src('source/*.html')
            .pipe(dest('prod/'));
}

// function markdown_task()
// {
//     return src('source/pages/*.md')
//             .pipe(markdown())
//             .pipe(dest('prod/'));
// }

function css_task()
{
    return src('source/styles/*.scss')
            .pipe(sass())
            .pipe(dest('prod/styles/'));
}

function js_task()
{
    return src(['source/scripts/*.js', 'source/scripts/*.ts'])
            .pipe(typescript({target: 'ES5', allowJs: true}))
            .pipe(concat('main.js'))
            .pipe(minify())
            .pipe(dest('prod/scripts/'));
}

function images_task()
{
    return src(['source/images/*.jpg', 'source/images/*.png'])
            .pipe(dest('prod/images/'));
}

function sync_task(cb)
{
    browSync.init({server : {baseDir: 'prod/'}});
    (cb);
}

function reload_task (cb)
{
    browSync.reload();
    cb();
}

function delete_task(cb)
{
    remove('prod/**', cb);
}

exports.clean = delete_task;
exports.watch = watch_task;
exports.build = series(delete_task, parallel(html_task, css_task, js_task, images_task)); 
exports.default =  parallel(exports.build, watch_task, sync_task);