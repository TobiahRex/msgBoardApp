'use strict';

const path = require('path');
const fs   = require('fs');
const uuid = require('uuid');

let Posts = {
  get(cb){
    let dbData;
    fs.readFile(path.join(__dirname, './db.json'), (err, data) => {
      if(err) cb(err);
      try {
        dbData = JSON.parse(data);
      } catch(err){
        cb(err);
      }; cb(dbData);
    });
  },
  post(body, cb){
    let dbData;
    fs.readFile(path.join(__dirname, './db.json'), (err, data)=> {
      if(err) cb(err);
      try {
        dbData = JSON.parse(data);
      } catch(err){
        cb(err);
      };
      let id = uuid.v1();
      let date = Date(Date.now());
      let newPost = {id, date,
        author : body.author,
        post   : body.post
      };
      fs.writeFile(path.join(__dirname, './db.json'), JSON.stringify(newPost), err => {
        err ? cb(err) : cb(null);
      });
    });
  }
};

module.exports = Posts;
