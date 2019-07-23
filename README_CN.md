# AppThinning

<p align="center"><img src="https://github.com/CatchZeng/AppThinning/raw/master/logo.png" alt="AppThinning" title="AppThinning" width="200"/></p>

[![NPM version](https://img.shields.io/npm/v/appthinning.svg)](https://www.npmjs.com/package/appthinning)

> 应用程序瘦身工具，帮助你找到大文件，压缩 png、gif、jpg、svg 等文件。

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/effect.gif)

## 桌面版本

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/desktop.gif)

你可以到[releases](https://github.com/CatchZeng/AppThinning/releases)下载安装包.

## 特性

- 自动压缩 jpg, png, jpeg, gif, svg 等文件。
- 自动忽略已压缩过的文件。
- 支持 imageOptim 和 tinyPng 工具选择。
- 支持自定义文件大小范围。

## 要求

- 使用前请检查 node 环境, 如果没有安装, 可以访问 https://nodejs.org/ 进行下载安装。

```bash
node -v
```

- 如果你想使用 imageOptim 工具压缩图片，请先访问 [imageOptim 官网](https://imageoptim.com/mac) 下载安装。

## 安装

### 简单方法 (推荐)

```bash
npm i appthinning -g
```

### 源码安装

```bash
git clone git@github.com:CatchZeng/AppThinning.git ~/Downloads/AppThinning && cd ~/Downloads/AppThinning && npm i && npm i -g
```

或者

- 克隆项目

```bash
git clone git@github.com:CatchZeng/AppThinning.git
```

- 安装依赖

```bash
npm i
```

- 安装 appthinning

```bash
cd path/to/AppThinning
npm i -g
```

## 使用

```bash
appthinning -d "/Users/catchzeng/Desktop/test" -t "png|jpg" -s 1000 -m 2000 -c imageOptim
```

```bash
appthinning -h
   __ _   _ __    _ __   | |_  | |__   (_)  _ __    _ __   (_)  _ __     __ _
  / _` | | '_ \  | '_ \  | __| | '_ \  | | | '_ \  | '_ \  | | | '_ \   / _` |
 | (_| | | |_) | | |_) | | |_  | | | | | | | | | | | | | | | | | | | | | (_| |
  \__,_| | .__/  | .__/   \__| |_| |_| |_| |_| |_| |_| |_| |_| |_| |_|  \__, |
         |_|     |_|                                                    |___/
Usage: appthinning [options]

Options:
  -V, --version            output the version number
  -d, --dir <String>       项目所在目录
  -t, --types <String>     文件类型, 默认是 jpg|png|jpeg|gif|svg
  -s, --size <Number>      文件的最小值, 默认是 100, 表示 100 k
  -m, --maxSize<Number>    文件的最大值, 默认是没有限制
  -c, --compress <String>  压缩工具的类型，包括：imageOptim, tinyPng, 默认是 imageOptim
  -k, --key <String>       tinyPng 的 key 值, 可从 https://tinypng.com/developers 获取
  -i, --ignore <String>    忽略的文件, 默认是从 appthinning_ignore 读取. 使用 '|' 分割, 如：a.png|/user/ss/b.png|c.png
  -h, --help               output usage information
```
