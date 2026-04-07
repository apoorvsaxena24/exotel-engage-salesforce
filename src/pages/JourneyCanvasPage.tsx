import { useCallback, useState } from 'react';
import {
  ReactFlow, Background, Controls, MiniMap, Panel,
  addEdge, useNodesState, useEdgesState,
  type Connection, type Node, type Edge,
  MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import {
  MessageSquare, MessagesSquare, Mail, Phone, Bot,
  Headphones, GitBranch, Split, Timer, Target, Sparkles,
  Zap, Play, Save, Eye, Webhook, UserCog,
} from 'lucide-react';
import { Card } from '../components/common/Card';

const nodeCategories = [
  {
    label: 'Channels', items: [
      { type: 'sms', label: 'SMS', icon: MessageSquare, color: '#0ea5e9' },
      { type: 'whatsapp', label: 'WhatsApp', icon: MessagesSquare, color: '#25D366' },
      { type: 'email', label: 'Email', icon: Mail, color: '#8b5cf6' },
      { type: 'call', label: 'Call / IVR', icon: Phone, color: '#f59e0b' },
      { type: 'voicebot', label: 'Voicebot', icon: Bot, color: '#6366f1' },
      { type: 'contact_center', label: 'Contact Center', icon: Headphones, color: '#ef4444' },
    ],
  },
  {
    label: 'Logic', items: [
      { type: 'condition', label: 'Conditional Split', icon: GitBranch, color: '#f97316' },
      { type: 'ab_split', label: 'A/B Split', icon: Split, color: '#f97316' },
      { type: 'wait', label: 'Wait / Delay', icon: Timer, color: '#f97316' },
      { type: 'objective', label: 'Check Objective', icon: Target, color: '#f97316' },
    ],
  },
  {
    label: 'AI', items: [
      { type: 'nba', label: 'Next Best Action', icon: Sparkles, color: '#a855f7' },
      { type: 'optimizer', label: 'Path Optimizer', icon: Zap, color: '#a855f7' },
    ],
  },
  {
    label: 'Actions', items: [
      { type: 'webhook', label: 'Webhook / API', icon: Webhook, color: '#64748b' },
      { type: 'update_contact', label: 'Update Contact', icon: UserCog, color: '#64748b' },
    ],
  },
];

const initialNodes: Node[] = [
  { id: 'start', position: { x: 400, y: 50 }, data: { label: '▶ Journey Start', color: '#2E844A' }, type: 'input', style: { background: '#f0fdf4', border: '2px solid #2E844A', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'nba', position: { x: 400, y: 170 }, data: { label: '✨ Next Best Action (AI)', color: '#a855f7' }, style: { background: '#faf5ff', border: '2px solid #a855f7', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'sms', position: { x: 150, y: 310 }, data: { label: '💬 SMS with Payment Link', color: '#0ea5e9' }, style: { background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'wa', position: { x: 400, y: 310 }, data: { label: '💚 WhatsApp Message', color: '#25D366' }, style: { background: '#f0fdf4', border: '2px solid #25D366', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'voicebot', position: { x: 650, y: 310 }, data: { label: '🤖 Voicebot Call', color: '#6366f1' }, style: { background: '#eef2ff', border: '2px solid #6366f1', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'wait1', position: { x: 400, y: 440 }, data: { label: '⏳ Wait 24h or Payment', color: '#f97316' }, style: { background: '#fff7ed', border: '2px solid #f97316', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'goal', position: { x: 150, y: 560 }, data: { label: '🎯 Goal Met → Complete', color: '#2E844A' }, type: 'output', style: { background: '#f0fdf4', border: '2px solid #2E844A', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'ab', position: { x: 500, y: 560 }, data: { label: '🔀 A/B Split (50/50)', color: '#f97316' }, style: { background: '#fff7ed', border: '2px solid #f97316', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'ivr', position: { x: 350, y: 690 }, data: { label: '📞 Dynamic IVR Call', color: '#ec4899' }, style: { background: '#fdf2f8', border: '2px solid #ec4899', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'wa2', position: { x: 650, y: 690 }, data: { label: '💚 WhatsApp + Email', color: '#25D366' }, style: { background: '#f0fdf4', border: '2px solid #25D366', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'condition', position: { x: 500, y: 830 }, data: { label: '❓ Amount > ₹50K?', color: '#f97316' }, style: { background: '#fff7ed', border: '2px solid #f97316', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'agent', position: { x: 350, y: 960 }, data: { label: '👤 Contact Center (VIP)', color: '#ef4444' }, type: 'output', style: { background: '#fef2f2', border: '2px solid #ef4444', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
  { id: 'final_sms', position: { x: 650, y: 960 }, data: { label: '💬 Final SMS Reminder', color: '#0ea5e9' }, type: 'output', style: { background: '#f0f9ff', border: '2px solid #0ea5e9', borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 } },
];

const edgeStyle = { strokeWidth: 2, stroke: '#94a3b8' };
const initialEdges: Edge[] = [
  { id: 'e1', source: 'start', target: 'nba', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e2', source: 'nba', target: 'sms', label: 'SMS preferred', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e3', source: 'nba', target: 'wa', label: 'WA preferred', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e4', source: 'nba', target: 'voicebot', label: 'Call preferred', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e5', source: 'sms', target: 'wait1', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e6', source: 'wa', target: 'wait1', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e7', source: 'voicebot', target: 'wait1', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e8', source: 'wait1', target: 'goal', label: 'Payment ✓', style: { ...edgeStyle, stroke: '#2E844A' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#2E844A' } },
  { id: 'e9', source: 'wait1', target: 'ab', label: 'No response', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e10', source: 'ab', target: 'ivr', label: 'Path A', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e11', source: 'ab', target: 'wa2', label: 'Path B', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e12', source: 'ivr', target: 'condition', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e13', source: 'wa2', target: 'condition', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
  { id: 'e14', source: 'condition', target: 'agent', label: 'Yes (VIP)', style: { ...edgeStyle, stroke: '#ef4444' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#ef4444' } },
  { id: 'e15', source: 'condition', target: 'final_sms', label: 'No', style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } },
];

export default function JourneyCanvasPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback((params: Connection) => {
    setEdges(eds => addEdge({ ...params, style: edgeStyle, markerEnd: { type: MarkerType.ArrowClosed, color: '#94a3b8' } }, eds));
  }, [setEdges]);

  function addNode(_type: string, label: string, color: string) {
    const id = `node_${Date.now()}`;
    const newNode: Node = {
      id, position: { x: 300 + Math.random() * 200, y: 200 + Math.random() * 300 },
      data: { label, color },
      style: { background: `${color}10`, border: `2px solid ${color}`, borderRadius: 12, padding: '10px 20px', fontWeight: 600, fontSize: 13 },
    };
    setNodes(nds => [...nds, newNode]);
  }

  return (
    <div className="h-full flex">
      {/* Node Palette */}
      <div className="w-56 bg-white border-r border-gray-200 overflow-y-auto shrink-0 hidden md:block">
        <div className="p-3 border-b border-gray-100">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">Node Palette</h3>
        </div>
        {nodeCategories.map(cat => (
          <div key={cat.label} className="p-2">
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-wider px-2 mb-1">{cat.label}</div>
            {cat.items.map(item => (
              <button
                key={item.type}
                onClick={() => addNode(item.type, item.label, item.color)}
                className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <div className="w-5 h-5 rounded flex items-center justify-center" style={{ backgroundColor: `${item.color}20` }}>
                  <item.icon size={12} style={{ color: item.color }} />
                </div>
                {item.label}
              </button>
            ))}
          </div>
        ))}
      </div>

      {/* Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes} edges={edges}
          onNodesChange={onNodesChange} onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={(_, node) => setSelectedNode(node)}
          onPaneClick={() => setSelectedNode(null)}
          fitView
          className="bg-gray-50"
        >
          <Background gap={20} size={1} color="#e5e7eb" />
          <Controls />
          <MiniMap nodeStrokeWidth={3} zoomable pannable className="!bg-white !border-gray-200" />
          <Panel position="top-center">
            <div className="flex items-center gap-2 bg-white rounded-xl shadow-lg border border-gray-200 px-4 py-2">
              <span className="text-sm font-bold text-gray-700">Collections Campaign</span>
              <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">v3</span>
              <div className="w-px h-5 bg-gray-200 mx-2" />
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Save"><Save size={16} className="text-gray-500" /></button>
              <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors" title="Preview"><Eye size={16} className="text-gray-500" /></button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 bg-exotel-purple text-white rounded-lg text-xs font-medium hover:bg-exotel-purple-dark transition-colors">
                <Play size={12} /> Publish
              </button>
            </div>
          </Panel>
        </ReactFlow>

        {/* Node Config Panel */}
        {selectedNode && (
          <div className="absolute top-4 right-4 w-72 z-10">
            <Card className="p-4 shadow-lg">
              <h3 className="text-sm font-bold text-gray-800 mb-3">Node Configuration</h3>
              <div className="text-xs text-gray-500 mb-2">ID: {selectedNode.id}</div>
              <label className="text-xs font-medium text-gray-600">Label</label>
              <input
                type="text"
                value={String(selectedNode.data.label)}
                onChange={e => {
                  const val = e.target.value;
                  setNodes(nds => nds.map(n => n.id === selectedNode.id ? { ...n, data: { ...n.data, label: val } } : n));
                }}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mt-1 focus:border-exotel-purple outline-none"
              />
              {selectedNode.id === 'ivr' && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-medium text-gray-600">IVR Menu</label>
                  <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600 space-y-1">
                    <div>Greeting: "Hi @@name, your payment of @@amount is due"</div>
                    <div>Press 1: Pay Now → Webhook</div>
                    <div>Press 2: Speak to Agent → Agent Call</div>
                    <div>Press 9: Repeat Menu</div>
                    <div>No input: Repeat after 5s (max 3x)</div>
                  </div>
                </div>
              )}
              {selectedNode.id === 'voicebot' && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-medium text-gray-600">Voicebot Config</label>
                  <div className="bg-gray-50 rounded-lg p-2 text-xs text-gray-600 space-y-1">
                    <div>Persona: Polite collections agent (Hindi + English)</div>
                    <div>Objective: Collect payment or schedule callback</div>
                    <div>Escalation: If "speak to manager" or negative sentiment</div>
                    <div>DTMF Override: Press 0 for agent anytime</div>
                  </div>
                </div>
              )}
              {selectedNode.id === 'ab' && (
                <div className="mt-3 space-y-2">
                  <label className="text-xs font-medium text-gray-600">Split Ratio</label>
                  <div className="flex gap-2">
                    <div className="flex-1 bg-orange-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-orange-600">50%</div>
                      <div className="text-[10px] text-gray-500">Path A</div>
                    </div>
                    <div className="flex-1 bg-blue-50 rounded-lg p-2 text-center">
                      <div className="text-lg font-bold text-blue-600">50%</div>
                      <div className="text-[10px] text-gray-500">Path B</div>
                    </div>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-2 text-xs text-purple-700">
                    <Sparkles size={12} className="inline mr-1" />
                    Intelligent Path Optimizer: Auto-route to winning path after 5K contacts
                  </div>
                </div>
              )}
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}
