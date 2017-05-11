
# obj2env

 [![Version](https://img.shields.io/npm/v/obj2env.svg)](https://www.npmjs.com/package/obj2env) [![Downloads](https://img.shields.io/npm/dt/obj2env.svg)](https://www.npmjs.com/package/obj2env)

> Create files storing environment variables by using objects.

Use [`dotenv`](https://www.npmjs.com/package/dotenv) for loading an `.env` file in your application.

## :cloud: Installation

```sh
$ npm i --save obj2env
```


## :clipboard: Example



```js
import { item, toArray, toFile } from "obj2env"

console.log(item("PORT", 8080))
// => PORT=8080

console.log(toArray({
    PORT: 8080
  , NODE_ENV: "production"
}))
// => [ 'PORT=8080', 'NODE_ENV=production' ]

// Will create a file named `.env` in this directory
toFile({
    PORT: 8080
  , NODE_ENV: "production"
}, __dirname, err => {
    err && console.error(err)
    // The .env file contains:
    // PORT=8080
    // NODE_ENV=production
})
```



## :question: Get Help

There are few ways to get help:

 1. Please [post questions on Stack Overflow](https://stackoverflow.com/questions/ask). You can open issues with questions, as long you add a link to your Stack Overflow question.
 2. For bug reports and feature requests, open issues. :bug:
 3. For direct and quick help, you can [use Codementor](https://www.codementor.io/johnnyb). :rocket:


## :memo: Documentation


### `envToItem(name, value)`
Converts the pair of name and value into a string.

#### Params
- **String** `name`: The environment variable name.
- **String** `value`: The environment variable value.

#### Return
- **String** The stringified pair.

### `envToArray(obj)`
Converts an object of environment variables into an array.

#### Params
- **Object** `obj`: The object containing environment variables to stringify.

#### Return
- **Array** An array of stringified pairs.

### `toFile(obj, dir, cb)`
Create a file named `.env` in the specified directory.

#### Params
- **Object** `obj`: The object containing environment variables to stringify.
- **String** `dir`: The directory where to create the `.env` file (default: the current directory).
- **Function** `cb`: The callback function.

#### Return
- **Stream** The writable stream.



## :yum: How to contribute
Have an idea? Found a bug? See [how to contribute][contributing].



## :scroll: License

[MIT][license] © [Bloggify][website]

[license]: http://showalicense.com/?fullname=Bloggify%20%3Csupport%40bloggify.org%3E%20(https%3A%2F%2Fbloggify.org)&year=2017#license-mit
[website]: https://bloggify.org
[contributing]: /CONTRIBUTING.md
[docs]: /DOCUMENTATION.md
