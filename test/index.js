let express = require('express')

let app = express()

app.use(express.static("../dist"))
app.use(express.static("pub"))

app.listen(8080)