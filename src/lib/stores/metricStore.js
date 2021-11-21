import { writable } from "svelte/store";

const metricsData = writable({
    consoleData: [
        "Welcome to Crops",
        "This is a WIP",
    ],
    debugData: ["All clear..."], // future me will use this to keep track of t
    mouseEventData: {},
    totalKeyboardEvents: 0,
    totalMouseEvents: "N/A",
    totalMoves: 0
});

const Metrics = {
    subscribe: metricsData.subscribe,
    addConsole: str => {
        metricsData.update(self => {
            typeof str === "string"
                ? self.consoleData = [...self.consoleData, str]
                : self.debugData = [...self.debugData, str]

            return self
        })
    },
    addDebug: err => {
        metricsData.update(self => {
            self.debugData = [...self.debugData, err]

            return self
        })
    },
    addEventData: mouseObj => {
        metricsData.update(self => {
            self.mouseEventData = { ...mouseObj }
            return self
        })
    },
    addTotalKeyboardEvents: () => {
        metricsData.update(self => {
            self.totalKeyboardEvents = self.totalKeyboardEvents + 1
            return self
        })
    },
    addTotalMouseEvents: () => {
        metricsData.update(self => {
            self.totalMouseEvents = self.totalMouseEvents + 1
            return self
        })
    },
    addTotalMoves: () => {
        metricsData.update(self => {
            self.totalMoves = self.totalMoves + 1
            return self
        })
    }
};

export default Metrics;
