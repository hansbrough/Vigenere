//AMD module
//View for the character encoding section

define([
  'mixins/PubSub',
  'handlebars',
  'text!'+_baseUrl+'/assets/js/app/templates/encoding.tmpl?noext',
],
  function (PubSub, Handlebars, Template) {
    //note: some or all of these constants could be passed in to view as part of a configuration
    const RE_CHAR_BTN   = /SPAN/;
    const CSS_PARENT    = 'msg_encoding';
    const CSS_BTNS      = '.character-buttons';
    const CSS_E_TXT     = '.encoded-text';
    const CSS_S_TXT     = '.source-text';
    const CSS_CLEAR     = '.clear-source';
    const CSS_E_DICT    = '.character-encoding';


    let _View = {
      init() {
        this.el           = document.getElementById(CSS_PARENT);
        this.charTable    = this.el.querySelector(CSS_BTNS);
        this.encodedDisplay = this.el.querySelector(CSS_E_TXT);
        this.sourceDisplay  = this.el.querySelector(CSS_S_TXT);
        this.clearInput   = this.el.querySelector(CSS_CLEAR);
        this.template     = Handlebars.compile(Template);
        //listen for pertinent evts from other objects
        PubSub.subscribe('dictionary:encoding:updated', this.render.bind(this) );
        PubSub.subscribe('source:character:encoded', this.appendEncodedText.bind(this));
        PubSub.subscribe('cipher:update', this.clearFields.bind(this));

        this.delegateEvts();
      },
      appendEncodedText(char){
        let val = this.encodedDisplay.innerText;
        this.encodedDisplay.innerText = val+char;
      },
      appendSourceText(char){
        let val = this.sourceDisplay.innerText;
        this.sourceDisplay.innerText = val+char;
      },
      clearFields(){
        this.sourceDisplay.innerText = '';
        this.encodedDisplay.innerText = '';
      },
      delegateEvts(){
        this.charTable.addEventListener('click',function(e){
          e.preventDefault();
          if(RE_CHAR_BTN.test(e.target.nodeName)){
            let char = e.target.innerText;
            this.appendSourceText(char)
            PubSub.publish('source:character:click',char);
          }
        }.bind(this),false);

        this.clearInput.addEventListener('click', this.clearFields.bind(this));
      },
      render(dict=[]) {
        this.el.querySelector(CSS_E_DICT).innerHTML = this.template(dict);
      }
    }

    return _View

  });
