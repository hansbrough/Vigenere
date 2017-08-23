//Define an AMD module

define([
  'mixins/PubSub',
  'app/KeywordConfiguration',
  'app/Views/KeywordView'
  ],
  function (PubSub, Keyword, KeywordView) {

    let _App  = Object.assign({
      el:'.app-content',

      init(options){
        this.views = {keyword:Object.create(KeywordView)};
        //console.log("toCipherChar('l', 4) = ",this.toCipherChar('l', 4))

        //start views
        for(i in this.views){
          this.views[i].init()
        }

        //mediate some events
        PubSub.subscribe('keyword:update', this.getKeywordOffsets.bind(this));
        

      }
    }, Keyword);

  return _App;
});
