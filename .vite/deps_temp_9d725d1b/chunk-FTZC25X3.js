import {
  Typography_default
} from "./chunk-NXJRRPPC.js";
import {
  init_styled,
  rootShouldForwardProp_default,
  styled_default
} from "./chunk-T5EVTXGB.js";
import {
  _objectWithoutPropertiesLoose,
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses,
  init_clsx,
  init_composeClasses,
  init_generateUtilityClass,
  init_generateUtilityClasses,
  init_objectWithoutPropertiesLoose,
  init_useThemeProps2 as init_useThemeProps,
  require_jsx_runtime,
  require_prop_types,
  useThemeProps2 as useThemeProps
} from "./chunk-RNZYD7OI.js";
import {
  require_react
} from "./chunk-4JI2AD7N.js";
import {
  _extends,
  init_extends
} from "./chunk-WOK3C3YH.js";
import {
  __toESM
} from "./chunk-CEQRFMJQ.js";

// node_modules/@mui/material/DialogContentText/DialogContentText.js
init_objectWithoutPropertiesLoose();
init_extends();
var React = __toESM(require_react());
var import_prop_types = __toESM(require_prop_types());
init_clsx();
init_composeClasses();
init_styled();
init_useThemeProps();

// node_modules/@mui/material/DialogContentText/dialogContentTextClasses.js
init_generateUtilityClasses();
init_generateUtilityClass();
function getDialogContentTextUtilityClass(slot) {
  return generateUtilityClass("MuiDialogContentText", slot);
}
var dialogContentTextClasses = generateUtilityClasses("MuiDialogContentText", ["root"]);
var dialogContentTextClasses_default = dialogContentTextClasses;

// node_modules/@mui/material/DialogContentText/DialogContentText.js
var import_jsx_runtime = __toESM(require_jsx_runtime());
var _excluded = ["children", "className"];
var useUtilityClasses = (ownerState) => {
  const {
    classes
  } = ownerState;
  const slots = {
    root: ["root"]
  };
  const composedClasses = composeClasses(slots, getDialogContentTextUtilityClass, classes);
  return _extends({}, classes, composedClasses);
};
var DialogContentTextRoot = styled_default(Typography_default, {
  shouldForwardProp: (prop) => rootShouldForwardProp_default(prop) || prop === "classes",
  name: "MuiDialogContentText",
  slot: "Root",
  overridesResolver: (props, styles) => styles.root
})({});
var DialogContentText = React.forwardRef(function DialogContentText2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiDialogContentText"
  });
  const {
    className
  } = props, ownerState = _objectWithoutPropertiesLoose(props, _excluded);
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(DialogContentTextRoot, _extends({
    component: "p",
    variant: "body1",
    color: "text.secondary",
    ref,
    ownerState,
    className: clsx_default(classes.root, className)
  }, props, {
    classes
  }));
});
true ? DialogContentText.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var DialogContentText_default = DialogContentText;

export {
  getDialogContentTextUtilityClass,
  dialogContentTextClasses_default,
  DialogContentText_default
};
//# sourceMappingURL=chunk-FTZC25X3.js.map
