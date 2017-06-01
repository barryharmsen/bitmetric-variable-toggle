define(["qlik"], function(qlik) {

  'use strict';

  return {
       type: "items",
       component: "accordion",
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

                      return app.getList("VariableList").then(function(items) {
                         items.layout.qVariableList.qItems.forEach(function(item) {
                            varList.push({
                               value: item.qName,
                               label: item.qName
                            });
                         });
                         return varList;
                      });
                   },
                   expression: "always",
                   ref: "variableName"
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
          settings: {
             uses: "settings"
          }
       }
    };
});
