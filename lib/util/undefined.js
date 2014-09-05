var undef = function (obj, fn) {
    return isUndefined(obj) ? obj : fn(obj);
};

module.exports = undef;