// base path
const iconBuildPath   = 'assets/icons/build/'
const iconIds         = [
  'bonbon_brave',
  'bonbon_corn',
  'bonbon_grass',
  'bonbon_ninja',
  'bonbon_ocean',
  'bonbon_rewards',
  'bonbon_royal',
  'edgy_brave',
  'edgy_corn',
  'edgy_grass',
  'edgy_ninja',
  'edgy_ocean',
  'edgy_royal',
  'gleam_brave',
  'gleam_corn',
  'gleam_grass',
  'gleam_ninja',
  'gleam_ocean',
  'gleam_rewards',
  'gleam_royal',
  'oval_brave',
  'oval_corn',
  'oval_grass',
  'oval_ninja',
  'oval_ocean',
  'oval_rewards',
  'oval_royal',
  'paladin_brave',
  'paladin_corn',
  'paladin_grass',
  'paladin_ninja',
  'paladin_ocean',
  'paladin_rewards',
  'paladin_royal',
]
const DEFAULT_ICON_ID = 'bonbon_brave'
let icons             = {}
for (const iconId of iconIds) {
  icons[iconId] = {
    '16' : iconBuildPath + 'avatar_' + iconId + '-16' + '.png',
    '32' : iconBuildPath + 'avatar_' + iconId + '-32' + '.png',
    '48' : iconBuildPath + 'avatar_' + iconId + '-48' + '.png',
    '128': iconBuildPath + 'avatar_' + iconId + '-128' + '.png',
  }
}

// chrome.storage.sync.set({
//     testing: "testings"
// }, function() {
//     // get current whole data
//     chrome.storage.sync.get(null, function(result) {
//         console.log(result);
//     });
// });

// get current whole data

// iconid chunks for display purpose
const iconIdChunks = []
items              = [].concat(...iconIds)
while (items.length) {
  iconIdChunks.push(
    items.splice(0, 6)
  )
}

chrome.storage.sync.get(null, function (result) {
  let currentIconId = result.iconId
  if (!currentIconId) {
    currentIconId = DEFAULT_ICON_ID
  }

  let selectorHtml = ''
  for (const iconIdsChunk of iconIdChunks) {
    selectorHtml += '<div class="grid">'
    for (const iconId of iconIdsChunk) {
      selectorHtml += '<div>' +
                      '<label for="' + iconId + '">' +
                      '<input type="radio" id="' + iconId + '" name="icon-id" value="' + iconId + '" ' + (iconId === currentIconId ? 'checked' : '') + '>' +
                      '<img src="' + icons[iconId][48] + '" alt="icon"/>' +
                      '</label>' +
                      '</div>'
    }
    selectorHtml += '</div><hr/>'
  }

  document.getElementById('icon-selector').innerHTML = selectorHtml

  var handler = function (data) {
    const iconId = this.value
    chrome.storage.sync.set({ iconId })

    chrome.action.setIcon({
      path: icons[iconId],
    })
  }

  const radios = document.getElementsByName('icon-id')
  for (let i = radios.length; i--;) {
    radios[i].onclick = handler
  }
})
