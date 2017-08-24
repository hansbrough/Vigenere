/* Vigenere Cipher
* uses a series of different Caesar ciphers based upon the letters of a keyword.
* In a Caesar cipher, characters of the original text are replaced by a different
* character some number of fixed positions from the original character.
*/

define([],

  function(){
    const dictionary = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];

    let _Mixin = {
      /**
      * return 0 based index of letter or -1 if not found.
      */
      letterIdx(letter, dict=dictionary){
        return (letter) ? dict.indexOf(letter.toLowerCase()) : -1;
      },
      /**
      * return an encoded copy of the dictionary
      */
      getEncodedDictionary(offset, dict=dictionary){
        //console.log("getEncodedDictionary"," offset:",offset);
        let encoded = dict.map((letter) => this.getEncodedChar(letter, offset));
        return encoded
      },
      /**
      * return an array of offset values based on a word
      */
      getOffsetsForWord(word=''){
        //console.log("getOffsetsForWord ",word);
        let arr = [];
        for (let char of word) {
          arr.push(this.letterIdx(char))
        }
        return arr;
      },
      /**
      * given an letter and offset determine the corresponding cipher character
      */
      getEncodedChar(letter, offset, dict=dictionary){
        //console.log("getEncodedChar ",letter, offset);
        let len = dict.length;
        let idx = this.letterIdx(letter);
        let _idx = offset + idx;
        let __idx = (_idx >= len) ? _idx - len : _idx;
        let char = dict[__idx];
        //console.log("...char:",char);
        return char;
      }
    }

    return _Mixin;
});
