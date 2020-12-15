/**
 * Gets added to global config object. Access it with 'config.[key]'
 */
module.exports = function () {
    var post_site = 'Post Site'
    var post_url = 'https://jcpost.com'

    return {
        title: 'Eagle Experts',
        post_site: post_site,
        post_url: post_url,
        links: [
            {
                title: 'Home',
                icon: '🏡',
                url: '/',
                target: '_self',
            },
            {
                title: 'Advertise with us',
                icon: '📝',
                url: '/advertise',
                target: '_self',
            },
            {
                title: post_site,
                icon: '🗞',
                url: post_url,
                target: '_blank',
            },
        ],
    }
}
