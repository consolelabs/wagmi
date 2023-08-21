const etag = require('etag')

module.exports = {
  async headers() {
    return [
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400, immutable',
          },
          {
            key: 'Etag',
            value: etag(Date.now().toString()),
          },
        ],
      },
      {
        source: '/(.*).jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400, immutable',
          },
          {
            key: 'Etag',
            value: etag(Date.now().toString()),
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400, immutable',
          },
          {
            key: 'Etag',
            value: etag(Date.now().toString()),
          },
        ],
      },
    ]
  },
}
