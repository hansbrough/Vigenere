//Define an AMD module

define([
  'mixins/PubSub',
  'app/KeywordConfiguration',
  'app/Views/KeywordView',
  'app/Views/EncodingView'
  ],
  function (PubSub, Keyword, KeywordView, EncodingView) {
    //note: using a object composition pattern to mixin 'Keyword' methods w/the 'App' object
    let _App  = Object.assign({
      el:'.app-content',

      init(options){
        this.views = {keyword:Object.create(KeywordView), encoding:Object.create(EncodingView)};

        //start views
        for(i in this.views){
          this.views[i].init()
        }

        //mediate some events
        //when there is a new keyword entered by user.
        PubSub.subscribe('keyword:update', (keyword) => {
          keyword = this.sanitizeKeyword(keyword);
          this.setKeywordOffsets(keyword);
          let offsets = this.getKeywordOffsets();
          let offset = this.getCurrentOffset();
          let encodedDictionary = this.getEncodedDictionary(offset);//always first offset w/new keyword
          PubSub.publish('cipher:update',{keyword,offsets});
          PubSub.publish('dictionary:encoding:updated', encodedDictionary);
        });
        //when a character in the source text has been typed
        PubSub.subscribe('source:character:click', (char) => {
          let offset = this.getCurrentOffset();
          let encodedChar = this.getCharacterEncoding(char, offset);
          this.incrementCurrentOffsetIndex();

          let nextOffset = this.getCurrentOffset();
          let encodedDictionary = this.getEncodedDictionary(nextOffset);
          PubSub.publish('dictionary:encoding:updated', encodedDictionary);
          PubSub.publish('source:character:encoded', encodedChar);
        });
        //when the message has been cleared by user-output
        PubSub.subscribe('source:text:reset', () => {
          this.resetCurrentOffsetIndex();
        });
      }
    }, Keyword);

  return _App;
});
