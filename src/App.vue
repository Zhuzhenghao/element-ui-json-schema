<template>
  <div id="app">
    <ui-schema :ui-schema="schema.uiSchema"></ui-schema>
    <!-- <test></test> -->
  </div>
</template>

<script>
import UiSchema from './components/ui-schema/index.jsx';
import Test from './components/test';
import schema from './ui-schema.json';

export default {
  name: 'App',
  components: {
    UiSchema,
    // Test,
  },

  data() {
    return {
      schema,
    };
  },
};
</script>

