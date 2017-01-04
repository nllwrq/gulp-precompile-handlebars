var through = require('through2');
var handlebars = require('handlebars');

module.exports = function precompile(obj) {

    function precompileHandlebars(file, enc, done) {

        var settings = obj || file.frontMatter;

        file.contents = new Buffer(handlebars.precompile(file.contents.toString('utf8')), settings);
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
