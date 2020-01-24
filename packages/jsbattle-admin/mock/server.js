#!/usr/bin/env node

const path = require('path')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname , 'db.json'))
const middlewares = jsonServer.defaults({static: path.resolve(__dirname , '..', 'dist')});
const _ = require('lodash');

router.render = (req, res) => {
  if(Array.isArray(res.locals.data) && Object.keys(req.query).filter((k) => (/id$/i).test(k)).length) {
    return res.jsonp(res.locals.data[0]);
  }
  if(!Array.isArray(res.locals.data)) {
    return res.jsonp(res.locals.data);
  }
  let page = 1;
  let pageSize = 10;
  res.jsonp({
    rows: res.locals.data.slice((page-1)*pageSize, page*pageSize),
    total: res.locals.data.length,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(res.locals.data.length/pageSize)
  })
}


server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.use((req, res, next) => {
  if(req.method == 'POST') {
    let resource = req.url.replace(/^.*\/([A-Za-z]+)\/?$/, '$1');
    if(!resource) {
      return next();
    }
    let defaultEntity;
    try {
      defaultEntity = require(path.resolve(__dirname, 'entities', resource + '.js'))();
    } catch(err) {
      console.log(err);
      defaultEntity = {};
    }

    req.body = _.defaults(req.body, defaultEntity)
  }

  next();
})
server.use(middlewares)
server.use(jsonServer.rewriter(require(path.resolve(__dirname , "router.json"))))
server.use(router)

server.listen(3000, () => {
  console.log('JSON Server is running')
})
