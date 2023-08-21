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
        ],
      },
      {
        source: '/(.*).jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400, immutable',
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
        ],
      },
    ]
  },
}
