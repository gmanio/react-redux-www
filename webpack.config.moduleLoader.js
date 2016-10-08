import path from 'path';

export default [
    {
        test: /\.js$/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src')
    },
    {
        test: /\.css$/, loader: "style-loader!css-loader"
    },
    {
        test: /\.sass/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded&indentedSyntax'
    },
    {
        test: /\.scss/,
        loader: 'style-loader!css-loader!sass-loader?outputStyle=expanded'
    },
    {
        test: /\.less/,
        loader: 'style-loader!css-loader!less-loader'
    },
    {
        test: /\.styl/,
        loader: 'style-loader!css-loader!stylus-loader'
    },
    {
        test: /\.(png|jpg|gif|woff|woff2)$/,
        loader: 'url-loader?limit=8192'
    },
    {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
    }
]