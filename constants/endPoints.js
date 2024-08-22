const EndPoints = {
    BaseUrl: 'http://localhost:5000/',
    User: {
        getAllUsers: '/getAllUsers',
        getUserById: '/getUserById/:id',
        searchUserByName: '/searchUserByName',
        addUserBabySitter: '/addUserBabySitter',
        addUserAdmin: '/addUserAdmin',
        addUserParent: '/addUserParent',
        updateUserBabySitter: '/updateUserBabySitter',
        updateUser: '/updateUser/:id',
        deleteUser: '/deleteUser/:id',
        addUser: '/addUser',
    },
    Auth: {
        login: '/login',
        register: '/register',
        protected:'/protected'
    }
};
module.exports = EndPoints;
