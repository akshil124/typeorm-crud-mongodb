var EntitySchema = require("typeorm").EntitySchema

module.exports = new EntitySchema({
    name : "User",
    columns: {
        name: {
            primary: true,
            type: "varchar",
        }
    },
})

