'use strict';

const assert = require( 'assert' );
const async = require( 'async' );
const SetupTestConfigComponent = require( './lib/test.config' );
const StringStack = require( 'stringstack' );

// lets you pull a component from the stack, do not use this pattern of accessing _loader outside of testing
let getComponentNative = function ( app, targetPath ) {
  return app._loader.get( 'app', targetPath );
};

describe( 'stringstack', function () {
  describe( 'base', function () {

    it( 'should instantiate, init and dinit', function ( done ) {

      let app = null;
      let component = null;

      async.series( [
        ( done ) => {

          try {

            // Set config for each test like this. Do it before you call new StringStackCode();
            SetupTestConfigComponent.defaultConfig = {};

            // See documentation on how to use core to manage all your components:
            // https://www.npmjs.com/package/@stringstack/core
            let core = new StringStack();

            const App = core.createApp( {
              rootComponents: [
                './test/lib/test.config', // Ensures config loads before your component
                './index' // Includes your component
              ]
            } );

            app = new App( 'test' ); // Instantiates all dependencies

            component = getComponentNative( app, './index' );

            assert( component, 'component should be available' );

          } catch ( e ) {
            return done( e );
          }

          done();

        },
        ( done ) => {

          try {

            // do not use the pattern of accessing _config externally outside of testing
            assert.strictEqual( component._config, null, 'component config should be null' );

          } catch ( e ) {
            return done( e );
          }

          done();

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

            assert.equal( JSON.stringify( component._config, null, 4 ),
              JSON.stringify( SetupTestConfigComponent.defaultConfig, null, 4 ),
              'component config should be set' );

          } catch ( e ) {
            return done( e );
          }

          done();

        },
        ( done ) => {
          try {
            app.dinit( done ); // D-initializes all dependencies
          } catch ( e ) {
            return done( e );
          }
        },
        ( done ) => {

          try {

            assert.strictEqual( component._config, null, 'component config should be null' );

          } catch ( e ) {
            return done( e );
          }

          done();

        }
      ], done );

    } );

    // create more tests for your component. you should have lots
    it( 'should ...', function () {

    } );


  } );
} );
