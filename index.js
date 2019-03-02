const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');

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
  console.log(results);
  return true;
});
