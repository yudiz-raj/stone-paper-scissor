import Phaser from "phaser";
import Level from "./src/Level";
const config = {
    type: Phaser.AUTO,
    width: 1080,
    height: 1920,
    backgroundColor: "#232323",
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    parent: "game-division",
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        orientation: Phaser.Scale.Orientation.PORTRAIT,
    },
};
const game = new Phaser.Game(config);
function preload() {

}
function create() {
    const oLevel = new Level(this);
    oLevel.create();
}
function update() {

}
