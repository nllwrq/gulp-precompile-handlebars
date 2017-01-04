var through = require('through2');
var handlebars = require('handlebars');

module.exports = function precompile() {

    function precompileHandlebars(file, enc, done) {
        var content = new Buffer(handlebars.precompile(file.contents.toString('utf8')));
        file.contents = content;

        file.defineModuleOptions = {
            require: {
                Handlebars: 'handlebars'
            },
            context: {
                handlebars: 'Handlebars.template(<%= contents %>)'
            },
            wrapper: '<%= handlebars %>'
        };

        done(null, file);
    }

    return through.obj(precompileHandlebars);
};
