Author Downloads
===
[![NPM version][npm-image]][npm-url] [![Build Status][build-image]][build-url] [![Coverage Status][coverage-image]][coverage-url] [![Dependencies][dependencies-image]][dependencies-url]

> Get an author's package download counts.


## Installation

``` bash
$ npm install npm-author-download-counts
```


## Usage

``` javascript
var counts = require( 'npm-author-download-counts' );
```

<a name="counts"></a>
#### counts( options, clbk )

Get an author's package download counts.

``` javascript
var opts = {
	'username': 'kgryte'
};

counts( opts, clbk );

function clbk( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
	/*
		[
			{
				"package": "app-boot",
				"data": [
					["2015-12-01T00:00:00.000Z",3295],
					["2015-12-02T00:00:00.000Z",5498],
					["2015-12-03T00:00:00.000Z",4771],
					...
				]
			},
			{
				"package": "app-etc",
				"data": [
					["2015-12-01T00:00:00.000Z",1003],
					["2015-12-02T00:00:00.000Z",809],
					["2015-12-03T00:00:00.000Z",946],
					...
				]
			},
			...
		]
	*/
}
```

The `function` accepts the following `options`:
*	__username__: author username (*required*).
*	__period__: query period. May be either a keyword (e.g., `'last-month'`, `'last-week'`, `'last-day'`) or a date range (e.g., `'2015-12-01:2016-01-01'`). Default: `'last-month'`.

By default, the `function` returns daily downloads for the last month. To return daily downloads for an alternative period, set the `period` option.

``` javascript
var opts = {
	'username': 'kgryte',
	'period': '2015-11-01:2015-12-31'
};

counts( opts, clbk );
```


#### counts.factory( options, clbk )

Creates a reusable `function`.

``` javascript
var get = counts.factory( {'username':'kgryte'}, clbk );

get();
get();
get();
// ...
```

The factory method accepts the same `options` as [`counts()`](#counts).


## Notes

*	If the module encounters an application-level `error` (e.g., no network connection, malformed request, etc), that `error` is returned immediately to the provided `callback`.
*	Time values are in simplified ISO format ([ISO 8601][iso-8601]).
*	A query `period` is __not__ sanity checked. If counts are expected, ensure that the provided `period` is of the appropriate format and/or a recognized value.


## Examples

``` javascript
var counts = require( 'npm-author-download-counts' );

var opts = {
	'username': 'kgryte'
};

counts( opts, onCounts );

function onCounts( error, data ) {
	if ( error ) {
		throw error;
	}
	console.dir( data );
}
```

To run the example code from the top-level application directory,

``` bash
$ DEBUG=* node ./examples/index.js
```


---
## CLI

### Installation

To use the module as a general utility, install the module globally

``` bash
$ npm install -g npm-author-download-counts
```


### Usage

``` bash
Usage: apkgcounts [options] username

Options:

  -h,  --help                 Print this message.
  -V,  --version              Print the package version.
       --period period        Query period. May be either a keyword (e.g.,
                              'last-month','last-week','last-day') or a date
                              range (e.g., '2015-12-01:2016-01-01'). Default:
                              'last-month'.
       --format format        Output format: csv or json. Default: 'csv'.
       --delimiter delimiter  CSV column delimiter. Default: ','.
```


### Notes

*	If the output format is [`csv`][csv] and the process is unable to resolve counts, the process will write an `error` message to `stderr` and will __not__ generate [CSV][csv] output.


### Examples

``` bash
$ DEBUG=* apkgcounts kgryte
# => time,app-boot,app-etc
# => 2015-12-01T00:00:00.000Z,3295,1003
# => 2015-12-02T00:00:00.000Z,5498,809
# => 2015-12-03T00:00:00.000Z,4771,946
# => ...
```

To output as newline-delimited JSON ([ndjson][ndjson]), set the `format` option.

``` bash
$ DEBUG=* apkgcounts --format=json kgryte
# => {"app-boot":[[...],[...],...]}
# => {"app-etc":[[...],[...],...]}
```


---
## Tests

### Unit

This repository uses [tape][tape] for unit tests. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul][istanbul] as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


### Browser Support

This repository uses [Testling][testling] for browser testing. To run the tests in a (headless) local web browser, execute the following command in the top-level application directory:

``` bash
$ make test-browsers
```

To view the tests in a local web browser,

``` bash
$ make view-browser-tests
```

<!-- [![browser support][browsers-image]][browsers-url] -->


---
## License

[MIT license](http://opensource.org/licenses/MIT).


## Copyright

Copyright &copy; 2016. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/npm-author-download-counts.svg
[npm-url]: https://npmjs.org/package/npm-author-download-counts

[build-image]: http://img.shields.io/travis/kgryte/npm-author-download-counts/master.svg
[build-url]: https://travis-ci.org/kgryte/npm-author-download-counts

[coverage-image]: https://img.shields.io/codecov/c/github/kgryte/npm-author-download-counts/master.svg
[coverage-url]: https://codecov.io/github/kgryte/npm-author-download-counts?branch=master

[dependencies-image]: http://img.shields.io/david/kgryte/npm-author-download-counts.svg
[dependencies-url]: https://david-dm.org/kgryte/npm-author-download-counts

[dev-dependencies-image]: http://img.shields.io/david/dev/kgryte/npm-author-download-counts.svg
[dev-dependencies-url]: https://david-dm.org/dev/kgryte/npm-author-download-counts

[github-issues-image]: http://img.shields.io/github/issues/kgryte/npm-author-download-counts.svg
[github-issues-url]: https://github.com/kgryte/npm-author-download-counts/issues

[tape]: https://github.com/substack/tape
[istanbul]: https://github.com/gotwarlost/istanbul
[testling]: https://ci.testling.com

[csv]: https://en.wikipedia.org/wiki/Comma-separated_values
[ndjson]: https://github.com/ndjson/ndjson-spec
[iso-8601]: http://en.wikipedia.org/wiki/ISO_8601
