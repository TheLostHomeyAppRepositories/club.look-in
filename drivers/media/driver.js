"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const homey_1 = __importDefault(require("homey"));
class MediaDriver extends homey_1.default.Driver {
    async onInit() {
        this.log('Media Driver has been initialized');
    }
    async onPairListDevices() {
        const pairingList = [];
        try {
            const devicesArray = this.homey.env.LOOKinDevices;
            const medias = [];
            devicesArray.forEach(device => {
                const savedRemotes = device.savedRC;
                if (savedRemotes && savedRemotes.length > 0) {
                    const ACRemotes = savedRemotes.filter(remote => remote.Type === '02');
                    medias.push(...ACRemotes);
                }
            });
            medias.forEach(item => {
                pairingList.push({
                    name: `${item.deviceInfo.Name}`,
                    data: {
                        id: `${item.deviceInfo.Name}${item.UUID}`
                    },
                    store: {
                        IP: item.IP,
                        ID: item.ID,
                        UUID: item.UUID,
                        functions: item.deviceInfo.Functions,
                        status: item.deviceInfo.Status
                    }
                });
            });
            return pairingList;
        }
        catch {
            return [];
        }
    }
}
module.exports = MediaDriver;
