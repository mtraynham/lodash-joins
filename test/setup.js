global.mocha.setup('bdd');
global.onload = function () {
    global.mocha.checkLeaks();
    global.mocha.run();
};
