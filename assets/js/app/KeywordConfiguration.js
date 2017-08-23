/*
* Keyword Configuration
*/


define(['mixins/PubSub','mixins/VigenereCipher'],
  function (PubSub, Cipher) {

    let _Mixin = Object.assign({
      init() {
        console.log("KeywordConfiguration init")
        //console.log("...this: ",this)
        let keywordOffsets = this.getOffsetsForWord('snake');
        console.log("...keywordOffsets:",keywordOffsets);
        //console.log("toCipherChar('l', 4) = ",this.toCipherChar('l', 4))


      }
    }, Cipher)

    return _Mixin

  });
