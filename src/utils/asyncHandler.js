const asyncHandler = (reuestHandler) => {
    (req, res, next) => {
        Promise.resolve(reuestHandler(req, res, next)).catch((err) => next(err)) 
    }
}


export {asyncHandler}


//dono same hai but promises and try and catch se kara hai

// const asyncHandler = (fn) => async (req, res, next) => {
//     try {
//         await fn(req, res, next)
//     }
//     catch(error){
//         res.status(error.code || 500).json ({
//             success: false,
//             message: error.message
//         })
//     }
// }