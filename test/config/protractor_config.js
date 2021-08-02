const path = require('path');

exports.config = {
 allScriptsTimeout: 60000,
 getPageTimeout: 60000,
 specs: [path.resolve('./test/features/*.feature')],
 framework: 'custom',
 frameworkPath: require.resolve('protractor-cucumber-framework'),
 capabilities: {
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
     format: ['json:./test/reports/report.json'],
     tags: '@smoke'
 }
};