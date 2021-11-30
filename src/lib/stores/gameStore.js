/**
 * Future work:
 * - Ryan's Private AI and idea
 * - Display Class = * - Map Render, Utility for Map / Enity / Object Renders/ 
 * - https://tympanus.net/Tutorials/CustomCursors/index5.html
 * -  Tick fn with time utitlity and color shading
 */

import { Display, FOV } from "rot-js";
import ColorSwatch from "./../scripts/ColorSwatch";
import Entity from "./../scripts/Entity";
import Maps from "./../scripts/Maps";
import Utility from "./../scripts/Utility";


import Metrics from "../stores/metricStore";
import { writable } from "svelte/store";

const dieselEngine = writable({
    display: null,
    displayOptions: {
        bg: ColorSwatch.bgDark,
        fg: ColorSwatch.red[4],
        fontSize: 10,
        fontFamily: "'PressStart2P', cursive",
        forceSquareRatio: true,
        height: 24,
        spacing: 1.2,
        width: 24,
    },
    // Start with a locked game
    locked: true,
    map: new Maps({ mapHeight: 34, mapWidth: 34 }),
    player: null,
    // Engine Mechanics
    EngineLock() {
        if (this.locked) Metrics.addDebug("Game already locked.");
        else this.locked = true;
    },
    EngineUnlock(tracking) {
        if (!this.locked)
            Metrics.addDebug(
                "Game already unlocked. You should not be trying the action: " +
                tracking
            );
        else this.locked = false;
        this.EngineUpdate();
    },
    EngineUpdate() {
        this.EngineLock();
    },
    handleInputClickMove(dx, dy, d, inputType) {
        d === "player" ? this.move(dx, dy, this.player.facing, inputType) : this.move(dx, dy, d, inputType)
    },
    handleInput(inputType, inputData) {
        if (inputType === "keydown") {
            Metrics.addEventData(this.map.tiles[this.player.pos[0].x][this.player.pos[0].y])
            Metrics.totalKeyboardEvents; // Total Keyboard Event Tracking
            // West
            if (inputData.key === "ArrowLeft") this.move(-1, 0, 6, 0);
            // East
            else if (inputData.key === "ArrowRight") this.move(1, 0, 2, 0);
            // North
            else if (inputData.key === "ArrowUp") this.move(0, -1, 0, 0);
            // South
            else if (inputData.key === "ArrowDown") this.move(0, 1, 4, 0);
            // North West
            else if (inputData.keyCode === 36) this.move(-1, -1, 7, 0);
            // North East
            else if (inputData.keyCode === 33) this.move(1, -1, 1, 0);
            // South East
            else if (inputData.keyCode === 34) this.move(1, 1, 3, 0);
            // South West
            else if (inputData.keyCode === 35) this.move(-1, 1, 5, 0);
            // Wait
            else if (inputData.keyCode === 12)
                this.move(0, 0, this.player.facing, 0);
        } else if (inputType === "mousemove") {
            let mouseInputsCoords = this.display.eventToPosition(inputData)
            if (mouseInputsCoords[0] >= 0 && mouseInputsCoords[1] >= 0) {
                const offsets = this.renderGetOffsets();
                if (this.player.pos[0].x === offsets.x + mouseInputsCoords[0] && this.player.pos[0].y === offsets.y + mouseInputsCoords[1]) {
                    Metrics.addEventData({ explored: "yas", name: "it's u", walkable: "yas" })
                } else if (!this.map.tiles[offsets.x + mouseInputsCoords[0]][offsets.y + mouseInputsCoords[1]].explored) {
                    Metrics.addEventData({ explored: "false", name: "?", walkable: "?" })
                } else {
                    Metrics.addEventData(this.map.tiles[offsets.x + mouseInputsCoords[0]][offsets.y + mouseInputsCoords[1]])
                }
            } else {
                Metrics.addEventData({ explored: "move or mouseover", name: "move or mouseover", walkable: "move or mouseover" })
            }
        }
    },
    move(dx, dy, d, inputType) {
        if (this.player.facing !== d) {
            this.player.facing = d;
            inputType === 0
                ? Metrics.addTotalKeyboardEvents()
                : Metrics.addTotalMouseEvents()
            this.renderDisplay();
        } else {
            if (this.player.tryMove(this.map, dx, dy)) {
                this.renderDisplay();
                inputType === 0
                    ? Metrics.addTotalKeyboardEvents()
                    : Metrics.addTotalMouseEvents()
                Metrics.addTotalMoves(); // Total Moves Tracking
                Metrics.addConsole(
                    "you moved: " + Utility.returnDirection(dx, dy)
                ); // Console Logging
                this.EngineUnlock("move");
            } else Metrics.addDebug("tried to move, did not work"); // Error Logging
        }
    },
    renderDisplay() {
        const { height, width } = this.displayOptions;
        const { char, facing, fg, pos } = this.player;
        const displayB = this.display;
        const lightpasses = (x, y) => {
            return this.map.tiles[x] !== undefined && this.map.tiles[x][y] !== undefined
                ? this.map.tiles[x][y].lightPasses
                : false;
        };
        const fov = new FOV.RecursiveShadowcasting(lightpasses);
        const offsets = this.renderGetOffsets();

        for (let x = offsets.x; x < offsets.x + width; x++) {
            for (let y = offsets.y; y < offsets.y + height; y++) {
                let tile = this.map.tiles[x][y];
                this.display.draw(
                    x - offsets.x,
                    y - offsets.y,
                    tile.char,
                    tile.explored ? tile.fg : ColorSwatch.bgDark,
                    tile.explored ? tile.bg : ColorSwatch.bgDark
                );
            }
        }

        fov.compute90(
            pos[0].x,
            pos[0].y,
            5,
            facing,
            (
                x,
                y,
                r,
            ) => {
                const fovX = x - offsets.x;
                const fovY = y - offsets.y;

                if (
                    this.map.tiles[x] !== undefined &&
                    this.map.tiles[x][y] !== undefined
                ) {
                    let ch = r ? this.map.tiles[x][y].char : "@";
                    let color = this.map.tiles[x][y] ? ColorSwatch.red[4] : fg;
                    displayB.draw(fovX, fovY, ch, color);
                    this.map.tiles[x][y].explored = true
                }
            }
        );
        // draw player last   
        for (let i = 0; i < this.player.pos.length; i++) {
            // draw structure if it exist
            this.display.draw(pos[i].x - offsets.x, pos[i].y - offsets.y, char, fg);
        }
    },
    renderGetOffsets() {
        const { height, width } = this.displayOptions;
        const { pos } = this.player;
        let topLeftX = Math.max(0, pos[0].x - width / 2);
        topLeftX = Math.min(topLeftX, this.map.mapWidth - width);
        let topLeftY = Math.max(0, pos[0].y - height / 2);
        topLeftY = Math.min(topLeftY, this.map.mapHeight - height);
        return {
            x: topLeftX,
            y: topLeftY,
        };
    },
    // Start Game
    init(gameContainer) {
        this.display = new Display(this.displayOptions);
        gameContainer.appendChild(this.display.getContainer());
        // Bind keyboard input events for game to display
        let bindEventToScreen = (event) => {
            window.addEventListener(event, (e) => {
                this.handleInput(event, e);
            });
        };
        bindEventToScreen("mousemove");
        bindEventToScreen("keydown");
        this.player = new Entity({
            char: "@",
            fg: ColorSwatch.red[1],
            pos: [{ x: 13, y: 14 }, { x: 12, y: 14 }, { x: 14, y: 14 },
            { x: 13, y: 13 }, { x: 12, y: 13 }, { x: 14, y: 13 },
            { x: 13, y: 15 }, { x: 12, y: 15 }, { x: 14, y: 15 },]
        });
        this.renderDisplay()
    }
});

const Game = {
    subscribe: dieselEngine.subscribe,
    clickMove: (dx, dy, d, inputType) => {
        dieselEngine.update(self => {
            self.handleInputClickMove(dx, dy, d, inputType)
            return self
        })
    },


};

export default Game;
