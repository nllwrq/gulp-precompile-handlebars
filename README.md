[![Build Status](https://travis-ci.org/justusromijn/gulp-precompile-handlebars.svg?branch=master)](https://travis-ci.org/justusromijn/gulp-precompile-handlebars)

# gulp-precompile-handlebars

A gulp plugin to precompile handlebars templates, and output separate compiled templates that use the exports syntax. It is easy to use the plugin `gulp-define-module` to wrap the compiled templates in a module bundling syntax. Precompiling is required when you want to enable [Content Security Policy][csp] on your server, as handlebars, compiling in the client, uses `eval` or `new Function(String)` which is not allowed. If you precompile, you can just use the runtime version of Handlebars which doesn't have the compilation code.

# Usage

### Installation
```
npm install gulp-precompile-handlebars
```

### Gulp configuration

The plugin takes a stream of multiple files and returns the compiled result. It is up to you to rename those files and move them to a specific folder. This example uses the `gulp-rename` plugin for changing the extension and `gulp-define-module` to wrap it with the desired module definition.
``` javascript
var gulp = require('gulp');
var rename = require('gulp-rename');
var defineModule = require('gulp-define-module');
var precompileHandlebars = require('gulp-precompile-handlebars');

return gulp.src('src/templates/*.hbs')
  .pipe(precompileHandlebars())
  .pipe(rename({ extname: '.js' })
  .pipe(defineModule('es6'))
  .pipe(gulp.dest('src/templates'));
```

Precompile Handlebars consumes an optional configuration parameter and passes it on to the handlebars [precompile function][precompile-api] `precompileHandlebars({noEscape: true})`, but you can also use the `gulp-front-matter` plugin to attach compile settings to your files [front matter][frontmatter] for some, specific control:
```
---
noEscape: true
---
<div>{{foo}}</div>
```

### Project

You can now use handlebars-runtime in your project instead of the full version.

``` javascript
// import handlebars runtime
import handleBars from 'handlebars/handlebars.runtime.js';

// grab the compiled template
import compiledTemplate from 'path/to/compiled/template.js';

// execute the template with optional data
var parsed = compiledTemplate({ foo: 'bar' });
```


[csp]: https://w3c.github.io/webappsec-csp/  "W3C Content Security Policy"
[frontmatter]: https://jekyllrb.com/docs/frontmatter/ "Front Matter explanation"
[precompile-api]: http://handlebarsjs.com/reference.html