const Koa = require('koa')
const bodyparser = require('koa-bodyparser')
const mount = require('koa-mount')
const serve = require('koa-static')
const path = require('path')

const app = module.exports = new Koa()

app.use(bodyparser({ enableTypes: ['text'] }))
app.use(mount('/cookies', require('./cookies')))
app.use(serve(path.resolve(__dirname, 'public')))

if (require.main === module) {
  app.listen(process.env.PORT)
}
