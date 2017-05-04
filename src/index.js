import fs from 'fs';
import path from 'path';
import typpy from 'typpy';
import iterateObj from 'iterate-object';
import Err from 'err';
import mkdirp from 'mkdirp';

export function generateEnvArray(obj){
  if(!typpy.is(obj, Object)){
    throw new TypeError("Expected a json object as argument");
  }
  const arr = [];
  iterateObj(obj, (value, name) => {
     arr.push(`${name}=${value}`)
  });
  return arr;
}

export default function envGenerate(obj, dir, cb){


  if(arguments.length == 2){
    cb = dir
    dir = __dirname
  }

  if(arguments.length == 1){
    cb = () => {};
    dir = __dirname;
  }

  const file = path.join(dir , ".env");

  function write(contents){
    mkdirp(path.dirname(file), function (err) {
    if(err){
      cb(err);
    }
    fs.writeFile(file , contents, (err, data) => {
        cb(err, data);
    });
  });

  }
  const arr = generateEnvArray(obj);
  write(arr.join("\n"));
}
