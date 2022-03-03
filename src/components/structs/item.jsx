export default {
  name: 'struct-item',

  props: {
    param: {
      type: Array,
    },
    option: {
      type: Array,
    },
    value: {
      type: Object,
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

  methods: {
    delete() {},
  },

  render() {
    const { option, param } = this;
    let uiSchemas = param;
    if (option && option.length > 0) {
      const paramMap =
        param &&
        param.reduce((pre, next) => {
          pre[next.jsonKey] = next;
          return pre;
        }, {});
      uiSchemas = option.map(key => paramMap[key]);
    }

    return (
      <div class="struct-item-container">
        <div class="struct-item-content">
          <ui-schema inline ui-schema={uiSchemas} v-model={this.formModel}></ui-schema>
        </div>

        <div class="remove-option-container">
          <i
            on-click={() => {
              this.$emit('delete');
            }}
            class="el-icon-delete"
          ></i>
        </div>
      </div>
    );
  },
};
