# RxObject.js
A javascript object for spectacle prescription parameters
The string property is for input and display.
The vector property is for storage and manipulation.
String and vector are always in sync.


<h2>Constructor</h2>
In the case of strings, the object will validate the string against the validation parameter or a default.
In the case of vectors, no validation is done.
use somevar= new RxObject(input, type, [validation])
Allowed types: sph, cyl, axisC
Allowed validations: 0.25, -0.25, 0.12, -0.12, 180


<h2>Get Methods</h2>
getString() - a string 
getVector() - a number 
getValidation() - boolean true|false
getValidationMsg() - a string

<h2>Set Methods</h2>
You cannot set a type - a new object must be constructed to change the type
<h3>setString()</h3>
Updates string and vector properties after validation
use obj.setString("string",[validation])
returns 
setString().result - boolean true|false
setString().msg - string
if setString() is successful,all obj properties are updated
<h3>setVector()</h3>
Updates string and vector properties without validation
returns
setVector().result - boolean true|false
setVector().msg - string
If setVector() is successful, all obj properties are updated
<h3>setValidation()</h3>
Validates existing string against new validation parameter
returns
setValidation().result - boolean true|false
setValidation().msg - string
If validation is successful, validation and validationMsg parameters are updated
<h2>Other</h2>



