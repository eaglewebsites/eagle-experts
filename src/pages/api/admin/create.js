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
                    Item: {
                        pk: payload.pk,
                        sk: payload.sk.toUpperCase(),
                        gsi1pk: payload.gsi1pk,
                        gsi1sk: payload.gsi1sk,
                        type: 'EXPERT',
                        title: payload.title || 'UNTITLED',
                        subtitle: payload.subtitle || '',
                        accent_color: payload.accent_color || '',
                        logo: payload.logo || '',
                        background_image: payload.background_image || '',
                        description: JSON.stringify(payload.description) || '',
                        social_links: {
                            facebook: payload.social_links.facebook || '',
                            youtube: payload.social_links.youtube || '',
                            twitter: payload.social_links.twitter || '',
                            instagram: payload.social_links.instagram || '',
                            website: payload.social_links.website || '',
                        },
                        phone: payload.phone || '',
                        address: payload.address || '',
                        business_hours: {
                            monday: payload.business_hours.monday || '',
                            tuesday: payload.business_hours.tuesday || '',
                            wednesday: payload.business_hours.wednesday || '',
                            thursday: payload.business_hours.thursday || '',
                            friday: payload.business_hours.friday || '',
                            saturday: payload.business_hours.saturday || '',
                            sunday: payload.business_hours.sunday || '',
                        },
                        email: payload.email || '',
                        ad_image: payload.ad_image || '',
                        promo_video_url: payload.promo_video_url || '',
                    },
                }

                const response = await DynamoDB.put(params, (err) => {
                    if (err) {
                        console.log(err)
                        return {
                            error: true,
                            message: err,
                        }
                    }
                }).promise()

                // const response = await docClient
                //     .putItem(params, function (err, data) {
                //         if (err) console.error(err)
                //         else console.log(data)
                //     })
                //     .promise()

                res.setHeader('Content-Type', 'application/json')
                res.status(200).end(
                    JSON.stringify({
                        data: response,
                    })
                )
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
