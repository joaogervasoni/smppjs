<p align="center">
    <img src="https://github.com/joaogervasoni/smppjs/blob/master/images/smppjs-logo.png?raw=true" alt="smppjs">
</p>
<p align="center">
    <a href="https://github.com/airbnb/javascript"><img src="https://img.shields.io/badge/Code--style-Airbnb-red?logo=Airbnb&style=flat-square"></a>
</p>

## About

This library is designed to provide a modern approach to smpp protocol, making easy interaction with the protocol.

## Getting started

### Calling

```js
const client = new Client({ interfaceVersion: 80, debug: false });
```

Simple to call and manage.

### Example

```js
const client = new Client({ interfaceVersion: 80, debug: false });

client.connect({ url: 'localhost:2775' });

client.on('connect', () => {
    console.log('Connected');
    client.bindTransceiver({ systemId: 'system', password: 'pass' });
    client.submitSm({ esmClass: 0, dataCoding: 1, destinationAddr: '0000000000', shortMessage: { message: 'Hello!', encoding: 'ascii' }  });
});
```