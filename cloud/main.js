Parse.Cloud.define('hello', (req, res) => {
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