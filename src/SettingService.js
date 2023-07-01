const settings = require("./settings.json");

class SettingService {
    static get(key, options = { error: true }) {
        if (!key) {
            return settings;
        }

        const nestedKeys = key.split(".");
        return nestedKeys.reduce((currentObj, nextKey, index) => {
            const nextValue = currentObj[nextKey];
            const pathToCurrentValue = nestedKeys.filter((key, i) => i <= index).join(".");
            const furtherKeys = nestedKeys.filter((key, i) => i > index).join(".");
            if (nextValue === undefined && options.error === false) {
                return null;
            }

            if (nextValue === undefined && !furtherKeys) {
                throw new Error(`No env variable set for "${pathToCurrentValue}"`);
            }

            if (nextValue === undefined) {
                throw new Error(`No env variable set for "${pathToCurrentValue}", cannot find property "${furtherKeys}"`);
            }

            if (index !== nestedKeys.length - 1 && typeof nextValue !== "object") {
                throw new Error(
                    `"${pathToCurrentValue}" is not an object, cannot find property "${furtherKeys}"`
                );
            }

            return nextValue;
        }, settings);
    }
}

module.exports = SettingService;
