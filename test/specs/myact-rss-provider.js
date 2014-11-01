var MyactProvider = require( 'myact-provider' ),
    expect = require( 'chai' ).expect,
    MyactRSSProvider = require( '../../' );

describe( 'MyactRSSProvider', function() {
    var provider;
    before(function() {
        provider = new MyactRSSProvider({
            agent: { config: { url: 'http://www.andrewduthie.com/feed.xml' } }
        });
    });

    it( 'should extend MyactProvider', function() {
        expect( provider ).to.be.an.instanceof( MyactProvider );
    });

    it( 'should run on an interval', function() {
        expect( provider.interval ).to.be.true;
    });

    it( 'should emit rss feed items when invoked', function( done ) {
        provider.on( 'item', function( item ) {
            expect( item.key ).to.exist;
            expect( item.data ).to.be.an( 'object' );
            expect( item.data.title ).to.be.a( 'string' );

            done();
            provider.removeAllListeners( 'item' );
        });

        provider.invoke();
    });

    it( 'should use the guid value as the key', function( done ) {
        provider.on( 'item', function( item ) {
            expect( item.key ).to.equal( item.data.guid );

            done();
            provider.removeAllListeners( 'item' );
        });

        provider.invoke();
    });
});