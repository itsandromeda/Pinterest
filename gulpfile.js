var gulp = require('gulp');
var sass = require('gulp-sass');
var browsefiry = require('gulp-browserify');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();
var concat = require('gulp-concat');
var jquery = require('jquery');

var config = {
  source: './src/',
  dist: './public'
};

var paths = {
  assets: "/assets/",
  html: "**/*.html",
  sass: "scss/**/*.scss",
  mainSass: "scss/main.scss",
  js: "js/**/*.js",
  mainJS: "js/app.js",
  // components: "components/**.js"
  headerJS: "js/components/header.js",
  boarJS: "js/components/board.js"
};

var sources = {
  assets: config.source + paths.assets,
  html: config.source + paths.html,
  sass: config.source + paths.assets + paths.sass,
  rootSass: config.source + paths.assets + paths.mainSass,
  js: config.source + paths.assets + paths.js,
  rootJS: config.source + paths.assets + paths.mainJS,
  // rootComponents: config.source + paths.assets + paths.components
  rootHeader: config.source + paths.assets + paths.headerJS,
  rootBoard: config.source + paths.assets + paths.boarJS
};

gulp.task('html', () => {
  gulp.src(sources.html).pipe(gulp.dest(config.dist));
});

gulp.task("sass", () =>{
  gulp.src(sources.rootSass)
    .pipe(sass({
    outputStyle: "compressed"
  }). on("error", sass.logError))
  .pipe(gulp.dest(config.dist + paths.assets + "css"));
});

gulp.task("js", () => {
  gulp.src(sources.rootJS)
    // .pipe(concat(sources.rootJS))
    .pipe(browsefiry())
    .pipe(rename("bundle.js"))
    .pipe(gulp.dest(config.dist + paths.assets + "js"));
});

// gulp.task("components", () => {
//   gulp.src([sources.rootHeader, sources.rootBoard])
//     .pipe(browsefiry())
//     .pipe(gulp.dest(config.dist + paths.assets + "js/components"))
// });

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

// gulp.task("components-watch",["components"] (done) => {
//   browserSync.reload();
//   done();
// });

gulp.task("serve", () => {
  browserSync.init({
    server:{
      baseDir:config.dist
    }
  });
  gulp.watch(sources.html,["html-watch"]);
  gulp.watch(sources.sass, ["sass-watch"]);
  gulp.watch(sources.js, ["js-watch"]);
  // gulp.watch(sources.)
});
