module.exports = {
  content: ["./src/**/*.{html,js,vue}"],
  theme: {
    extend: {
      width: {
        '1/12': '8.3333333%'
      },
      height: {
        '1/12': '8.3333333%'
      }
    },
  },
  plugins: [
      require('@tailwindcss/typography')
  ],
}
