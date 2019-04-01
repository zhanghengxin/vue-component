// module.exports = {
//   presets: [
//     '@vue/app'
//   ]
// }

const plugins = []

module.exports = {
    presets: [['@vue/app', {'useBuiltIns': 'entry'}]],
    plugins: plugins
}