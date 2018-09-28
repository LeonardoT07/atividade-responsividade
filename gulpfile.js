// Require's
const gulp 		= require("gulp");
const sass 		= require("gulp-sass");
const htmlmin   = require("gulp-htmlmin");
const notify 	= require("gulp-notify");


/*---------------------------------------------------------------------------------------
	TASK responsável por recuperar todos os arquivos no formato .scss e
	retornar para a pasta '.dist/css' que será criada automaticamente
	// Para comprimir sass({outputStyle: 'compressed'}).on('error', sass.logError)
----------------------------------------------------------------------------------------*/
gulp.task("sass", function(){
	return gulp.src('./source/scss/style.scss')
			.pipe(sass())
			.on("error", notify.onError({title:"erro ao compilar", message:"<%= error.message %>"}))
			.pipe(gulp.dest("./dist/css/"))

});

/*---------------------------------------------------------------------------------------
	Minificar o HTML da pasta 'source/' e enviar para './dist'
----------------------------------------------------------------------------------------*/
gulp.task('minify-html', function() {
  return gulp.src('./source/index.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('./dist/'));
});

/*---------------------------------------------------------------------------------------
	Task responsável por executar de fundo todas a mudanças que houver nos arquivos
----------------------------------------------------------------------------------------*/
gulp.task("sass:watch", function(){
	gulp.watch("./source/scss/**/*.scss", ['sass']);
	gulp.watch("./source/*.html", ['minify-html']);
});

/*---------------------------------------------------------------------------------------
  Task default para iniciar apenas com o comando "gulp" no terminal
----------------------------------------------------------------------------------------*/
gulp.task("default",['sass', 'sass:watch']);
