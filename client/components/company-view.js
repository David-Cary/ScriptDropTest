define(
  [
    'components/pharmacy-view',
    'components/courier-view'
  ],
  (
    PharmacyView,
    CourierView
  ) => {
    return {
      data: function() {
        return {
          loginFields: {
            name: '',
            password: ''
          },
          companyDetails: null,
          errorText: ''
        };
      },
      methods: {
        logIn: function() {
          this.$http.post(
            'log-in',
            this.loginFields
          )
          .then(response => this.companyDetails = response.body)
          .catch(e => this.errorText = e.body);
        }
      },
      components: {
        PharmacyView,
        CourierView
      },
      template: `
        <div v-if="!companyDetails">
          <div>
            <label>Company Name</label>
            <input type="text" v-model="loginFields.name"/>
          </div>
          <div>
            <label>Password</label>
            <input type="text" v-model="loginFields.password"/>
          </div>
          <div>
            <button @click="logIn()">Log In</button>
          </div>
          <div>{{errorText}}</div>
        </div>
        <div v-else>
          <header>
            Welcome, {{loginFields.name}}
          </header>
          <div>
            <PharmacyView
              v-if="companyDetails.type == 'pharmacy'"
              :companyId="companyDetails.id"
            />
            <CourierView
              v-else-if="companyDetails.type == 'courier'"
              :companyId="companyDetails.id"
            />
          </div>
        </div>
      `
    };
  }
);
