import "./index.scss";

export default {
  name: "inner-group",

  props: {
    uiSchema: {
      type: Array,
    },
    value: {
      type: Object,
    },
  },

  render() {
    const { uiSchema, value } = this;
    return (
      <div class="group-inner-container">
        <ui-schema uiSchema={uiSchema} value={value} inline></ui-schema>
      </div>
    );
  },
};
