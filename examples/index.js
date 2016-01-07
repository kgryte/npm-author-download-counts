'use strict';

var counts = require( './../lib' );

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
