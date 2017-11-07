/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.utils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
    moveToAndGetEnergy: function (creep, targetId, target) {
        if (targetId) {
            target = Game.getObjectById(targetId);
        }

        if (target &&
            ((target instanceof Source && creep.harvest(target) == ERR_NOT_IN_RANGE) ||
            (target instanceof StructureContainer && creep.withdraw(target,RESOURCE_ENERGY)  == ERR_NOT_IN_RANGE))) {
            if (creep.role === "builder") {
                console.log('upgrader: moving to harvest');
            }
            creep.moveTo(target);
        }
    },
    moveToAndGiveEnergy: function (creep, targetId, target) {
        if (targetId) {
            target = Game.getObjectById(targetId);
        }

        if (target) {
            if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }
        }
    },
    findClosestEnergyContainerWithEnergy: function (pos) {
        return pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return (structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0);
            }
        });
    },
    findAllCreepsOfRoleInRoom: function (role, room) {
        return room.find(FIND_MY_CREEPS, {filter: (object) => object.memory.role == role});
    }

};