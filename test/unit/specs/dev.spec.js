import devConf from 'config/webpack.dev.conf';

describe('check development env params', function () {
    it('check dev config plugin is an array', function () {
        expect(devConf.plugins).to.be.an('array');
    });
});
