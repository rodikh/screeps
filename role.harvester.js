var roleUtils = require('role.utils');
var roleHarvester = {
    baseBody: [WORK, MOVE, CARRY, CARRY],
    baseMemory:  {role: 'harvester'},
    /** @param {Creep} creep **/
    run: function(creep) {
        var source = Game.getObjectById(creep.memory.targetSourceId);
	    if(creep.carry.energy < creep.carryCapacity) {
           this.moveToAndHarvestEnergy(creep, null, source);
        }
        else {
            var store = Game.getObjectById(creep.memory.targetStoreId);
            if (!store || (store.energy && store.energy === store.energyCapacity) || (store.store && store.store[RESOURCE_ENERGY] === store.storeCapacity) ) {
                let newStoreId = this.findNewVacantStoreId(creep);
                if (newStoreId) {
                    creep.memory.targetStoreId = newStoreId;
                    creep.say('fnd strg');    
                }
            }
            
            if(creep.memory.targetStoreId) {
                this.moveToAndTransferEnergy(creep, creep.memory.targetStoreId);
            }
        }
	},
	moveToAndTransferEnergy: function (creep, targetId, target) {
	    if (targetId) {
	        target = Game.getObjectById(targetId);
	    }
        
        if (target) {
            if(creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(target);
            }    
        }
	},
	moveToAndHarvestEnergy: function (creep, sourceId, source) {
	    if (sourceId) {
	        source = Game.getObjectById(sourceId);
	    }
	    
        if(source && creep.harvest(source) == ERR_NOT_IN_RANGE) {
            creep.moveTo(source);
        }
	},
	findNewVacantStoreId: function (creep) {
        var target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return ((structure.structureType == STRUCTURE_EXTENSION ||
                        structure.structureType == STRUCTURE_SPAWN) && 
                        (structure.energy < structure.energyCapacity));
            }
        });

        if (!target) {
            target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER ||
                            structure.structureType == STRUCTURE_TOWER) && 
                            (  (structure.store && structure.store[RESOURCE_ENERGY] < structure.storeCapacity) ||
                                structure.energy && structure.energy < structure.energyCapacity);
                }
            });
            if (target) {
                console.log('Stores full - filling containers!');
                return target.id;
                
            }
            
            if (!creep.memory.targetStoreId){   // remove congestion around sources, go to last known store
                console.log('Stores full - containers full - Idling!');
                return false;
            }
        } else {
            return target.id;
        }
        
        return false;
	}
};

module.exports = roleHarvester;