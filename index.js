
const install = (Vue) => {

    const routedLinks = [];

    const isRouted = (link) => {
        return routedLinks.includes(link);
    }

    const isInternal = (link) => {
        return link.host === window.location.host
    }

    const isFile = (link) => {
        return link.pathname.split('/').pop().indexOf('.') > -1;
    }

    const addListeners = (vue) => {
        if (typeof vue.$el.getElementsByTagName !== 'function') return;
        let links = vue.$el.getElementsByTagName('a');
        for (let link of links) {
            if (!isRouted(link) && isInternal(link) && !isFile(link)) {
                routedLinks.push(link)
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    let path = link.href.replace(window.location.origin, '');
                    vue.$root._router.push(path);
                    vue.$router.push(path);
                }, false);
            }

        }
    }

    const collectRouterLinks = (vue) => {
        if (vue.$options._componentTag === 'router-link') {
            routedLinks.push(vue.$el);
        }
    }

    Vue.mixin({

        beforeCreate: function() {
            if (typeof this.$router === 'undefined') throw new Error('Install Vue Router in order to use Routerize');
        },

        mounted: function() {
            collectRouterLinks(this);
            addListeners(this, 'mounted');
        },
        updated: function() {
            collectRouterLinks(this);
            addListeners(this, 'updated');
        }
    });

};

export default install;