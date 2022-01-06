import imageInput from "../image-input/image-input.jsx";

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

export default {
  name: "ui-schema",

  props: {
    uiSchema: {
      type: Array,
      required: true,
    },
  },

  components: {
    imageInput,
  },

  data() {
    return {
      formModel: {},
    };
  },

  render() {
    const items = this.uiSchema.map((param) => {
      if (param.disable) {
        return;
      }

      const initFormItemProps = () => {
        return {
          props: {
            label: param.label,
            prop: param.jsonKey,
            rules: convertRule(param.validate),
          },
        };
      };
      const initValue =
        param.validate.defaultValue ||
        (this.value && this.value[param.jsonKey]);

      switch (param.uiType) {
        case "Switch": {
          return (
            <el-form-item {...initFormItemProps()}>
              <el-switch v-model={this.formModel[param.jsonKey]}></el-switch>
            </el-form-item>
          );
        }
        case "Input": {
          return (
            <el-form-item {...initFormItemProps()}>
              <el-input v-model={this.formModel[param.jsonKey]}></el-input>
            </el-form-item>
          );
        }
        case "ImageInput":
          return (
            <el-form-item {...initFormItemProps()}>
              <image-input
                v-model={this.formModel[param.jsonKey]}
              ></image-input>
            </el-form-item>
          );
      }
    });

    const formProps = {
      props: {
        model: this.formModel,
        rules: this.rules,
        labelWidth: "100px",
      },
    };
    return <el-form {...formProps}>{items}</el-form>;
  },
};
