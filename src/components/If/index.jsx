export default {
  name: "IF",
  props: {
    condition: { type: Boolean },
  },
  render(){
    return (
      this.condition ? this.$slots.default : null
    )
  }
};
