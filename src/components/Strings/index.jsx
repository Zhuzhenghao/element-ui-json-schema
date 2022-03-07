import './index.scss';

export default {
  name: 'Strings',

  props: {
    jsonKey: { type: String },
    value: { type: Array, default: () => [] },
  },

  computed: {
    items: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit('input', v);
      },
    },
  },

  watch: {
    items: {
      handler(value) {
        this.$emit('valChange', {
          key: this.jsonKey,
          value: value.length ? value : null,
        });
      },
    },
  },

  methods: {
    addItem() {
      this.items.push('');
    },

    remove(index) {
      this.items.splice(index, 1);
    },
  },

  render() {
    const { items } = this;
    return (
      <div class="string-plan-container">
        {items.map((item, index) => {
          return (
            <el-row key={item.key}>
              <el-col span={22}>
                <el-form-item>
                  <el-input v-model={items[index]}></el-input>
                </el-form-item>
              </el-col>
              <el-col span={2}>
                <div class="mt-5">
                  <el-button icon="el-icon-delete" onClick={() => this.remove(index)} />
                </div>
              </el-col>
            </el-row>
          );
        })}
        <div class="string-plan-option">
          <el-button
            onClick={() => {
              this.addItem();
            }}
            type="primary"
            plain
          >
            Add
          </el-button>
        </div>
      </div>
    );
  },
};
