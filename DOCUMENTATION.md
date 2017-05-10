## Documentation

You can see below the API reference of this module.

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
- **String** `dir`: = "" The directory where to create the `.env` file.
- **Function** `cb`: The callback function.

#### Return
- **Stream** The writable stream.

