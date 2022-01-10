export default {
  name: "struct-item",

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
        this.$emit("input", v);
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
    console.log(uiSchemas);

    return (
      <div class="struct-item-container">
        <div class="struct-item-content">
          <ui-schema
            inline
            ui-schema={uiSchemas}
            v-model={this.formModel}
          ></ui-schema>
        </div>

        <div class="remove-option-container">
          <el-button
            on-click={() => {
              this.$emit("delete");
            }}
            icon={"el-icon-remove"}
          ></el-button>
        </div>
      </div>
    );
  },
};
