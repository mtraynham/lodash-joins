global.mocha.setup('bdd');
global.onload = function () {
    global.mocha.checkLeaks();
    global.mocha.globals(['assert']);
    global.mocha.run();
};
