const randomString = () => {
    return Math.random().toString(32).substring(2);
};

const shuffle = (arr) => {
    return arr.map(function(a){return [a, Math.random()]})
        .sort(function(a, b){return a[1] - b[1]})
        .map(function(a){return a[0]});
};

const randomGet = (arr) => {
    return shuffle(arr)[0];
};

const createCardAction = () => {
    const cardId = randomString();
    return {
        "id": "60563654736f294764cd24ae",
        "idMemberCreator": "59bf9128a88968082b904574",
        "data": {
            "card": {
                "id": cardId,
                "name": "test2 card",
                "idShort": 2,
                "shortLink": "CkODDjLW"
            },
            "list": {
                "id": "60562e6387a8bb7323160b91",
                "name": "test2 list"
            },
            "board": {
                "id": "6055b892f725b58c17446a5d",
                "name": "Web hook test",
                "shortLink": "7Cd40yBp"
            }
        },
        "type": "createCard",
        "date": "2021-03-20T17:52:20.231Z",
        "appCreator": null,
        "limits": {},
        "memberCreator": {
            "id": "59bf9128a88968082b904574",
            "username": "katsuyaendoh",
            "activityBlocked": false,
            "avatarHash": "83d1d722d091810f5558c22ef13ec2f1",
            "avatarUrl": "https://trello-members.s3.amazonaws.com/59bf9128a88968082b904574/83d1d722d091810f5558c22ef13ec2f1",
            "fullName": "KatsuyaENDOH",
            "idMemberReferrer": null,
            "initials": "K",
            "nonPublic": {},
            "nonPublicAvailable": true
        }
    };
};

const moveCardAction = (card) => {
    return {
        "id": "60562fb45859e87edfdb0216",
        "idMemberCreator": "59bf9128a88968082b904574",
        "data": {
            "old": {
                "idList": "60562e6387a8bb7323160b91"
            },
            "card": card,
            "board": {
                "id": "6055b892f725b58c17446a5d",
                "name": "Web hook test",
                "shortLink": "7Cd40yBp"
            },
            "listBefore": {
                "id": "60562e6387a8bb7323160b91",
                "name": "test2 list"
            },
            "listAfter": {
                "id": "60562e3db52ae605662ee495",
                "name": "test1 list"
            }
        },
        "type": "updateCard",
        "date": "2021-03-20T17:24:04.926Z",
        "appCreator": null,
        "limits": {},
        "memberCreator": {
            "id": "59bf9128a88968082b904574",
            "username": "katsuyaendoh",
            "activityBlocked": false,
            "avatarHash": "83d1d722d091810f5558c22ef13ec2f1",
            "avatarUrl": "https://trello-members.s3.amazonaws.com/59bf9128a88968082b904574/83d1d722d091810f5558c22ef13ec2f1",
            "fullName": "KatsuyaENDOH",
            "idMemberReferrer": null,
            "initials": "K",
            "nonPublic": {},
            "nonPublicAvailable": true
        }
    }
};

const addMemberToCardAction = (card, member) => {
    return {
        "id": "605edae7833a665d206ea692",
        "idMemberCreator": "59bf9128a88968082b904574",
        "data": {
            "idMember": "5a72f65a6863bc2a70dc0b9a",
            "card": card,
            "board": {
                "id": "6055b892f725b58c17446a5d",
                "name": "Web hook test",
                "shortLink": "7Cd40yBp"
            },
            member,
        },
        "type": "addMemberToCard",
        "date": "2021-03-27T07:12:39.285Z",
        "appCreator": null,
        "limits": {},
        member,
        "memberCreator": {
            "id": "59bf9128a88968082b904574",
            "username": "katsuyaendoh",
            "activityBlocked": false,
            "avatarHash": "83d1d722d091810f5558c22ef13ec2f1",
            "avatarUrl": "https://trello-members.s3.amazonaws.com/59bf9128a88968082b904574/83d1d722d091810f5558c22ef13ec2f1",
            "fullName": "KatsuyaENDOH",
            "idMemberReferrer": null,
            "initials": "K",
            "nonPublic": {},
            "nonPublicAvailable": true
        }
    };
};

const addMemberToBoardAction = (card) => {
    const memberId = randomString();
    const memberType = Math.random() < .5 ? 1: 2;
    return {
        "id": "60dd5633a9da9288ab7243d7",
        "idMemberCreator": "59bf9128a88968082b904574",
        "data": {
            "memberType": "normal",
            "idMemberAdded": memberId,
            "board": {
                "id": "6055b892f725b58c17446a5d",
                "name": "Web hook test",
                "shortLink": "7Cd40yBp"
            }
        },
        "type": "addMemberToBoard",
        "date": "2021-07-01T05:44:19.931Z",
        "appCreator": null,
        "limits": {},
        "member": {
            "id": memberId,
            "username": "koutakikuchi",
            "activityBlocked": false,
            "avatarHash": "54d1e23cce9c0873146384294074086a",
            "avatarUrl": "https://trello-members.s3.amazonaws.com/5afd0d0a4aa7922c102b2b7a/54d1e23cce9c0873146384294074086a",
            "fullName": "koutakikuchi",
            "idMemberReferrer": null,
            "initials": "K",
            "nonPublic": {},
            "nonPublicAvailable": true,
            // 自分で追加
            "type": memberType,
        },
        "memberCreator": {
            "id": "59bf9128a88968082b904574",
            "username": "katsuyaendoh",
            "activityBlocked": false,
            "avatarHash": "83d1d722d091810f5558c22ef13ec2f1",
            "avatarUrl": "https://trello-members.s3.amazonaws.com/59bf9128a88968082b904574/83d1d722d091810f5558c22ef13ec2f1",
            "fullName": "KatsuyaENDOH",
            "idMemberReferrer": null,
            "initials": "K",
            "nonPublic": {},
            "nonPublicAvailable": true
        }
    };
};

const createSampleData = () => {
    const addMemberToBoardActions = [];
    for (let i = 0; i < 15; i++) {
        addMemberToBoardActions.push(addMemberToBoardAction());
    }
    const createCardActions = [];
    for (let i = 0; i < 10; i++) {
        createCardActions.push(createCardAction());
    }
    const addMemberToCardActions = [];
    for (let i = 0; i < 20; i++) {
        const card = randomGet(createCardActions).data.card;
        const member = randomGet(addMemberToBoardActions).member;
        addMemberToCardActions.push(addMemberToCardAction(card, member));
    }
    const moveCardActions = [];
    for (let i = 0; i < 30; i++) {
        const card = randomGet(createCardActions).data.card;
        moveCardActions.push(moveCardAction(card));
    }
    console.log(createCardActions.map(createCardAction => createCardAction.data.card.id).join('\n'));
    console.log(addMemberToCardActions.map(addMemberToCardAction => addMemberToCardAction.data.card.id).join('\n'));
    return [
        ...addMemberToBoardActions,
        ...createCardActions,
        ...addMemberToCardActions,
        ...moveCardActions,
    ];
};
