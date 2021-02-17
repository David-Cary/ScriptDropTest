define(
  [],
  () => {
    return {
      props: ['value'],
      computed: {
        text: function() {
          if(this.value) {
            const parts = _.concat(
              this.value.street,
              this.value.city,
              this.value.state
            )
            const noZip = parts.join(", ");
            if(this.value.zipCode) {
              return `${noZip} ${this.value.zipCode}`
            }
            return noZip;
          }
          return "";
        }
      },
      template: `
        <span>{{text}}</span>
      `
    }
  }
)
