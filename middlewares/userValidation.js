const yup = require("yup");
const userModel = require("../models/userSchema");

module.exports.userValidation = async (req, res, next) => {
    try {
        const schema = yup.object().shape({
            email: yup.string()
                .required("Email is required")
                .test(
                    "email_unique",
                    "This email already exists",
                    async function (value) {
                        const isUnique = await checkEmail(value);
                        return isUnique;
                    }
                ),
            name: yup.string()
                .required("Name is required")
                .min(3, "The name should be at least 3 characters long")
                .max(15, "The name should be less than 15 characters"),
            password: yup.string()
                .required("Password is required")
                .min(6, "Password should be at least 6 characters long")
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
                    "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special symbol like: Exemple@720"
                ),
        });

        async function checkEmail(email) {
            const existingUser = await userModel.findOne({email});
            return !existingUser;
        }

        await schema.validate(req.body);
        next();
    } catch (error) {
        console.log({error});
        return res.status(500).json({error: error.message });
    }
};
