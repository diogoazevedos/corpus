const Controller  = require('./Controller');
const { all, find } = require('../../Services/User');

class UserController extends Controller {
   index() {
     return all();
   }

   show(id) {
     return find(id);
   }
}

module.exports = UserController;
