export default {
  name: "image-input",

  props: {
    value: {
      type: String,
    },
    description: { type: String },
  },

  computed: {
    image: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },

  render() {
    return (
      <div>
        <el-input
          v-model={this.image}
          placeholder="please enter image"
        ></el-input>
        <div class="title-desc">{this.description}</div>
      </div>
    );
  },
};
