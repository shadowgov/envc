module.exports = function(hydro) {
  hydro.set({
    formatter: 'hydro-dot',
    plugins: [ 'hydro-minimal' ],
    tests: [ 'test/*.js' ],
  });
};
