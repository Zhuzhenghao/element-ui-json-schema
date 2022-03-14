<template>
  <codemirror
    v-model="code"
    :options="cmOptions"
    @ready="onCmReady"
  > </codemirror>
</template>

<script>
import { codemirror } from 'vue-codemirror';
import 'codemirror/mode/yaml/yaml';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/addon/scroll/simplescrollbars.css';
import 'codemirror/addon/scroll/simplescrollbars';

export default {
  name: 'DefinitionCode',
  data() {
    return {
      codeMirror: null,
      cmOptions: {
        lineNumbers: true,
        indentWithTabs: false, // 自动缩进时不使用 Tab 缩进而是使用空格
        lineWrapping: true,
        styleActiveLine: true,
        scrollbarStyle: 'overlay',
        theme: 'dracula',
        mode: 'yaml',
        readOnly: this.readOnly,
        extraKeys: {
          // 手动缩进时使用空格替换 Tab
          // 空格的数量由 'indentUnit' 配置决定，默认为 2
          Tab: cm => {
            if (cm.somethingSelected()) {
              cm.indentSelection('add');
            } else {
              const spaces = Array(cm.getOption('indentUnit') + 1).join(' ');
              cm.replaceSelection(spaces, 'end', '+input');
            }
          },
          'Ctrl-Enter': cm => {
            cm.setOption('fullScreen', !cm.getOption('fullScreen'));
          },
          'Shift-Tab': cm => {
            if (cm.somethingSelected()) {
              cm.indentSelection('subtract');
            } else {
              const cursor = cm.getCursor();
              cm.setCursor({ line: cursor.line, ch: cursor.ch - 4 });
            }
          },
        },
      },
    };
  },

  components: {
    codemirror,
  },

  props: {
    value: { type: String, default: '' },
    readOnly: {
      type: Boolean,
      default: false,
    },
    language: { type: String },
  },

  methods: {
    // 刷新 codemirror 组件
    refreshCodeMirror() {
      this.codeMirror.refresh();
    },
    // codeMirror 实例的回调
    onCmReady(cm) {
      this.codeMirror = cm;
      // 动画效果要 0.3 秒，所以等一会刷新 resize
      setTimeout(() => {
        this.refreshCodeMirror();
      }, 350);
    },
  },

  computed: {
    code: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      },
    },
  },
};
</script>

<style lang="scss">
.CodeMirror {
  height: 600px;
  line-height: 1.66667;
  font-family: Consolas;
}
</style>
