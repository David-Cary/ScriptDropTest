define(
  [
    'components/add-order-pane',
    'components/daily-orders-pane'
  ],
  (
    AddOrderPane,
    DailyOrdersPane
  ) => {
    return {
      props: ['companyId'],
      data: function() {
        return {
          updateEvent: null
        };
      },
      components: {
        AddOrderPane,
        DailyOrdersPane
      },
      template: `
        <div>
          <AddOrderPane
            :companyId="companyId"
            @complete="updateEvent = $event"
          />
          <DailyOrdersPane
            :companyId="companyId"
            enableCancelation="true"
            :triggerRefresh="updateEvent"
          />
        </div>
      `
    }
  }
)
