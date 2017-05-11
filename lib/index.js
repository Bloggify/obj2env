import fs from "fs"
import path from "path"
import typpy from "typpy"
import streamp from "streamp"

function* iterate (obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]]
    }
}

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
export const envToItem = (name, value) => `${name}=${value}`

/**
 * envToArray
 * Converts an object of environment variables into an array.
 *
 * @name envToArray
 * @function
 * @param {Object} obj The object containing environment variables to stringify.
 * @return {Array} An array of stringified pairs.
 */
export const envToArray = obj => {
    if (!typpy.is(obj, Object)) {
        throw new TypeError("Expected a json object as argument")
    }
    const arr = []
    for (let [name, value] of iterate(obj)) {
        arr.push(envToItem(name, value))
    }
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
    const stream = new streamp.writable(file)
    if (cb) {
        stream.on("error", err => cb(err))
        stream.on("close", () => cb())
    }
    let first = true
    for (let [name, value] of iterate(obj)) {
        if (first) {
            first = false
        } else {
            stream.write("\n")
        }
        stream.write(envToItem(name, value))
    }
    stream.end()


    return stream
}

export default toFile
