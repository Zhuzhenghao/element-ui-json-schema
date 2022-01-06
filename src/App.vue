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
};
</script>

