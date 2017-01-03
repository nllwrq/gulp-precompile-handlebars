var precompileHandlebars = require('../');
var fs = require('fs');
var should = require('should');
var File = require('vinyl');
require('mocha');

describe('gulp-precompile-handlebars', function() {
    describe('precompileHandlebars()', function() {
        it('precompiles handlebar templates and wraps them with a UMD syntax', function(done) {
            var stream = precompileHandlebars();

            var handlebarsTemplate = new File({
                path: '/template.hbs',
                base: '/',
                cwd: '/',
                contents: new Buffer('<h1>{{ foo }}</h1>')
            });

            var expected = fs.readFileSync(__dirname + '/output.txt', { encoding: 'utf8' });

            stream.on('error', done);
            stream.on('data', function(newFile){
                String(newFile.contents).should.equal(expected);
                done();
            });
            stream.write(handlebarsTemplate);
        });
    });
});
