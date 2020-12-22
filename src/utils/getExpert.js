const AWS = require('aws-sdk')

const getExpert = async (id, location) => {
    try {
        if (!id || !location) {
            throw new Error('Primary Key (id) and location (location) must be defined')
        }

        var Dynamo = new AWS.DynamoDB()
        let params = {
            TableName: 'eagle-experts',
            Key: {
                pk: {
                    S: id,
                },
                sk: {
                    S: location,
                },
            },
        }

        console.log(params)

        const response = await Dynamo.getItem(params, function (err) {
            if (err) {
                console.log(err)
            }
        }).promise()

        return {
            response: AWS.DynamoDB.Converter.unmarshall(response.Item),
        }
    } catch (err) {
        console.log(err)
        return {
            error: true,
        }
    }
}

export default getExpert
