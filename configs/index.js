'use strict';

/**
 * Dependencies
 */
const
    _ = require('lodash'),
    env = process.env.NODE_ENV || 'local',
    envConfig = require('./' + env);

let defaultConfig = {
    env: env
};

module.exports = _.merge(defaultConfig, envConfig);
