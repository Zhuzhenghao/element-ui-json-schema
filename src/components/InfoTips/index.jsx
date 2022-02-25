export default {
  name: "info-tips",
  props: {
    desc: { type: String },
    label: { type: String },
  },
  render() {
    return (
      <span>
        {this.label}
        <If condition={!!this.desc}>
          <el-tooltip content={this.desc} placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </If>
      </span>
    );
  },
};
