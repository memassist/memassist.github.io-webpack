const fs = require("fs");
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // https://github.com/johnagan/clean-webpack-plugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const HtmlMinimizerPlugin = require("html-minimizer-webpack-plugin");

const env = process.env.NODE_ENV;
const sourceMap = env === 'development';

module.exports = {
  entry: {
    main: './src/main.js',
    //vendor: ['bootstrap','jquery','axios','nprogress','popper.js']
    //bootstrap: './src/bootstrap.js'
  },

  output: {
    filename: '[name].min.js',
    ////filename: '[name].[contenthash].js',
    //filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'dist'),
    //publicPath: '/dist/',
    publicPath: '/',
  },

  mode: env,
  devtool: sourceMap ? 'source-map' : undefined,
  optimization: {
    // splitChunks: {
    //   chunks: 'all'
    // },
    usedExports: true,
    // minimizer: [
    //   new TerserPlugin({
    //     sourceMap: true,
    //   }),
    // ],
    minimize: ! sourceMap,
    minimizer: [
      new TerserPlugin(),
      new HtmlMinimizerPlugin()
    ],
  },

  module: {
    rules: [
      // {
      //   test: /\.html$/i,
      //   use: [
      //     {
      //       loader: "file-loader",
      //       options: {
      //         name: "[name].[ext]",
      //       },
      //     },
      //   ],
      // },
      // {
      //   test: /\.m?js$/,
      //   exclude: /(node_modules|bower_components)/,
      //   use: {
      //     loader: 'babel-loader',
      //     options: {
      //       presets: [
      //         '@babel/preset-env'
      //       ]
      //     }
      //   }
      // },
      {
        test: /\.s[ac]ss$/i,
        use: [
          //// Creates `style` nodes from JS strings
          //"style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: (resourcePath, context) => {
            //     // publicPath is the relative path of the resource to the context
            //     // e.g. for ./css/admin/main.css the publicPath will be ../../
            //     // while for ./css/main.css the publicPath will be ../
            //     return path.relative(path.dirname(resourcePath), context) + '/';
            //   },
            // },
          },
          // Translates CSS into CommonJS
          {
            loader: "css-loader",
            options: {
              sourceMap: sourceMap
            }
          },
          // PostCSS
          // {
          //   loader: 'postcss-loader',
          // },
          // Compiles Sass to CSS
          {
            loader: 'sass-loader',
            options: {
              sourceMap: sourceMap,
            },
          },
        ],
      },
      {
        test: /\.css$/i,
        use: [
          //"style-loader",
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: (resourcePath, context) => {
            //     // publicPath is the relative path of the resource to the context
            //     // e.g. for ./css/admin/main.css the publicPath will be ../../
            //     // while for ./css/main.css the publicPath will be ../
            //     return path.relative(path.dirname(resourcePath), context) + '/';
            //   },
            // },
          },
          {
            loader: "css-loader",
            options: {
              sourceMap: sourceMap
            }
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          outputPath: './webpack-images/',
          //name: '[name].[ext]?[hash]',
          name: '[name].[ext]',
          esModule: false,
        }
      },
      // {
      //   test: /\.(eot|ttf|otf|woff|woff2|json|xml)$/,
      //   loader: 'file-loader',
      //   options: {
      //     outputPath: './fonts/',
      //     //name: '[name].[ext]?[hash]'
      //     name: '[name].[ext]'
      //   }
      // }
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    //new MiniCssExtractPlugin()
    new MiniCssExtractPlugin({
      //filename: '[name].css',
      //filename: '[name].min.[hash].css',
      filename: '[name].min.css',
      //chunkFilename: '[id].css',
      ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new CopyPlugin({
      patterns: [
        {
          context: path.resolve(__dirname, "src"),
          from: "./*.html",
        },
        {
          from: "./static",
        }
      ],
    }),
  ],
};
