//AMD module
//View for the keyword configuration section

define([
  'mixins/PubSub',
  'handlebars',
  'text!'+_baseUrl+'/assets/js/app/templates/keyword.tmpl?noext',
],
  function (PubSub, Handlebars, Template) {
    //note: some or all of these constants could be passed in to view as part of a configuration
    const RE_UPDATE_BTN   = /update-keyword/;
    const RE_ENTRY        = /keyword-entry/;
    const RE_SANITIZE     = /[^a-z+]+/gi;
    const CSS_UPDATE_BTN  = '.update-keyword';
    const CSS_PARENT      = 'keyword_configuration';
    const CSS_ENTRY       = '.keyword-entry';
    const CSS_TABLE       = '.keyword-offset-table';
    const CSS_CHARS       = '.keyword-chars';
    const CSS_OFFSET      = '.offset-chars';
    const CSS_ACTIVE      = 'active';
    const CSS_DISABLED    = 'disabled';
    const CSS_ROW         = 'row';
    const CSS_ERR         = 'error';

    let _View = {
      init() {
        this.el     = document.getElementById(CSS_PARENT);
        this.input  = this.el.querySelector(CSS_ENTRY);
        this.btn    = this.el.querySelector(CSS_UPDATE_BTN);
        this.template = Handlebars.compile(Template);
        //listen for pertinent evts from other objects
        PubSub.subscribe('cipher:update', this.render.bind(this) );
        PubSub.subscribe('keyword:offset_index:update', (idx) => this.updateActive(idx));

        this.delegateEvts();
      },
      delegateEvts(){
        this.el.addEventListener('click',function(e){
          e.preventDefault();
          let keyword = this.input.value.replace(RE_SANITIZE,'');
          if(RE_UPDATE_BTN.test(e.target.className)){
            if(this.validate(keyword)){
              this.input.value = keyword.toUpperCase();
              PubSub.publish('keyword:update',keyword);
            }
          }
        }.bind(this),false);

        this.el.addEventListener('keyup',function(e){
          let keyword = this.input.value.replace(RE_SANITIZE,'');
          if(RE_ENTRY.test(e.target.className)){
            if(this.validate(keyword)){
              this.el.classList.remove(CSS_ERR);
              this.btn.classList.remove(CSS_DISABLED);
            }else{
              this.el.classList.add(CSS_ERR);
              this.btn.classList.add(CSS_DISABLED);
            }
          }
        }.bind(this),false);
      },
      render(cipher={}) {
        if( !Array.isArray(cipher.keyword) ){
          cipher.keyword = cipher.keyword.split('');
        }
        this.el.querySelector(CSS_TABLE).innerHTML = this.template(cipher);
        this.updateActive(0);
      },
      updateActive(idx){
        //unset any previously active child nodes in both rows.
        [...this.el.getElementsByClassName(CSS_ROW)].forEach(
          (node) => {
            [...node.childNodes].forEach((child) => child.classList.remove(CSS_ACTIVE))
          }
        );
        this.el.querySelector(CSS_CHARS).childNodes[idx].classList.add(CSS_ACTIVE);
        this.el.querySelector(CSS_OFFSET).childNodes[idx].classList.add(CSS_ACTIVE);
      },
      validate(str){
        let len = str.length;
        return (len >= 3 && len <= 8);
      }
    }

    return _View

  });
