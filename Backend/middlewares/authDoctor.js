import jwt from 'jsonwebtoken'

const authdoctot = async (req, res, next) => {
    try {
        const { dtoken } = req.headers;
        if (!dtoken) {
            res.json({ success: false, message: "Not Authorized Login Again" })
            return;
        }
        const token_decode = jwt.verify(dtoken, process.env.JWT_SECRET)

        if (!req.body) req.body = {};
        req.body.docId = token_decode.id
 
        next()
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export default authdoctot