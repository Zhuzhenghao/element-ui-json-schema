import "./index.scss";

export default {
  name: "Strings",

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
        const arr = v.map(item => item.value);
        this.$emit("input", arr);
      },
    },
  },

  methods: {
    addItem() {
      this.items.push('');
    },

    remove(index) {
      this.items.forEach((item, i) => {
        if (i === index) {
          this.items.splice(i, 1);
        }
      });
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
                <el-form-item prop={`${this.jsonKey}.${index}`}>
                  <el-input v-model={items[index]}></el-input>
                </el-form-item>
              </el-col>
              <el-col span={2}>
                <div class="mt-5" style={{ padding: "8px 0 8px 12px" }}>
                  <i
                    class="el-icon-delete"
                    onClick={() => this.remove(index)}
                  />
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
