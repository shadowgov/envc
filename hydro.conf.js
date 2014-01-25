module.exports = function(hydro) {
  hydro.set({
    suite: 'envc',
    formatter: 'hydro-dot',
    plugins: [ 'hydro-minimal' ],
    tests: [ 'test/*.js' ],
  });
};
