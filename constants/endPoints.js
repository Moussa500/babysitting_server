const { updateUserParent } = require("../controller/usersController");

const EndPoints = {
    BaseUrl: 'http://localhost:5000/',
    User: {
        getAllUsers: '/getAllUsers',
        getUserById: '/getUserById/:id',
        searchUserByName: '/searchUserByName',
        updateUserBabySitter: '/updateUserBabySitter/:id',
        updateUserAdmin: '/updateUserAdmin/:id',
        updateUserParent:'/updateUserParent/:id',
        deleteUser: '/deleteUser/:id',
        addUser: '/addUser',
    },
    Auth: {
        login: '/login',
        register: '/register',
        protected:'/protected'
    },
    Permission:{
        getAdminPermission:'/getAdminPermission/:id',
        assignPermission:'/assignPermission/:email',
    },
    booking:{
        bookSitter:'/bookSitter',
        cancelBooking:'/cancelBooking',
    }
};
module.exports = EndPoints;
