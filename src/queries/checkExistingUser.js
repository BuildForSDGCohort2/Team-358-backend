module.exports = async ({User, email}) => {
	try {
		const user = await User.findOne({email});
		return !!user ? true : false;
	} catch (err) {
		return err;
	}
};
