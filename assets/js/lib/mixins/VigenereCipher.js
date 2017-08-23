/* Vigenere Cipher
* uses a series of different Caesar ciphers based upon the letters of a keyword.
* In a Caesar cipher, characters of the original text are replaced by a different
* character some number of fixed positions from the original character.
*/

define([],

  function(){
    const dictionary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let _Mixin = {
      'biz':'baz',
      /**
      * return 0 based index of letter or -1 if not found.
      */
      letterIdx(letter, dict=dictionary){
        return (letter) ? dict.indexOf(letter.toLowerCase()) : -1;
      },
      /**
      * return an array of offset values based on a word
      */
      getOffsetsForWord(word=''){
        console.log("getOffsetsForWord ",word);
        let arr = [];
        for (let char of word) {
          arr.push(this.letterIdx(char))
        }
        return arr;
      },
      /**
      * given an letter and offset determine the corresponding cipher character
      */
      toCipherChar(letter, offset, dict=dictionary){
        console.log("toCipherChar",letter, offset);
        let len = dict.length;
        let idx = this.letterIdx(letter);
        let _idx = offset + idx;
        let __idx = (_idx > len) ? _idx - len : _idx;
        let char = dict[__idx];

        return char;
      }
    }
    console.log("Cipher _Mixin:",_Mixin);
    return _Mixin;
});
