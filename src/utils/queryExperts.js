const AWS = require('aws-sdk')
import { DYNAMODB } from '@/utils/config-aws'

const queryExperts = async (location, admin = false) => {
    try {
        if (!location) {
            throw new Error('Primary Key (location) must be defined')
        }

        const generateKeyConditionExpression = () => {
            if (admin) {
                return '#location = :location'
            } else {
                return '#location = :location and begins_with(#pk, :active)'
            }
        }

        const addExtraAttributeNames = () => {
            if (!admin) {
                return {
                    '#pk': 'pk',
                }
            }
        }

        const addExtraAttributeValues = () => {
            if (!admin) {
                return {
                    ':active': {
                        S: 'ACTIVE',
                    },
                }
            }
        }

        /**
         * When I created secondary index, the primary key is (sk) and sort key is (pk)
         */
        var docClient = new AWS.DynamoDB({ region: AWS.config.region })
        let params = {
            TableName: 'eagle-experts',
            IndexName: 'gsi1',
            ExpressionAttributeNames: {
                '#location': 'sk',
                ...addExtraAttributeNames(),
            },
            ExpressionAttributeValues: {
                ':location': {
                    S: location,
                },
                ...addExtraAttributeValues(),
            },
            KeyConditionExpression: generateKeyConditionExpression(),
            // ExpressionAttributeNames: {
            //     '#location': 'sk',
            //     '#expert': 'pk',
            // },
            // ExpressionAttributeValues: {
            //     ':location': location,
            //     ':active': 'ACTIVE#',
            // },
            // KeyConditionExpression: admin
            //     ? '#location = ' + location
            //     : '#location = :location and begins_with(#expert, :active)',
        }

        const response = await docClient
            .query(params, function (err) {
                if (err) {
                    console.log(err)
                }
            })
            .promise()
        console.log(response)
        return {
            success: true,
            response: response.Items.map((record) => AWS.DynamoDB.Converter.unmarshall(record)),
        }
    } catch (err) {
        return {
            error: true,
            message: err,
        }
    }
}

export default queryExperts
