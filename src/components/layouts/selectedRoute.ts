export const selectedRoute = (activeRoute: string, routes: string[]) => {
    let closestRoute = null;
    let maxCommonLength = 0;

    routes.filter(x => x).forEach(route => {
        let commonLength = 0;
        const minLen = Math.min(activeRoute.length, route.length);

        for (let i = 0; i < minLen; i++) {
            if (activeRoute[i] === route[i]) {
                commonLength++;
            } else {
                break;
            }
        }

        if (commonLength > maxCommonLength) {
            maxCommonLength = commonLength;
            closestRoute = route;
        }
    });

    return closestRoute;
}