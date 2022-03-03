export default {
  name: 'info-tips',
  props: {
    desc: { type: String },
    label: { type: String },
  },
  render() {
    return (
      <span>
        {this.label}
        <if condition={!!this.desc}>
          <el-tooltip content={this.desc} placement="right">
            <i class="el-icon-question"></i>
          </el-tooltip>
        </if>
      </span>
    );
  },
};
