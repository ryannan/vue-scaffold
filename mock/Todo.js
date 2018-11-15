module.exports = {
    api: '/mock/todo',

    response: function (req, res) {
        res.json({
            total: 0
        });
    }
};
