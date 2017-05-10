import fs from "fs"
import path from "path"
import typpy from "typpy"
import streamp from "streamp"

function* iterate (obj) {
    for (let key of Object.keys(obj)) {
        yield [key, obj[key]];
    }
}

export const envToItem = (name, value) => `${name}=${value}`;

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
    let first = true;
    for (let [name, value] of iterate(obj)) {
        if (first) {
            first = false;
        } else {
            stream.write("\n")
        }
        stream.write(envToItem(name, value))
    }
    stream.end();


    return stream
}

export default toFile
