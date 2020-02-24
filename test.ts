// This is kind of hack.  If we specify webpock source files in the karma config,
// they'll all get loaded as separate modules which is bad for performance
// and it also tries to add angular to the page multiple times.
const testsContext = require.context('./spec/', true, /\.spec\.(js|ts)$/);
testsContext.keys().forEach(testsContext);
