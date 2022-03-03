import './index.scss';

export default {
  name: 'group',

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
            <el-col span={3} class="flexcenter">
              <el-switch v-model={this.opened}></el-switch>
              {/* <If condition={this.opened}>
                <i class="el-icon-arrow-up icon"></i>
              </If> */}
            </el-col>
          </el-row>
        </div>
        <If condition={this.opened}>
          <div class="group-box">{this.$slots.default}</div>
        </If>
        <If condition={!this.opened}>
          <div class="group-box disable" />
        </If>
      </div>
    );
  },
};
