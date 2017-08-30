_baseUrl = '';//unfortunately necessary for the jekyll local vs remote env's

define(['mixins/PubSub','app/Views/KeywordView'], function(PubSub, _View){
    describe("KeywordView", function() {

      //scoped to be available to all specs
      let View = null;

      //inject the expected 'parent' el + referenced child elements
      beforeAll(function(){
        let parent = document.createElement('section');
        let input = document.createElement('input');
        let btn = document.createElement('div');
        let offsetTable = document.createElement('div');

        parent.setAttribute('id', 'keyword_configuration');
        input.classList.add('keyword-entry');
        btn.classList.add('update-keyword');
        offsetTable.classList.add('keyword-offset-table');

        parent.appendChild(input);
        parent.appendChild(btn);
        parent.appendChild(offsetTable);

        document.body.appendChild( parent );

        View = Object.create(_View);
        View.init();
      });

      it("should have a reference to a template function", function() {
        expect( typeof View.template ).toBe('function');
      });

      it("should render on 'cipher:update' event and highlight first column.", function() {
        PubSub.publish('cipher:update', {keyword:'snake',offsets:[ 18, 13, 0, 10, 4 ]});
        let keywordCharsNode = View.el.querySelector('.keyword-chars');
        let offsetCharsNode = View.el.querySelector('.offset-chars');
        expect( keywordCharsNode.childElementCount ).toBe(5);
        expect( keywordCharsNode.children[0].classList.contains('active') ).toBeTruthy();
        expect( offsetCharsNode.childElementCount ).toBe(5);
        expect( offsetCharsNode.children[0].classList.contains('active') ).toBeTruthy();
      });

      it("should highlight the given column on the 'keyword:offset_index:update' event.", function() {
        PubSub.publish('cipher:update', {keyword:'snake',offsets:[ 18, 13, 0, 10, 4 ]});
        PubSub.publish('keyword:offset_index:update', 3);
        let keywordCharsNode = View.el.querySelector('.keyword-chars');
        let offsetCharsNode = View.el.querySelector('.offset-chars');
        expect( keywordCharsNode.children[3].classList.contains('active') ).toBeTruthy();
        expect( offsetCharsNode.children[3].classList.contains('active') ).toBeTruthy();
      });

      it("should validate a keyword entry of between 3 and 8 characters.", function() {
        expect( View.validate('snake') ).toBeTruthy();
      });

      it("should invalidate a keyword entry of less than 3 characters or greater than 8 characters.", function() {
        expect( View.validate('a') ).toBeFalsy();
        expect( View.validate('abcdefghij') ).toBeFalsy();
      });

    });

});
