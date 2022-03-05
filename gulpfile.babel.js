import gulp from 'gulp';
import eslint from 'gulp-eslint';
 
/**
 * Указываем пути к файлам для проверки
 * @type {{js: string}}
 */
const paths = {
    js: './src/**/*.js',
};
 
/**
 *   * Test JS lint
 * @return {*}
 */
function testJsLint() {
    return gulp.src(paths.js).
           pipe(eslint()).
           pipe(eslint.format()).
           pipe(eslint.failAfterError());
}
 
const tests = gulp.parallel(testJsLint);
exports.tests = tests;
 
export default tests;