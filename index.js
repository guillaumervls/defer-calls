module.exports = {
  method: function (object, methodName) {
    var isDeclaredInPrototype = !object.hasOwnProperty(methodName);
    var realMethod = !isDeclaredInPrototype ? object[methodName] : null;
    var deferredCalls = {
      callsList: [], // Array of call arguments arrays
      execAll: function () {
        if (isDeclaredInPrototype) delete object[methodName];
        else object[methodName] = realMethod;
        deferredCalls.callsList.forEach(function (args) {
          object[methodName].apply(object, args);
        });
        deferredCalls.execAll = function () {};
        deferredCalls.callsList = [];
      }
    };
    object[methodName] = function () {
      deferredCalls.callsList.push(arguments);
    };
    return deferredCalls;
  }
};
