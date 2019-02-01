/* eslint-env browser */

function install (request, callback) {
  request.withCredentials = true

  request.onload = function () { callback(null, request.responseText) }
  request.onerror = function (error) { callback(error) }
}

function setCookie (callback) {
  var request = new XMLHttpRequest()
  request.open('POST', 'http://127.0.0.1:3000/cookies/foo')

  install(request, callback)

  request.send('bar')
}

function getCookie (callback) {
  var request = new XMLHttpRequest()
  request.open('GET', 'http://127.0.0.1:3000/cookies/foo')

  install(request, callback)

  request.send()
}

function deleteCookie (callback) {
  var request = new XMLHttpRequest()
  request.open('DELETE', 'http://127.0.0.1:3000/cookies/foo')

  install(request, callback)

  request.send()
}

setCookie(function (error) {
  if (error) {
    console.error(error)
  }
  getCookie(function (error, value) {
    if (error) {
      console.error(error)
    } else {
      console.info(value)
    }
    deleteCookie(function (error) {
      if (error) {
        console.error(error)
      }
    })
  })
})
