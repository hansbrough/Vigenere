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
        this.template = Handlebars.compile(Template);
        //PubSub.subscribe('repo:store:set', this.render.bind(this) );

        this.delegateEvts();
      },
      delegateEvts(){
        //console.log("delegateEvts:");
        this.el.addEventListener('click',function(e){
          e.preventDefault();

          if(RE_UPDATE_BTN.test(e.target.className)){
            console.log('click')

            PubSub.publish('repo:item:click',e.target);
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
