var gulp = require("gulp"),
    watch = require("gulp-watch"),
    browserify = require("gulp-browserify"),
    sass = require("gulp-sass"),
    uglify = require("gulp-uglify"),
    cssnano = require("gulp-cssnano"),
    rename = require("gulp-rename"),
    jshint = require("gulp-jshint");

// Compile .scss files to stylesheet
gulp.task("sass", function() {
    return gulp.src("src/sass/**/*.scss")
               .pipe(sass({
                  includePaths: require("node-normalize-scss").includePaths
               }).on("error", sass.logError))
               .pipe(cssnano())
               .pipe(rename({
                  suffix: ".min"
               }))
               .pipe(gulp.dest("dist/assets/css"));
});

// Browserify and compress javascript fiels
gulp.task("scripts", function() {
    return gulp.src("src/js/main.js")
               .pipe(browserify({
                   insertGlobals: false
               }))
               .pipe(uglify())
               .pipe(rename({
                   basename: "widget",
                   suffix: ".min"
               }))
               .pipe(gulp.dest("dist/assets/js"));
});

// Run javascript files through code linter
gulp.task("jshint", function() {
    return gulp.src("src/js/**/*.js")
              .pipe(jshint())
              .pipe(jshint.reporter('jshint-stylish'));
});

// Watch files, run tasks when changed
gulp.task("watch", function() {
    gulp.watch("./src/sass/**/*.scss", ["sass"]);
    gulp.watch("./src/js/**/*.js", ["jshint", "scripts"]);
});

gulp.task("default", function() {
    gulp.start("sass");
    gulp.start("jshint");
    gulp.start("scripts");
});
