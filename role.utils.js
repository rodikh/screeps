/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('role.utils');
 * mod.thing == 'a thing'; // true
 */

module.exports = {
	moveToAndHarvestEnergy: function (creep, sourceId, source) {
	    if (sourceId) {
	        source = Game.getObjectById(sourceId);
	    }
	    
        if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
	},
	moveToAndTransferEnergyTo: function (creep, targetId, target) {
	    if (targetId) {
	        target = Game.getObjectById(targetId);
	    }
        
        if (target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }    
        }
	},
	moveToAndTransferEnergyFrom: function (creep, targetId, target) {
	    if (targetId) {
	        target = Game.getObjectById(targetId);
	    }
        
        if (target) {
            if(creep.withdraw(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
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
	}
	
};