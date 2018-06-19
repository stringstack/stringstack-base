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

    done();

  }

  dinit( done ) {

    done();

  }

}

SetupTestConfigComponent.defaultConfig = {};

module.exports = SetupTestConfigComponent;
