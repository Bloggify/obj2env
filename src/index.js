import typpy from 'typpy';
import iterateObj from 'iterate-object';
import Err from 'err';

export default function envGenerate(obj){
  if(!typpy.is(obj, Object)){
    throw new TypeError("Expected a json object as argument");
  }
  const arr = [];
  iterateObj(obj, (value, name) => {
     arr.push(`${name}=${JSON.stringify(value)}`)
  });
  return arr;
}
