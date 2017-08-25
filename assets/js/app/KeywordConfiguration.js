/*
* Keyword Configuration
* mainly keeps track of state and provides access to the cipher methods
*/

define(['mixins/PubSub','mixins/VigenereCipher'],
  function (PubSub, Cipher) {
    //note: using a object composition pattern to mixin 'Cipher' methods w/this mixin object
    let _Mixin = Object.assign({
      currentOffsetIndex:null,//track where to look in the current offset array,
      offsets:[],
      /**
      * uses mixedin cipher method to determine a single char's corresponding encoded character
      */
      getCharacterEncoding(char){
        return this.getEncodedChar(char, this.getCurrentOffset());
      },
      /**
      * return an array of ofset idx's for chars in a given keyword string.
      */
      getKeywordOffsets(){
        return this.offsets;
      },
      /**
      * return current offset
      */
      getCurrentOffset(){
        return this.offsets[this.currentOffsetIndex];
      },
      incrementCurrentOffsetIndex(){
        let idx = this.currentOffsetIndex+1;
        this.currentOffsetIndex = (idx < this.offsets.length) ? idx : 0;
        PubSub.publish('keyword:offset_index:update',this.currentOffsetIndex);
      },
      resetCurrentOffsetIndex(){
        this.currentOffsetIndex = 0;
        PubSub.publish('keyword:offset_index:update',this.currentOffsetIndex);
      },
      setKeywordOffsets(keyword){
        this.offsets = this.getOffsetsForWord(keyword);
        this.currentOffsetIndex = 0;
      },
      sanitizeKeyword(keyword=''){
        return keyword.replace(/[^a-z+]+/gi,'');
      }
    }, Cipher)

    return _Mixin

  });
