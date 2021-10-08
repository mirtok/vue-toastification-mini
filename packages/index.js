/* @remove-on-es-build-begin */
const ENV = process.env.NODE_ENV;
if (
    ENV !== 'production' &&
    ENV !== 'test' &&
    typeof console !== 'undefined' &&
    console.warn &&
    typeof window !== 'undefined'
) {
    console.warn(
        'You are using a whole package of li-toast-model, ' +
        'please use https://www.npmjs.com/package/babel-plugin-import to reduce app bundle size.',
    );
}


import packageInfo from '../package.json';
import { default as message } from './message';
import { default as notification } from './notification';

const components = []
const install = function (Vue) {
    components.map(component => {
        Vue.use(component);
    });

    Vue.prototype.$message = message;
    Vue.prototype.$notification = notification;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}

export default {
    version:packageInfo.version,
    install,
};

export{
    message,
    notification
}