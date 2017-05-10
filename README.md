
# stringify-env

 [![Version](https://img.shields.io/npm/v/stringify-env.svg)](https://www.npmjs.com/package/stringify-env) [![Downloads](https://img.shields.io/npm/dt/stringify-env.svg)](https://www.npmjs.com/package/stringify-env)

> Create environment files from objects.

## :cloud: Installation

```sh
$ npm i --save stringify-env
```


## :clipboard: Example



```js
import { item, toArray, toFile } from "stringify-env"

console.log(item("PORT", 8080));
// => PORT=8080

console.log(toArray({
    PORT: 8080
  , NODE_ENV: "production"
}));
// => [ 'PORT=8080', 'NODE_ENV=production' ]

// Will create a file named `.env` in this directory
toFile({
    PORT: 8080
  , NODE_ENV: "production"
}, __dirname, err => {
    err && console.error(err);
    // The .env file contains:
    // PORT=8080
    // NODE_ENV=production
});
```



## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help from me, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2017#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
