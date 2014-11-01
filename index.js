var FeedParser = require( 'feedparser' ),
    request = require( 'request' ),
    MyactStreamTransform = require( 'myact-stream-transform' ),
    Provider = require( 'myact-provider' );

var MyactRSSProvider = module.exports = function( options ) {
    Provider.apply( this, arguments );
};

MyactRSSProvider.prototype = Object.create( Provider.prototype );

MyactRSSProvider.prototype.invoke = function() {
    var config = this.options.agent.config,
        self = this;

    if ( 'undefined' === typeof config.url ) {
        return;
    }

    request( config.url )
        .pipe( new FeedParser() )
        .pipe( new MyactStreamTransform( 'guid' ) )
        .on( 'data', function( item ) {
            self.emit( 'item', item );
        });
};