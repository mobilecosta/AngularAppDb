const jsonServer = require('json-server')
const server = jsonServer.create()
const auth = require('json-server-auth')
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

// Set default middlewares (logger, static, cors and no-cache)
server.use(middlewares)

// Customiza retorno do metodo Get
router.render = (req, res) => {
  const data = res.locals.data;
  if (data && data instanceof Array) {
    res.jsonp({
        items: data,
        hasNext: false
      })
  } else {
    res.jsonp(data)
  }
}

server.db = router.db

// Use default router
server.use(auth)
server.use(router)
server.listen(4200, () => {
  console.log('JSON Server is running')
})