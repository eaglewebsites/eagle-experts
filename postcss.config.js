module.exports = {
    plugins: ['tailwindcss', 'postcss-preset-env'],
}

// module.exports = {
//     plugins: [
//         'tailwindcss',
//         [
//             'postcss-preset-env',
//             {
//                 stage: 1,
//                 features: {
//                     'focus-within-pseudo-class': false,
//                 },
//             },
//         ],
//     ],
// }
