import imageInput from "../image-input/image-input.jsx";
import group from "../group/group.jsx";
import kV from "../KV/index.jsx";
import structs from "../structs/index.jsx";
import innerGroup from "../inner-group/index.jsx";
import Strings from "../Strings/index.jsx";
import SecretKeySelect from "../SecretKeySelect/index.jsx";
import SecretSelect from "../SecretSelect/index.jsx";
import MemoryNumber from "../MemoryNumber/index.jsx";
import CPUNumber from "../CPUNumber/index.jsx";
import "./index.scss";

import { checkImageName } from "../../constant/index.js";

function convertRule(validate) {
  const rules = [];
  if (!validate) {
    return [];
  }
  if (validate.required) {
    rules.push({
      required: true,
      message: "This field is required.",
    });
  }
  if (validate.min) {
    rules.push({
      min: validate.min,
      message: "Enter a number greater than " + validate.min,
    });
  }
  if (validate.max) {
    rules.push({
      max: validate.max,
      message: "Enter a number less than " + validate.max,
    });
  }
  if (validate.minLength) {
    rules.push({
      minLength: validate.minLength,
      message: `Enter a minimum of ${validate.minLength} characters.`,
    });
  }
  if (validate.maxLength) {
    rules.push({
      maxLength: validate.maxLength,
      message: `Enter a maximum of ${validate.maxLength} characters.`,
    });
  }
  if (validate.pattern) {
    rules.push({
      pattern: validate.pattern,
      message:
        `Please enter a value that conforms to the specification. ` +
        validate.pattern,
    });
  }
  return rules;
}

function init(uiSchema, value) {
  let formModel = {};
  uiSchema.map(param => {
    const initValue =
      param.validate.defaultValue || (value && value[param.jsonKey]);
    switch (param.uiType) {
      case "KV":
      case "Strings":
      case "Structs": {
        formModel[param.jsonKey] = initValue ? initValue : [];
        break;
      }
      case "Group":
      case "Ignore":
      case "InnerGroup": {
        formModel[param.jsonKey] = initValue ? initValue : {};
        break;
      }
      case "Input":
      case "Password":
      case "ImageInput":
      case "Number":
      case "CPUNumber":
      case "MemoryNumber":
      case "Select":
      case "SecretSelect":
      case "SecretKeySelect": {
        formModel[param.jsonKey] = initValue ? initValue : "";
        break;
      }
      case "Switch": {
        formModel[param.jsonKey] = initValue ? initValue : false;
        break;
      }
    }
  });
  return formModel;
}

export default {
  name: "ui-schema",

  props: {
    uiSchema: {
      type: Array,
      required: true,
    },
    inline: {
      type: Boolean,
      dafault: false,
    },
    value: {
      type: Object,
    },
  },

  components: {
    imageInput,
    group,
    kV,
    structs,
    innerGroup,
    Strings,
    SecretKeySelect,
    SecretSelect,
    MemoryNumber,
    CPUNumber,
  },

  data() {
    let formModel = init(this.uiSchema, this.value);

    return {
      formModel,
      secretKeys: [],
    };
  },

  render() {
    const items = this.uiSchema.map(param => {
      if (param.disable) {
        return;
      }

      const itemProps = {
        props: {
          label: param.label,
          prop: param.jsonKey,
          rules: convertRule(param.validate),
        },
      };

      const getGroup = children => {
        Reflect.deleteProperty(itemProps.props, "label");
        return (
          <group
            hasToggleIcon
            description={param.description || ""}
            title={param.label || ""}
            closed:sync={true}
          >
            {/* <el-form-item {...itemProps}>{children}</el-form-item> */}
            {children}
          </group>
        );
      };

      switch (param.uiType) {
        case "Switch": {
          return (
            <el-form-item {...itemProps}>
              <el-switch
                v-model={this.formModel[param.jsonKey]}
                style="display:inline-block"
              ></el-switch>
            </el-form-item>
          );
        }
        case "Input": {
          return (
            <el-form-item {...itemProps}>
              <el-input
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
              ></el-input>
            </el-form-item>
          );
        }
        case "Password": {
          return (
            <el-form-item {...itemProps}>
              <el-input
                v-model={this.formModel[param.jsonKey]}
                show-password
                key={param.jsonKey}
              ></el-input>
            </el-form-item>
          );
        }
        case "Select": {
          return (
            <el-form-item {...itemProps}>
              <el-select
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
              >
                {param.validate.options.map(op => {
                  return (
                    <el-option
                      key={op.value}
                      label={op.label}
                      value={op.value}
                    ></el-option>
                  );
                })}
              </el-select>
            </el-form-item>
          );
        }
        case "Number": {
          return (
            <el-form-item {...itemProps}>
              <el-input
                type="number"
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
              ></el-input>
            </el-form-item>
          );
        }
        case "ImageInput": {
          itemProps.props.rules.push({
            pattern: checkImageName,
            message: "Please enter a valid image name",
          });

          return (
            <el-form-item {...itemProps}>
              <image-input
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
              ></image-input>
            </el-form-item>
          );
        }
        case "KV": {
          let children = (
            <k-v
              jsonKey={param.jsonKey}
              v-model={this.formModel[param.jsonKey]}
            ></k-v>
          );
          return getGroup(children);
        }
        case "Strings":
          let children = (
            <div>
              <Strings
                jsonKey={param.jsonKey}
                v-model={this.formModel[param.jsonKey]}
              ></Strings>
            </div>
          );
          return getGroup(children);
        case "SecretSelect":
          return (
            <el-form-item label={param.label}>
              <secret-select
                secretKeys={this.secretKeys}
                key={param.jsonKey}
                v-model={this.formModel[param.jsonKey]}
              ></secret-select>
            </el-form-item>
          );
        case "SecretKeySelect":
          return (
            <el-form-item label={param.label}>
              <secret-key-select
                secretKeys={this.secretKeys}
                key={param.jsonKey}
                v-model={this.formModel[param.jsonKey]}
              ></secret-key-select>
            </el-form-item>
          );
        case "CPUNumber":
          return (
            <el-form-item label={param.label}>
              <CPU-number v-model={this.formModel[param.jsonKey]}></CPU-number>
            </el-form-item>
          );
        case "MemoryNumber":
          return (
            <el-form-item label={param.label}>
              <memory-number
                v-model={this.formModel[param.jsonKey]}
              ></memory-number>
            </el-form-item>
          );
        case "Group":
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <group
                key={param.jsonKey}
                description={param.description || ""}
                title={param.label || ""}
                jsonKey={param.jsonKey || ""}
              >
                <ui-schema
                  uiSchema={param.subParameters}
                  v-model={this.formModel[param.jsonKey]}
                ></ui-schema>
              </group>
            );
          }
          return <div />;
        case "Structs":
          if (param.subParameters && param.subParameters.length > 0) {
            return getGroup(
              <structs
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                jsonKey={param.jsonKey}
                param={param.subParameters}
                parameterGroupOption={param.subParameterGroupOption}
              ></structs>
            );
          }
          return <div />;
        case "InnerGroup":
          return (
            <inner-group
              uiSchema={param.subParameters}
              v-model={this.formModel[param.jsonKey]}
              jsonKey={param.jsonKey}
            ></inner-group>
          );
        case "Ignore":
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <ui-schema
                uiSchema={param.subParameters}
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                inline
              ></ui-schema>
            );
          }
          return <div />;
      }
    });

    const formProps = {
      props: {
        model: this.formModel,
        rules: this.rules,
        labelPosition: "top",
        inline: this.inline,
      },
    };

    return (
      <el-form
        show-message={false}
        size="medium"
        {...formProps}
        class="ui-schema-container"
      >
        {items}
      </el-form>
    );
  },

  // TODO change this watch
  watch: {
    formModel: {
      deep: true,
      handler() {
        this.$emit("input", this.formModel);
      },
    },
  },
};
