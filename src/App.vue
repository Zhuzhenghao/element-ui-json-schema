<template>
  <div id="app">
    <ui-schema
      :ui-schema="schema.uiSchema"
      v-model="data"
    ></ui-schema>

    {{data}}
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
      annotations: [],
      imagePullSecrets: [],
      port: 8080,
      volumes: [],
      labels: [],
      addRevisionLabel: true,
    };
  },
};
</script>

