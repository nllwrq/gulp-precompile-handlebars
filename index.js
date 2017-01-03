var through = require('through2');
var handlebars = require('handlebars');

module.exports = function precompile() {

    function precompileHandlebars(file, enc, done) {
        var content = new Buffer(['export default ', handlebars.precompile(file.contents.toString('utf8')), ';'].join(''));
        file.contents = content;

        done(null, file);
    }

    return through.obj(precompileHandlebars);
};
