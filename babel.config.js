module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['module-resolver', { root: ['.'], alias: { '@': './src' } }],
    'nativewind/babel',
    'react-native-reanimated/plugin',
  ],
}
