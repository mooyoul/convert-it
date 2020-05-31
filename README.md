# convert-it

[![Github Pages Status](https://github.com/mooyoul/convert-it/workflows/gh-pages/badge.svg)](https://github.com/mooyoul/geo-pattern/actions)
[![Renovate enabled](https://img.shields.io/badge/renovate-enabled-brightgreen.svg)](https://renovatebot.com/)
[![MIT license](http://img.shields.io/badge/license-MIT-blue.svg)](http://mooyoul.mit-license.org/)

Convert files to UTF-8 without specifying source charset in Browser,
without sending data to remote server! 

## Live Demo

https://mooyoul.github.io/convert-it/

## What is this?

convert-it is simple application which automatically detects the source charset,
and convert to UTF-8.

Entire processes are fully executed in Browser environment, 
which means that client doesn't have to send content data to remote server to convert charset.

## Why? There already `iconv` CLI exists.  

Just for fun. Also, I wanted to have more experience with brand new React Hooks. That's all.  


## Getting Started

```bash
$ git clone https://github.com/mooyoul/convert-it.git
$ cd convert-it
$ npm ci
$ npm run dev # for development
$ npm run build # for development build
$ npm run build:prod # for productiomn build
```

## Wishlists

- Support target charset modification (e.g. UTF-8 to EUC-KR)

## License
[MIT](LICENSE)

See full license on [mooyoul.mit-license.org](http://mooyoul.mit-license.org/)

