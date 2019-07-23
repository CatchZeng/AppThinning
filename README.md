# AppThinning

<p align="center"><img src="https://github.com/CatchZeng/AppThinning/raw/master/logo.png" alt="AppThinning" title="AppThinning" width="200"/></p>

[中文请戳](https://github.com/CatchZeng/AppThinning/blob/master/README_CN.md)

[![NPM version](https://img.shields.io/npm/v/appthinning.svg)](https://www.npmjs.com/package/appthinning)

> Make app thinner. Help you find large files and compress png, gif, jpg, svg files.

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/effect.gif)

## Desktop Version

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/desktop.gif)

You can download from [releases](https://github.com/CatchZeng/AppThinning/releases).

## Features

- Compress jpg, png, jpeg, gif, svg automatically.
- Auto ignore compressed files.
- Support imageOptim and tinyPng.
- Custom file size limit range.

## Requirement

- Check the node environment, if not installed, you can visit https://nodejs.org/ to download the installation package.

```bash
node -v
```

- Install [imageOptim](https://imageoptim.com/mac) if you need use it to compress images.

## Install

### Easy way (install from npm package)

```bash
npm i appthinning -g
```

### Another way (install from source)

```bash
git clone git@github.com:CatchZeng/AppThinning.git ~/Downloads/AppThinning && cd ~/Downloads/AppThinning && npm i && npm i -g
```

or

- Clone this repo

```bash
git clone git@github.com:CatchZeng/AppThinning.git
```

- Install dependencies

```bash
npm i
```

- Install appthinning

```bash
cd path/to/AppThinning
npm i -g
```

## Usage

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
  -d, --dir <String>       project directory.
  -t, --types <String>     file types, default is jpg|png|jpeg|gif|svg.
  -s, --size <Number>      file size, the default is 100, 100 k
  -m, --maxSize<Number>    file max size, default is unlimited.
  -c, --compress <String>  compression types including imageOptim, tinyPng, default is imageOptim.
  -k, --key <String>       tinyPng key get from https://tinypng.com/developers. default is the DefaultTinyPngKey read from src/config/index.js. You can set it up to use tinyPng easily.
  -i, --ignore <String>    ignored files, default is read from appthinning_ignore file. split by '|', such as a.png|/user/ss/b.png|c.png .
  -h, --help               output usage information
```
