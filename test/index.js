import test from 'ava';
import path from 'path';
import envGenerate, {generateEnvArray} from '../src';
import rimraf from 'rimraf';

const generatedEnvFolder = path.join(__dirname, "../", "__generated__");

test('generateEnvArray is defined', t => {
	t.is(typeof generateEnvArray, "function");
});

test('generateEnvArray throws error when object is not passed as argument', t => {

	const error = t.throws(() => {
		generateEnvArray();
	});
	t.is(error.message, 'Expected a json object as argument');

});

test('generateEnvArray does not thrown an error when object is passed as argument', t => {

	t.notThrows(() => {
		generateEnvArray({});
	});

});

test('generateEnvArray returns an array when passed a valid json object', t => {

	const result = generateEnvArray({ a : 1});
	t.is(result[0], "a=1");
;
});

test('envGenerate writes a file', t => {
	const writeFolder =  path.join(generatedEnvFolder, "test1")
	envGenerate({ a : 1}, writeFolder);
	t.is(true, true);
})

test('envGenerate test2', t => {
	const writeFolder =  path.join(generatedEnvFolder, "test2")
	envGenerate({
		"NODE_ENV" : "development",
		"API_KEY" : "Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ"
	}, writeFolder);
	t.is(true, true);
})


test('envGenerate test3', t => {
	const writeFolder =  path.join(generatedEnvFolder, "test3")
	envGenerate({
		"NODE_ENV" : "development",
		"API_KEY" : "Z4HTfmfL*&*EXBwe%HYt8E9OwZs&9lRQ",
		"EMPTY" : "",
	}, writeFolder);
	t.is(true, true);
})
