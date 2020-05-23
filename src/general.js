module.exports.init = () => {
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
