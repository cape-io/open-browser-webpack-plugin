var open = require('open');

var DEFAULT_BROWSER = undefined;

/**
 * Opens the browser the first time if there's no compilation errors.
 * @param {Object} options Options object.
 * @param {String} options.url url to open in browser.
 * @param {String} [options.browser] Browser to use. If not available, use default browser.
 * @constructor
 */
function OpenBrowserPlugin(options) {
  options || (options = {});
  this.url = options.url || 'http://localhost:3000';
  this.browser = options.browser || DEFAULT_BROWSER;
}

OpenBrowserPlugin.prototype.apply = function(compiler) {
  var didOpen = false;
  var url = this.url;
  var browser = this.browser;

  compiler.plugin('watch-run', function checkWatchingMode(watching, done) {
    isWatching = true;
    done();
  });

  compiler.plugin('done', function doneCallback(stats) {
    if (isWatching && !stats.hasErrors() && !didOpen) {
      open(url, browser, function(err) {
        if (err) throw err;
      });
    }
  });
};

module.exports = OpenBrowserPlugin;
