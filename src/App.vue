<template>
  <div id="app">
    <ui-schema
      ref="uiSchema"
      :ui-schema="schema.uiSchema"
      v-model="data"
    ></ui-schema>

    {{data}}
    <el-button
      type="primary"
      @click="validate"
    >
      提交
    </el-button>
  </div>
</template>

<script>
import schema from './ui-schema.json';

export default {
  name: 'App',

  data() {
    return {
      schema,
      data: {},
    };
  },
  methods: {
    validate() {
      this.$refs.uiSchema
        .validate()
        .then((valid) => {
          console.log(valid);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.data = {
      image: 'nginx:last111',
      memory: '5Mi',
      cpu: '0.1',
      imagePullPolicy: 'Always',
      exposeType: 'ClusterIP',
      cmd: ['npm', 'hhhh'],
      env: [
        { name: '12', valueFrom: {} },
        { name: '2', value: '3' },
      ],
      ports: [],
      volumeMounts: {},
      readinessProbe: {},
      livenessProbe: {
        exec: {
          command: ['nothing'],
        },
      },
      annotations: {},
      imagePullSecrets: [],
      port: 8080,
      volumes: [],
      labels: {},
      addRevisionLabel: true,
    };
  },
};
</script>

