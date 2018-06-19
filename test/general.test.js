'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const SetupTestConfigComponent = require( './lib/test.config' );
const StringStackCore = require( '@stringstack/core' );


describe( 'stringstack', function () {
  describe( 'base', function () {

    it( 'should instantiate, init and dinit', function ( done ) {

      let app = null;

      async.series( [
        ( done ) => {

          try {

            // Set config for each test like this. Do it before you call new StringStackCode();
            SetupTestConfigComponent.defaultConfig = {};

            // See documentation on how to use core to manage all your components:
            // https://www.npmjs.com/package/@stringstack/core
            let core = new StringStackCore();

            const App = core.createApp( {
              rootComponents: [
                './test/lib/test.config', // Ensures config loads before your component
                './index' // Includes your component
              ]
            } );

            app = new App( 'test' ); // Instantiates all dependencies

            done();

          } catch ( e ) {
            return done( e );
          }

        },
        ( done ) => {
          try {
            app.init( done ); // Initializes all dependencies
          } catch ( e ) {
            return done( e );
          }
        },
        ( done ) => {
          try {
            app.dinit( done ); // D-initializes all dependencies
          } catch ( e ) {
            return done( e );
          }
        }
      ], done );

    } );

    // create more tests for your component. you should have lots
    it( 'should ...', function () {

    } );


  } );
} );