const fs = require("fs")
    , path = require("path")
    , typpy = require("typpy")
    , streamp = require("streamp")

/**
 * envToItem
 * Converts the pair of name and value into a string.
 *
 * @name envToItem
 * @function
 * @param {String} name The environment variable name.
 * @param {String} value The environment variable value.
 * @return {String} The stringified pair.
 */
const envToItem = (name, value) => `${name}=${value}`

/**
 * envToArray
 * Converts an object of environment variables into an array.
 *
 * @name envToArray
 * @function
 * @param {Object} obj The object containing environment variables to stringify.
 * @return {Array} An array of stringified pairs.
 */
const envToArray = obj => {
    if (!typpy(obj, Object)) {
        throw new TypeError("Expected a json object as argument")
    }
    const arr = Object.keys(obj).map(name => envToItem(name, obj[name]))
    return arr
}

/**
 * toFile
 * Create a file named `.env` in the specified directory.
 *
 * @name toFile
 * @function
 * @param {Object} obj The object containing environment variables to stringify.
 * @param {String} dir The directory where to create the `.env` file (default: the current directory).
 * @param {Function} cb The callback function.
 * @return {Stream} The writable stream.
 */
const toFile = (obj, dir = "", cb) => {

    if (typeof dir === "function") {
        cb = dir
        dir = ""
    }

    const file = path.join(dir, ".env")
    const stream = new streamp.writable({
        path: file,
        flags: "w"
    })
    if (cb) {
        stream.on("error", err => cb(err))
        stream.on("close", () => cb())
    }
    Object.keys(obj).forEach((name, notFirst)=> {
        if (notFirst) {
            stream.write("\n")
        }
        stream.write(envToItem(name, obj[name]))
    })

    stream.end()
    return stream
}

toFile.toArray = envToArray
toFile.item = envToItem
toFile.toFile = toFile

module.exports = toFile
