import test from "ava"
import path from "path"
import fs from "fs"
import envToFile, { envToArray }  from "../lib"
import rimraf from "rimraf"

test("check methods and functions", t => {
    t.is(typeof envToFile, "function")
    t.is(typeof envToArray, "function")
});

test("envToArray throws error when object is not passed as argument", t => {
    const error = t.throws(() => {
        envToArray();
    });
    t.is(error.message, "Expected a json object as argument");
});

test("envToArray does not thrown an error when object is passed as argument", t => {
    t.notThrows(() => {
        envToArray({});
    });
});

test("envToArray returns an array when passed a valid json object", t => {

    const result = envToArray({
        a: 1
    });
    t.is(result[0], "a=1");
});

// Test various json fixtures
const fixtures = [{
    name: "basic",
    obj: {
        a: 1
    },
    expected: "a=1"
}, {
    name: "basic_2",
    obj: {
        "NODE_ENV": "development",
        "API_KEY": "Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ"
    },
    expected: "NODE_ENV=development\nAPI_KEY=Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ"
}, {
    name: "with_empty",
    obj: {
        "NODE_ENV": "development",
        "API_KEY": "Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ",
        "EMPTY": ""
    },
    expected: "NODE_ENV=development\nAPI_KEY=Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ\nEMPTY="
}, {
    name: "with_multiline",
    obj: {
        "NODE_ENV": "development",
        "API_KEY": "Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ",
        "EMPTY": "",
        "MULTILINE": "Something really long \nis being written here"
    },
    expected: "NODE_ENV=development\nAPI_KEY=Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ\nEMPTY=\nMULTILINE=Something really long \nis being written here"
}]

fixtures.forEach(({ name, obj, expected }, index) => {
    test.cb(`envToFile runs ${name} fixtures successfully`, t => {
        const writeFolder = path.join(__dirname, name)
        envToFile(obj, writeFolder, (err, data) => {
            const output = fs.readFileSync(path.resolve(writeFolder + "/.env"), "utf-8");
            t.is(output, expected);
            t.end();
        });
    });
});
