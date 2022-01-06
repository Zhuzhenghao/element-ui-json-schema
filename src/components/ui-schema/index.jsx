import imageInput from "../image-input/image-input.jsx";
import group from "../group/group.jsx";
import kV from "../KV/index.jsx";
import structs from "../structs/index.jsx";
import innerGroup from "../inner-group/index.jsx";

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

function init(uiSchema) {
  let formModel = {};
  uiSchema.map((param) => {
    switch (param.uiType) {
      case "KV":
      case "Structs": {
        formModel[param.jsonKey] = [];
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
  },

  data() {
    let formModel = init(this.uiSchema);

    return {
      formModel,
    };
  },

  render() {
    const items = this.uiSchema.map((param) => {
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

      const getGroup = (children) => {
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

      const initValue =
        param.validate.defaultValue ||
        (this.value && this.value[param.jsonKey]);

      switch (param.uiType) {
        case "Switch": {
          return (
            <el-form-item {...itemProps}>
              <el-switch v-model={this.formModel[param.jsonKey]}></el-switch>
            </el-form-item>
          );
        }
        case "Input": {
          return (
            <el-form-item {...itemProps}>
              <el-input v-model={this.formModel[param.jsonKey]}></el-input>
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
              ></image-input>
            </el-form-item>
          );
        }
        case "Select": {
          return (
            <el-form-item {...itemProps}>
              <el-select v-model={this.formModel[param.jsonKey]}>
                {param.validate.options.map((op) => {
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
        case "KV": {
          let children = (
            <k-v
              jsonKey={param.jsonKey}
              v-model={this.formModel[param.jsonKey]}
            ></k-v>
          );
          return getGroup(children);
        }
        case "SecretSelect":
          <el-form-item {...itemProps}></el-form-item>;
        case "Group":
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <group
                key={param.jsonKey}
                description={param.description || ""}
                title={param.label || ""}
                jsonKey={param.jsonKey || ""}
              >
                <ui-schema ui-schema={param.subParameters}></ui-schema>
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
                param={param.subParameters}
                parameterGroupOption={param.subParameterGroupOption}
              ></structs>
            );
          }
          return <div />;
        case "InnerGroup":
          return <inner-group uiSchema={param.subParameters}></inner-group>;
        case "Ignore":
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <ui-schema
                uiSchema={param.subParameters}
                // registerForm={(form: Field) => {
                //   this.onRegisterForm(param.jsonKey, form);
                // }}
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

    return <el-form {...formProps}>{items}</el-form>;
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
