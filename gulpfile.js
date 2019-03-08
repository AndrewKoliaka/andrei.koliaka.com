const { src, dest, watch, parallel } = require('gulp');
const { server, reload } = require('gulp-connect');
const pug = require('gulp-pug');
const less = require('gulp-less');

function devserver() {
    return server({
        root: './',
        livereload: true,
        port: 8000
    });
}

function styles() {
    return src('./src/styles/*.less')
        .pipe(less())
        .pipe(dest('bin'))
        .pipe(reload());
}

function html() {
    return src('./src/views/*.pug')
        .pipe(pug())
        .pipe(dest('./'))
        .pipe(reload());
}

function startWatch() {
    watch('./src/styles/*.less', styles);
    watch('./src/views/*.pug', html);
}

function build() {
    return parallel(html, styles);
}

exports.html = html;
exports.styles = styles;
exports.startWatch = startWatch;
exports.devserver = devserver;
exports.build = build;
exports.default = parallel(build, devserver, startWatch);
