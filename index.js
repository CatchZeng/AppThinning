const MiddlewareCenter = require("middleware-center")
const prepare = require("./src/middlewares/prepare/index")
const ignore = require("./src/middlewares/ignore/index")
const largeFile = require("./src/middlewares/largeFile/index")
const compressImage = require("./src/middlewares/compress-image/index")
const compressGif = require("./src/middlewares/compress-gif/index")
const compressSVG = require("./src/middlewares/compress-svg/index")

function appthinning(dir, types, size, maxSize, compress, key, ignoreFiles) {
    const middlewareCenter = new MiddlewareCenter.MiddlewareCenter()
    middlewareCenter.use(prepare).use(ignore).use(largeFile).use(compressImage).use(compressGif).use(compressSVG)

    let ctx = {}
    let program = {
        dir: dir, 
        types: types, 
        size: size,
        maxSize: maxSize, 
        compress: compress,
        key: key, 
        ignore: ignoreFiles
    }
    ctx.program = program
    ctx.totalSaving = 0
    
    return middlewareCenter.handleRequest(ctx)
}

module.exports = appthinning
module.exports.default = appthinning