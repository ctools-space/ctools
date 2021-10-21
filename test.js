const iohook = require('iohook');
iohook.on('mousemove', () => {
    console.log('mousemove');
});