# Defer calls

*Defer calls to an object's method, then executes them all when you give the signal*

## Install

`npm i defer-calls`

## Use
```javascript
var deferMethod = require('defer-calls').method;

var guy = {
  sayHello: function(name) {
    return 'Hello ' + name;
  }
};

guy.sayHello('you'); // => 'Hello you'

var helloWaiting = deferMethod(guy, 'sayHello', function (name) {
  return 'Wait ' + name;
});
// The 3rd arg is the temporary behavior, if you just want to return a value,
// you can pass this value instead of a function.

// Hold it...
guy.sayHello('world'); // => 'Wait world'
guy.sayHello('everyone'); // => 'Wait everyone'

helloWaiting.callsList; // => [['world'], ['everyone']];
// WARNING : ['world'] and ['everyone'] are "arguments arrays" i.e. not real Arrays
// See here : https://developer.mozilla.org/docs/Web/JavaScript/Reference/Fonctions/arguments

// Then give the signal!
helloWaiting.execAll() // => ['Hello world', 'Hello everyone']

// After that...
helloWaiting.execAll(); // Noop
helloWaiting.callsList; // []

// Everything is back to normal
guy.sayHello('Kitty'); // => 'Hello Kitty'
```

## TODO
Equivalent for a function instead of a method.

## LICENCE
MIT
