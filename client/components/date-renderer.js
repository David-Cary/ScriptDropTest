define(
  [],
  () => {
    return {
      props: ['value'],
      computed: {
        text: function() {
          if(this.value) {
            const dateValue = this.value.toDateString
              ? this.value
              : new Date(this.value);
            return dateValue.toLocaleString();
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
