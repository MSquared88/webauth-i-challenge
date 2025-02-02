
exports.up = function (knex) {
	return knex.schema.createTable('users', tbl => {
		tbl
			.increments()
		
		tbl 
			.string('username', 56)
			.notNullable()
			.unique()
		
		tbl
			.string('password')
			.notNullable()


	})
};

exports.down = function (knex) {
	return knex.schema.dropTableIfExsists('users')
};
