module.exports = function(api) {
  return {
    presets: [
      ['@babel/preset-env', {modules: false}],
      ['@babel/preset-react', {development: api.env("development")}]
    ],
    plugins: [
      ['@babel/plugin-transform-runtime', {useESModules: true, version: '^7.9.6'}]
    ]
  };
};