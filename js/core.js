/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./js/src/blocks/core/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./js/src/blocks/core/block.scss":
/*!***************************************!*\
  !*** ./js/src/blocks/core/block.scss ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),

/***/ "./js/src/blocks/core/edit.js":
/*!************************************!*\
  !*** ./js/src/blocks/core/edit.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _block_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./block.scss */ "./js/src/blocks/core/block.scss");
/* harmony import */ var _block_scss__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_block_scss__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon */ "./js/src/blocks/core/icon.js");
/* harmony import */ var _components_conditional_logic___WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../components/conditional-logic/ */ "./js/src/components/conditional-logic/index.jsx");
var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { PanelBody, Placeholder, SelectControl, ServerSideRender, TextControl, ToggleControl } = wp.components;
const { InspectorControls } = wp.editor;
const { Component, RawHTML } = wp.element;

/**
 * Internal dependencies
 */




class Edit extends Component {

	constructor() {

		super(...arguments);

		this.setFormId = this.setFormId.bind(this);

		let form = this.getForm(this.props.attributes.formId);
		if (form && form.hasConditionalLogic) {
			this.props.setAttributes({ formPreview: false });
		}
	}

	componentWillUnmount() {

		this.unmounting = true;
	}

	setFormId(formId) {

		let form = this.getForm(formId);

		this.props.setAttributes({ formId: formId });

		if (form && form.hasConditionalLogic) {
			this.props.setAttributes({ formPreview: false });
		}
	}

	getForm(formId) {

		return gform_block_core.forms.find(form => form.id == formId);
	}

	getFormOptions() {

		let options = [{
			label: __('Select a Form', 'gravityformsgutenberg'),
			value: ''
		}];

		for (let i = 0; i < gform_block_core.forms.length; i++) {
			options.push({
				label: gform_block_core.forms[i].title,
				value: gform_block_core.forms[i].id
			});
		}

		return options;
	}

	render() {

		let { formId, title, description, ajax, tabindex, formPreview, conditionalLogic } = this.props.attributes;

		const { setAttributes, isSelected } = this.props;

		const toggleTitle = () => setAttributes({ title: !title });
		const toggleDescription = () => setAttributes({ description: !description });
		const toggleAjax = () => setAttributes({ ajax: !ajax });
		const toggleFormPreview = () => setAttributes({ formPreview: !formPreview });
		const toggleConditionalLogic = () => setAttributes({
			conditionalLogic: _extends({}, conditionalLogic, {
				enabled: !conditionalLogic.enabled
			})
		});

		const updateTabindex = tabindex => setAttributes({ tabindex: tabindex });
		const updateConditionalLogic = logic => setAttributes({ conditionalLogic: _extends({}, conditionalLogic, logic) });

		const setFormIdFromPlaceholder = e => this.setFormId(e.target.value);

		const controls = [isSelected && React.createElement(
			InspectorControls,
			{ key: 'inspector' },
			React.createElement(
				PanelBody,
				{
					title: __('Form Settings', 'gravityformsgutenberg')
				},
				React.createElement(SelectControl, {
					label: __('Form', 'gravityformsgutenberg'),
					value: formId,
					options: this.getFormOptions(),
					onChange: this.setFormId
				}),
				React.createElement(ToggleControl, {
					label: __('Form Title', 'gravityformsgutenberg'),
					checked: title,
					onChange: toggleTitle
				}),
				React.createElement(ToggleControl, {
					label: __('Form Description', 'gravityformsgutenberg'),
					checked: description,
					onChange: toggleDescription
				})
			),
			React.createElement(
				PanelBody,
				{
					title: __('Conditional Logic', 'gravityformsgutenberg'),
					className: 'gform-block__panel'
				},
				React.createElement(ToggleControl, {
					label: __('Conditional Logic', 'gravityformsgutenberg'),
					checked: conditionalLogic.enabled,
					onChange: toggleConditionalLogic
				}),
				conditionalLogic.enabled && React.createElement(_components_conditional_logic___WEBPACK_IMPORTED_MODULE_2__["default"], {
					key: 'gform-block__conditional',
					logic: conditionalLogic,
					onChange: updateConditionalLogic
				})
			),
			React.createElement(
				PanelBody,
				{
					title: __('Advanced', 'gravityformsgutenberg'),
					initialOpen: false,
					className: 'gform-block__panel'
				},
				formId && !this.getForm(formId).hasConditionalLogic && React.createElement(ToggleControl, {
					label: __('Preview', 'gravityformsgutenberg'),
					checked: formPreview,
					onChange: toggleFormPreview
				}),
				React.createElement(ToggleControl, {
					label: __('AJAX', 'gravityformsgutenberg'),
					checked: ajax,
					onChange: toggleAjax
				}),
				React.createElement(TextControl, {
					label: __('Tabindex', 'gravityformsgutenberg'),
					value: tabindex,
					onChange: updateTabindex,
					placeholder: '-1'
				})
			)
		)];

		if (!formId || !formPreview) {

			return [controls, React.createElement(
				Placeholder,
				{ key: 'placeholder', className: 'wp-block-embed gform-block__placeholder' },
				React.createElement(
					'div',
					{ className: 'gform-block__placeholder-brand' },
					React.createElement(
						'div',
						{ className: 'gform_icon' },
						_icon__WEBPACK_IMPORTED_MODULE_1__["default"]
					),
					React.createElement(
						'p',
						null,
						React.createElement(
							'strong',
							null,
							'Gravity Forms'
						)
					)
				),
				gform_block_core.forms && gform_block_core.forms.length > 0 && React.createElement(
					'form',
					null,
					React.createElement(
						'select',
						{ value: formId, onChange: setFormIdFromPlaceholder },
						this.getFormOptions().map(form => React.createElement(
							'option',
							{ key: form.value, value: form.value },
							form.label
						))
					)
				),
				(!gform_block_core.forms || gform_block_core.forms && gform_block_core.forms.length === 0) && React.createElement(
					'form',
					null,
					React.createElement(
						'p',
						null,
						__('You must have at least one form to use the block.', 'gravityforms')
					)
				)
			)];
		}

		return [controls, React.createElement(ServerSideRender, {
			key: 'form_preview',
			block: 'gravityforms/block',
			attributes: this.props.attributes
		})];
	}

};

/* harmony default export */ __webpack_exports__["default"] = (Edit);

/***/ }),

/***/ "./js/src/blocks/core/icon.js":
/*!************************************!*\
  !*** ./js/src/blocks/core/icon.js ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const icon = React.createElement(
	'svg',
	{ xmlns: 'http://www.w3.org/2000/svg', viewBox: '0 0 508.3 559.5', width: '100%', height: '100%',
		focusable: 'false', 'aria-hidden': 'true',
		className: 'dashicon dashicon-gravityforms' },
	React.createElement(
		'g',
		null,
		React.createElement('path', { className: 'st0',
			d: 'M468,109.8L294.4,9.6c-22.1-12.8-58.4-12.8-80.5,0L40.3,109.8C18.2,122.6,0,154,0,179.5V380\tc0,25.6,18.1,56.9,40.3,69.7l173.6,100.2c22.1,12.8,58.4,12.8,80.5,0L468,449.8c22.2-12.8,40.3-44.2,40.3-69.7V179.6\tC508.3,154,490.2,122.6,468,109.8z M399.3,244.4l-195.1,0c-11,0-19.2,3.2-25.6,10c-14.2,15.1-18.2,44.4-19.3,60.7H348v-26.4h49.9\tv76.3H111.3l-1.8-23c-0.3-3.3-5.9-80.7,32.8-121.9c16.1-17.1,37.1-25.8,62.4-25.8h194.7V244.4z'
		})
	)
);

/* harmony default export */ __webpack_exports__["default"] = (icon);

/***/ }),

/***/ "./js/src/blocks/core/index.js":
/*!*************************************!*\
  !*** ./js/src/blocks/core/index.js ***!
  \*************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _edit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./edit */ "./js/src/blocks/core/edit.js");
/* harmony import */ var _icon__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./icon */ "./js/src/blocks/core/icon.js");
/**
 * WordPress dependencies
 */
const { __ } = wp.i18n;
const { createBlock, registerBlockType } = wp.blocks;

/**
 * Internal dependencies
 */



registerBlockType('gravityforms/block', {

	title: __('Form (Experimental)', 'gravityformsgutenberg'),
	description: __('Select a form below to add it to your page.', 'gravityformsgutenberg'),
	category: 'embed',
	supports: {
		customClassName: false,
		className: false,
		html: false
	},
	keywords: ['gravity forms'],
	attributes: {
		formId: {
			type: 'string'
		},
		title: {
			type: 'bool',
			default: true
		},
		description: {
			type: 'bool',
			default: true
		},
		ajax: {
			type: 'bool',
			default: false
		},
		conditionalLogic: {
			type: 'object',
			default: {
				enabled: false,
				actionType: 'show',
				logicType: 'all',
				rules: []
			}
		},
		tabindex: {
			type: 'string'
		},
		formPreview: {
			type: 'bool',
			default: true
		}
	},
	icon: _icon__WEBPACK_IMPORTED_MODULE_1__["default"],

	transforms: {
		from: [{
			type: 'block',
			blocks: ['gravityforms/form'],
			transform: attributes => {
				return createBlock('gravityforms/block', {
					formId: attributes.formId,
					title: attributes.title,
					description: attributes.description,
					ajax: attributes.ajax,
					tabindex: attributes.tabindex,
					formPreview: attributes.formPreview
				});
			}
		}],
		to: [{
			type: 'block',
			blocks: ['gravityforms/form'],
			transform: attributes => {
				return createBlock('gravityforms/form', {
					formId: attributes.formId,
					title: attributes.title,
					description: attributes.description,
					ajax: attributes.ajax,
					tabindex: attributes.tabindex,
					formPreview: attributes.formPreview
				});
			}
		}]
	},

	edit: _edit__WEBPACK_IMPORTED_MODULE_0__["default"],

	save: function (props) {

		let { formId, title, description, ajax, tabindex } = props.attributes;
		let shortcode = `[gravityform id="${formId}" title="${title ? 'true' : 'false'}" description="${description ? 'true' : 'false'}" ajax="${ajax ? 'true' : 'false'}" tabindex="${tabindex ? tabindex : 0}"]`;

		return formId ? { shortcode } : null;
	}

});

/***/ }),

/***/ "./js/src/components/conditional-logic/index.jsx":
/*!*******************************************************!*\
  !*** ./js/src/components/conditional-logic/index.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return LogicControl; });
/* harmony import */ var _ruleset___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ruleset/ */ "./js/src/components/conditional-logic/ruleset/index.jsx");
const { __ } = wp.i18n;
const { Component } = wp.element;
const { Button, Popover, RadioControl } = wp.components;



class LogicControl extends Component {

	constructor() {

		super(...arguments);

		this.state = {
			visible: {
				actionType: false,
				logicType: false
			}
		};
	}

	getActionTypes() {

		return [{
			label: __('Show', 'gravityforms'),
			value: 'show'
		}, {
			label: __('Hide', 'gravityforms'),
			value: 'hide'
		}];
	}

	getActionTypeLabel(actionType = 'show') {

		let actionTypes = this.getActionTypes();

		let targetAction = actionTypes.filter(action => {
			return action.value === actionType;
		});

		return targetAction[0].label;
	}

	getLogicTypes() {
		return [{
			label: __('all', 'gravityforms'),
			value: 'all'
		}, {
			label: __('any', 'gravityforms'),
			value: 'any'
		}];
	}

	getLogicTypeLabel(logicType = 'all') {

		let logicTypes = this.getLogicTypes();

		let targetLogic = logicTypes.filter(logic => {
			return logic.value === logicType;
		});

		return targetLogic[0].label;
	}

	render() {

		let { actionType, logicType, rules } = this.props.logic;

		const actionTypes = this.getActionTypes();
		const logicTypes = this.getLogicTypes();

		const toggleActionType = () => this.setState({ visible: { actionType: !this.state.visible.actionType } });
		const toggleLogicType = () => this.setState({ visible: { logicType: !this.state.visible.logicType } });

		const changeActionType = actionType => this.props.onChange({ actionType: actionType });
		const changeLogicType = logicType => this.props.onChange({ logicType: logicType });

		const changeRules = rules => {
			this.props.onChange({ rules: rules });
		};

		return React.createElement(
			'div',
			null,
			React.createElement(
				'div',
				{ className: 'gform-block__conditional-type' },
				React.createElement(
					Button,
					{ className: 'button-link', onClick: toggleActionType },
					React.createElement(
						'div',
						null,
						this.getActionTypeLabel(actionType)
					),
					this.state.visible.actionType && React.createElement(
						Popover,
						{ onClose: toggleActionType, position: 'bottom',
							className: 'gform-block__conditional-popover' },
						React.createElement(RadioControl, { options: actionTypes, onChange: changeActionType, selected: actionType })
					)
				),
				'\xA0form if\xA0',
				React.createElement(
					Button,
					{ className: 'button-link', onClick: toggleLogicType },
					React.createElement(
						'div',
						null,
						this.getLogicTypeLabel(logicType)
					),
					this.state.visible.logicType && React.createElement(
						Popover,
						{ onClose: toggleLogicType, position: 'bottom',
							className: 'gform-block__conditional-popover' },
						React.createElement(RadioControl, { options: logicTypes, onChange: changeLogicType, selected: logicType })
					)
				),
				'\xA0rules match'
			),
			React.createElement(_ruleset___WEBPACK_IMPORTED_MODULE_0__["default"], { key: 'gform-block__conditional-ruleset', rules: rules, onChange: changeRules })
		);
	}
}

/***/ }),

/***/ "./js/src/components/conditional-logic/rule/index.jsx":
/*!************************************************************!*\
  !*** ./js/src/components/conditional-logic/rule/index.jsx ***!
  \************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rule; });
const { __ } = wp.i18n;
const Component = wp.element.Component;
const { Dashicon, DateTimePicker, Dropdown } = wp.components;
const { dateI18n, __experimentalGetSettings } = wp.date;

class Rule extends Component {

	constructor() {

		super(...arguments);
	}

	updateKey(key) {

		let rule = this.props.rule;

		rule.key = key;
		rule.operator = this.getDefaultOperator();
		rule.value = '';

		this.props.updateRule(rule, this.props.index);
	}

	updateOperator(operator) {

		let rule = this.props.rule;

		rule.operator = operator;

		this.props.updateRule(rule, this.props.index);
	}

	updateValue(value) {

		let rule = this.props.rule;

		rule.value = value;
		this.props.updateRule(rule, this.props.index);
	}

	getDefaultOperator() {

		let operators = this.getOperators(),
		    operatorValues = operators.map(operator => operator.value);

		return operatorValues.includes(this.props.rule.operator) ? this.props.rule.operator : operatorValues[0];
	}

	getOperators() {

		let { key } = this.props.rule,
		    options = gform_block_core.conditionalOptions;

		for (let i = 0; i < options.length; i++) {

			if (options[i].key.value !== key && key) {
				continue;
			}

			return options[i].operators;
		}

		return [];
	}

	getValue() {

		let { key } = this.props.rule,
		    options = gform_block_core.conditionalOptions;

		for (let i = 0; i < options.length; i++) {

			if (options[i].key.value !== key && key) {
				continue;
			}

			return options[i].value;
		}

		return [];
	}

	getValueInput() {

		let { value } = this.props.rule;
		const index = this.props.index;
		const settings = __experimentalGetSettings();

		const valueProps = this.getValue();
		const updateValue = e => this.updateValue(e.target.value);

		switch (valueProps.type) {

			case 'date':

				const updateDateValue = newDate => this.updateValue(newDate);
				const is12HourTime = /a(?!\\)/i.test(settings.formats.time.toLowerCase() // Test only the lower case a
				.replace(/\\\\/g, '') // Replace "//" with empty strings
				.split('').reverse().join('') // Reverse the string and test for "a" not followed by a slash
				);

				return React.createElement(Dropdown, {
					key: `gform-block__conditional-rule-${index}-value`,
					position: 'bottom left',
					contentClassName: 'gform-block__conditional-rule-value-popover',
					className: 'gform-block__conditional-rule-value',
					renderToggle: ({ onToggle, isOpen }) => React.createElement(
						'button',
						{
							type: 'button',
							className: 'button-link',
							onClick: onToggle,
							'aria-expanded': isOpen
						},
						value ? dateI18n(settings.formats.datetime, value) : __('Select a Date', 'gravityforms')
					),
					renderContent: () => [React.createElement(DateTimePicker, {
						key: 'date-time-picker',
						currentDate: value,
						onChange: updateDateValue,
						locale: settings.l10n.locale,
						is12Hour: is12HourTime
					})]
				});

			case 'select':
				return React.createElement(
					'select',
					{
						key: `gform-block__conditional-rule-${index}-value`,
						className: 'gform-block__conditional-rule-value',
						value: value,
						onChange: updateValue },
					this.getValue().choices.map(function (value) {

						if (value.choices) {

							let choices = value.choices.map(subvalue => React.createElement(
								'option',
								{ key: subvalue.value, value: subvalue.value },
								subvalue.label
							));

							return React.createElement(
								'optgroup',
								{ label: value.label, key: value.label },
								choices
							);
						} else {

							return React.createElement(
								'option',
								{ key: value.value, value: value.value },
								value.label
							);
						}
					})
				);

			default:

				return React.createElement('input', {
					key: `gform-block__conditional-rule-${index}-value`,
					className: 'gform-block__conditional-rule-value',
					value: value,
					onChange: updateValue
				});

		}
	}

	render() {

		let { key, operator } = this.props.rule;
		const index = this.props.index;
		const options = this.props.options;

		const deleteRule = () => this.props.deleteRule(index);

		const updateKey = e => this.updateKey(e.target.value);
		const updateOperator = e => this.updateOperator(e.target.value);

		const keySelect = React.createElement(
			'select',
			{
				key: `gform-block__conditional-rule-${index}-key`,
				className: 'gform-block__conditional-rule-key',
				value: key,
				onChange: updateKey },
			options.map(option => React.createElement(
				'option',
				{ key: option.key.value, value: option.key.value },
				option.key.label
			))
		);

		const operatorSelect = React.createElement(
			'select',
			{
				key: `gform-block__conditional-rule-${index}-operator`,
				className: 'gform-block__conditional-rule-operator',
				value: operator,
				onChange: updateOperator },
			this.getOperators().map(operator => React.createElement(
				'option',
				{ key: operator.value, value: operator.value },
				operator.label
			))
		);

		return React.createElement(
			'div',
			{ className: 'gform-block__conditional-rule' },
			React.createElement(
				'div',
				{ className: 'gform-block__conditional-rule-inputs' },
				keySelect,
				operatorSelect,
				this.getValueInput()
			),
			React.createElement(
				'div',
				{ className: 'gform-block__conditional-rule-controls' },
				React.createElement(
					'span',
					{ className: 'gform-block__conditional-rule-delete', onClick: deleteRule },
					React.createElement(Dashicon, {
						key: `gform-block__conditional-rule-delete-${index}`,
						icon: 'trash'
					})
				)
			)
		);
	}

}

/***/ }),

/***/ "./js/src/components/conditional-logic/ruleset/index.jsx":
/*!***************************************************************!*\
  !*** ./js/src/components/conditional-logic/ruleset/index.jsx ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Ruleset; });
/* harmony import */ var _rule___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../rule/ */ "./js/src/components/conditional-logic/rule/index.jsx");
const { __ } = wp.i18n;
const Component = wp.element.Component;
const { IconButton } = wp.components;



class Ruleset extends Component {

	constructor() {

		super(...arguments);

		this.addRule = this.addRule.bind(this);
		this.deleteRule = this.deleteRule.bind(this);
		this.updateRule = this.updateRule.bind(this);
	}

	addRule() {

		let rules = this.getRules(),
		    newRules = [...rules, this.getDefaultOption()];

		this.setRules(newRules);
	}

	deleteRule(index) {

		let rules = this.getRules();
		rules.splice(index, 1);

		this.setRules(rules);
	}

	getRules() {

		return this.props.rules;
	}

	setRules(rules) {

		this.props.onChange(rules);
	}

	updateRule(rule, index) {

		let rules = this.getRules();

		rules[index] = rule;

		this.props.onChange(rules);
	}

	getOptions() {

		return gform_block_core.conditionalOptions;
	}

	getDefaultOption() {

		let options = this.getOptions(),
		    option = options[0];

		return {
			key: option.key.value,
			operator: option.operators[0].value,
			value: option.value.choices ? option.value.choices[0].choices ? option.value.choices[0].choices[0].value : option.value.choices[0].value : ''
		};
	}

	render() {

		let rules = this.props.rules;
		let options = this.getOptions();

		return [rules && rules.map((rule, index) => React.createElement(_rule___WEBPACK_IMPORTED_MODULE_0__["default"], {
			options: options,
			rule: rule,
			key: `gform-block__conditional-rule-${index}`,
			index: index,
			updateRule: this.updateRule,
			deleteRule: this.deleteRule
		})), React.createElement(
			'div',
			{ className: "gform-block__conditional-rule-add" + (!rules || rules.length == 0 ? " no-rules" : ""), key: 'gform-block__conditional-rule-add' },
			React.createElement(
				IconButton,
				{
					icon: 'insert',
					label: __('Add Rule'),
					onClick: this.addRule,
					className: 'editor-inserter__toggle'
				},
				!rules || rules.length == 0 && React.createElement(
					'span',
					null,
					'Add Rule'
				)
			)
		)];
	}

}

/***/ })

/******/ });
//# sourceMappingURL=core.js.map