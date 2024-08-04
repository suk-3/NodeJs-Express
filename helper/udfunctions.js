const fs = require('fs');


const udfunctions = {
    isJson: (content) => {
        try {
            return content && typeof content === 'object';
        } catch (err) {
            return false
        }
    },
    isURL: (url) => {
        try {
            const pattern = /^(https?:\/\/)?([a-z\d-]+(\.[a-z\d-]+)*\.[a-z]{2,}|(\d{1,3}\.){3}\d{1,3})(:\d+)?(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(#[-a-z\d_]*)?$/i;
            return pattern.test(url);
        } catch (err) {
            return false
        }
    },
    readFile: (filePath, isJsonContent = false) => {
        try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            return isJsonContent ? JSON.parse(fileContent) : fileContent;
        } catch (err) {
            console.error("Could not read content from", filePath)
            return null;
        }
    },
    writeFile: (filePath, content, isJsonContent = false) => {
        try {
            if (isJsonContent) { if (!udfunctions.isJson(content)) { return false } }

            content = isJsonContent ? JSON.stringify(content, null, 4) : content
            fs.writeFileSync(filePath, content)
            return true
        } catch (err) {
            console.error("Could not write content to", filePath)
            return false
        }
    },
    filenameGenerator: (fName, extension = 'txt', withData = true) => {
        if (!fName) return false
        const formatDate = new Intl.DateTimeFormat("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: false
        });
        dateAppender = withData ? "-" + formatDate.format(new Date()).replaceAll(/\/|:|, /g, "-") : ""
        return fName + dateAppender + "." + extension
    },
    sortJson: (content, key, sort = 'a') => {
        sort = ["a", "d"].includes(sort) ? sort : "a";
        if (!udfunctions.isJson(content)) return { "error": "Invalid json format" }

        return content.sort(function (a, b) {
            var x = a[key];
            var y = b[key];
            if (sort == "a") {
                return x < y ? -1 : x > y ? 1 : 0;
            } else {
                return x > y ? -1 : x < y ? 1 : 0;
            }
        });
    }
}

module.exports.udfunctions = udfunctions;