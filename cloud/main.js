Parse.Cloud.define('hello', (req, res) => {
  res.succes('hello!');
});

Parse.Cloud.define('wechatlogin', (req, res) => {
  var code = req.params.code;
  //获取openId 
  Parse.Cloud.httpRequest({
    url: 'https://api.weixin.qq.com/sns/jscode2session',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
      appid: 'wxc14d0ff891dbbb64',
      secret: '654f6c6559336fa79d13c85e4cb2e080',
      js_code: code,
      grant_type: 'authorization_code',
    }
  }).then(function (httpResponse) {
    console.log(httpResponse.text);
  }, function (httpResponse) {
    console.error('Request failed with response code ' + httpResponse.status);
  });

  res.succes('hello!');
});



Parse.Cloud.beforeSave("Device", function (request, response) {
  const query = new Parse.Query("Device");
  query.count()
    .then(function (count) {
      let device = request.object;
      console.log(`beforeSave:Device:${device.get('uuid')}`)
      if (!device.get('uuid')) {
        if (count <= 0) {
          count = 1;
        }
        else {
          count++;
        }
        let uuid = '';
        if (count < 10) {
          uuid = `000${count}`;
        } else if (count < 100) {
          uuid = `00${count}`;
        } else if (count < 1000) {
          uuid = `0${count}`;
        } else if (count < 10000) {
          uuid = `${count}`;
        } else {
          uuid = `${count}`;
        }
        device.set('uuid', uuid);
      }
      response.success();
    }, function (error) {
      response.error(error);
    })
});