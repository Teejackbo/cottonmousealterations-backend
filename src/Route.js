class Route {
    constructor(path, handler, method) {
        this.path = path;
        this.handler = handler;
        this.method = method;
        this.middleware = [];
    }

    static get(path, handler) {
        return new Route(path, handler, "get");
    }

    static post(path, handler) {
        return new Route(path, handler, "post");
    }

    static put(path, handler) {
        return new Route(path, handler, "put");
    }

    static delete(path, handler) {
        return new Route(path, handler, "delete");
    }

    withMiddleware(middleware) {
        this.middleware.push(middleware);
        return this;
    }

    hasMiddleware() {
        return this.middleware.length > 0;
    }
}

module.exports = Route;
