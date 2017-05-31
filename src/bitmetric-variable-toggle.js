define(["text!./bitmetric-variable-toggle.ng.html",
        "qlik",
        "./bitmetric-variable-toggle-properties",
        "css!./css/bitmetric-variable-toggle.css"], function(templateHTML, qlik, properties) {

   'use strict';

   return {
      initialProperties: {
         variableName: "",
         variableValue: "",
         variableToggle: []
      },
      template: templateHTML,
      definition: properties,
      controller: function($scope) {

         var app = qlik.currApp();
         $scope.toggleIndex = -1;   // Set default toggle to unselected

         // Get current value of the variable and compare against toggle options.
         app.variable.getContent($scope.layout.variableName).then(function(curVarValue){
             $scope.layout.variableToggle.forEach(function(varItem, index){
               // If toggle value matches current variable value then set to toggled
               if (varItem.value == curVarValue.qContent.qString) {
                 $scope.toggleIndex = index;
               }
             });
         });

         $scope.toggleVar = function($index) {
            // Set the value of the variable to the toggled option
            $scope.toggleIndex = $index;
            $scope.layout.variableValue = $scope.layout.variableToggle[$scope.toggleIndex].value;
            app.variable.setStringValue($scope.layout.variableName, $scope.layout.variableValue);
         }
      }
   }
});
