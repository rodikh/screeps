var roleRepairer = {
    baseBody: [WORK, MOVE, CARRY, CARRY],
    baseMemory:  {role: 'repairer'},
    /** @param {Creep} creep **/
    run: function(creep) {
	    if(creep.memory.repairing && creep.carry.energy == 0) {
            creep.memory.repairing = false;
            creep.say('harvesting');
	    }
	    if(!creep.memory.repairing && creep.carry.energy == creep.carryCapacity) {
	        creep.memory.repairing = true;
	        creep.say('repairing');
	    }

	    if(creep.memory.repairing) {
            //this.moveToAndRepairTarget(creep, creep.memory.targetConstructionId);
	    } else {
	        //this.moveToAndHarvestEnergy(creep, creep.memory.targetSourceId);
	    }

        
        // if (!creep.memory.repairTarget) {
        //     let target = this.findClosestBrokenStructure(creep.pos);
        //     if (target)
        // }
	},
	moveToAndRepairTarget: function (creep, targetId,) {
	    
	},
	findClosestBrokenStructure: function (pos) {
	    return pos.findClosestByPath(FIND_STRUCTURES, {
            filter: (structure) => {
                return structure.hits < structure.hitsMax;
            } 
        });
	}
};

module.exports = roleRepairer;