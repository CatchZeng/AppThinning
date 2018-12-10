## AppThinning

Make app thinner.

![AppThinning](https://github.com/CatchZeng/AppThinning/raw/master/effect.gif)

## Usage

- clone this repo

```
git clone git@github.com:CatchZeng/AppThinning.git
```

- check the node environment, if not installed, you can visit https://nodejs.org/ to download the installation package.

```
node -v
```

- install dependencies

```
npm i
```

- install [imageOptim](https://imageoptim.com/mac) if you need to use it to compress images.

- run script

```
node index.js -d "/Users/catchzeng/Desktop/test" -t "png|jpg" -s 1000 -m 2000 -c imageOptim
```

```
node index.js -h
Usage: index [options]

Options:
  -V, --version            output the version number
  -d, --dir <String>       project directory.
  -t, --types <String>     file types, default is jpg|png|jpeg|gif|svg.
  -s, --size <Number>      file size, the default is 100, 100 k
  -m, --maxSize<Number>    file max size, default is unlimited.
  -c, --compress <String>  compression types including imageOptim, tinyPng, default is imageOptim.
  -k, --key <String>       tinyPng key.
  -i, --ignore <String>    ignored files, default is read from ignore.txt. split by '|', such as a.png|/user/ss/b.png|c.png .
  -h, --help               output usage information
```
