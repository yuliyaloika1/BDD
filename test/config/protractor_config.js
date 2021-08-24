const { SSL_OP_NETSCAPE_REUSE_CIPHER_CHANGE_BUG } = require('constants');
const path = require('path');
const yargs = require('yargs').argv;
const reporter = require('cucumber-html-reporter');

const reportOptions = {
    theme: 'bootstrap', 
    jsonFile: path.join(__dirname, '../reports/report.json'),
    output: path.join(__dirname, '../reports/cucumber-report.html'),
    reportSuitesAsScenarios: true
};

exports.config = {
 allScriptsTimeout: 60000,
 getPageTimeout: 60000,
 specs: [path.resolve('./test/features/*.feature')],
 framework: 'custom',
 frameworkPath: require.resolve('protractor-cucumber-framework'),
 capabilities: {
     shardTestFiles: yargs.instances > 1,
     maxInstances: yargs.instances || 1,
     browserName: 'chrome',
     chromeOptions: {
         args: ['--no-sandbox', '--window-size=1920,1080']
     },
 },
 disableChecks: true, 
 directConnection: true,
 cucumberOpts: {
     require: [path.resolve('./test/step_definitions/**/*.js')],
     ignoreUncaughtExceptions: true,
     format: ['json:./test/reports/report.json', './node_modules/cucumber-pretty'],
     tags: yargs.tags || '@smoke'
 }
 onPrepare: () => {
     return browser.waitForAngularEnabled(false);
 },
 afterLaunch: () => {
     return reporter.generate(reportOptions)
 }
};
