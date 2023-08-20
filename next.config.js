module.exports = {
  async headers() {
    return [
      {
        source: '/(.*).jpg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400',
          },
        ],
      },
      {
        source: '/(.*).jpeg',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400',
          },
        ],
      },
      {
        source: '/(.*).png',
        headers: [
          {
            key: 'Cache-Control',
            value: 'max-age=400',
          },
        ],
      },
    ]
  },
}
