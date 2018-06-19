'use strict';

// doublescore isn't explicitly required, but it is a simple, lite weight utility we really love.
const __ = require( 'doublescore' );

// Set a default config for your component.
let defaultConfig = {};

class BaseComponent {

  constructor( deps ) {

    // Tell StringStack/core you are dependent on config, so config initializes before your component.
    this._nconf = deps.get( 'config' );

    // Explicitly set your config to null is a nice way for your component to know if its initialized.
    this._config = null;

  }

  init( done ) {

    // Now that config is fully initialized, your config is ready. Store it for the lifetime of your component.
    this._config = __( defaultConfig ).mixin( this._nconf.get( 'stringstack:base' ) );

    // Maybe check if config is sane. If not, return an Error to done. Its a good idea, but your choice to check.

    done();

  }

  dinit( done ) {

    // Explicitly set your config to null to indicate it is no longer initialized.
    this._config = null;

    done();

  }

  // Implement all the methods that make your component special.
  // If the method should only be called after initialization, make sure you check if config is null.
  doSomething( done ) {

    if ( this._config === null ) {
      return done( new Error( 'not initialized' ) );
    }

    done( null, 'magic!' );

  }

}

module.exports = BaseComponent;
