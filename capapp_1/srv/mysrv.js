const cds = require('@sap/cds')

module.exports = class MyService extends cds.ApplicationService { init() {



  this.on ('hello', async (req) => {
    return 'On hello'+ req.data.name + '22-01-2026'
  })

  return super.init()
}}
