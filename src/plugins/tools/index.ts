import { API } from 'main/plugin/plugin/api';

console.log('toll entry enter');
const robot = require('robotjs');
const iohook = require('iohook');

export default (api: API) => {
    function activate() {
        console.log('tools activate');
        api.features.on('color picker', () => {
            console.log('color picker');
            // api.iohost.on('mousemove', () => {
            //     console.log('mousemove');
            // });
            iohook.on('mousemove', () => {
                console.log('mouse move');
            });

            // Speed up the mouse.
            robot.setMouseDelay(2);

            const twoPI = Math.PI * 2.0;
            const screenSize = robot.getScreenSize();
            const height = (screenSize.height / 2) - 10;
            const width = screenSize.width;

            for (let x = 0; x < width; x++)
            {
                const y = height * Math.sin((twoPI * x) / width) + height;
                robot.moveMouse(x, y);
            }
        });
    }

    function deactivate() {

    }

    return {
        activate,
        deactivate,
    };
};