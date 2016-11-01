var gulp = require('gulp');
//var babel = require("gulp-babel");
var browserSync = require('browser-sync');
var reload = browserSync.reload;

gulp.task('default', ['serve']);

gulp.task('serve', function() {
	  browserSync({
		  proxy: {
			  target: "http://localhost/electropage/",
		  }
	  });
	
	  gulp.watch(
			  ['*.html',
			   '*.htm', 
			   'templates/*.html',
			   'scripts/**/*.js'], {}, reload);
	  
	  var csss=['styles/*.css', 'styles/**/*.css'];
	  
	  gulp.watch(csss, 
		   		function() {
    				gulp.src(csss)
    				.pipe(browserSync.stream());
	  });
});