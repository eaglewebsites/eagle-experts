const AWS = require('aws-sdk')
import isAuthenticated from '@/utils/isAuthenticated'

AWS.config.update({
    region: 'us-east-1',
})

let DynamoDB = new AWS.DynamoDB.DocumentClient()

const handler = (req, res) => {
    try {
        if (!req.query.id || !req.query.location) {
            res.setHeader('Content-Type', 'application/json')
            res.status(400).end(
                JSON.stringify({
                    error: true,
                    message: 'id & location query string parameter is missing',
                })
            )
        }

        isAuthenticated(req, async ({ authorized, ...data }) => {
            if (!authorized) {
                res.status(200).end(
                    JSON.stringify({
                        message: 'Not authorized to access resource',
                        error: true,
                    })
                )
            } else {
                /**
                 * Authorized
                 */
                const payload = req.body

                let params = {
                    TableName: 'eagle-experts',
                    Key: {
                        pk: decodeURI(req.query.id),
                        sk: req.query.location,
                    },
                    ExpressionAttributeNames: {
                        '#gsi1sk': 'gsi1sk',
                    },
                    ExpressionAttributeValues: {
                        ':gsi1sk': payload.gsi1sk,
                    },
                    UpdateExpression: 'set #gsi1sk = :gsi1sk',
                }

                const response = await DynamoDB.update(params, (err) => {
                    if (err) {
                        return {
                            error: true,
                        }
                    }
                }).promise()

                res.setHeader('Content-Type', 'application/json')
                res.status(200).end(
                    JSON.stringify({
                        data: response.Item,
                    })
                )

                // return {
                //     response: AWS.DynamoDB.Converter.unmarshall(response.Item),
                // }
            }
        })
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
