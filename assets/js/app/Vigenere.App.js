//Define an AMD module

define([
  'mixins/PubSub',
  'app/KeywordConfiguration',
  'app/Views/KeywordView'
  ],
  function (PubSub, Keyword, KeywordView) {

    let _App  = {
      el:'.app-content',

      init(options){
        this.views = {keyword:Object.create(KeywordView)};

        //start views
        for(i in this.views){
          this.views[i].init()
        }

        Keyword.init();

        //mediate some events
        //PubSub.subscribe('repo:item:click', _CMTS.add );
        //PubSub.subscribe('search:input:entered', _ORG.add );
        /*
        PubSub.subscribe('org:store:set', (model) => {
          _RPS.add(model.repos_url);
        });
        */
        //PubSub.subscribe('sort:by',_RPS.sort);

      }
    };

  return _App;
});
