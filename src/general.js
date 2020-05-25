module.exports.harvester = () => {
    let harvesterTarget = new Set();
    Object.entries(Game.spawns).forEach(([spawnName, spawnObject]) => {
        harvesterTarget.add(spawnObject.id);
        if (spawnObject.memory.source == null) {
            spawnObject.memory.source = new Object();
            spawnObject.memory.source[spawnObject.id] = spawnObject.pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
        }
        spawnObject.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_EXTENSION}})
                .forEach((extensionObject) => {
            if (!spawnObject.memory.source.hasOwnProperty(extensionObject.id)) {
                spawnObject.memory.source[extensionObject.id] = extensionObject.pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
            }
            harvesterTarget.add(extensionObject.id);
        });
        spawnObject.room.find(FIND_MY_STRUCTURES, {filter: {structureType: STRUCTURE_TOWER}})
                .forEach((towerObject) => {
            if (!spawnObject.memory.source.hasOwnProperty(towerObject.id)) {
                spawnObject.memory.source[towerObject.id] = towerObject.pos.findClosestByPath(FIND_SOURCES, {ignoreCreeps: true}).id;
            }
            harvesterTarget.add(towerObject.id);
        });
    });
    
    if (Memory.targets == null) 
        Memory.targets = new Object();
    let targets = new Object();
    harvesterTarget.forEach(i => {
        targets[i] = 0;
    });
    
    Object.entries(Game.creeps).filter(([name, object]) => object.memory.role === "harvester").map(([name, object]) => {
        if (object.memory.target != null) {
            targets[object.memory.target]++;
        }
    });
    
    Memory.targets["harvester"] = targets;
};

module.exports.maintainer = () => {
    let maintainerTarget = new Set();
    Object.entries(Game.spawns).forEach(([spawnName, spawnObject]) => {
        spawnObject.room.find(FIND_MY_STRUCTURES)
                .forEach((structureObject) => {
            maintainerTarget.add(structureObject.id);
        });
        spawnObject.room.find(FIND_STRUCTURES, {filter: (wall) => {
                if (wall.structureType != STRUCTURE_WALL && wall.structureType != STRUCTURE_ROAD)
                    return false;
                let path = spawnObject.pos.findPathTo(wall).reverse();
                return path[0].x == wall.pos.x && path[0].y == wall.pos.y;
            }}).forEach((wallObject) => {
            maintainerTarget.add(wallObject.id);
        });
    });
    
    if (Memory.targets == null) 
        Memory.targets = new Object();
    let targets = new Object();
    maintainerTarget.forEach(i => {
        targets[i] = 0;
    });
    
    Object.entries(Game.creeps).filter(([name, object]) => object.memory.role === "maintainer").map(([name, object]) => {
        if (object.memory.target != null) {
            targets[object.memory.target]++;
        }
    });
    
    Memory.targets["maintainer"] = targets;
};
