export async function checkIfUserExists({ref, email}) {
	try {
		const user = await ref.findOne({email});
		return !!user ? true : false;
	} catch (err) {
		return err;
	}
}

export async function findUserByEmail({ref, email}) {
	try {
		const user = await ref.findOne({email});
		return user
	} catch (err) {
		return err;
	}
}
