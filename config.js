'use strict'

module.exports = {
    mailer: {
        service: 'Gmail',
        auth: {
            user: 'somemail@gmail.com',
            pass: 'somemail'
        }
	},
	localdbConnection: 'mongodb://localhost:27017/resortdb',
    liveConnectString: 'mongodb://resort_locator:resort22@ds227322.mlab.com:27322/resort-locator-db',
    sessionKey: 'resortkey'
}
