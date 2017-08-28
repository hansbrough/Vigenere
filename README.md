# Vigenere

Example of a polyalphabetic cipher that uses a series of different Caesar ciphers based upon the letters of a keyword.

View on Github Pages [https://hansbrough.github.io/Vigenere/](https://hansbrough.github.io/Vigenere/)

[Note that it's worth taking a look at the working version above to get a sense of what the components listed in the Object Hierarchy diagram are doing.]

## Approach
* minimal use of outside libraries - just Handlebars and requirejs
* markup skeleton delivered w/page load. content inserted/change via client templates.
* Keep objects loosely coupled with custom event messaging / PubSub
* 'View' objects responsible for rendering in response to custom events
* Top level App object helps by mediating events
* Tried to avoid brittle prototypal class hierarchies by using a mixin pattern. For example the cipher methods are in a stand alone module that is used by the KeywordConfiguration module (which is mainly tracking state of props like which offset index currently being used.)

### Architecture

#### Goal
Build the project so that some components could be reused in the future or significant changes could be made to the UI. For example the Views could be replaced / supplemented with other views, or the cipher file could be replaced without needing to rewrite the keywordConfiguration file.

#### Object Hierarchy

![Object Composition](https://user-images.githubusercontent.com/658255/29754682-27abe2fa-8b3f-11e7-8ec0-eec328bd79da.png)

The App file is initialized by requirejs (which is used for module loading). The Vigenere App js then goes on to either extend itself via an Object Composition technique as in the case of KeywordConfiguration.js or calls the init() method directly on the View files. The Cipher module is a utility which knows about a dictionary of characters and how to do things like look up character offsets for a given word.

#### Messaging
Each of the objects uses event messaging to stay informed of what's happening and avoid tight coupling with other objects. The keywordConfig js file which keeps state does not directly subscribe to any events published by the views; it only publishes. The App js helps to mediate events between the views and state and as a result knows more about event names. For example the KeywordView publishes the `'keyword:update'` event (in response to a user entering a new keyword), it's caught by the App js file who in turn calls state related methods it's inherited and sends the output into subsequent events which are caught by the EncodingView. That's a dense statement; the diagram below should help explain further:

![Object Messaging Example](https://user-images.githubusercontent.com/658255/29755505-14d34830-8b4e-11e7-8206-4984486d4608.png)

In the diagram above the views will update the UI in response to the 'cipher:update' event.
