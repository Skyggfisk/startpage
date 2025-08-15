function initStorage() {
    // if user already exists, init has already been run once, skip it
    if (localStorage.getItem("user")) {
        return;
    }

    localStorage.setItem("user", JSON.stringify(default_user));
    localStorage.setItem("locations", JSON.stringify(default_locations));
    localStorage.setItem("titles", JSON.stringify(default_titles));
    localStorage.setItem("feeds", JSON.stringify(default_feeds));
    localStorage.setItem("quotes", JSON.stringify(default_quotes));
    localStorage.setItem("weather_config", JSON.stringify(default_weather_config));

    default_favorites.forEach((group) => {
        localStorage.setItem(`favorites_${group.title.toLowerCase()}`, JSON.stringify(group));
    });
}

function getStorageItem(key) {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
}

function updateStorageItem(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getFavoritesByGroup(groupTitle) {
    return getStorageItem(`favorites_${groupTitle.toLowerCase()}`);
}

function getAllFavorites() {
    const allFavorites = [];

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key.startsWith("favorites_")) {
            const group = getStorageItem(key);
            allFavorites.push(group);
        }
    }

    return allFavorites;
}

function updateFavoritesGroup(groupTitle, newLinks) {
    const groupKey = `favorites_${groupTitle.toLowerCase()}`;
    const existingGroup = getStorageItem(groupKey) || { title: groupTitle, links: [] };
    existingGroup.links = newLinks;
    updateStorageItem(groupKey, existingGroup);
}