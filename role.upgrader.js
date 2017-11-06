var roleUtils = require('role.utils');
var roleUpgrader = {
    baseBody: [WORK, MOVE, CARRY, CARRY],
    baseMemory:  {role: 'upgrader'},
    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.carry.energy == 0) {
            creep.memory.upgrading = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.upgrading && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.upgrading = true;
	        creep.say('upgrading');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller);
            }
        }
        else {
            //TODO: find source or container
            var source = Game.getObjectById(creep.memory.targetSourceId);
            if (!source || source.store[RESOURCE_ENERGY] === 0) {
                source = roleUtils.findClosestEnergyContainerWithEnergy(creep.room.controller.pos);
                if (source) {
                    creep.memory.targetSourceId = source.id;
                    creep.say('new src');    
                } else {
                    return;
                }
            }
            
            if(creep.withdraw(source, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }
        }
	}
};

module.exports = roleUpgrader;