<p align="center">
<img src="https://github.com/CatchZeng/AppThinning/raw/master/logo.jpg" alt="AppThinning" title="AppThinning" width="200"/>
</p>

## AppThinning

Make app thinner.

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/effect.gif)

## Features

- Support jpg、png、jpeg、gif、svg.
- Auto ignore compressed files.
- Support imageOptim and tinyPng.
- Support file size limit range.

## Install

- Clone this repo

```
git clone git@github.com:CatchZeng/AppThinning.git
```

- Check the node environment, if not installed, you can visit https://nodejs.org/ to download the installation package.

```
node -v
```

- Install dependencies

```
npm i
```

- Install [imageOptim](https://imageoptim.com/mac) if you need use it to compress images.

- Install appthinning

```
$ cd path/to/AppThinning
$ npm install -g
```

## Usage

```
appthinning -d "/Users/catchzeng/Desktop/test" -t "png|jpg" -s 1000 -m 2000 -c imageOptim
```

```
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
