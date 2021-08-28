$(async function() {
    /**
     * actionの配列をグラフ構造のデータにして返す
     * @param {*} actions 
     * @returns {nodes, links}
     */
    const actions2graph = (actions) => {
        groupedActions.updateCard;
        groupedActions.addMemberToCard;
        groupedActions.removeMemberFromCard;

        const nodes = [];
        const links = [];
        const cards = [];
        actions.forEach(action => {
            if (action.type === 'createCard') {
                const card = Object.assign({}, action.data.card);
                card.members = [];
                cards.push(card);
            } else if (action.type === 'deleteCard') {
            } else if (action.type === 'updateCard') {
                if (action.data.listBefore && action.data.listAfter) {
                    console.log(cards);
                    const card = cards.find(card => card.id === action.data.card.id);
                    // *** 作業回数のカウントアップ ***
                    const cardMemberIds = card.members.map(member => member.id);
                    nodes.filter(node => {
                        return cardMemberIds.includes(node.id);
                    }).forEach(node => node.count++);
                    // *** 共同作業回数のカウントアップ ***
                    card.members.slice(0, card.members.length - 1).forEach((source, i) => {
                        card.members.slice(i + 1).forEach(target => {
                            const link = links.find(link => {
                                return link.source === source.id && link.target === target.id ||
                                    link.source === target.id && link.target === source.id;
                            });
                            if (link) {
                                link.count += 1;
                            } else {
                                links.push({
                                    source: source.id,
                                    target: target.id,
                                    count: 1,
                                });
                            }
                        });
                    });
                }
            } else if (action.type === 'addMemberToCard') {
                const card = cards.find(card => {
                    return card.id === action.data.card.id;
                });
                card.members.push(action.member);
                if (!nodes.find(node => node.id === action.member.id)) {
                    nodes.push({
                        ...action.member,
                        count: 0,
                    });
                }
            } else if (action.type === 'removeMemberFromCard') {
                const card = cards.find(card => card.id === action.data.card.id);
                card.members = card.members.filter(members => members.id !== action.member.id);
            }
        });
        return { nodes, links };
    };

    const actionTypes = [
        'createCard',
        'deleteCard',
        'updateCard',
        'addMemberToCard',
        'removeMemberFromCard',
        'addMemberToBoard',
    ];
    const filter = actionTypes.join(',');
    const url = new URL(window.location.href);
    const params = url.searchParams;
    const boardId = params.get('id');
    const token = localStorage.getItem('trello_token');
    if (!boardId | !token) {
        window.location.href = '/';
    }
    const key = 'ba4c46f918b61fa980082ff6f13790db';

    // DEBUG
    const actions = createSampleData();
    console.log(actions);
    // const actions = (await requestJoinedActions(boardId, token, key, filter)).reverse();
    // const actions = (await d3.json('./assets/json/sample/actions.json'));
    // const members = await requestMembers(boardId, token, key);
    // const members = await d3.json('./assets/json/sample/members.json');
    const groupedActions = groupBy(actions, action => action.type);
    const graph = actions2graph(actions);
    // console.log(graph);

    // *** visualization ***
    const svg = d3.select('svg')
        .style('background-color', '#EEEEEE');
    const width = svg.attr('width');
    const height = svg.attr('height');
    const color = d3.scaleOrdinal(d3.schemeCategory10);

    let links = svg.append('g')
        .attr('class', 'links')
        .selectAll('line')
        .data([])
        .enter()
        .append('line')
        .attr('class', 'link')
        .attr('stroke-width', 1)
        .attr('stroke', 'black');
    let nodes = svg.append('g')
        .attr('class', 'nodes')
        .selectAll('circle')
        .data([])
        .enter()
        .append('circle')
        .attr('class', 'node')
        .attr('r', d => d.count)
        .attr('fill', function (d) { return color(d.id); });
    nodes.append('title')
        .text(function (d) { return d.id; });

    const distanceScale = d3.scaleLinear()
        .domain([0, d3.max(graph.links, function(d) { return d.count; })])
        .range([0, 100]);
    const strengthScale = d3.scaleLinear()
        .domain([0, d3.max(graph.links, function(d) { return d.count; })])
        .range([0, 1]);
    const maxRadius = d3.max(graph.nodes, function(d) { return d.count });
    console.log(maxRadius);
    const simulation = d3.forceSimulation()
        .force('links',
            d3.forceLink()
                .strength(function (d, i, ds) {
                    return strengthScale(d.count);
                })
                .distance(function(d) {
                    return maxRadius * 2;
                })
                .id(function (d) { return d.id; })
        )
        .force('charge', d3.forceManyBody())
        .force('center', d3.forceCenter(width / 2, height / 2))
        .on('tick', function() {
            svg.selectAll('.link')
                .attr('x1', function (d) { return d.source.x; })
                .attr('y1', function (d) { return d.source.y; })
                .attr('x2', function (d) { return d.target.x; })
                .attr('y2', function (d) { return d.target.y; });
            svg.selectAll('.node')
                .attr('cx', function (d) {
                    const radius = d.count;
                    d.x = Math.max(radius, Math.min(width - radius, d.x));
                    return d.x;
                })
                .attr('cy', function (d) {
                    const radius = d.count;
                    d.y = Math.max(radius, Math.min(height - radius, d.y));
                    return d.y;
                });
        });

    const dragstarted = d => {
        if (!d3.event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    const dragged = d => {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    const dragended = d => {
        if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }

    const copmapActionGraph = new CopmapGraph(actions);
    const update = () => {
        const graph = copmapActionGraph.step();
        if (!graph) {
            return;
        }
        links = svg
            .select('.links')
            .selectAll('.link')
            .data(graph.links)
            .enter()
            .append('line')
            .merge(links)
            .attr('class', 'link')
            // .attr('id', d => d.id)
            .attr('stroke-width', 1)
            .attr('stroke', 'black');
        console.log(graph.nodes);
        nodes = svg
            .select('.nodes')
            .selectAll('.node')
            .data(graph.nodes)
            .enter()
            .append('circle')
            .merge(nodes)
            // .attr('id', d => d.id)
            .attr('class', 'node')
            .attr('r', function (d) { return d.count; })
            .attr('fill', function (d) {
                return color(d.type);
                // return color(d.id);
            });
        nodes.call(d3.drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        );

        // MEMO: https://bl.ocks.org/bumbeishvili/6793014c7f0f7838c5a0a8c99d5e818c
        simulation.nodes(graph.nodes);
        simulation.force('links')
            .links(graph.links);
        simulation.alpha(1).restart();
    };
    d3.interval(update, 100);
});
