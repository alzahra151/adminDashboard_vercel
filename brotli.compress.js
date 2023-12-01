// const brotli = require('brotli-webpack-plugin')
const brotli = require("brotli")
const fs = require('fs')

const brotliSettings = {
    mode: 0,
    quality: 11,
    lgwin: 22,
    extension: 'br'
}
const path = "dist/admin-dashbaord-varrox"
fs.readdirSync(path).forEach((file) => {
    if (file.match(/\.(js|html|css|ttf|txt)$/)) {
        const result = brotli.compress(
            fs.readFileSync(`${path}/${file}`),
            brotliSettings
        )
        if (result) {
            fs.writeFileSync(`${path}/${file}.br`, result)
        }
    }


});