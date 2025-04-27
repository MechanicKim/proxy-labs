module.exports = {
  async rewrites() {
    return [
      {
        source: '/:path((?!tools).*)', // 프록시 경로(/tools 제외)
        destination: 'http://localhost:3000/:path*', // 실제 주소
      }
    ];
  }
};
