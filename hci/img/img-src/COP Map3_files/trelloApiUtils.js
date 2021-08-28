
const requestJoinedActions = async (boardId, token, key, filter, actionsBuffer = []) => {
    const url = new URL(`https://api.trello.com/1/boards/${boardId}/actions`);
    url.searchParams.append('token', token);
    url.searchParams.append('key', key);
    url.searchParams.append('filter', filter);
    url.searchParams.append('limit', 100);
    if (actionsBuffer.length !== 0) {
        const lastAction = actionsBuffer[actionsBuffer.length - 1];
        const beforeId = lastAction.id;
        url.searchParams.append('before', beforeId);
    }
    const result = await d3.json(url.href);
    if (result.length === 0) {
        return actionsBuffer;
    }
    return await requestJoinedActions(boardId, token, key, filter, actionsBuffer.concat(result));
};

const requestMembers = async (boardId, token, key) => {
    const url = new URL(`https://api.trello.com/1/boards/${boardId}/members`);
    url.searchParams.append('token', token);
    url.searchParams.append('key', key);
    return await d3.json(url.href);
};