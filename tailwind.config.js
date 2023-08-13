/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        font: {
          black: '#25282B',
          light: '#52575C',
          grey: '#A0A4A8',
        },
        status: {
          completed: {
            primary: '#27A54D',
            secondary: '#D7F4E8'
          },
          pending: {
            primary: '#FEA102',
            secondary: '#FDF5E5'
          },
          canceled: {
            primary: '#FC2929',
            secondary: '#FEE7E6'
          },
          active: {
            primary: '#7F60D2',
            secondary: '#F2EFFB'
          },
        },
        sec: {
          100: '#BFAFE9',
          200: '#7F60D2',
        },
        blue:{
          100: '#33a3ff'
        },
        grey: {
          100: '#E4EAEF',
          200: '#F7F7F7',
          300: '#6D7175'
        }
      },
    },
  },
  plugins: [],
}