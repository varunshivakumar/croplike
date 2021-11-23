import Tiles from "./Tiles";

class Entity extends Tiles {
  constructor(properties) {
    super(properties);
    this.facing = 4;
    this.pos = [...properties.pos] || [[0, 0]];
  }
  canGoThere(map, dx, dy) {
    // Stops the player from going off screen
    for (let i = 0; i < this.pos.length; i++) {
      let potPosX = this.pos[i].x + dx
      let potPosY = this.pos[i].y + dy
      let tile = map.tiles[potPosX][potPosY];
      if (!tile.walkable) return false
    }
    return true
  }
  checkPosition(x, y) {
    for (let i = 0; i < this.pos.length; i++) {
      if (this.pos[0].x === x && this.pos[i][1] === y) {
        return true
      }
    }
    return false
  }
  outOfBounds(map, dx, dy) {
    // Stops the player from going off screen
    for (let i = 0; i < this.pos.length; i++) {
      let potPosX = this.pos[i].x + dx
      let potPosY = this.pos[i].y + dy
      if (potPosX < 0 || potPosY < 0 || potPosX >= map.mapWidth || potPosY >= map.mapHeight) {
        return true
      }
    }
    return false

    // return x < 0 || y < 0 || x >= this.mapWidth || y >= this.mapHeight;
  }
  setPosition(dx, dy) {
    for (let i = 0; i < this.pos.length; i++) {
      this.pos[i].x += dx
      this.pos[i].y += dy
    }
  }
  tryMove(map, dx, dy) {
    if (this.outOfBounds(map, dx, dy)) {
      return false;
    } else {

      let potPosX = this.pos[0].x + dx
      let potPosY = this.pos[0].y + dy

      if (this.pos[0].x === potPosX && this.pos[0].y === potPosY) {
        return true;
      }
      if (this.canGoThere(map, dx, dy)) {
        this.setPosition(dx, dy);
        return true;
      }
      return false;
    }
  }
}

export default Entity;
