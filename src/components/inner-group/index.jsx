import './index.scss';

export default {
  name: 'inner-group',

  props: {
    uiSchema: {
      type: Array,
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

  computed: {
    formModel: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },

  render() {
    const { uiSchema, jsonKey } = this;
    return (
      <div class="group-inner-container">
        <ui-schema
          disabled={this.disabled}
          ui-schema={uiSchema}
          v-model={this.formModel}
          inline
          key={jsonKey}
        ></ui-schema>
      </div>
    );
  },
};
