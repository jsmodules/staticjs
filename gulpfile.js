var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var size = require("gulp-size");
var jshint = require("gulp-jshint");

gulp.task("build", function() {
    return gulp.src(__dirname + "/src/static.js")
        .pipe(uglify())
        .pipe(size({ gzip: true, prettySize: true, showFiles: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("build:polyfill", function() {
    return gulp.src([
        __dirname + "/node_modules/es6-promise/dist/es6-promise.min.js",
        __dirname + "/src/polyfills.js",
        __dirname + "/src/static.js"
    ])
    .pipe(concat("static.compat.js"))
    .pipe(uglify())
    .pipe(size({ gzip: true, prettySize: true, showFiles: true }))
    .pipe(gulp.dest("dist"));
});

gulp.task("lint", function() {
  return gulp.src(__dirname + "/src/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("default"));
});

gulp.task("lint:fail", function() {
  return gulp.src(__dirname + "/src/**/*.js")
    .pipe(jshint())
    .pipe(jshint.reporter("fail"));
});

gulp.task("watch", function() {
    gulp.watch(__dirname + "/src/**/*.js", ["build:all"]);
});

gulp.task("build:all", ["build", "build:polyfill"]);
