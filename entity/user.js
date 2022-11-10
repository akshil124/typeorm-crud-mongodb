var EntitySchema = require("typeorm").EntitySchema

const User = new EntitySchema({
    name : "User",
    columns: {
        name: {
            primary: true,
            type: "varchar",
        }
    },
})
module.exports=User

