var creepUtils = require('creep.utils');
const spawnRoom = Game.spawns.Spawn1.room;

module.exports = {
    roomConstructions: spawnRoom.find(FIND_CONSTRUCTION_SITES),
    builders: creepUtils.findAllCreepsOfRoleInRoom('builder', spawnRoom),
    reprogram: function () {
        this.builders = creepUtils.findAllCreepsOfRoleInRoom('builder', spawnRoom);

        this.roomConstructions = spawnRoom.find(FIND_CONSTRUCTION_SITES);

        let creepsPerSite = 2;
        
        this.builders.forEach((builder, i) => {
            if (i >= this.roomConstructions.length) {
                i = 0;
            }
            let construction = this.roomConstructions[i];
            if (construction) {
                if (builder.memory.targetConstructionId !== construction.id) {
                    builder.memory.targetConstructionId = construction.id;
                    builder.memory.targetSourceId = construction.pos.findClosestByPath(FIND_SOURCES).id;    
                    builder.say('newCnstrct')
                }
                
            }
        });
    },
    run: function () {
        if (Game.time % 5 === 2) {
            this.reprogram();
        }
    }
};