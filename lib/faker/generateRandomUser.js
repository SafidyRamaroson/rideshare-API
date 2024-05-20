const {faker} = require("@faker-js/faker");
const db = require("./../../models/index");


const generateRandomUser  = async(numberOfUserTogenerate) => {
    
    for(let countUserCreated = 0 ; countUserCreated < numberOfUserTogenerate; countUserCreated ++){
        
        const existingEmails = new Set();
        let firstName,lastName,email,dateOfBirth;

        do{
            firstName = faker.person.firstName();
            lastName = faker.person.lastName();
            email = faker.internet.email({firstName,lastName});
            dateOfBirth = faker.date.birthdate();
        }while(existingEmails.has(email))
        existingEmails.add(email);

        try {
            await db.user.create({
                firstName,
                lastName,
                email,
                password:firstName + lastName,
                dateOfBirth,
                gender:faker.helpers.arrayElement(['Mr', 'Md', 'not-specified'])
            });
            console.log(countUserCreated);
        } catch (error) {
            console.error('Error creating user:', error);
        }
    }
}

module.exports = generateRandomUser;