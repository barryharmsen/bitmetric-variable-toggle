define(["text!./bitmetric-variable-toggle.template.ng.html",
        "qlik",
        "css!./css/bitmetric-variable-toggle.css"], function(templateHTML, qlik) {

	'use strict';

	return {
		initialProperties: {
			variableName: "",
			variableValue: ""
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
				settings: {
					uses: "settings"
				}
			}
		},
		controller: function($scope) {
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
