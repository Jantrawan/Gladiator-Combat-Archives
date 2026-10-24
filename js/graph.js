/**
 * Knowledge Graph Interactive Visualization
 * Powered by vis-network and Neo4j Cypher query integration
 */

let network = null;
let graphData = null;

const GROUP_COLORS = {
  Gladiator: { background: '#c5c5c5', border: '#ffffff', font: { color: '#121212', face: 'Bai Jamjuree', bold: true } },
  Category: { background: '#85776d', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } },
  Weapon: { background: '#2e4053', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } },
  Origin: { background: '#5e4b42', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } },
  Arena: { background: '#1c2a49', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } },
  School: { background: '#3c2f2f', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } },
  default: { background: '#3b3b3b', border: '#a6a6a6', font: { color: '#ffffff', face: 'Bai Jamjuree' } }
};

document.addEventListener('DOMContentLoaded', async () => {
  setupGraphControls();
  await loadGraphData();
});

async function loadGraphData() {
  const container = document.getElementById('network-container');
  if (!container) return;

  try {
    const res = await fetch('data/graph_data.json');
    if (res.ok) {
      graphData = await res.json();
    } else {
      throw new Error("HTTP " + res.status);
    }
  } catch (err) {
    console.warn("Could not fetch data/graph_data.json, using fallback graph dataset", err);
    graphData = getFallbackGraph();
  }

  renderVisNetwork(graphData);
}

function renderVisNetwork(data) {
  const container = document.getElementById('network-container');
  if (!container || !window.vis) return;

  // Transform nodes
  const visNodes = data.nodes.map(n => {
    const styling = GROUP_COLORS[n.group] || GROUP_COLORS.default;
    return {
      id: n.id,
      label: n.label,
      title: `${n.group}: ${n.label}`,
      group: n.group,
      shape: 'box',
      margin: 12,
      borderWidth: 1.5,
      color: {
        background: styling.background,
        border: styling.border,
        highlight: {
          background: '#ffffff',
          border: '#ffffff'
        }
      },
      font: styling.font,
      shadow: {
        enabled: true,
        color: 'rgba(0,0,0,0.6)',
        size: 8,
        x: 2,
        y: 2
      },
      rawProps: n.properties || {}
    };
  });

  // Transform edges
  const visEdges = data.edges.map(e => ({
    from: e.from,
    to: e.to,
    label: e.label,
    arrows: 'to',
    color: {
      color: '#525252',
      highlight: '#ffffff',
      hover: '#a3a3a3'
    },
    font: {
      color: '#888888',
      size: 10,
      face: 'Bai Jamjuree',
      strokeWidth: 2,
      strokeColor: '#0f0f0f',
      align: 'middle'
    },
    smooth: {
      type: 'curvedCW',
      roundness: 0.2
    },
    rawProps: e.properties || {}
  }));

  const visData = {
    nodes: new vis.DataSet(visNodes),
    edges: new vis.DataSet(visEdges)
  };

  const options = {
    physics: {
      solver: 'forceAtlas2Based',
      forceAtlas2Based: {
        gravitationalConstant: -70,
        centralGravity: 0.015,
        springLength: 140,
        springConstant: 0.08,
        damping: 0.8
      },
      maxVelocity: 40,
      minVelocity: 0.5,
      stabilization: { iterations: 150 }
    },
    interaction: {
      hover: true,
      zoomView: true,
      dragView: true,
      tooltipDelay: 200
    }
  };

  network = new vis.Network(container, visData, options);

  // Click Event Listener
  network.on('click', (params) => {
    if (params.nodes.length > 0) {
      const nodeId = params.nodes[0];
      const nodeObj = visNodes.find(n => n.id === nodeId);
      if (nodeObj) inspectNode(nodeObj);
    } else if (params.edges.length > 0) {
      const edgeId = params.edges[0];
      const edgeObj = visEdges.find(e => e.id === edgeId) || visEdges[0];
      if (edgeObj) inspectEdge(edgeObj);
    } else {
      clearInspector();
    }
  });

  // Update counts
  const nodeCountEl = document.getElementById('stat-node-count');
  const edgeCountEl = document.getElementById('stat-edge-count');
  if (nodeCountEl) nodeCountEl.textContent = visNodes.length;
  if (edgeCountEl) edgeCountEl.textContent = visEdges.length;
}

function inspectNode(node) {
  const contentEl = document.getElementById('inspector-content');
  if (!contentEl) return;

  let propsHtml = '';
  for (const [k, v] of Object.entries(node.rawProps)) {
    propsHtml += `
      <div class="node-prop-item">
        <div class="node-prop-key">${k}</div>
        <div class="node-prop-value">${v}</div>
      </div>
    `;
  }

  contentEl.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge-tag highlight" style="margin-bottom: 0.5rem;">${node.group}</span>
      <h4 style="font-size: 1.4rem; font-weight: 700; color: #fff; margin-top: 0.4rem;">${node.label}</h4>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">ID: ${node.id}</div>
    </div>
    <div class="museum-label" style="font-size: 0.7rem; margin-bottom: 0.8rem;">Properties / คุณสมบัติโหนด</div>
    <div class="node-prop-list">
      ${propsHtml || '<div style="color: var(--text-muted); font-size: 0.85rem;">ไม่มีคุณสมบัติเพิ่มเติม</div>'}
    </div>
  `;
}

function inspectEdge(edge) {
  const contentEl = document.getElementById('inspector-content');
  if (!contentEl) return;

  let propsHtml = '';
  for (const [k, v] of Object.entries(edge.rawProps)) {
    propsHtml += `
      <div class="node-prop-item">
        <div class="node-prop-key">${k}</div>
        <div class="node-prop-value">${v}</div>
      </div>
    `;
  }

  contentEl.innerHTML = `
    <div style="margin-bottom: 1.5rem;">
      <span class="badge-tag" style="margin-bottom: 0.5rem;">RELATIONSHIP</span>
      <h4 style="font-size: 1.2rem; font-weight: 700; color: #fff; margin-top: 0.4rem;">[:${edge.label}]</h4>
      <div style="font-size: 0.75rem; color: var(--text-muted); font-family: monospace;">${edge.from} ➔ ${edge.to}</div>
    </div>
    <div class="museum-label" style="font-size: 0.7rem; margin-bottom: 0.8rem;">Edge Attributes</div>
    <div class="node-prop-list">
      ${propsHtml || '<div style="color: var(--text-muted); font-size: 0.85rem;">Standard relationship link</div>'}
    </div>
  `;
}

function clearInspector() {
  const contentEl = document.getElementById('inspector-content');
  if (!contentEl) return;
  contentEl.innerHTML = `
    <div class="inspector-empty">
      <i class="fi fi-rr-cursor"></i>
      <p>คลิกเลือกโหนด (Node) หรือเส้นความสัมพันธ์ (Edge) เพื่อดูรายละเอียดข้อมูลเชิงลึก</p>
    </div>
  `;
}

function setupGraphControls() {
  document.getElementById('btn-zoom-in')?.addEventListener('click', () => {
    if (!network) return;
    const scale = network.getScale() * 1.3;
    network.moveTo({ scale: scale, animation: { duration: 300 } });
  });

  document.getElementById('btn-zoom-out')?.addEventListener('click', () => {
    if (!network) return;
    const scale = network.getScale() * 0.7;
    network.moveTo({ scale: scale, animation: { duration: 300 } });
  });

  document.getElementById('btn-fit-view')?.addEventListener('click', () => {
    if (!network) return;
    network.fit({ animation: { duration: 500 } });
  });

  document.getElementById('btn-reload-graph')?.addEventListener('click', async () => {
    const btn = document.getElementById('btn-reload-graph');
    if (btn) btn.innerHTML = '<i class="fi fi-rr-spinner fi-spin"></i> กำลังดึงข้อมูล...';
    await loadGraphData();
    if (btn) btn.innerHTML = '<i class="fi fi-rr-refresh"></i> รีเฟรชกราฟ';
  });
}

function getFallbackGraph() {
  return {
    nodes: [
      { id: "G1", label: "Minicius Mamilius", group: "Gladiator", properties: { Wins: 23, Losses: 8, Origin: "Rome" } },
      { id: "C1", label: "Provocator", group: "Category", properties: { Role: "Challenger Heavyweight" } },
      { id: "W1", label: "Dagger", group: "Weapon", properties: { Type: "Pugio" } },
      { id: "O1", label: "Rome", group: "Origin", properties: { Region: "Italia" } }
    ],
    edges: [
      { from: "G1", to: "C1", label: "PRACTICES_STYLE", properties: {} },
      { from: "G1", to: "W1", label: "WIELDS", properties: {} },
      { from: "G1", to: "O1", label: "ORIGINATED_FROM", properties: {} }
    ]
  };
}
