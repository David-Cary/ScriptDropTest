define(
  [],
  () => {
    return {
      props: ['value'],
      data: function() {
        return {
          address: this.createAddress(this.value)
        };
      },
      computed: {
        isValid: function() {
          return (
            this.address.street.length > 0 &&
            this.address.city != '' &&
            this.address.state != '' &&
            this.address.zipCode != ''
          );
        }
      },
      methods: {
        createAddress: function(source) {
          return _.defaultsDeep(
            {},
            source,
            {
              street: [],
              city: '',
              state: '',
              zipCode: ''
            }
          );
        },
        onFieldChange: function(fieldName) {
          this.$emit(
            'change',
            {
              value: _.clone(this.address),
              isValid: this.isValid
            }
          );
        },
        onStreetChange: function() {
          this.address.street = this.address.street.filter(line => line);
          this.onFieldChange();
        },
        onStateChange: function() {
          this.address.state = this.address.state.toUpperCase();
          this.onFieldChange();
        },
        onZipCodeChange: function() {
          this.address.zipCode = this.address.zipCode.replace(/[^\d\-]/g, '');
          this.onFieldChange();
        }
      },
      watch: {
        // Force a refresh if we get a new address.
        value: function() {
          this.address = this.createAddress(this.value);
        }
      },
      template: `
        <div>
          <div>
            <input
              type="text"
              placeholder="Street"
              v-model="address.street[0]"
              @input="onStreetChange()"
            />
          </div>
          <div v-if="address.street[0]">
            <input
              type="text"
              v-model="address.street[1]"
              @input="onStreetChange()"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="City"
              v-model="address.city"
              @input="onFieldChange()"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="State"
              v-model="address.state"
              @input="onStateChange()"
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Zip Code"
              v-model="address.zipCode"
              @input="onZipCodeChange()"
            />
          </div>
        </div>
      `
    }
  }
)
