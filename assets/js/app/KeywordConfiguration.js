/*
* Keyword Configuration
*/


define(['mixins/PubSub','mixins/VigenereCipher'],
  function (PubSub, Cipher) {

    let _Mixin = Object.assign({
      /**
      * look up ofset idx's for chars in a given keyword string.
      */
      getKeywordOffsets(keyword){
        console.log("KeywordConfiguration"," getKeywordOffsets for:",keyword);
        console.log("...this:",this)
        let keywordOffsets = this.getOffsetsForWord(keyword);
        console.log("...keywordOffsets:",keywordOffsets);
      }
    }, Cipher)

    return _Mixin

  });
