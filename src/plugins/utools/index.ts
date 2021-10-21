import { API } from 'main/plugin/plugin/api';

export default (api: API) => {
    function activate() {
        console.log('activate');
        
        api.features.on('home', () => {
            console.log('feature: home');
            api.window.loadMain('http://localhost:3002/utools/index.html', {});
        });
    }

    function deactivate() {
        console.log('deactivate');
    }

    return {
        activate,
        deactivate,
    };
};