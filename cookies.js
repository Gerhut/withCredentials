const Koa = require('koa')

const app = module.exports = new Koa()

app.use(async context => {
  const { request, response, cookies } = context

  const field = request.path.replace(/^\//, '')
  context.assert(field, 400)

  if (request.header['origin']) {
    response.set('Access-Control-Allow-Origin', request.header['origin'])
    response.set('Access-Control-Allow-Credentials', 'true')
  }
  if (request.header['access-control-request-method']) {
    response.set('Access-Control-Allow-Methods', request.header['access-control-request-method'])
  }

  switch (request.method) {
    case 'GET':
      response.body = cookies.get(field)
      break
    case 'POST':
      cookies.set(field, request.body)
      response.status = 205
      break
    case 'DELETE':
      cookies.set(field)
      response.status = 205
      break
    case 'OPTIONS':
      response.status = 204
      response.set('Allow', 'OPTIONS')
      break
    default:
      context.throw(405)
  }
})
