const { updateUserBabySitter, searchUserByName } = require("../controller/authController");

const EndPoints = {
    BaseUrl: 'http://localhost:5000/',
    User: {
        getAllUsers: '/getAllUsers',
        getUserById: '/getUserById/:id',
        searchUserByName: '/searchUserByName',
        addUserBabbySitter: '/addUserBabbySitter',
        addUserAdmin: '/addUserAdmin',
        addUserParent: 'addUserParent',
        updateUserBabySitter: '/updateUserBabySitter',
        updateUser: 'updateUser/:id',
        deleteUser: 'deleteUser/:id',
    }
};
module.exports = EndPoints;