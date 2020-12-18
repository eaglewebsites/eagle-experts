const AWS = require('aws-sdk')

const handler = async (req, res) => {
    console.log(req.headers.authorization)
    res.json({
        message: 'User is authorized',
    })
}

export default handler
