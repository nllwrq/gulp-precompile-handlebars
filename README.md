[![Build Status](https://travis-ci.org/justusromijn/gulp-precompile-handlebars.svg?branch=master)](https://travis-ci.org/justusromijn/gulp-precompile-handlebars)

# gulp-precompile-handlebars

A gulp plugin to precompile handlebars templates, and output separate compiled templates that use the exports syntax. 


# Usage

### Installation
```
npm install gulp-precompile-handlebars
```

### Gulpfile

The plugin takes a stream of multiple files and returns the compiled result. It is up to you to rename those files and move them to a specific folder. This example uses the `gulp-rename` plugin for changing the extension.
``` javascript
var gulp = require('gulp');
var rename = require('gulp-rename');
var precompileHandlebars = require('gulp-precompile-handlebars');


return gulp.src('src/templates/*.hbs')
  .pipe(precompileHandlebars())
  .pipe(rename({ extname: '.js' })
  .pipe(gulp.dest('src/templates'));
```

### Project

You can now use handlebars-runtime in your project instead of the full version.

``` javascript
// import handlebars runtime
import handleBars from 'handlebars/handlebars.runtime.js';

// grab the compiled template
import compiledTemplate from 'path/to/compiled/template.js';

// call template method with the the compiled template 
var template = handleBars.template(compiledTemplate);

// execute the template with optional data
var parsed = template({ foo: 'bar' });

```