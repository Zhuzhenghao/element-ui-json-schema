function getEmptyItem() {
  return {
    key: Date.now().toString(),
    label: '',
    value: '',
  };
}

export default {
  name: 'k-v',

  props: {
    jsonKey: {
      type: String,
    },
    value: {
      type: Object,
      default: () => ({}),
    },
  },

  data() {
    return {
      items: [],
      form: {},
    };
  },
  watch: {
    items: {
      deep: true,
      handler(values) {
        const obj = Object.create(null);
        values.forEach(item => {
          obj[item.label] = item.value;
        });
        this.$emit('input', obj);
        this.$emit('onChange');
      },
    },
  },
  mounted() {
    this.setValues();
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

    setValues() {
      const { value, items } = this;
      const newItems = [...items];
      if (value) {
        Object.keys(value).forEach(item => {
          const key = Date.now().toString() + item;
          newItems.push({ key, label: item, value: value[item] });
        });
      }
      this.items = [...newItems];
    },
  },

  render() {
    const { items } = this;

    return (
      <div>
        {items.map(item => {
          return (
            <el-row key={item.key} gutter={20}>
              <el-col span={11}>
                <el-form-item>
                  <el-input v-model={item.label}>
                    <template slot="prepend">key</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span={11}>
                <el-form-item>
                  <el-input v-model={item.value}>
                    <template slot="prepend">value</template>
                  </el-input>
                </el-form-item>
              </el-col>
              <el-col span={2}>
                <div class="mt-5">
                  <el-button icon="el-icon-delete" onClick={() => this.remove(item.key)} />
                </div>
              </el-col>
            </el-row>
          );
        })}
        <div class="add-btn">
          <el-button onClick={this.addItem} type="primary" plain>
            Add
          </el-button>
        </div>
      </div>
    );
  },
};
