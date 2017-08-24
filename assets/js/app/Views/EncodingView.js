//AMD module
//View for the character encoding section

define([
  'mixins/PubSub',
  'handlebars',
  'text!'+_baseUrl+'/assets/js/app/templates/encoding.tmpl?noext',
],
  function (PubSub, Handlebars, Template) {
    const RE_CHAR_BTN  = /SPAN/;


    let _View = {
      init() {
        //console.log("EncodingView"," init");
        this.el           = document.getElementById('msg_encoding');
        this.charTable    = this.el.querySelector('.character-buttons');
        this.encodedInput = this.el.querySelector('.encoded-text');
        this.sourceInput  = this.el.querySelector('.source-text');
        this.clearInput   = this.el.querySelector('.clear-source');

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
        this.el.querySelector('.character-encoding').innerHTML = this.template(dict);
      }
    }

    return _View

  });
