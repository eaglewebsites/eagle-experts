const colors = require('tailwindcss/colors')

module.exports = {
    purge: ['./src/**/*.js'],
    theme: {
        extend: {
            colors: {
                orange: colors.orange,
                lightBlue: colors.lightBlue
            }
        }
    },
    variants: {},
    plugins: [],
}
