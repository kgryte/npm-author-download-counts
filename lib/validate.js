'use strict';

// MODULES //

var isObject = require( 'validate.io-object' );
var isString = require( 'validate.io-string-primitive' );


// VALIDATE //

/**
* FUNCTION: validate( opts, options )
*	Validates function options.
*
* @param {Object} opts - destination object
* @param {Object} options - options to validate
* @param {String} options.username - author username
* @param {String} [options.period] - query period
* @returns {Error|Null} error or null
*/
function validate( opts, options ) {
	if ( !isObject( options ) ) {
		return new TypeError( 'invalid input argument. Options argument must be an object. Value: `' + options + '`.' );
	}
	opts.username = options.username;
	if ( !isString( opts.username ) ) {
		return new TypeError( 'invalid option. Username option must be a string. Option: `' + opts.username + '`.' );
	}
	if ( options.hasOwnProperty( 'period' ) ) {
		opts.period = options.period;
		if ( !isString( opts.period ) ) {
			return new TypeError( 'invalid option. Period option must be a string. Option: `' + opts.period + '`.' );
		}
	}
	return null;
} // end FUNCTION validate()


// EXPORTS //

module.exports = validate;
