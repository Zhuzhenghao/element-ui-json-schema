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
        <div class="string-plan-option">
          <el-button
            onClick={() => {
              this.addItem();
            }}
            type="primary"
          >
            Add
          </el-button>
        </div>
        {items.map((item, index) => {
          return (
            <el-row key={item.key}>
              <el-col span={20}>
                <el-form-item prop={`${this.jsonKey}.${index}`}>
                  <el-input v-model={items[index]}></el-input>
                </el-form-item>
              </el-col>
              <el-col span={1}>
                <div class="mt-5" style={{ padding: "8px 0" }}>
                  <i
                    class="el-icon-minus"
                    onClick={() => this.remove(index)}
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
