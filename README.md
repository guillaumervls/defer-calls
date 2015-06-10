# Defer calls

*Defer calls to an object's method, then executes them all when you give the signal*

## Install

`npm i defer-calls`

## Use
```javascript
var deferMethod = require('defer-calls').method;

var guy = {
  sayHello: function(name) {
    console.log('Hello ' + name);
  }
};

guy.sayHello('you'); // => Hello you

var helloWaiting = deferMethod(guy, 'sayHello');

// Hold it...
guy.sayHello('world'); // => undefined
guy.sayHello('everyone'); // => undefined

helloWaiting.callsList; // => [['world'], ['everyone']];
// WARNING : ['world'] and ['everyone'] are "arguments arrays" i.e. not real Arrays
// See here : https://developer.mozilla.org/docs/Web/JavaScript/Reference/Fonctions/arguments

// Then give the signal!
helloWaiting.execAll();
// => Hello world
// => Hello everyone

// After that...
helloWaiting.execAll(); // Noop
helloWaiting.callsList; // []
```

## TODO
Equivalent for a function instead of a method.

## LICENCE
MIT
