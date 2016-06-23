var AboutController = require('../../api/controllers/EmailController'),
  //sinon = require('sinon'),
  assert = require('assert');

describe('The Email Controller', function () {
  describe('when we load the about page', function () {
    it ('should render the view', function () {

      var view = sinon.spy();
      var config = {
        to:"dionis@localhost.com",
        cc:"test@localhost.com",
        text:"Verificando efectividad",
        subject:"Mi primer test"
      }
      Email.send(config, {
        view: view
      });
      assert.ok(view.called);
    });
  });
});
