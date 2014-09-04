var undef = function (obj, fn) {
    return _.isUndefined(obj) ? obj : fn(obj);
};

module.exports = undef;