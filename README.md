# JS Calculator

Based on [lesson](https://www.theodinproject.com/courses/foundations/lessons/calculator) from The Odin Project

## TODO

* [x] buttons scale down/up when clicked (i.e. pressed effect)
	* https://www.geeksforgeeks.org/how-to-add-a-pressed-effect-on-button-click-in-css/
* [x] when operator pressed, start new number
* [ ] if too many characters in text area, shrink them to fit
* [x] truncate decimal answers to X digits of accuracy
	* https://stackoverflow.com/questions/23053636/how-to-truncate-the-float-value-in-javascript
* [x] better to transmit buttons -> js var -> text area, or buttons -> text area -> js var?
	* ended up modifying state in js and then transmitting that to text are (i.e. second option)
* [ ] some visual indication when equal button pressed (e.g. see macOS calculator)
* [ ] highlight operator button to show that its the "active" operator
* [ ] floating point support (i.e. can enter decimal, and properly displaying decimal w/ leading 0)
* [x] BUG: everything should be cleared if start typing new number right after equals