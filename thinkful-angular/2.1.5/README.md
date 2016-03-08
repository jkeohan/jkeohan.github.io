Thinkful Angular Waitstaff Calc
=================================



Angular and data binding go hand in hand. The two directives, and their corresponding classes, that are responsible for this are:

	-ng-model
	-ng-bind (ng-binding)

NG-MODEL

	-ng-model
	-data-ng-model

Data binding can then extended to also be bi-directional which means that any updates made within a field of data will be reflected within the assigned variable and then propagated wherever that variable is being referenced.

ref: 
http://www.javabeat.net/angularjs-ng-model-ng-bind/

<input ng-model="tipPercentage" required="" type="number" step="0.1" class="ng-pristine ng-untouched ng-valid-number ng-invalid ng-invalid-required">

NG-BIND\NG-BINDING

ng-bind is used for one-way data binding and is used soley for displaying the value iniside an html component, such as an input form and cannot be used for binding to a variable.

ng-binding - Usage: angular applies this class to any element that is attached to a data binding, via ng-bind or {{}} curly braces

**Form Validation

1. First attempt was to add type="number" to the input field however that didn't throw any error but just only accepted number specific input
2. Second: added class="ng-valid" but this didn't do anything 
3. RESOLUTION: added required="" to input and it prompted for input for the first field that didn't contain input

Although this worked I still would like to leverage ng-show and $scope.mealForm.$invalid to manage form validation

ResetALl Button

Created the following function to reset the form:
 $scope.resetAll = function() {
		$scope.mealPrice = '';
		$scope.mealTax = '';
		$scope.mealTip = '';
	}

Submit Button

Created the following function for submit:
	$scope.submit = function() {
		mPrice = $scope.mealPrice;
		mTax = $scope.mealTax;
		mTip = $scope.mealTip
		calCharges()
	}

	function calCharges() {
		sub = mPrice + (mPrice * (mTip/100))
		$scope.subtotal = sub
		console.log(sub)
	}

Cancel Button

ISSUE: The button was placed within the form and once executed it would initiate form validation.
RESOLUTION: Moved button outside of form and no form validation executed.  Moved it back into form
						for aethetics but hoping to use $scope.mealForm.$valid to contol validation.

Additional Issues:

ISSUE: unable to update the subtotal using class="ng-binding"
RESOLUTION: Used ng-bind directive 
<label>Subtotal</label><span ng-bind="subtotal | number:2">0.00</span>

meeting:

novalidate
ng-messages...another way to show messages
$dirty\$valid\$submitted
{{mealform}} in the form will show the status of the mealform

TODO...
use mg-messages to display errors













