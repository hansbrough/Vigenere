define(['app/KeywordConfiguration'], function(Keyword){

    describe("KeywordConfiguration", function() {

      it("should encode the default dictionary", function() {
        Keyword.setKeywordOffsets('snake');
        expect( Keyword.getEncodedDictionary(13) ).toEqual(['n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m']);
      });

      it("should get the correct offset array", function() {
        Keyword.setKeywordOffsets('snake');
        expect( Keyword.getKeywordOffsets() ).toEqual([ 18, 13, 0, 10, 4 ]);
      });

      it("should get the current offset value", function() {
        Keyword.setKeywordOffsets('snake');
        expect( Keyword.getCurrentOffset() ).toBe(18);
      });

      it("should encode the letter 'c' correctly", function() {
        Keyword.setKeywordOffsets('snake');
        expect( Keyword.getCharacterEncoding('c') ).toBe('u');
      });

      it("should increment the current offset index", function() {
        Keyword.setKeywordOffsets('snake');
        Keyword.incrementCurrentOffsetIndex();
        expect( Keyword.currentOffsetIndex ).toBe(1);
      });

      it("should reset the current offset index to 0", function() {
        Keyword.setKeywordOffsets('snake');
        Keyword.incrementCurrentOffsetIndex();
        Keyword.resetCurrentOffsetIndex();
        expect( Keyword.currentOffsetIndex ).toBe(0);
      });

    });

});
