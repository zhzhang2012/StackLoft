module.exports = function(app) {

    /**
     * Routes are handled by Angular in the front-end,
     * so rendering the boilerplate and
     * catch potential errors are enough here.
     */
    app.get('/', function (req, res) {
        res.render('index');
    });

    // 如果任何路由都没匹配到，则认为 404
    // 生成一个异常让后面的 err handler 捕获
    app.use(function (req, res, next) {
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    // error handlers

    // 如果是开发环境，则将异常堆栈输出到页面，方便开发调试
    if (app.get('env') === 'development') {
        app.use(function (err, req, res, next) {
            res.status(err.status || 500);
            res.render('error', {
                message: err.message,
                error: err
            });
        });
    }

    // 如果是非开发环境，则页面只输出简单的错误信息
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: {}
        });
    });
};

