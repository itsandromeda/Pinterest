var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browsefiry = require('gulp-browserify'),
    rename = require('gulp-rename'),
    browserSync = require('browser-sync').create(),
    config = {
        source: './src/',
        dist: './public'
    },
    paths = {
        assets: "/assets/",
        html: "**/*.html",
        sass: "scss/**/*.scss",
        mainSass: "scss/main.scss",
        mainJS: "js/app.js"
    },
    sources = {
        assets: config.source + paths.assets,
        html: config.source + paths.html,
        sass: config.source + paths.assets + paths.sass,
        rootSass: config.source + paths.assets + paths.mainSass,
        js: config.source + paths.js,
        rootJS: config.source + paths.assets + paths.mainJS
    };

gulp.task('html', () => {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task("sass", () => {
    gulp.src(sources.rootSass)
        .pipe(sass({
            outputStyle: "compressed"
        }).on("error", sass.logError))
        .pipe(gulp.dest(config.dist + paths.assets + "css"));
});

gulp.task("js", () => {
    gulp.src(sources.rootJS)
        .pipe(browsefiry())
        .pipe(rename("bundle.js"))
        .pipe(gulp.dest(config.dist + paths.assets + "js"));
});

gulp.task("sass-watch", ["sass"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("js-watch", ["js"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("html-watch", ["html"], (done) => {
    browserSync.reload();
    done();
});

gulp.task("serve", () => {
    browserSync.init({
        server: {
            baseDir: config.dist
        }
    });
    gulp.watch(sources.html, ["html-watch"]);
    gulp.watch(sources.sass, ["sass-watch"]);
    gulp.watch(sources.js, ["js-watch"]);
});