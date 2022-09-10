/* eslint-disable */
import { createApp, provide, h } from "vue";
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from "../apolloClient";
import App from "./App.vue";
import router from "./router";
import store from "./store";

const app = createApp({
  setup () {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App),
})

app.use(store).use(router).mount("#app");
