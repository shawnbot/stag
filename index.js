var pkg = require("./package.json"),
    // because I can't keep typing 'nunjucks' without throwing up a little
    nj = require("nunjucks"),
    walk = require("walk"),
    extend = require("util-extend"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    request = require("request");

var Environment = nj.Environment.extend({
  init: function(paths, options) {
    return nj.Environment.call(
      this, 
      paths.map(function(dir) {
        return new nj.FileSystemLoader(dir);
      }),
      options
    );
  },
  renderDirectory: function(inDir, outDir, context, done) {
    // errors should be fatal if there's no callback
    if (!done) {
      done = function(error) {
        if (error) throw new Error(error);
      };
    }

    var that = this;
    walk(inDir)
      .on("error", done)
      .on("file", function(inFile, next) {
        var outFile = path.join(outDir, inFile);
        mkdirp(path.dirname(outFile), function(error) {
          that.render(inFile, context, function(error, content) {
            if (error) return done(error);
            fs.writeFile(outFile, content, opts, next);
          });
          that.emit("render", inFile, outFile);
        });
      })
      .on("end", done);

    return this;
  }
});

/*
 * module exports
 */
module.exports = {
  version: pkg.version,
  Environment: Environment
};
