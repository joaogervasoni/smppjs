<p align="center">
    <img src="https://github.com/joaogervasoni/smppjs/blob/master/images/smppjs-logo.png?raw=true" alt="smppjs">
</p>
<p align="center">
    <a href="https://eslint.org/"><img src="https://img.shields.io/badge/Code--style-Eslint-fff32b?logo=Eslint&style=flat-square"></a>
    <a href="https://www.npmjs.com/package/smppjs"><img src="https://img.shields.io/npm/v/smppjs?color=fff32b&logo=npm&style=flat-square"></a>
</p>

## About

This library is designed to provide a modern approach to smpp protocol, making easy interaction with the protocol.

### Support 
- Node version `ES6, Node >=8`
- Typescript types

## Getting started

### Calling

```js
const client = new Client({ interfaceVersion: 80, debug: false });
```

Simple to call and manage.

### PDU

```js
client.bindTransceiver({ systemId: 'system', password: 'pass' });
```

Simple and clean to call a PDU.

## Examples

### Basic use

```js
const client = new Client({ 
    interfaceVersion: 80,
    debug: true,
    secure: { tls: false, unsafeBuffer: false },
    enquireLink: {
        auto: true,
        interval: 10000,
    },
});

client.connect({ url: 'localhost:2775', });

client.on('connect', () => {
    console.log('Connected');
    
    client.bindTransceiver({ systemId: 'system', password: 'pass' });
    client.submitSm({ esmClass: 0x00, dataCoding: 0x08, destinationAddr: '0000000000', shortMessage: { message: 'Hello!', encoding: 'ascii' }  });
});
```

### Debug
You can easily receive debug information using the `debug` event, so you can implement the logging system according to your wishes.

```js
const client = new Client({ 
    interfaceVersion: 80,
    // Set debug true
    debug: true,
    secure: { tls: false, unsafeBuffer: false },
    enquireLink: {
        auto: true,
        interval: 10000,
    },
});

client.on('debug', (data) => {
    // Use your favorite logger implementation here.
    console.log(data);
});
```
