module.exports = {
    buildRoads: function(from, to, room, spawn){
        if (!room) {
            room = Game.spawns.Spawn1.room;
        }
		var path = room.findPath(from, to, { ignoreCreeps: true });
		for(var i in path)
		{
			var result = room.createConstructionSite(path[i].x, path[i].y, STRUCTURE_ROAD);
		}
	},

	buildRoadToAllSources: function(room, spawn) {
	    if (!room) {
            room = Game.spawns.Spawn1.room;
        }
        if (!spawn) {
            spawn = Game.spawns.Spawn1;
        }
		var sources = room.find(FIND_SOURCES);

		for(var i in sources)
		{
			this.buildRoads(spawn.pos, sources[i].pos, room, spawn);
		}
		
		var ctrl = room.controller;
		if (ctrl) {
		    this.buildRoads(spawn.pos, ctrl.pos, room, spawn);
		}
	},

	buildStores: function (room) {
		if (!room) {
			room = Game.spawns.Spawn1.room;
		}

		var storeTargets = [room.spawn, room.controller];


	}
};