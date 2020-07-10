module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy('src/css')
    eleventyConfig.addPassthroughCopy('src/img')
    eleventyConfig.addPassthroughCopy('src/js')
    return {
        passthroughFileCopy: true,
        dir: {
            input: 'src',
            includes: '_includes',
            layouts: '_includes',
            output: 'dist',
        },
    }
}
