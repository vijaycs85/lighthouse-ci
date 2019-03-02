const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs');

function launchChromeAndRunLighthouse(url, opts, config = null) {
  return chromeLauncher.launch({chromeFlags: opts.chromeFlags}).then(chrome => {
    opts.port = chrome.port;
    return lighthouse(url, opts, config).then(results => {
      return chrome.kill().then(() => results.report)
    });
  });
}

const opts = {
  chromeFlags: ['--show-paint-rects']
};

launchChromeAndRunLighthouse('https://bbc.co.uk', opts).then(results => {
  return fs.writeFile("./result.json", results, function(err) {
    if(err) {
      return console.log(err);
    }
  });
});

