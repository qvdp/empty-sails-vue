const compression = require('compression')
const express = require('express')
const app = express()
const port = process.env.PORT || 8080

app.use(compression())
app.use(express.static(__dirname + '/dist'))
app.use('/robots.txt', express.static(__dirname + '/dist/robots.txt'))
app.get(/.*/, function (req, res) {
  res.sendFile(__dirname + '/dist/index.html')
})
app.listen(port)

console.log('server started on port: ' + port)
