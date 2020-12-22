let AWS = require('aws-sdk')
import { DYNAMODB } from '@/utils/config-aws'

const insert = async (payload = null) => {
    /**
     * Takes in a payload object to store in dynamo
     */
    try {
        if (!payload) {
            throw new Error('Payload must be defined in function => insert')
        }

        var docClient = new AWS.DynamoDB({ region: AWS.config.region })
        let params = {
            TableName: 'eagle-experts',
            Item: {
                pk: {
                    S: payload.pk,
                },
                sk: {
                    S: payload.sk.toUpperCase(),
                },
                type: {
                    S: 'EXPERT',
                },
                title: {
                    S: payload.title || 'UNTITLED',
                },
                subtitle: {
                    S: payload.subtitle || '',
                },
                accent_color: {
                    S: payload.accent_color || '',
                },
                logo: {
                    S: payload.logo || '',
                },
                background_image: {
                    S: payload.background_image || '',
                },
                description: {
                    S: JSON.stringify(payload.description) || '',
                },
                social_links: {
                    M: {
                        facebook: {
                            S: payload.social_links.facebook || '',
                        },
                        youtube: {
                            S: payload.social_links.youtube || '',
                        },
                        twitter: {
                            S: payload.social_links.twitter || '',
                        },
                        instagram: {
                            S: payload.social_links.instagram || '',
                        },
                        website: {
                            S: payload.social_links.website || '',
                        },
                    },
                },
                phone: {
                    S: payload.phone || '',
                },
                address: {
                    S: payload.address || '',
                },
                business_hours: {
                    M: {
                        monday: {
                            S: payload.business_hours.monday || '',
                        },
                        tuesday: {
                            S: payload.business_hours.tuesday || '',
                        },
                        wednesday: {
                            S: payload.business_hours.wednesday || '',
                        },
                        thursday: {
                            S: payload.business_hours.thursday || '',
                        },
                        friday: {
                            S: payload.business_hours.friday || '',
                        },
                        saturday: {
                            S: payload.business_hours.saturday || '',
                        },
                        sunday: {
                            S: payload.business_hours.sunday || '',
                        },
                    },
                },
                email: {
                    S: payload.email || '',
                },
                ad_image: {
                    S: payload.ad_image || '',
                },
                promo_video_url: {
                    S: payload.promo_video_url || '',
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
