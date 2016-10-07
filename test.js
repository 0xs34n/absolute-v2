context = require.context(
    /*directory*/'mocha!./src/', 
    /*recursive*/true, 
    /*match files*//test.js$/
);
context.keys().forEach(context);