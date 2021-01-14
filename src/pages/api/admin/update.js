const AWS = require('aws-sdk')
import isAuthenticated from '@/utils/isAuthenticated'

AWS.config.update({
    region: 'us-east-1',
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
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
                        '#title': 'title',
                        '#subtitle': 'subtitle',
                        '#accent_color': 'accent_color',
                        '#logo': 'logo',
                        '#background_image': 'background_image',
                        '#description': 'description',
                        '#social_links': 'social_links',
                        '#phone': 'phone',
                        '#address': 'address',
                        '#email': 'email',
                        '#business_hours': 'business_hours',
                        '#promo_video_url': 'promo_video_url',
                        '#ad_image': 'ad_image',
                        '#category': 'category',
                        '#gsi1sk': 'gsi1sk',
                    },
                    ExpressionAttributeValues: {
                        ':title': payload.title,
                        ':subtitle': payload.subtitle,
                        ':accent_color': payload.accent_color,
                        ':logo': payload.logo,
                        ':background_image': payload.background_image,
                        ':description': payload.description,
                        ':social_links': payload.social_links,
                        ':phone': payload.phone,
                        ':address': payload.address,
                        ':email': payload.email,
                        ':business_hours': payload.business_hours,
                        ':promo_video_url': payload.promo_video_url,
                        ':ad_image': payload.ad_image,
                        ':category': payload.category,
                        ':gsi1sk': payload.gsi1sk,
                    },
                    UpdateExpression: `SET
                        #title = :title,
                        #subtitle = :subtitle,
                        #accent_color = :accent_color,
                        #logo = :logo,
                        #background_image = :background_image,
                        #description = :description,
                        #social_links = :social_links,
                        #phone = :phone,
                        #address = :address,
                        #email = :email,
                        #business_hours = :business_hours,
                        #promo_video_url = :promo_video_url,
                        #ad_image = :ad_image,
                        #category = :category,
                        #gsi1sk = :gsi1sk`,
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
