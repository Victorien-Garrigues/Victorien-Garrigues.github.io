import NavBar from '../components/NavbarComponent.vue';
import Federal from '../components/FederalComponent.vue';
import Ontario from '../components/OntarioComponent.vue';
import Quebec from '../components/QuebecComponent.vue';
import OpinionGraph from '../components/OpinionGraph.vue';
import ForecastGraph from '../components/ForecastGraph.vue';

export default {
    name: 'App',
    components: {
        NavBar,
        Federal,
        Ontario,
        Quebec,
        OpinionGraph,
        ForecastGraph
    },
    data() {
        return {
            currentView: "Federal",
            componentKey: 0,
        }
    },
    methods: {
        toView(view) {
            this.currentView = view;
            //this.router.push("/" + view);
        },
        forceRerender() {
            this.opinionKey += 1;
        }
    }
}