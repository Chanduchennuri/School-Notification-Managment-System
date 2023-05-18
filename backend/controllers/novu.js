const { Novu } = require("@novu/node");

const novu = new Novu(process.env.NOVU_API_KEY);

async function createTopic(name) {
    name = process.env.random + name
    const result = await novu.topics.create({
        key: name,
        name: name,
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Topic created : " + name)
    }
    return true
}

async function removeFromTopic(email, name) {
    name = process.env.random + name
    const result = await novu.topics.removeSubscribers(name, {
        subscribers: [email],
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Removed : " + name)
    }
}

async function addToTopic(email, name) {
    name = process.env.random + name
    const result = await novu.topics.addSubscribers(name, {
        subscribers: [email],
    })
        .catch((err) => {
            console.log(err)
            return false
        })
    if (result) {
        console.log("Added : " + name)
    }
}

async function createSubscriber(email,
    firstName,
    lastName,
    phone,
) {
    await novu.subscribers.identify(email, {
        email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
    })
    .catch((err) => {
        console.log(err)
        return false
    })
}
// createSubscriber('emsil@gmail.com','fname','lname','1234567890')


module.exports = { createTopic, removeFromTopic, addToTopic,createSubscriber }