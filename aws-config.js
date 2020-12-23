const awsConfig = {
    Auth: {
        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        identityPoolId: 'us-east-1:ac13ae93-3411-472a-8cfd-196546c737c0',

        // REQUIRED - Amazon Cognito Region
        region: 'us-east-1',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: 'us-east-1_C71tInq1x',

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: '1refc8ue28ra0hgojilm6uk4mh',

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,
    },
    Storage: {
        AWSS3: {
            bucket: 'eagle-experts',
            region: 'us-east-1',
        },
    },
}

export default awsConfig
