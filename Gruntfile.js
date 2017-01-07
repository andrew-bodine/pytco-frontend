module.exports = function (grunt) {
  var includeAll = require('include-all');

  function loadTasks(relPath) {
    return includeAll({
      dirname: require('path').resolve(__dirname, relPath),
      filter: /(.+)\.js$/,
      excludeDirs: /^\.(git|svn)$/
    }) || {};
  }

  function invokeTasks(tasks) {
    for (var taskName in tasks) {
      if (tasks.hasOwnProperty(taskName)) {
        tasks[taskName](grunt);
      }
    }
  }

  var tasks = loadTasks('./tasks');

  invokeTasks(tasks);
};
