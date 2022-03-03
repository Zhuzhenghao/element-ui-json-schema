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
    closed: {
      type: Boolean,
      default: true,
    },
  },

  data() {
    return {
      opened: false,
    };
  },

  watch: {
    closed: {
      handler(val) {
        this.opened = !val;
      },
    },
  },

  // methods: {
  //   toggleShowClass() {
  //     this.closed = !this.closed;
  //   },
  // },

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
        <if condition={this.opened}>
          <div class="group-box">{this.$slots.default}</div>
        </if>
        <if condition={!this.opened}>
          <div class="group-box disable" />
        </if>
      </div>
    );
  },
};
