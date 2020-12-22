const AWS = require('aws-sdk')

AWS.config.update({
    region: 'us-east-1',
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

        const experts = await DynamoDB.query(params, (err) => {
            if (err) {
                return {
                    error: true,
                }
            }
        }).promise()

        res.setHeader('Content-Type', 'application/json')
        res.status(200).end(
            JSON.stringify({
                data: [...experts.Items],
            })
        )
    } catch (err) {
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
