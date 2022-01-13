export default {
  name: "CPUNumber",
  props: {
    value: { type: String },
    description: { type: String },
  },
  computed: {
    formModel: {
      get() {
        let initValue;
        if (this.value) {
          initValue = parseFloat(this.value);
        }
        return initValue;
      },
      set(v) {
        this.$emit("input", `${v}`);
      },
    },
  },

  render() {
    return (
      <div>
        <el-input type="number" v-model={this.formModel}>
          <template slot="append">Core</template>
        </el-input>
      </div>
    );
  },
};
