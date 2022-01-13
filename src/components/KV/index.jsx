function getEmptyItem() {
  return {
    key: Date.now().toString(),
    label: "",
    value: "",
  };
}

export default {
  name: "k-v",

  props: {
    jsonKey: {
      type: String,
    },
    value: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {};
  },

  computed: {
    items: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },

  methods: {
    addItem() {
      this.items.push(getEmptyItem());
    },

    remove(key) {
      this.items.forEach((item, i) => {
        if (item.key === key) {
          this.items.splice(i, 1);
        }
      });
    },
  },

  render() {
    const { items } = this;

    return (
      <div>
        <div>
          <el-button icon="el-icon-plus" onClick={this.addItem}>
            Add
          </el-button>
        </div>
        {items.map((item, index) => {
          return (
            <el-row key={item.key} gutter={20}>
              <el-col span={10}>
                <el-form-item prop={`${this.jsonKey}.${index}.label`}>
                  <el-input v-model={item.label}></el-input>
                </el-form-item>
              </el-col>
              <el-col span={10}>
                <el-form-item prop={`${this.jsonKey}.${index}.value`}>
                  <el-input v-model={item.value}></el-input>
                </el-form-item>
              </el-col>
              <el-col span={1}>
                <div class="mt-5" style={{ padding: "8px 0" }}>
                  <i
                    class="el-icon-delete"
                    onClick={() => this.remove(item.key)}
                  />
                </div>
              </el-col>
            </el-row>
          );
        })}
      </div>
    );
  },
};
