#!/usr/bin/env node

const path = require('path')
const express = require('express')
const querystring = require('querystring')
const jsonServer = require('json-server')
const bodyParser = require('body-parser')
const server = jsonServer.create()
const router = jsonServer.router(path.resolve(__dirname , 'db.json'))
const middlewares = jsonServer.defaults();
const _ = require('lodash');

let authorized = false;

router.render = (req, res) => {
  if(req.url == '/profile' && !authorized) {
    return res.jsonp({});
  }
  if(Array.isArray(res.locals.data) && Object.keys(req.query).filter((k) => (/^id$/i).test(k)).length) {
    return res.jsonp(res.locals.data[0]);
  }
  if(!Array.isArray(res.locals.data)) {
    return res.jsonp(res.locals.data);
  }
  let params = querystring.parse(req.url.split('?').pop());
  let page = params._page || 1;
  let pageSize = params._limit || 10;
  res.jsonp({
    rows: res.locals.data,
    total: 500,
    page: page,
    pageSize: pageSize,
    totalPages: Math.ceil(500/pageSize)
  })
}

let serverDelay = isNaN(process.argv[2]) ? 0 : process.argv[2];
serverDelay *= Math.round(0.5 + 1*Math.random())
server.use('/admin', express.static(path.resolve(__dirname , '..', 'dist')))
server.get('/', function (req, res) {
  res.redirect('/admin')
})
server.use(bodyParser.urlencoded({ extended: true }))
server.use(bodyParser.json())
server.get('/auth/logout', function (req, res) {
  console.log("Logout");
  authorized = false;
  res.redirect('/admin')
})
server.get('/auth/:provider', function (req, res) {
  console.log("Authorized");
  authorized = true;
  res.redirect('/admin')
})


server.use((req, res, next) => {
  if(/^\/api\/admin\//.test(req.url) && !authorized) {
    return res.status(401).send('401 Unauthorized')
  }
  next()
});
server.use((req, res, next) => {
  if(serverDelay) {
    req.query._delay = serverDelay;
  }
  if(req.query.page) {
    req.query._page = req.query.page;
    req.url += "&_page=" + req.query.page
  }
  if(req.query.pageSize) {
    req.query._limit = req.query.pageSize;
    req.url += "&_limit=" + req.query.pageSize
  }
  next()
});
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


server.listen(8071, () => {
  console.log('JSON Server is running')
})
