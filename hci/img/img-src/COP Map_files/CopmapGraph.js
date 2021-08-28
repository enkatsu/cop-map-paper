
class CopmapGraph {
    constructor(actions = []) {
        this.actions = actions;
        this.currentActionIndex = 0;
        this.nodes = [];
        this.links = [];
        this.cards = [];
    }

    step() {
        // console.log(`${this.currentActionIndex}: ${this.actions.length}`);
        // console.log({
        //     currentActionIndex: this.currentActionIndex,
        //     length: this.actions.length,
        //     nodes: this.nodes,
        //     links: this.links,
        // });
        if (!this.updateGraph()) {
            return null;
        }
        this.currentActionIndex++;
        if (this.currentActionIndex == this.actions.length) {
            return null;
        }
        return {
            nodes: this.nodes,
            links: this.links,
        }
    }

    updateGraph() {
        const action = this.actions[this.currentActionIndex];
        if (!action) {
            return;
        }
        if (action.type === 'createCard') {
            const card = Object.assign({}, action.data.card);
            card.members = [];
            this.cards.push(card);
        } else if (action.type === 'deleteCard') {
        } else if (action.type === 'updateCard') {
            if (action.data.listBefore && action.data.listAfter) {
                const card = this.cards.find(card => card.id === action.data.card.id);
                // *** 作業回数のカウントアップ ***
                const cardMemberIds = card.members.map(member => member.id);
                this.nodes.filter(node => {
                    return cardMemberIds.includes(node.id);
                }).forEach(node => node.count++);
                // *** 共同作業回数のカウントアップ ***
                card.members.slice(0, card.members.length - 1).forEach((source, i) => {
                    card.members.slice(i + 1).forEach(target => {
                        const link = this.links.find(link => {
                            const sourceIds = JSON.stringify([link.source.id, link.target.id].sort());
                            const linkIds = JSON.stringify([source.id, target.id].sort());
                            return sourceIds == linkIds;
                        });
                        if (link) {
                            link.count += 1;
                        } else {
                            this.links.push({
                                id: action.id,
                                source: source.id,
                                target: target.id,
                                count: 0,
                            });
                        }
                    });
                });
            }
        } else if (action.type === 'addMemberToCard') {
            const card = this.cards.find(card => {
                return card.id === action.data.card.id;
            });
            card.members.push(action.member);
            if (!this.nodes.find(node => node.id === action.member.id)) {
                this.nodes.push({
                    ...action.member,
                    count: 1,
                });
            }
        } else if (action.type === 'removeMemberFromCard') {
            const card = this.cards.find(card => card.id === action.data.card.id);
            card.members = card.members.filter(members => members.id !== action.member.id);
        }
        return {
            nodes: [],
            links: [],
        };
    }
}
