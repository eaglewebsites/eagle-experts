const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
})

let DynamoDB = new AWS.DynamoDB.DocumentClient()

const handler = async (req, res) => {
    try {
        if (!req.query.location) {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).end(
                JSON.stringify({
                    error: true,
                    message: 'Location query string parameter is missing',
                })
            )
        }

        let params = {
            TableName: 'eagle-experts',
            IndexName: 'gsi1',
            ExpressionAttributeNames: {
                '#location': 'gsi1pk',
                '#expert': 'gsi1sk',
            },
            ExpressionAttributeValues: {
                ':location': req.query.location,
                ':active': 'ACTIVE#',
            },
            KeyConditionExpression: '#location = :location and begins_with(#expert, :active)',
        }

        DynamoDB.query(params, (err, data) => {
            if (err) {
                return {
                    error: true,
                }
            } else {
                res.setHeader('Content-Type', 'application/json')
                res.status(200).end(
                    JSON.stringify({
                        data: [...data.Items],
                    })
                )
            }
        })
    } catch (err) {
        console.log(err)
        res.setHeader('Content-Type', 'application/json')
        res.status(500).end(
            JSON.stringify({
                error: true,
                message: 'Something went wrong on our end',
                code: 500,
            })
        )
    }
}

export default handler
