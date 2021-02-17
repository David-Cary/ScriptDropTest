require(
  [
    'components/company-view'
  ],
  (
    CompanyView
  ) => {
    // Config communications with backend.
    Vue.http.options.root = "http://localhost:3000/";

    // Set up app UI.
    var app = new Vue({
      el: '#app',
      computed: {},
      components: {
        CompanyView
      },
      template: `
        <CompanyView/>
      `
    });
  }
);
