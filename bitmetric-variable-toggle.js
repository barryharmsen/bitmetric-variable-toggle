define(["text!./template.ng.html",
        "qlik",
        "css!./css/style.css"], function(templateHTML, qlik){

  'use strict';



  return {
    initialProperties: {
      variableName: "vPeriode",
      variableValue: "",
      variableToggle: [
        {label: "Maand", value: "M"},
        {label: "Kwartaal", value: "Q"},
        {label: "Jaar", value: "Y"}
      ]
    },
    template: templateHTML,
    definition: {
      component: "accordion",
      type: "items",
      items: {
        variable: {
            component: "items",
            label: "Variable",
            items: {
              variableName: {
                label: "Variable",
                type: "string",
                component: "dropdown",
                options: function() {
                  var app = qlik.currApp();
                  var varList = [];

                  return app.getList("VariableList").then(model => {
                    model.layout.qVariableList.qItems.forEach(function(item){
                      varList.push({
                        value: item.qName,
                        label: item.qName
                      });
                    });
                    return varList;
                  });
                },
                expression: "always",
                ref: "variableName",
                defaultValue: "vPeriod"
              },
              variableToggle: {
                type: "array",
                label: "Variable toggles",
                ref: "variableToggle",
                itemTitleRef: "label",
                allowAdd: true,
                allowRemove: true,
                allowMove: true,
                addTranslation: "Add toggle",
                items: {
                  label: {
                    type: "string",
                    ref: "label",
                    label: "Label",
                    expression: "optional"
                  },
                  value: {
                    type: "string",
                    ref: "value",
                    label: "Value",
                    expression: "optional"
                  }
                }
              }
            }
        },
        styling: {
            component: "expandable-items",
            label: "Styling",
            items: {
              font: {
                label: "Font",
                component: "items",
                items: {
                  fontSize: {
                    label: "Size",
                    type: "number",
                    expression: "always",
                    defaultValue: 10,
                    ref: "styling.fontSize"
                  },
                  selectedFontColor:{
                    label: "Color (selected)",
                    type: "integer",
                    component: "color-picker",
                    defaultValue: 10,
                    ref: "styling.fontColor.selected"
                  },
                  notSelectedfontColor:{
                    label: "Color (not selected)",
                    type: "integer",
                    component: "color-picker",
                    defaultValue: 10,
                    ref: "styling.fontColor.notSelected"
                  }
                }
              },
              button: {
                  label: "Button",
                  component: "items",
                  items: {
                    selectedButtonColor:{
                      label: "Color (selected)",
                      type: "integer",
                      component: "color-picker",
                      defaultValue: 6,
                      ref: "styling.buttonColor.selected"
                    },
                    notSelectedButtonColor:{
                      label: "Color (not selected)",
                      type: "integer",
                      component: "color-picker",
                      defaultValue: 0,
                      ref: "styling.buttonColor.notSelected"
                    }
                  }
                }
            }
          },
          settings: {
            uses: "settings"
          }
        }
    },
    controller: function($scope){
      $scope.toggleIndex = -1;
      $scope.toggleVar = function($index) {

        // Set the value of the variable to the toggled option
        $scope.toggleIndex = $index;//event.target.attributes["var-index"].value;
        $scope.layout.variableValue = $scope.layout.variableToggle[$scope.toggleIndex].value;
        qlik.currApp().variable.setContent($scope.layout.variableName, $scope.layout.variableValue);
      }
   }
  }
});
