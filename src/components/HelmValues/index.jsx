import './index.scss';
import KV from '../KV/index.jsx';

function setValues(target, value, key, keys) {
  if (!keys || keys.length === 0) {
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

  if (typeof target === 'object') {
    const keys = Object.keys(target);
    keys.map(subkey => {
      getValues(target[subkey], key ? `${key}.${subkey}` : subkey, newValues);
      return null;
    });
  } else {
    newValues[key] = target;
  }
}

export default {
  name: 'HelmValues',
  components: { KV },
  props: {
    jsonKey: {
      type: String,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    renderValue() {
      const newValues = {};
      getValues(this.value, '', newValues);
      return newValues;
    },
  },
  methods: {
    onChange(values) {
      let helmValues = {};
      if (values) {
        Object.keys(values).map(key => {
          const keys = key.split('.');
          helmValues = setValues(helmValues, values[key], keys[0], keys.slice(1));
          return helmValues;
        });
      }
      this.$emit('input', helmValues);
    },
  },

  render() {
    return (
      <k-v jsonKey={this.jsonKey} v-model={this.renderValue} v-on:onChange={this.onChange}></k-v>
    );
  },
};
