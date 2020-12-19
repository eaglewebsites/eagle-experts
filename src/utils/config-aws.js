let AWS = require('aws-sdk')
import awsconfig from '../../aws-config'

const configureSDK = (idToken) => {
    if (!idToken) {
        console.error('idToken must be passed into configureSDK function...')
    } else {
        if (!AWS.config.credentials) {
            console.info('Configuring aws sdk...')
            AWS.config.region = awsconfig.Auth.region
            const LoginConfigString = `cognito-idp.${AWS.config.region}.amazonaws.com/${awsconfig.Auth.userPoolId}`
            AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                IdentityPoolId: awsconfig.Auth.identityPoolId,
                Logins: {
                    [LoginConfigString]: idToken.jwtToken,
                },
            })
        } else {
            console.info('aws config already set')
        }
    }
}

export default configureSDK
