'use strict';

console.log('=====> In controllers.error.js');

function index (req, res) {
    res.render('error/index', {
        title: 'Peter Tan'
    });
}

module.exports = {
    index: index
};
