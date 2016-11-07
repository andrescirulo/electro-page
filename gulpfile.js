var gulp = require('gulp');
var concat = require('gulp-concat');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var uglify = require('gulp-uglify');
var pump = require('pump');
var replace = require('gulp-replace');
var cleanCSS = require('gulp-clean-css');

var libs = ["bower_components/jquery/dist/jquery.js",
            "bower_components/tether/dist/js/tether.js",
            "bower_components/bootstrap/dist/js/bootstrap.js",
            "bower_components/angular/angular.js",
            "bower_components/angular-animate/angular-animate.js",
            "bower_components/angular-aria/angular-aria.js",
            "bower_components/angular-messages/angular-messages.js",
            "bower_components/angular-resource/angular-resource.js",
            "bower_components/angular-ui-router/release/angular-ui-router.js",
            "scripts/ui-bootstrap-tpls-1.3.3.js",
            "bower_components/angular-material/angular-material.js"];

var csss=['styles/*.css',
          'bower_components/tether/dist/css/tether.css',
          'bower_components/bootstrap/dist/css/bootstrap.css',
          'bower_components/font-awesome/css/font-awesome.css',
          'bower_components/angular-material/angular-material.css',
          'bower_components/awesome-bootstrap-checkbox/awesome-bootstrap-checkbox.css'
          ];

var expLibs=/<!--LIBS_START-->\r\n(.*\r\n)*.*<!--LIBS_END-->/g;
var expCss=/<!--CSS_START-->\r\n(.*\r\n)*.*<!--CSS_END-->/g;
var expDomain=/<!--DOMAIN_START-->\r\n(.*\r\n)*.*<!--DOMAIN_END-->/g;

var libsTag='<script type="text/javascript" src="scripts/libs.js"></script>';
var cssTag='<link rel="stylesheet" type="text/css" href="styles/styles.css">';
var domainTag='<script type="text/javascript" src="scripts/domain.js"></script>';

var copyFiles=['*server/**/*',
               '*templates/**/*',
               'conectar.php',
               '*imagenes/**/*'
               ];

gulp.task('build', ['domain-build','libs-build','css-build','index-build'],function(){
	pump([
	      gulp.src(copyFiles),
	      gulp.dest('dist')]
	);
	pump([
	      gulp.src('bower_components/font-awesome/fonts/**'),
	      gulp.dest('dist/fonts')]
	);
});

gulp.task('domain-build', function (cb) {
	  pump([
	        gulp.src(['scripts/*.js','scripts/**/*.js']),
	        concat('domain.js'),
	        gulp.dest('dist/scripts'),
	        uglify(),
	        gulp.dest('dist/scripts')
	        ],
	        cb
	  );
	});
gulp.task('libs-build', function (cb) {
	pump([
	      gulp.src(libs),
	      concat('libs.js'),
	      gulp.dest('dist/scripts'),
	      uglify(),
	      gulp.dest('dist/scripts')
	      ],
	      cb
	);
});
gulp.task('css-build', function (cb) {
	  pump([
	        gulp.src(csss),
	        concat('styles.css'),
	        cleanCSS(),
	        gulp.dest('dist/styles')
	        ],
	        cb
	  );
});
gulp.task('index-build', function (cb) {
	pump([
	      gulp.src("index.html"),
	      replace(expLibs,libsTag),
	      replace(expCss,cssTag),
	      replace(expDomain,domainTag),
	      gulp.dest('dist')
	      ],
	      cb
	);
});

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