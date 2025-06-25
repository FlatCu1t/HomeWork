import path, { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  entry: {
    index: './src/client/index/index.ts',
    registration: './src/client/registration/registration.ts',
    auth: "./src/client/auth/auth.ts",
    todos: "./src/client/todos/todos.ts",
  },
  mode: 'development',
  module: {
    rules: [
        {
            test: /\.css$/i,
            use: [MiniCssExtractPlugin.loader, "css-loader"]
        },
        {
            test: /\.s[ac]ss$/i,
            use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
            ],
        },
        {
            test: /\.(png|svg|jpg|jpeg|gif)$/i,
            type: 'asset/resource'
        },
        {
            test: /\.ts$/,
            use: 'ts-loader',
            exclude: /node_modules/,
        },
        {
            test: /\.html$/,
            use: 'html-loader',
        },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  output: {
    filename: '[name].[contenthash].js',
    path: path.resolve(__dirname, 'dist', 'public'),
    clean: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/client/index/index.html',
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      filename: 'registration.html',
      template: './src/client/registration/registration.html',
      chunks: ['registration'],
    }),
    new HtmlWebpackPlugin({
      filename: 'auth.html',
      template: './src/client/auth/auth.html',
      chunks: ['auth'],
    }),
    new HtmlWebpackPlugin({
      filename: 'todos.html',
      template: './src/client/todos/todos.html',
      chunks: ['todos'],
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist', 'public'),
    port: 8080,
    proxy: {
      '/api': 'http://localhost:3000'
    }
  }
};