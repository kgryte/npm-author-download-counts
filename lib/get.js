'use strict';

// MODULES //

var list = require( 'npm-list-author-packages' );
var counts = require( 'npm-package-download-counts' );


// GET //

/**
* FUNCTION: get( options, clbk )
*	Gets package download counts.
*
* @param {Object} options - query options
* @param {String} options.username - author username
* @param {String} options.period - query period
* @returns {Void}
*/
function get( options, clbk ) {
	var opts = {};
	opts.username = options.username;
	list( opts, onList );

	/**
	* FUNCTION: onList( error, pkgs )
	*	Callback invoked upon receiving a list of packages.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {String[]} pkgs - list of packages
	* @returns {Void}
	*/
	function onList( error, pkgs ) {
		var opts;
		if ( error ) {
			return clbk( error );
		}
		opts = {};
		opts.packages = pkgs;
		opts.period = options.period;
		counts( opts, onCounts );
	} // end FUNCTION onList()

	/**
	* FUNCTION: onCounts( error, counts )
	*	Callback invoked upon receiving download counts.
	*
	* @private
	* @param {Error|Null} error - error object
	* @param {Object[]} counts - download counts
	* @returns {Void}
	*/
	function onCounts( error, counts ) {
		if ( error ) {
			return clbk( error );
		}
		clbk( null, counts );
	} // end FUNCTION onCounts()
} // end FUNCTION get()


// EXPORTS //

module.exports = get;
