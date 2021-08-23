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
        }
    }
}
