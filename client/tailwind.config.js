module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {
      height: {
        "492px": "492px",
        "day": "calc(100vh/8)"
      },
      width: {
        "monthPicker": "285px !important"
      }
    }
  },
}