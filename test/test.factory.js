'use strict';

// MODULES //

var test = require( 'tape' );
var assert = require( 'chai' ).assert;
var proxyquire = require( 'proxyquire' );
var noop = require( '@kgryte/noop' );
var factory = require( './../lib/factory.js' );


// FIXTURES //

var getOpts = require( './fixtures/opts.js' );
var data = require( './fixtures/results.json' );


// TESTS //

test( 'file exports a function', function test( t ) {
	t.ok( typeof factory === 'function', 'export is a function' );
	t.end();
});

test( 'function throws an error if provided an invalid option', function test( t ) {
	t.throws( foo, TypeError, 'invalid options argument' );
	t.throws( bar, TypeError, 'invalid option' );
	t.end();

	function foo() {
		factory( null, noop );
	}
	function bar() {
		factory( {'packages':null}, noop );
	}
});

test( 'the function throws if provided a callback argument which is not a function', function test( t ) {
	var values;
	var opts;
	var i;

	values = [
		'5',
		5,
		NaN,
		null,
		undefined,
		true,
		[],
		{}
	];

	opts = getOpts();
	for ( i = 0; i < values.length; i++ ) {
		t.throws( badValue( values[i] ), TypeError, 'throws a type error when provided ' + values[i] );
	}
	t.end();

	function badValue( value ) {
		return function badValue() {
			factory( opts, value );
		};
	}
});

test( 'function returns a function', function test( t ) {
	t.equal( typeof factory( getOpts(), noop ), 'function', 'returns a function' );
	t.end();
});

test( 'function supports specifying a query period', function test( t ) {
	var factory;
	var opts;
	var fcn;

	factory = proxyquire( './../lib/factory.js', {
		'./get.js': get
	});

	opts = getOpts();
	opts.period = '2015-12-01:2016-01-01';

	fcn = factory( opts, noop );
	fcn();

	function get( options ) {
		t.equal( options.period, opts.period, 'equal query periods' );
		t.end();
	}
});

test( 'function returns a function which returns an error to a provided callback if an error is encountered when fetching package download counts', function test( t ) {
	var factory;
	var counts;
	var opts;

	factory = proxyquire( './../lib/factory.js', {
		'./get.js': get
	});

	opts = getOpts();
	counts = factory( opts, done );
	counts();

	function get( opts, clbk ) {
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

test( 'function returns a function which returns package download counts to a provided callback', function test( t ) {
	var expected;
	var factory;
	var counts;
	var opts;

	factory = proxyquire( './../lib/factory.js', {
		'./get.js': get
	});

	expected = data;

	opts = getOpts();
	counts = factory( opts, done );
	counts();

	function get( opts, clbk ) {
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
