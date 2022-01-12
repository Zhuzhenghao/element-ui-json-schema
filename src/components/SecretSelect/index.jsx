import "./index.scss";

export default {
  name: "SecretSelect",
  props: {
    value: {
      type: String,
    },
    secretKeys: {
      type: Array,
      default: () => [],
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
  methods: {},

  render() {
    const { secretKeys } = this;
    return (
      <el-select v-model={this.formModel}>
        {secretKeys.map((op) => {
          return <el-option key={op} label={op} value={op}></el-option>;
        })}
      </el-select>
    );
  },
};
