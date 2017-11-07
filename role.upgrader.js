var creepUtils = require('creep.utils');
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
            if (!source || (source.store && source.store[RESOURCE_ENERGY] === 0) || (source.energy && source.energy === 0)) {
                source = creepUtils.findClosestEnergyContainerWithEnergy(creep.room.controller.pos);
                if (source) {
                    creep.memory.targetSourceId = source.id;
                    creep.say('new src');
                } else {
                    return;
                }
            }

            creepUtils.moveToAndGetEnergy(creep, null, source);
        }
	}
};

module.exports = roleUpgrader;