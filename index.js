var pkg = require("./package.json"),
    // because I can't keep typing 'nunjucks' without throwing up a little
    nj = require("nunjucks"),
    walk = require("walk"),
    extend = require("util-extend"),
    path = require("path"),
    mkdirp = require("mkdirp"),
    events = require("events"),
    request = require("request");

var Renderer = function(paths, options) {
  var loader = new nj.FileSystemLoader(paths);
  options = extend({}, Renderer.defaults, options);
  nj.Environment.call(this, loader, options);
};

Renderer.defaults = {
  autoescape: false,
  tags: {}
};

Renderer.prototype = extend(nj.Environment.prototype, {
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
  Renderer: Renderer
};

function coerceArray(thing) {
  return Array.isArray(thing) ? thing : [thing];
}
