import { isEmpty } from 'lodash';
import imageInput from '../image-input/image-input.jsx';
import group from '../group/group.jsx';
import kV from '../KV/index.jsx';
import HelmValues from '../HelmValues/index.jsx';
import structs from '../structs/index.jsx';
import innerGroup from '../inner-group/index.jsx';
import Strings from '../Strings/index.jsx';
import SecretKeySelect from '../SecretKeySelect/index.jsx';
import SecretSelect from '../SecretSelect/index.jsx';
import MemoryNumber from '../MemoryNumber/index.jsx';
import CPUNumber from '../CPUNumber/index.jsx';
import './index.scss';
import { checkImageName } from '../../core/constant/index.js';

function convertRule(validate) {
  const rules = [];
  if (!validate) {
    return [];
  }
  if (validate.required) {
    rules.push({
      required: true,
      message: 'This field is required.',
    });
  }
  if (validate.min) {
    rules.push({
      min: validate.min,
      message: `Enter a number greater than ${validate.min}`,
    });
  }
  if (validate.max) {
    rules.push({
      max: validate.max,
      message: `Enter a number less than ${validate.max}`,
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
      message: `Please enter a value that conforms to the specification. ${validate.pattern}`,
    });
  }
  return rules;
}

function init(uiSchema) {
  const formModel = {};
  uiSchema.map(param => {
    const defaultVal = param.validate?.defaultValue;
    switch (param.uiType) {
      case 'Strings':
      case 'Structs': {
        formModel[param.jsonKey] = defaultVal || [];
        break;
      }
      case 'KV':
      case 'HelmValues':
      case 'Group':
      case 'Ignore':
      case 'InnerGroup': {
        formModel[param.jsonKey] = defaultVal || {};
        break;
      }
      case 'Input':
      case 'Password':
      case 'ImageInput':
      case 'Number':
      case 'CPUNumber':
      case 'MemoryNumber':
      case 'Select':
      case 'SecretSelect':
      case 'SecretKeySelect': {
        formModel[param.jsonKey] = defaultVal || '';
        break;
      }
      case 'Switch': {
        formModel[param.jsonKey] = defaultVal || false;
        break;
      }
      default:
        break;
    }
    return null;
  });
  return formModel;
}

export default {
  name: 'ui-schema',

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
    jsonKey: {
      type: String,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  components: {
    imageInput,
    group,
    kV,
    HelmValues,
    structs,
    innerGroup,
    Strings,
    SecretKeySelect,
    SecretSelect,
    MemoryNumber,
    CPUNumber,
  },

  data() {
    return {
      formModel: {},
      secretKeys: [],
      formData: {},
    };
  },

  methods: {
    setValues(value) {
      this.formModel = Object.assign(this.formModel, value);
    },
    setKeys(keys) {
      this.secretKeys = [...keys];
    },
    handleChange(obj) {
      if (obj.value) {
        this.$set(this.formData, obj.key, obj.value);
      } else {
        this.$delete(this.formData, obj.key);
      }
    },
    changeVal(value, jsonKey) {
      if (value || value === false || value === 0) {
        this.$set(this.formData, jsonKey, value);
      } else {
        this.$delete(this.formData, jsonKey);
      }
    },
    validate() {
      return this.$refs.schemaForm.validate();
    },
  },

  created() {
    this.formModel = init(this.uiSchema);
  },

  mounted() {
    if (!isEmpty(this.value)) {
      this.setValues(this.value);
    }
  },

  render() {
    const { uiSchema } = this;
    if (!uiSchema) {
      return <div />;
    }
    const items = uiSchema.map(param => {
      const required = param.validate && param.validate.required;

      if (param.disable) {
        return null;
      }

      const itemProps = {
        props: {
          required,
          label: param.label,
          prop: param.jsonKey,
          disabled: param.disable,
          rules: convertRule(param.validate),
        },
      };

      const getGroup = children => {
        Reflect.deleteProperty(itemProps.props, 'label');
        let closed = true;
        if (typeof this.formModel[param.jsonKey] === 'object') {
          closed = isEmpty(this.formModel[param.jsonKey]);
          if (isEmpty(this.formModel[param.jsonKey])) {
            this.$delete(this.formData, param.jsonKey);
          }
        } else if (this.formModel[param.jsonKey]) {
          closed = !this.formModel[param.jsonKey].length;
          if (!this.formModel[param.jsonKey].length) {
            this.$delete(this.formData, param.jsonKey);
          }
        }

        return (
          <group
            description={param.description || ''}
            title={param.label || ''}
            closed={closed}
            key={param.jsonKey}
          >
            {/* <el-form-item {...itemProps}>{children}</el-form-item> */}
            {children}
          </group>
        );
      };

      // const initValue = param.validate.defaultValue || (value && value[param.jsonKey]);

      switch (param.uiType) {
        case 'Switch': {
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <el-switch
                v-model={this.formModel[param.jsonKey]}
                v-on:change={$event => this.changeVal($event, param.jsonKey)}
              ></el-switch>
            </el-form-item>
          );
        }
        case 'Input': {
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <el-input
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                v-on:input={$event => this.changeVal($event, param.jsonKey)}
              ></el-input>
            </el-form-item>
          );
        }
        case 'Password': {
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <el-input
                v-model={this.formModel[param.jsonKey]}
                show-password
                key={param.jsonKey}
              ></el-input>
            </el-form-item>
          );
        }
        case 'Select': {
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <el-select
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                v-on:change={($event => this.changeVal($event, param.jsonKey))(
                  this.formModel[param.jsonKey],
                )}
              >
                {param.validate.options.map(op => {
                  return <el-option key={op.value} label={op.label} value={op.value}></el-option>;
                })}
              </el-select>
            </el-form-item>
          );
        }
        case 'Number': {
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <el-input-number
                controls-position="right"
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                v-on:input={$event => this.changeVal($event, param.jsonKey)}
              ></el-input-number>
            </el-form-item>
          );
        }
        case 'ImageInput': {
          itemProps.props.rules.push({
            pattern: checkImageName,
            message: 'Please enter a valid image name',
          });

          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <image-input
                v-on:valChange={this.handleChange}
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                jsonKey={param.jsonKey}
              ></image-input>
            </el-form-item>
          );
        }
        case 'KV': {
          return getGroup(
            <k-v
              key={param.jsonKey}
              jsonKey={param.jsonKey}
              v-model={this.formModel[param.jsonKey]}
              v-on:valChange={this.handleChange}
            ></k-v>,
          );
        }
        case 'HelmValues':
          return getGroup(
            <helm-values
              key={param.jsonKey}
              jsonKey={param.jsonKey}
              v-model={this.formModel[param.jsonKey]}
            ></helm-values>,
          );
        case 'Strings':
          return getGroup(
            <Strings
              key={param.jsonKey}
              jsonKey={param.jsonKey}
              v-model={this.formModel[param.jsonKey]}
              v-on:valChange={this.handleChange}
            ></Strings>,
          );
        case 'SecretSelect':
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <secret-select
                v-on:setKeys={this.setKeys}
                key={param.jsonKey}
                v-model={this.formModel[param.jsonKey]}
              ></secret-select>
            </el-form-item>
          );
        case 'SecretKeySelect':
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <secret-key-select
                secretKeys={this.secretKeys}
                key={param.jsonKey}
                v-model={this.formModel[param.jsonKey]}
              ></secret-key-select>
            </el-form-item>
          );
        case 'CPUNumber':
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <CPU-number
                v-model={this.formModel[param.jsonKey]}
                jsonKey={param.jsonKey}
                v-on:valChange={this.handleChange}
              ></CPU-number>
            </el-form-item>
          );
        case 'MemoryNumber':
          return (
            <el-form-item {...itemProps}>
              <template slot="label">
                <info-tips desc={param.description} label={param.label}></info-tips>
              </template>
              <memory-number
                v-model={this.formModel[param.jsonKey]}
                jsonKey={param.jsonKey}
                v-on:valChange={this.handleChange}
              ></memory-number>
            </el-form-item>
          );
        case 'Group':
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <group
                key={param.jsonKey}
                description={param.description || ''}
                title={param.label || ''}
                jsonKey={param.jsonKey || ''}
              >
                <ui-schema
                  inline
                  jsonKey={param.jsonKey}
                  disabled={this.disabled}
                  uiSchema={param.subParameters}
                  v-model={this.formModel[param.jsonKey]}
                  {...{
                    on: {
                      'update:form': val => {
                        this.$set(this.formData, param.jsonKey, val);
                      },
                    },
                  }}
                ></ui-schema>
              </group>
            );
          }
          return <div />;
        case 'Structs':
          if (param.subParameters && param.subParameters.length > 0) {
            return getGroup(
              <structs
                disabled={this.disabled}
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                jsonKey={param.jsonKey}
                param={param.subParameters}
                parameterGroupOption={param.subParameterGroupOption}
                v-on:valChange={this.handleChange}
              ></structs>,
            );
          }
          return <div />;
        case 'InnerGroup':
          return (
            <inner-group
              disabled={this.disabled}
              uiSchema={param.subParameters}
              v-model={this.formModel[param.jsonKey]}
              jsonKey={param.jsonKey}
            ></inner-group>
          );
        case 'Ignore':
          if (param.subParameters && param.subParameters.length > 0) {
            return (
              <ui-schema
                uiSchema={param.subParameters}
                v-model={this.formModel[param.jsonKey]}
                key={param.jsonKey}
                jsonKey={param.jsonKey}
                inline
              ></ui-schema>
            );
          }
          return <div />;
        default:
          return <div />;
      }
    });

    const formProps = {
      props: {
        model: this.formModel,
        labelPosition: 'top',
        inline: this.inline,
        disabled: this.disabled,
      },
    };

    return (
      <el-form ref="schemaForm" size="small" {...formProps} class="ui-schema-container">
        {items}
      </el-form>
    );
  },

  // TODO change this watch
  watch: {
    formModel: {
      deep: true,
      handler() {
        this.$emit('input', this.formModel);
      },
    },
    formData: {
      deep: true,
      handler() {
        this.$emit('update:form', this.formData);
      },
    },
  },
};
