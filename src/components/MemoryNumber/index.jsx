export default {
  name: 'MemoryNumber',
  props: {
    value: { type: String },
  },
  computed: {
    formModel: {
      get() {
        let initValue = '';
        if (this.value) {
          initValue = parseInt(this.value.replace('Mi', ''));
        }
        return initValue;
      },
      set(v) {
        this.$emit('input', v + 'Mi');
      },
    },
  },

  render() {
    return (
      <div>
        <el-input type="number" v-model={this.formModel} min={0}>
          <template slot="append">MB</template>
        </el-input>
      </div>
    );
  },
};
