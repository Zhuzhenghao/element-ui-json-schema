import * as yaml from 'js-yaml';
import DefinitionCode from '../definitionCode/index.vue';

export default {
  name: 'K8sObjectsCode',
  components: {
    DefinitionCode,
  },
  props: {
    value: { type: Array },
    id: { type: String },
    jsonKey: { type: String },
    disabled: { type: Boolean, default: false },
  },
  data() {
    return {
      message: '',
      containerId: Date.now().toString(),
      valueModel: '',
    };
  },

  watch: {
    value: {
      handler() {
        if (this.value && yaml.dump(this.value) !== this.valueModel) {
          this.valueModel = yaml.dump(this.value);
        }
      },
    },
    valueModel: {
      handler(v) {
        try {
          let object = yaml.load(v);
          if (!(object instanceof Array)) {
            object = [object];
          }
          if (yaml.dump(this.value) !== v) {
            this.onChange(object);
          }
          this.message = '';
        } catch (error) {
          if (error.message === 'expected a single document in the stream, but found more') {
            try {
              const objects = yaml.loadAll(v);
              if (yaml.dump(this.value) !== v) {
                this.onChange(objects);
              }
              this.message = '';
            } catch (err) {
              this.message = err.message;
            }
          } else {
            this.message = error.message;
          }
        }
      },
    },
  },
  methods: {
    onChange(v) {
      this.$emit('input', v);
      this.$emit('valChange', { key: this.jsonKey, value: v });
    },
    customRequest(file) {
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        this.valueModel = reader.result?.toString() || '';
      };

      return false;
    },
  },
  render() {
    const { id, message, containerId, disabled } = this;
    return (
      <div id={id}>
        <if condition={message}>
          <span style={{ color: 'red' }}>{message}</span>
        </if>
        <if condition={!disabled}>
          <el-upload
            ref="upload"
            action="#"
            before-upload={this.customRequest}
            show-file-list={false}
            accept=".yaml"
          >
            <el-button type="text" style={{ border: 'none' }}>
              Upload Yaml File
            </el-button>
          </el-upload>
        </if>
        <div id={containerId}>
          <definition-code
            containerId={containerId}
            language={'yaml'}
            readOnly={disabled}
            v-model={this.valueModel}
          ></definition-code>
        </div>
        <el-alert type="warning" closable={false} show-icon style={{ marginTop: '16px' }}>
          <template slot="title">
            The input data will be automatically formatted. Ensure that the input data is a valid
            k8s resource YAML.
          </template>
        </el-alert>
      </div>
    );
  },
};
