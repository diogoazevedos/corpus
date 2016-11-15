const Controller = require('./Controller');
const { all, find } = require('../../Services/User');

class UserController extends Controller {
   static index() {
     return all();
   }

   static show(id) {
     return find(id);
   }
}

module.exports = UserController;
