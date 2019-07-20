const MiddlewareCenter = require("./middleware-center/index")
const prepare = require("./middlewares/prepare/index")
const ignore = require("./middlewares/ignore/index")
const largeFile = require("./middlewares/largeFile/index")
const compressImage = require("./middlewares/compress-image/index")
const compressGif = require("./middlewares/compress-gif/index")
const compressSVG = require("./middlewares/compress-svg/index")
const colors = require("colors")

const middlewareCenter = new MiddlewareCenter()

middlewareCenter.use(prepare).use(ignore).use(largeFile).use(compressImage).use(compressGif).use(compressSVG)

function appthinning(dir, types, size, maxSize, compress, key, ignore) {
    let ctx = {}
    let program = {
        dir: dir, 
        types: types, 
        size: size,
        maxSize: maxSize, 
        compress: compress,
        key: key, 
        ignore: ignore
    }
    ctx.program = program
    ctx.totalSaving = 0
    
    return middlewareCenter.handleRequest(ctx)
}

module.exports = appthinning