import "./index.scss";
import KV from "../KV/index.jsx";

function setValues(target, value, key, keys) {
  if (!keys || keys.length == 0) {
    target[key] = value;
    return target;
  }
  if (target[key]) {
    target[key] = setValues(target[key], value, keys[0], keys.slice(1));
    return target;
  }
  target[key] = setValues({}, value, keys[0], keys.slice(1));
  return target;
}

function getValues(target, key, newValues) {
  if (!target) {
    newValues[key] = target;
    return;
  }

  if (typeof target === "object") {
    const keys = Object.keys(target);
    keys.map(subkey => {
      getValues(target[subkey], key ? key + "." + subkey : subkey, newValues);
    });
  } else {
    newValues[key] = target;
  }
}

export default {
  name: "HelmValues",
  components: { KV },
  props: {
    jsonKey: {
      type: String,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    onChange: values => {
      let helmValues = {};
      if (values) {
        Object.keys(values).map(key => {
          const keys = key.split(".");
          helmValues = setValues(
            helmValues,
            values[key],
            keys[0],
            keys.slice(1)
          );
        });
      }
      this.props.onChange(helmValues);
    },

    renderValue: () => {
      const newValues = {};
      getValues(this.props.value, "", newValues);
      return newValues;
    },
  },

  render() {
    return <k-v jsonKey={this.jsonKey} v-model={value}></k-v>;
  },
};
