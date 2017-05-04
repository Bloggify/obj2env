import test from 'ava';
import envGenerate from '../src';

test('envGenerate is defined', t => {
	t.is(typeof envGenerate, "function");
});

test('envGenerate throws error when object is not passed as argument', t => {

	const error = t.throws(() => {
		envGenerate();
	});
	t.is(error.message, 'Expected a json object as argument');

});

test('envGenerate does not thrown an error when object is passed as argument', t => {

	t.notThrows(() => {
		envGenerate({});
	});

});

test('envGenerate returns an array when passed a valid json object', t => {

	const result = envGenerate({ a : 1});
	t.snapshot(result);
	t.is(result instanceof Array, true);

});
