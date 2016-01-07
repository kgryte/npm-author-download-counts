'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var get = require( './../lib/get.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof get === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching an author\'s packages', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'npm-list-author-packages': list,
		'npm-package-download-counts': noop
	});

	opts = getOpts();
	get( opts, done );

	function list( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'beep' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns an error to a provided callback if an error is encountered when fetching download counts', function test( t ) {
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'npm-list-author-packages': list,
		'npm-package-download-counts': counts
	});

	opts = getOpts();
	get( opts, done );

	function list( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, ['beep','boop'] );
		}
	}

	function counts( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( new Error( 'oh no!' ) );
		}
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'oh no!' );
		t.end();
	}
});

test( 'function returns package download counts to a provided callback', function test( t ) {
	var expected;
	var opts;
	var get;

	get = proxyquire( './../lib/get.js', {
		'npm-list-author-packages': list,
		'npm-package-download-counts': counts
	});

	expected = data;

	opts = getOpts();
	get( opts, done );

	function list( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, ['beep','boop'] );
		}
	}

	function counts( opts, clbk ) {
		setTimeout( onTimeout, 0 );
		function onTimeout() {
			clbk( null, data );
		}
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
