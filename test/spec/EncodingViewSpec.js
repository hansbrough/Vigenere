_baseUrl = '';//unfortunately necessary for the jekyll local vs remote env's

define(['mixins/PubSub','app/Views/EncodingView'], function(PubSub, _View){
    describe("EncodingView", function() {

      //scoped to be available to all specs
      let View = null;

      //inject the expected 'parent' el + referenced child elements
      beforeAll(function(){
        let parent = document.createElement('section');
        let charTable = document.createElement('ul');
        let sourceText = document.createElement('p');
        let encodedDisplay = document.createElement('p');
        let clearInput = document.createElement('button');
        let charEncoding = document.createElement('ul');
        let charKey = document.createElement('span');

        parent.setAttribute('id', 'msg_encoding');
        charTable.classList.add('character-buttons');
        charEncoding.classList.add('character-encoding');
        sourceText.classList.add('source-text');
        encodedDisplay.classList.add('encoded-text');
        clearInput.classList.add('clear-source');
        charKey.innerText = 'z';

        charTable.appendChild(charKey);
        parent.appendChild(charTable);
        parent.appendChild(charEncoding);
        parent.appendChild(sourceText);
        parent.appendChild(encodedDisplay);
        parent.appendChild(charTable);
        parent.appendChild(clearInput);

        document.body.appendChild( parent );

        View = Object.create(_View);
        View.init();
      });

      it("should have a reference to a template function", function() {
        expect( typeof View.template ).toBe('function');
      });

      it("should render encoded dictionary on 'dictionary:encoding:updated' event", function() {
        PubSub.publish('dictionary:encoding:updated',['n','o','p','q','r','s','t','u','v','w','x','y','z','a','b','c','d','e','f','g','h','i','j','k','l','m'])
        let charEncodingNode = View.el.querySelector('.character-encoding');
        expect( charEncodingNode.childElementCount ).toBe(26);
      });

      it("should render the encoded character on 'source:character:encoded' event", function() {
        PubSub.publish('source:character:encoded','x')
        let encodedDisplayNode = View.el.querySelector('.encoded-text');
        expect( encodedDisplayNode.innerText ).toBe('x');
      });

      it("should render the source character on character key click event", function() {
        let zCharKey = View.el.querySelector('.character-buttons span');
        zCharKey.click();
        let sourceText = View.el.querySelector('.source-text');
        expect( sourceText.innerText ).toBe('z');
      });

      it("should clear 'source' and 'encoded' fields on 'cipher:update' event", function() {
        PubSub.publish('cipher:update', {keyword:'snake',offsets:[ 18, 13, 0, 10, 4 ]});
        let sourceTextNode = View.el.querySelector('.source-text');
        let encodedDisplayNode = View.el.querySelector('.encoded-text');
        expect( sourceTextNode.innerText ).toBe('');
        expect( encodedDisplayNode.innerText ).toBe('');
      });
    });

});
