var req = require.context('../src/components/', true, /index\.js$/)
req.keys().forEach(req)
