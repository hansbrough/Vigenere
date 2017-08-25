# Vigenere

Example of a polyalphabetic cipher that uses a series of different Caesar ciphers based upon the letters of a keyword.

View on Github Pages [https://hansbrough.github.io/Vigenere/](https://hansbrough.github.io/Vigenere/)

## Approach
* minimal use of outside libraries - just Handlebars and requirejs
* markup skeleton delivered w/page load. content inserted/change via client templates.
* Keep objects loosely coupled with custom event messaging / PubSub
* 'View' objects responsible for rendering in response to custom events
* Top level App object helps by mediating events
* Tried to avoid brittle prototypal class hierarchies by using a mixin pattern. For example the cipher methods are in a stand alone module that is used by the KeywordConfiguration module (which is mainly tracking state of props like which offset index currently being used.)
