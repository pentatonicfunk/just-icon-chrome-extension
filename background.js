const iconBuildPath = 'assets/icons/build/'
const DEFAULT_ICON_ID = 'bonbon_brave'

function setIcon(iconId) {
    chrome.action.setIcon({
        path: {
            "16": iconBuildPath + "avatar_" + iconId + "-16.png",
            "32": iconBuildPath + "avatar_" + iconId +"-32.png",
            "48": iconBuildPath + "avatar_" + iconId +"-48.png",
            "128":iconBuildPath +  "avatar_" + iconId + "-128.png",
        },
    });
}

chrome.runtime.onStartup.addListener(function() {

    chrome.storage.sync.get(null, function(result) {
        let currentIconId = result.iconId;
        if (!currentIconId) {
            currentIconId = DEFAULT_ICON_ID
        }
        setIcon(currentIconId);
    });
})

