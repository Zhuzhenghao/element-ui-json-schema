import './index.scss';

export default {
  name: 'SecretSelect',
  props: {
    value: {
      type: String,
    },
    secretKeys: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      secrets: [],
    };
  },

  computed: {
    formModel: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },
  methods: {
    getSecretKeys(name) {
      const { secrets } = this;
      let keys = [];
      if (secrets && secrets.length) {
        secrets.map(secret => {
          if (secret.metadata.labels['app.oam.dev/sync-alias'] === name && 'data' in secret) {
            keys = Object.keys(secret.data);
          }
          return keys;
        });
      }
      return keys;
    },

    /**
     * 根据所选secret name 找出相对应的secret key可选项
     * @param {*} value
     */
    onChange(value) {
      const keys = this.getSecretKeys(value);
      this.$emit('setKeys', keys);
    },
  },

  render() {
    const { secrets } = this;
    const filters = secrets?.filter(secret => secret.metadata.labels['app.oam.dev/sync-alias']);
    return (
      <el-select v-model={this.formModel} onChange={this.onChange}>
        {filters.map(secret => {
          return (
            <el-option
              key={secret.metadata.name}
              label={secret.metadata.labels['app.oam.dev/sync-alias']}
              value={secret.metadata.labels['app.oam.dev/sync-alias']}
            ></el-option>
          );
        })}
      </el-select>
    );
  },
};
