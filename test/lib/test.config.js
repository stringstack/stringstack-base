'use strict';

class SetupTestConfigComponent {

  constructor( deps ) {

    this._nconf = deps.get( 'config' );

    this._nconf.defaults( {
      stringstack: {
        base: SetupTestConfigComponent.defaultConfig
      }
    } );

  }

  init( done ) {

    // NO-OP
    done();

  }

  dinit( done ) {

    // NO-OP
    done();

  }

}

SetupTestConfigComponent.defaultConfig = {};

module.exports = SetupTestConfigComponent;
