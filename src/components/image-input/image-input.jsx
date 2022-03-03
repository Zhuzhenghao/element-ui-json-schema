export default {
  name: 'image-input',

  props: {
    value: {
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

  render() {
    return (
      <div>
        <el-input v-model={this.image} placeholder="please enter image"></el-input>
      </div>
    );
  },
};
