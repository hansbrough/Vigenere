//AMD module
//View for the keyword configuration section

define([
  'mixins/PubSub',
  'handlebars',
  'text!'+_baseUrl+'/assets/js/app/templates/keyword.tmpl?noext',
],
  function (PubSub, Handlebars, Template) {
    const RE_UPDATE_BTN  = /update-keyword/;


    let _View = {
      init() {
        //console.log("KeywordView"," init");
        this.el = document.getElementById('keyword_configuration');
        this.input = this.el.querySelector('.keyword-entry');
        this.template = Handlebars.compile(Template);
        PubSub.subscribe('cipher:update', this.render.bind(this) );

        this.delegateEvts();
      },
      delegateEvts(){
        //console.log("delegateEvts:");
        this.el.addEventListener('click',function(e){
          e.preventDefault();
          let keyword = this.input.value;
          if(RE_UPDATE_BTN.test(e.target.className)){
            PubSub.publish('keyword:update',keyword);
          }
        }.bind(this),false);
      },
      render(cipher={}) {
        //console.log("KeywordView"," cipher: ", cipher);
        if( !Array.isArray(cipher.keyword) ){
          cipher.keyword = cipher.keyword.split('');
        }
        this.el.querySelector('.keyword-offset-table').innerHTML = this.template(cipher);
      }
    }

    return _View

  });
