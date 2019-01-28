module.exports = function (controllers) {
    let slots = [];

    for (let controller of controllers) {
        let slot = {
            activated: controller.activated,
            id: controller.id,
            key: controller.key
        }

        slots.push(slot);
    }

    return JSON.stringify(slots);
}