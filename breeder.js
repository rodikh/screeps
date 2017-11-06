var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports = {
    roles: [{
            name: 'harvester',
            desired: 4,
            ids: [],
            config: roleHarvester
        },{
            name: 'upgrader',
            desired: 2,
            ids: [],
            config: roleUpgrader
        },{
            name: 'builder',
            desired: 3,
            ids: [],
            config: roleBuilder
        }
    ],
    rerole: function () {
        var spawn = Game.spawns['Spawn1']
        let isSpawning = false;
        this.roles.forEach((role) => {
            var creeps = spawn.room.find(FIND_MY_CREEPS, {filter: function(object) {return object.memory.role == role.name}});
            if (!isSpawning && creeps.length < role.desired) {
                // console.log('not enough creeps of type: ' + role.name, ' have ' + creeps.length +' desired '+ role.desired);
                var spawnResponse = spawn.createCreep(role.config.baseBody, undefined, role.config.baseMemory);
                if (typeof spawnResponse == 'string') {
                    console.log('Spawning', role.name, ':', spawnResponse);
                    isSpawning = true;
                } else if (spawnResponse === ERR_NOT_ENOUGH_ENERGY) {
                    // console.log('Not enough Energy to spawn', role.name);
                }
                
                if (role.name === 'harvester' && creeps.length === 0) {
                    let reassignCreep = spawn.room.find(FIND_MY_CREEPS)[0];
                    if (reassignCreep) {
                        console.log('No harvesters found! converting ' + reassignCreep.name+':'+reassignCreep.memory.role +' to harvesting');
                        reassignCreep.memory.role = 'harvester';
                        reassignCreep.say('newRole:Harv');    
                    }
                }
            }
            role.ids = creeps.map(item=>item.id);
        });
        
    },
    breed: function () {
        if (Game.time % 5 === 0) {
            this.rerole();
        }
    }
};