var { item, toArray, toFile } = require("..")

console.log(item("PORT", 8080))
// => PORT=8080

console.log(toArray({
    PORT: 8080
  , NODE_ENV: "production"
}))
// => [ 'PORT=8080', 'NODE_ENV=production' ]

// Will create a file named `.env` in this directory
toFile({
    PORT: 8080
  , NODE_ENV: "production"
}, __dirname, err => {
    err && console.error(err)
    // The .env file contains:
    // PORT=8080
    // NODE_ENV=production
})
