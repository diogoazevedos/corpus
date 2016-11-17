const Controller = require('./Controller');
const { all, find, store } = require('../../Services/User');

class UserController extends Controller {
   static index() {
     return all();
   }

   static show(id) {
     return find(id);
   }

   static store(request) {
     return store(request);
   }
}

module.exports = UserController;
