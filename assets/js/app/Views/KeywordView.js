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
        console.log("KeywordView"," init");
        this.el = document.getElementById('keyword_configuration');
        this.input = this.el.querySelector('.keyword-entry');
        this.template = Handlebars.compile(Template);
        //PubSub.subscribe('repo:store:set', this.render.bind(this) );

        this.delegateEvts();
      },
      delegateEvts(){
        //console.log("delegateEvts:");
        this.el.addEventListener('click',function(e){
          e.preventDefault();
          let keyword = this.input.value;
          if(RE_UPDATE_BTN.test(e.target.className)){
            console.log('click ',keyword);

            PubSub.publish('keyword:update',keyword);
          }
        }.bind(this),false);
      },
      render(models=[]) {
        //console.log("KeywordView"," render: ", models);
        this.el.innerHTML = this.template(models);
      }
    }

    return _View

  });
