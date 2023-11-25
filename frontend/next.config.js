/** @type {import('next').NextConfig} */

const nextConfig = {
    sassOptions: {
        includePaths: ['./src'],
        prependData: `
        @import "static/sass/_variable.scss";
        @import "static/sass/_base.scss";
        @import "static/sass/_mixins.scss";
        @import "static/sass/_variable.scss";
        @import "static/sass/_responsive.scss";
        `
    }
}

module.exports = nextConfig