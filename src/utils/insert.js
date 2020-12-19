let AWS = require('aws-sdk')

const insert = async (payload = null) => {
    /**
     * Takes in a payload object to store in dynamo
     */
    try {
        if (!payload) {
            throw new Error('Payload must be defined in function => insert')
        }

        var docClient = new AWS.DynamoDB({ region: AWS.config.region })
        console.log(payload)
        var params = {
            TableName: 'eagle-experts',
            Item: {
                pk: {
                    S: payload.pk,
                },
                sk: {
                    S: payload.sk.toUpperCase(),
                },
                title: {
                    S: payload.title,
                },
            },
        }
        const response = await docClient
            .putItem(params, function (err, data) {
                if (err) console.error(err)
                else console.log(data)
            })
            .promise()

        return {
            success: true,
            response,
        }
    } catch (err) {
        console.warn(err)
        return {
            error: true,
            message: err,
        }
    }
}

export default insert
