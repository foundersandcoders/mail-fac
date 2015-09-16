# mail-fac
Small email service for our website.

## How it works

The app has just two endpoints, `email` and 'ping'. In the `email` endpoint the data are collected as parameters inside a query string `body`.

An example:

```js
	
	"http://.../email?body={address: 'foo@bar.com', message: 'Hello world!'}"

```

In this way is possible to receive data from another source under a different domain name.
