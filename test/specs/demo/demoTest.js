let _ = require('lodash')

describe('my awesome website', () => {

  it('can run multiple browsers and collect rtc data', () => {
    let webdriverio = require('webdriverio');


    let caps = {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: { args: ['--disable-notifications',
                                '--disable-user-media-security',
                                '--use-fake-ui-for-media-stream',
                                '--use-fake-device-for-media-stream',
                                '--use-file-for-fake-video-capture=/Users/blubecker/ls_work/lsRtcTest/test/y4m_files/tt_sif.y4m'] }
      }
    }

    let client = webdriverio.multiremote({
        browserA: caps,
        browserB: caps
    });

    let WebdriverRTC = require('webdriverrtc');
    WebdriverRTC.init(client,  {
        browser: 'browserA' // define browser that collects data
    })

    let browserA = client.select('browserA')
    let browserB = client.select('browserB')

    browsers = [ browserA, browserB ]

    let users = [
        { email: 'bob1staging@lubecker.com', password: 'password1' },
        { email: 'bob2staging@lubecker.com', password: 'password1' },
        { email: 'bob3staging@lubecker.com', password: 'password1' }]

    return client
    .init()
    .url('https://dev-client.lifesizecloudbeta.com')
    .pause(2000)
    .click('a=Login')
    .call(() => {
      return browserA.setValue('input#email', users[0].email)
      .then(() => browserB.setValue('input#email', users[1].email))
    })
    .setValue('input#password', users[0].password)
    .click('button=Login')
    .pause(5000)
    .click('a=Call')
    .setValue('input[placeHolder="Number"]', '9326723608')
    .click('button=Call')
    .pause(10000)
    .call(() => {
        return browserA.startAnalyzing()
        .getConnectionInformation()
        .then((connectionType) => {
          console.log('connectionType:', connectionType)
        })
        .pause(20000)
        .getStats(20000)
        .then(data => {
          console.log('mean:', data.mean)
          console.log('median:', data.median)
          console.log('max:', data.max)
          console.log('min:', data.min)
          //console.log('rawdata:', data.rawData) // this is huge
        })
    })
    .end()
  })
});
