export default {
  name: 'image-input',

  props: {
    value: {
      type: String,
    },
    jsonKey: {
      type: String,
    },
  },

  computed: {
    image: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },

  watch: {
    image: {
      immediate: true,
      handler(value) {
        this.$emit('valChange', { key: this.jsonKey, value });
      },
    },
  },

  render() {
    return (
      <div>
        <el-input v-model={this.image} placeholder="please enter image"></el-input>
      </div>
    );
  },
};
