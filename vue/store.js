Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        event_id: 105,
        api_url: `${window.location.origin}/api/v1`,
        page_url: `${window.location.origin}`,
        dummy_image_url: 'https://via.placeholder.com/',
        user_level: 50
    },
    getters: {
        event_id: function (state) {
            // this.$store.getters.event_id
            return state.event_id;
        },
        user_level: function (state) {
            // this.$store.getters.user_level
            return state.user_level;
        },
        api_url: function (state) {
            return state.api_url;
        },
        page_url: function (state) {
            return state.page_url;
        },
        dummy_image_url: function (state) {
            // this.$store.getters.dummy_image_url(['600x400', '/aaa/fff']);
            return function (args) {
                return `${state.dummy_image_url}/${args[0]}${args[1]}`;
            }
        }
    },
    mutations: {
        event_id(state, payload) {
            // this.$store.commit('event_id', {event_id: '107', value: ''})
            state.event_id = payload.event_id;
        },
        user_level(state, payload) {
            // this.$store.commit('user_level', {user_level: '107', value: ''})
            state.user_level = payload.user_level;
        }
    },
    plugins: [
        createPersistedState({
            storage: window.sessionStorage,
        })
    ]
})