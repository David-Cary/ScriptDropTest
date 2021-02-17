define(
  [
    'components/daily-orders-pane'
  ],
  (
    DailyOrdersPane
  ) => {
    return {
      props: ['companyId'],
      components: {
        DailyOrdersPane
      },
      template: `
        <div>
          <DailyOrdersPane
            :companyId="companyId"
            enableDelivery="true"
          />
        </div>
      `
    }
  }
)
