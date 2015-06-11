module.exports = {
  method: function (object, methodName, tempBehavior) {
    var isDeclaredInPrototype = !object.hasOwnProperty(methodName);
    var realMethod = !isDeclaredInPrototype ? object[methodName] : null;
    var deferredCalls = {
      callsList: [], // Array of call arguments arrays
      execAll: function () {
        var callsList = deferredCalls.callsList;
        if (isDeclaredInPrototype) delete object[methodName];
        else object[methodName] = realMethod;
        deferredCalls.execAll = function () {};
        deferredCalls.callsList = [];
        return callsList.map(function (args) {
          return object[methodName].apply(object, args);
        });
      }
    };
    object[methodName] = function () {
      deferredCalls.callsList.push(arguments);
      return typeof (tempBehavior) === 'function' ? tempBehavior.apply(object, arguments) : tempBehavior;
    };
    return deferredCalls;
  }
};
