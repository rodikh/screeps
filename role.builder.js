var roleUtils = require('role.utils');
var roleBuilder = {
    baseBody: [WORK, MOVE, CARRY, CARRY],
    baseMemory:  {role: 'builder'},
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.building = true;
	        creep.say('building');
	    }

	    if(creep.memory.building) {
            this.moveToAndBuild(creep, creep.memory.targetConstructionId);
	    } else {
	        this.moveToAndHarvestEnergy(creep, creep.memory.targetSourceId);
	    }
	},
	moveToAndBuild: function(creep, siteId, site) {
	    if (siteId) {
	        site = Game.getObjectById(siteId);
	    }
	    
	    if (site) {
            if (site.progress  === site.progressTotal) {
                 // get new job
            } else if (creep.build(site) == ERR_NOT_IN_RANGE) {
                creep.moveTo(site);
            }
	    }
	},
	moveToAndHarvestEnergy: function(creep, sourceId, source) {
	    if (sourceId) {
            source = Game.getObjectById(sourceId);
	    }
        if (source) {
	        if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source);
            }        
        }
	}
};

module.exports = roleBuilder;