import "./index.scss";

export default {
  name: "group",

  props: {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
  },

  data() {
    return {
      opened: false,
    };
  },

  methods: {
    toggleShowClass() {
      this.closed = !this.closed;
    },
  },

  render() {
    return (
      <div class="group-container">
        <div class="group-title-container">
          <el-row>
            <el-col span={21}>
              {this.title}
              <div class="group-title-desc">{this.description}</div>
            </el-col>
            <el-col span={3}>
              <el-switch v-model={this.opened}></el-switch>
              <i
                class={this.opened ? "el-icon-arrow-up" : "el-icon-arrow-down"}
              ></i>
            </el-col>
          </el-row>
        </div>
        {this.opened ? this.$slots.default : null}
      </div>
    );
  },
};
