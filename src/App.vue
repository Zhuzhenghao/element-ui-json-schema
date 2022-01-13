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
      image: 'nginx:last',
      memory: '',
      cpu: '',
      imagePullPolicy: '',
      exposeType: 'ClusterIP',
      cmd: ['npm', 'hhhh'],
      env: [
        { name: '12', valueFrom: {} },
        { name: '2', value: '3' },
      ],
      ports: [],
      volumeMounts: {},
      readinessProbe: {},
      livenessProbe: {},
      annotations: [],
      imagePullSecrets: [],
      port: '',
      volumes: [],
      labels: [],
      addRevisionLabel: true,
    };
  },
};
</script>

