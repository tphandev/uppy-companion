require('dotenv').config();
const fs = require('fs')
const path = require('path')
const rimraf = require('rimraf')
const companion = require('@uppy/companion')
const app = require('express')()
var cors = require('cors');

const DATA_DIR = path.join(__dirname, 'tmp')

var corsOptions = {
  origin: '*',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(cors(corsOptions));
app.use(require('cookie-parser')())
app.use(require('body-parser').json())
app.use(require('express-session')({
  secret: 'aa'
}))

const options = {
  providerOptions: {
    s3: {
      getKey: (req, filename) =>
        `${filename}`,
      key: process.env.COMPANION_AWS_KEY,
      secret: process.env.COMPANION_AWS_SECRET,
      bucket: process.env.COMPANION_AWS_BUCKET,
      region: process.env.COMPANION_AWS_REGION
    }
  },
  server: { host: process.env.PUBLIC_DOMAIN},
  filePath: DATA_DIR,
  secret: 'aa',
  debug: true
}

// Create the data directory here for the sake of the example.
try {
  fs.accessSync(DATA_DIR)
} catch (err) {
  fs.mkdirSync(DATA_DIR)
}
process.on('exit', function () {
  rimraf.sync(DATA_DIR)
})

app.use(companion.app(options))

const server = app.listen(process.env.PORT, () => {
  console.log('listening on port 3020')
})

companion.socket(server, options)
