/** 自动导入 views 文件夹下所有的 routes.ts 以生成路由 */
const views = require.context('./views', true, /routes\.ts$/);
const routes = new Map();
views.keys().forEach((path) => {
    const conf = views(path).default;
    if (Array.isArray(conf)) {
        conf.forEach((v) => addRouteConfig(v));
    }
    else {
        addRouteConfig(conf);
    }
});
function addRouteConfig(conf) {
    routes.set(conf.key, conf);
}
export default routes;
