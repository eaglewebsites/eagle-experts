const AWS = require('aws-sdk')
var jwt = require('jsonwebtoken')
var jwkToPem = require('jwk-to-pem')

const jwks = {
    keys: [
        {
            alg: 'RS256',
            e: 'AQAB',
            kid: '+BA1puH+tgR0/sOeMFo2qcsKhKA55b7vgdVtZLmeLj0=',
            kty: 'RSA',
            n:
                'uMLHAxVo8YWmI8LBFJ13ma4bNeLKoMxf1qPPb-cHph-h1u-aCz1qFyQ_dKFgyKmK29Ltf_Kc9mApwzjedZrLnXz4Ic9H8Dtj5aHq2y1eLRBAZg0a0Ev6i1HSbcT6XorOCXnyv6bIKKvYVR_hzZa4s8VCVRCK7uiLIRSleddncfKFPU_b2dcaqhfrCDlJviGvQXLjTbwuPcLab2tW8eDhXF4SQCL-zsVKY1yv8FwjMd2ofwQdFokwsK5wun8JCUOkuDkZ3DuZb-sluygy1-zBxmqmFwS8m3qeCZLmP54Agd6H-uC8BtJ2IuJS2GpaUIebsE_MxRC-fEv6yGaohaZUvQ',
            use: 'sig',
        },
        {
            alg: 'RS256',
            e: 'AQAB',
            kid: '+X4109E/Hn45S9d0Y5P+3nbt1+slnje/AIZ+gMty6kM=',
            kty: 'RSA',
            n:
                'w8OI-9RkWzwZt22qzrIvBAMIC3lUhGA2oyBgh1N8U_dXWqxWS95IDoM6rG_mXx54f6qhShfOnVma4JX3zpmSJjdBCVitZJGsvT7jjU1dHwO-DMLXyF6cUIPCPAwq4opvILFCBHVWj_JJXaKiOkDGGFFRxv0dfGtzIQ2fc6lcLhR706yJ5ulkVL-IpVb9g3TI_AN_tP4m9WPdowIgznmWSgYWUZmuuWmsatMWDfT_T4fxO-ZQShDeyARyrpk31Pox4tMPid_EGq2683uUkONTtz3XNson03eAqxMWbUeqt2rzOEGMqDNPHvoXDjhJHzxvu2QSZkKFZmM5rpQ2ckQi0Q',
            use: 'sig',
        },
    ],
}

const getKeyId = (jwks, keyId) => {
    /**
     * Takes in json object and returns matching keyId
     */
    return jwks.keys.find((item) => item.kid === keyId)
}

const handler = async (req, res) => {
    const unsafe_token = jwt.decode(req.headers.authorization, { complete: true })

    jwt.verify(
        req.headers.authorization,
        jwkToPem(getKeyId(jwks, unsafe_token.header.kid)),
        { algorithms: ['RS256'] },
        function (err, decoded) {
            if (err) {
                console.log(err)
                res.json({
                    message: 'You are not allowed to access this resource',
                })
            } else {
                console.log('this was verified')
                res.json({
                    message: 'User is authorized',
                    decoded,
                })
            }
        }
    )
}

export default handler
