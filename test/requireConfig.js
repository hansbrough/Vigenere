requirejs.config({
    baseUrl: '../assets/js',
    paths: {
        'app':'./app',
        'mixins':'./lib/mixins',
        'handlebars':'./lib/handlebars.min',
        'text':'./lib/text',
        'jasmine':'../../test/lib/jasmine-2.8.0/jasmine',
        'jasmine-html':'../../test/lib/jasmine-2.8.0/jasmine-html',
        'jasmine-boot':'../../test/lib/jasmine-2.8.0/boot'
    },
    shim: {
      jasmine: {
        exports: 'jasmine'
      },
      'jasmine-html': {
        deps: ['jasmine'],
        exports: 'jasmine'
      },
      'jasmine-boot': {
        deps: ['jasmine-html'],
        exports: 'jasmine'
      }
    },
    inlineText: false
});
