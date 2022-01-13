import structItem from "./item.jsx";
import "./index.scss";

export default {
  name: "structs",

  props: {
    param: {
      type: Array,
    },
    parameterGroupOption: {
      type: Array,
    },
    value: {
      type: Array,
    },
    jsonKey: {
      type: String,
    },
  },

  components: {
    structItem,
  },

  data() {
    return {
      structList: [],
    };
  },

  computed: {
    formModel: {
      get() {
        return this.value;
      },
      set(v) {
        this.$emit("input", v);
      },
    },
  },

  methods: {
    initValue() {
      const { parameterGroupOption = [], param = [], formModel } = this;
      if (formModel) {
        const keyMap = new Map();
        if (parameterGroupOption) {
          parameterGroupOption.map(item => {
            if (item && item.keys) {
              keyMap.set(item.keys.sort().join(), item);
            }
          });
        }
        const structList = [];
        formModel.map((item, index) => {
          const key = Date.now().toString() + index;
          const valueKeys = [];
          for (const itemkey in item) {
            valueKeys.push(itemkey);
          }
          const option = keyMap.get(valueKeys.sort().join());
          structList.push({
            key,
            option: option?.keys,
            value: formModel,
          });
        });
        this.structList = structList;
      }
    },
    addStructPlanItem(option, value) {
      const key = Date.now().toString();
      this.structList.push({
        key,
        option: option?.keys,
        value: value || [],
      });
    },

    removeStructPlanItem(key, index) {
      this.structList.forEach((item, i) => {
        if (item.key === key) {
          this.structList.splice(i, 1);
        }
      });
      this.formModel.splice(index, 1);
    },
  },
  created() {
    this.initValue();
  },

  render() {
    const { parameterGroupOption = [], param = [] } = this;
    return (
      <div class="struct-plan-container">
        <div class="struct-plan-group">
          {this.structList.map((struct, index) => (
            <struct-item
              v-model={this.formModel[index]}
              option={struct.option}
              param={param}
              key={struct.key}
              on-delete={() => this.removeStructPlanItem(struct.key, index)}
            ></struct-item>
          ))}
        </div>
        <div class="struct-plan-option">
          <If condition={parameterGroupOption.length === 0}>
            <el-button
              onClick={() => {
                this.addStructPlanItem();
              }}
              type="primary"
              plain
            >
              Add
            </el-button>
          </If>
          <If condition={parameterGroupOption.length !== 0}>
            <el-dropdown
              on-command={item => {
                this.addStructPlanItem(item);
              }}
            >
              <el-button type="primary" plain>
                Add <i class="el-icon-arrow-down el-icon--right"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                {parameterGroupOption.map(item => (
                  <el-dropdown-item command={item}>
                    {item.label || item.keys.join(":")}
                  </el-dropdown-item>
                ))}
              </el-dropdown-menu>
            </el-dropdown>
          </If>
        </div>
      </div>
    );
  },
};
