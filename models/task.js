'use strict';

const titleRegExp = /^(([a-z])+.)+[A-Z\s]([a-z])+$/;
// const titleRegExp = /^[a-zA-Z]+[a-zA-Z\s]+[a-zA-Z]$/;

module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define('Task', {
    title: {
      type: DataTypes.STRING,
      validate: {
        matchesTitleRegexp: function (value) {
          if(!titleRegExp.test(value)) {
            throw new Error(`The title "${value}" does not match title regexp!`);
          }
        }
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });

  return Task;
};
