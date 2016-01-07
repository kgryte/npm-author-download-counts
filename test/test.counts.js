'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var counts = require( './../lib/counts.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof counts === 'function', 'export is a function' );
	t.end();
});

test( 'function returns an error to a provided callback if an error is encountered when fetching package download counts', function test( t ) {
	var counts;
	var opts;

	counts = proxyquire( './../lib/counts.js', {
		'./factory.js': factory
	});

	opts = getOpts();
	counts( opts, done );

	function factory( opts, clbk ) {
		return function counts() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( new Error( 'beep' ) );
			}
		};
	}

	function done( error ) {
		t.ok( error instanceof Error, 'error instance' );
		t.equal( error.message, 'beep' );
		t.end();
	}
});

test( 'function returns package download counts to a provided callback', function test( t ) {
	var expected;
	var counts;
	var opts;

	counts = proxyquire( './../lib/counts.js', {
		'./factory.js': factory
	});

	expected = data;

	opts = getOpts();
	counts( opts, done );

	function factory( opts, clbk ) {
		return function list() {
			setTimeout( onTimeout, 0 );
			function onTimeout() {
				clbk( null, data );
			}
		};
	}

	function done( error, data ) {
		assert.deepEqual( data, expected );
		t.ok( true, 'deep equal' );
		t.end();
	}
});
