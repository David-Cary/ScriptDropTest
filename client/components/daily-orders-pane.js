define(
  [
    'components/address-renderer',
    'components/date-renderer'
  ],
  (
    AddressRenderer,
    DateRenderer
  ) => {
    return {
      props: [
        'companyId',
        'enableCancelation',
        'enableDelivery',
        'triggerRefresh'
      ],
      data: function() {
        return {
          orders: [],
          errorText: ''
        };
      },
      methods: {
        refreshOrders: function() {
          this.orders = [];
          this.errorText = '';
          if(this.companyId) {
            this.$http.get(`daily-orders-for/${this.companyId}`)
            .then(response => this.orders = response.body)
            .catch(e => this.errorText = e.body);
          }
        },
        cancelOrder: function(order) {
          this.$http.put("order/cancel", { id: order.id })
          .then(response => order.canceled = response.body.canceled)
          .catch(e => alert(`Cancelation Error: ${e.body}`));
        },
        confirmDelivery: function(order) {
          this.$http.put("order/delivered", { id: order.id })
          .then(response => order.delivered = response.body.delivered)
          .catch(e => alert(`Confirm Delivery Error: ${e.body}`));
        }
      },
      created: function() {
        this.refreshOrders();
      },
      watch: {
        // This is a work around to Vue wanting to only dispatch events
        // upward to a parent.
        triggerRefresh: function() {
          this.refreshOrders();
        }
      },
      components: {
        AddressRenderer,
        DateRenderer
      },
      template: `
        <table>
          <thead>
            <tr>
              <th>Order #</th>
              <th>Patient Name</th>
              <th>Adress</th>
              <th>Pickup Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(order, index) in orders" :key="index">
              <td>{{order.id}}</td>
              <td>{{order.name}}</td>
              <td>
                <AddressRenderer :value="order.address"/>
              </td>
              <td>
                <DateRenderer :value="order.pickUpDate" />
              </td>
              <td>
                <span v-if="order.delivered">Delivered</span>
                <button
                  v-else-if="enableDelivery"
                  :disabled="order.canceled"
                  @click="confirmDelivery(order)"
                >
                  Confirm Delivery
                </button>
              </td>
              <td>
                <span v-if="order.canceled">Canceled</span>
                <button
                  v-else-if="enableCancelation"
                  :disabled="order.delivered"
                  @click="cancelOrder(order)"
                >
                  Cancel Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      `
    }
  }
)
