const colors = require("tailwindcss/colors")

module.exports = {
    purge: [],
    darkMode: false,
    variants: {
        extend: {},
    },
    plugins: [],
    theme: {
        extend: {},
        colors: {
            transparent: 'transparent',
            current: 'currentColor',
            black: colors.black,
            white: colors.white,
            gray: colors.gray,
            indigo: colors.indigo,
            blue: colors.blue,
            red: colors.rose,
            yellow: colors.amber,
        },
        boxShadow: {
            sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
            DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 0px 25px -5px rgba(0, 0, 0, 0.1), 0 0px 25px -5px rgba(0, 0, 0, 0.04)',
        }
    },
    variants: {
        fill: ['hover', 'focus'],
        stroke: ['hover', 'focus'],
    }
}
