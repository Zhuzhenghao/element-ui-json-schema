export default {
  name: 'MemoryNumber',
  props: {
    value: { type: String },
    jsonKey: { type: String },
  },
  computed: {
    formModel: {
      get() {
        let initValue = '';
        if (this.value) {
          initValue = this.value.replace('Mi', '');
        }
        return initValue;
      },
      set(v) {
        this.$emit('input', `${v}Mi`);
      },
    },
  },

  watch: {
    formModel: {
      handler(value) {
        this.$emit('valChange', { key: this.jsonKey, value: value ? `${value}Mi` : null });
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
