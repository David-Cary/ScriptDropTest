define(
  [
    'components/input-address-pane'
  ],
  (
    InputAddressPane
  ) => {
    return {
      props: ['companyId'],
      data: function() {
        return {
          orderFields: this.createOrder(),
          addressValid: false,
          statusText: ''
        };
      },
      computed: {
        isValid: function() {
          return (
            this.orderFields.name != '' &&
            this.addressValid &&
            this.orderFields.pickUpDate != ''
          );
        }
      },
      methods: {
        createOrder: function() {
          return {
            pharmacy: this.companyId,
            name: '',
            address: null,
            pickUpDate: '',
            pickUpTime: '00:00'
          };
        },
        onAddressChange: function(data) {
          this.orderFields.address = data.value;
          this.addressValid = data.isValid;
        },
        addOrder: function() {
          this.$http.post(
            'order',
            this.orderFields
          )
          .then(response => {
            this.statusText = `Order ${response.body.id} added.`;
            this.$emit('complete', response.body);
          })
          .catch(e => this.statusText = e.body);
        },
        reset: function() {
          this.orderFields = this.createOrder();
          this.addressValid = false;
          this.statusText = '';
        }
      },
      components: {
        InputAddressPane
      },
      template: `
        <div>
          <div>
            <label>New Order</label>
          </div>
          <div>
            <label>Patient Name</label>
            <input type="text" v-model="orderFields.name"/>
          </div>
          <div>
            <label>Address</label>
            <InputAddressPane
              :value="orderFields.address"
              @change="onAddressChange($event)"
            />
          </div>
          <div>
            <label>Pickup Date</label>
            <input type="date" v-model="orderFields.pickUpDate"/>
          </div>
          <div>
            <label>Pickup Time</label>
            <input type="time" v-model="orderFields.pickUpTime"/>
          </div>
          <button
            :disabled="!isValid"
            @click="addOrder()"
          >
            Add Order
          </button>
          <button @click="reset()">Clear Fields</button>
          <div>{{statusText}}</div>
        </div>
      `
    }
  }
)
