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
        //console.log("EncodingView"," init");
        this.el           = document.getElementById(CSS_PARENT);
        this.charTable    = this.el.querySelector(CSS_BTNS);
        this.encodedInput = this.el.querySelector(CSS_E_TXT);
        this.sourceInput  = this.el.querySelector(CSS_S_TXT);
        this.clearInput   = this.el.querySelector(CSS_CLEAR);

        this.template     = Handlebars.compile(Template);
        PubSub.subscribe('dictionary:encoding:updated', this.render.bind(this) );
        PubSub.subscribe('source:character:encoded', this.appendEncodedText.bind(this));

        this.delegateEvts();
      },
      appendEncodedText(char){
        //console.log("EncodingView"," appendEncodedText:",char);
        let val = this.encodedInput.value;
        this.encodedInput.value = val+char;
      },
      appendSourceText(char){
        let val = this.sourceInput.value;
        this.sourceInput.value = val+char;
      },
      delegateEvts(){
        //console.log("EncodingView"," delegateEvts:");
        this.charTable.addEventListener('click',function(e){
          //console.log(e.target);
          e.preventDefault();
          if(RE_CHAR_BTN.test(e.target.nodeName)){
            let char = e.target.innerText;
            this.appendSourceText(char)
            PubSub.publish('source:character:click',char);
          }
        }.bind(this),false);

        this.clearInput.addEventListener('click', (e) => {
          this.sourceInput.value = '';
          this.encodedInput.value = '';
        })
      },
      render(dict=[]) {
        //console.log("EncodingView"," dict: ", dict);
        this.el.querySelector(CSS_E_DICT).innerHTML = this.template(dict);
      }
    }

    return _View

  });
