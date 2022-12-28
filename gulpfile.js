import gulp from 'gulp'
import plumber from 'gulp-plumber'
import sourcemap from 'gulp-sourcemaps'
import less from 'gulp-less'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'
import sync from 'browser-sync'
import htmlmin from 'gulp-htmlmin'
import csso from 'postcss-csso'
import rename from 'gulp-rename'
import squoosh from 'gulp-libsquoosh'
import webp from "gulp-webp"
import {deleteSync} from 'del';
import webpack from "webpack-stream"

// Styles
export const styles = () => {
  return gulp.src('source/less/style.less')
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.create().stream());
}

//HTML
export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({ collapseWhitespace: true }))
  .pipe(gulp.dest('build'));
};

//js webpack
export const script = () => {
  return gulp.src('source/scripts/index.js')
  .pipe(webpack({
    mode: 'development',
    output: {
      filename: 'bundle.js'
    },
    watch: false,
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
          loader: 'babel-loader',
          options: {
            presets: [['@babel/preset-env', {
							targets: "> 0.25%, not dead",
              debug: true,
              corejs: 3,
              useBuiltIns: "usage"
            }]]
          }
          }
        }
      ]
    }
  }))
  .pipe(gulp.dest('build/js'))
  .pipe(sync.stream());
}

//squoosh
export const optimizeImages = () => {
  return gulp.src('source/images/**/*.{png,jpg,svg}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/images'))
}

//copyimg
export const copyImages = () => {
  return gulp.src('source/images/**/*.{png,jpg,svg}')
  .pipe(gulp.dest('build/images'))
}

// WebP
export const createWebp = () => {
  return gulp.src("source/images/**/*.{jpg,png}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("build/images"))
}

// Copy
export const copy = (done) => {
  gulp.src([
    "source/fonts/*.{woff2,woff}",
    "source/*.ico",
    "source/images/**/*.svg",
    "source/images/**/*.webp",
    "!source/images/icons/*.svg",
    "source/*.webmanifest",
  ], {
    base: "source"
  })
    .pipe(gulp.dest("build"))
  done();
}

//Clean
export const clean = async () => {
  return await deleteSync(['build']);
	// const deletedFilePaths =  deleteSync(['build']);
};

// Server
export const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//RELOAD
const reload = (done) => {
  sync.reload();
  done();
}

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/scripts/**/*.js", gulp.series(script));
  gulp.watch("source/*.html", gulp.series(html, reload));
}

// Build
export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
    styles,
    html,
    createWebp,
    script,
  ),
);

// Default
export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(
    styles,
    html,
    createWebp,
    script,
  ),
  gulp.series(
    server,
    watcher
  ));
