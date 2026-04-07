import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft, ArrowRight, Check, Database, Upload, Zap, Clock,
  Shield, Calendar, RotateCcw, RefreshCw, Sparkles, ShieldCheck,
  Users, BarChart3, Cpu, DollarSign, Play, AlertTriangle, Info,
  CheckCircle2, XCircle, Lightbulb, Timer, Moon,
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { ChannelPill } from '../components/common/ChannelPill';
import { generateJourneyId, formatNumber, formatCurrency } from '../utils';
import type { WizardStep, JourneyTemplate, ChannelType } from '../types';

const steps: { key: WizardStep; label: string }[] = [
  { key: 'source', label: 'Source' },
  { key: 'ingestion', label: 'Ingestion' },
  { key: 'schedule', label: 'Schedule' },
  { key: 'processing', label: 'Processing' },
  { key: 'ai_check', label: 'AI Check' },
  { key: 'approval', label: 'Approval' },
  { key: 'review', label: 'Review' },
];

export default function WizardPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const template = (location.state as { template?: JourneyTemplate })?.template;
  const [stepIdx, setStepIdx] = useState(0);
  const [sourceType, setSourceType] = useState<'crm' | 'excel'>('crm');
  const [crmObject, setCrmObject] = useState('Contacts');
  const [ingestionType, setIngestionType] = useState<'realtime' | 'batch'>('batch');
  const [safeguards, setSafeguards] = useState({ queueBuffering: true, autoDedup: true, skipActive: false });
  const [scheduleType, setScheduleType] = useState<'onetime' | 'recurring'>('onetime');
  const [recurFreq, setRecurFreq] = useState('daily');
  const [processingMode, setProcessingMode] = useState<'incremental' | 'full'>('incremental');
  const [controlGroupPct, setControlGroupPct] = useState(5);
  const [quietHours, setQuietHours] = useState(true);
  const [aiChecking, setAiChecking] = useState(false);
  const [aiDone, setAiDone] = useState(false);
  const [approved, setApproved] = useState(false);

  const journeyId = generateJourneyId();
  const step = steps[stepIdx];

  function next() {
    if (stepIdx === 4 && !aiDone) {
      setAiChecking(true);
      setTimeout(() => { setAiChecking(false); setAiDone(true); }, 2500);
      return;
    }
    if (stepIdx < steps.length - 1) setStepIdx(s => s + 1);
  }
  function prev() { if (stepIdx > 0) setStepIdx(s => s - 1); }

  function RadioCard({ selected, onClick, icon: Icon, title, desc }: { selected: boolean; onClick: () => void; icon: React.ElementType; title: string; desc: string }) {
    return (
      <button onClick={onClick} className={`flex items-start gap-3 p-4 rounded-xl border-2 text-left transition-all w-full ${selected ? 'border-exotel-purple bg-purple-50/50' : 'border-gray-200 hover:border-gray-300'}`}>
        <div className={`p-2 rounded-lg ${selected ? 'bg-exotel-purple text-white' : 'bg-gray-100 text-gray-500'}`}><Icon size={20} /></div>
        <div>
          <div className="text-sm font-semibold text-gray-800">{title}</div>
          <div className="text-xs text-gray-500 mt-0.5">{desc}</div>
        </div>
        {selected && <Check size={18} className="text-exotel-purple ml-auto shrink-0 mt-1" />}
      </button>
    );
  }

  function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
    return (
      <label className="flex items-center justify-between py-2 cursor-pointer">
        <span className="text-sm text-gray-700">{label}</span>
        <div className={`w-10 h-5.5 rounded-full relative transition-colors ${checked ? 'bg-exotel-purple' : 'bg-gray-300'}`} onClick={() => onChange(!checked)}>
          <div className={`absolute top-0.5 w-4.5 h-4.5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`} />
        </div>
      </label>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-4">
        <ArrowLeft size={16} /> Back
      </button>

      {template && (
        <div className="flex items-center gap-3 mb-6">
          <span className="text-2xl">{template.icon}</span>
          <div>
            <h1 className="text-lg font-bold text-gray-800">{template.name}</h1>
            <p className="text-sm text-gray-500">{template.description}</p>
          </div>
        </div>
      )}

      {/* Step Indicator */}
      <div className="flex items-center gap-1 mb-8 overflow-x-auto pb-2">
        {steps.map((s, i) => (
          <div key={s.key} className="flex items-center">
            <button
              onClick={() => i <= stepIdx && setStepIdx(i)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                i === stepIdx ? 'bg-exotel-purple text-white' :
                i < stepIdx ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
              }`}
            >
              {i < stepIdx ? <Check size={12} /> : <span className="w-4 text-center">{i + 1}</span>}
              {s.label}
            </button>
            {i < steps.length - 1 && <div className={`w-6 h-0.5 mx-0.5 ${i < stepIdx ? 'bg-green-300' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={step.key} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
          {/* Source */}
          {step.key === 'source' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Data Source</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RadioCard selected={sourceType === 'crm'} onClick={() => setSourceType('crm')} icon={Database} title="CRM (Salesforce)" desc="Pull data from Salesforce objects" />
                <RadioCard selected={sourceType === 'excel'} onClick={() => setSourceType('excel')} icon={Upload} title="Excel Upload" desc="Upload a CSV or Excel file" />
              </div>
              {sourceType === 'crm' && (
                <div className="space-y-3">
                  <label className="text-sm font-medium text-gray-700">Salesforce Object</label>
                  <div className="flex gap-2 flex-wrap">
                    {['Contacts', 'Leads', 'Accounts', 'Opportunities'].map(obj => (
                      <button key={obj} onClick={() => setCrmObject(obj)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${crmObject === obj ? 'bg-sf-blue text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{obj}</button>
                    ))}
                  </div>
                  <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg flex items-center gap-2"><Info size={16} /> 45,230 {crmObject.toLowerCase()} available matching your filters</div>
                </div>
              )}
              {sourceType === 'excel' && (
                <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
                  <Upload size={32} className="mx-auto text-gray-400 mb-3" />
                  <p className="text-sm text-gray-600">Drag and drop your file here, or click to browse</p>
                  <p className="text-xs text-gray-400 mt-1">Supports .csv, .xlsx (max 500K rows)</p>
                </div>
              )}
              <div className="border-t border-gray-100 pt-4">
                <Toggle checked={controlGroupPct > 0} onChange={v => setControlGroupPct(v ? 5 : 0)} label="Enable Control Group" />
                {controlGroupPct > 0 && (
                  <div className="flex items-center gap-3 mt-2">
                    <input type="range" min={1} max={20} value={controlGroupPct} onChange={e => setControlGroupPct(+e.target.value)} className="flex-1 accent-exotel-purple" />
                    <span className="text-sm font-semibold text-exotel-purple w-10">{controlGroupPct}%</span>
                  </div>
                )}
              </div>
            </Card>
          )}

          {/* Ingestion */}
          {step.key === 'ingestion' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Ingestion Configuration</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RadioCard selected={ingestionType === 'realtime'} onClick={() => setIngestionType('realtime')} icon={Zap} title="Real-time Trigger" desc="Process contacts as they match criteria" />
                <RadioCard selected={ingestionType === 'batch'} onClick={() => setIngestionType('batch')} icon={Clock} title="Batch Ingestion" desc="Process all contacts at once at scheduled time" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3"><Shield size={16} /> Data Safeguards</h3>
                <div className="space-y-1 bg-gray-50 rounded-xl px-4 py-2">
                  <Toggle checked={safeguards.queueBuffering} onChange={v => setSafeguards(s => ({ ...s, queueBuffering: v }))} label="Queue Buffering" />
                  <Toggle checked={safeguards.autoDedup} onChange={v => setSafeguards(s => ({ ...s, autoDedup: v }))} label="Auto Deduplication" />
                  <Toggle checked={safeguards.skipActive} onChange={v => setSafeguards(s => ({ ...s, skipActive: v }))} label="Skip Active Journey Contacts" />
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-700 flex items-center gap-2 mb-3"><Moon size={16} /> Quiet Hours / DND</h3>
                <div className="bg-gray-50 rounded-xl px-4 py-2">
                  <Toggle checked={quietHours} onChange={setQuietHours} label="Enable Quiet Hours" />
                  {quietHours && (
                    <div className="flex items-center gap-2 mt-2 text-sm text-gray-600">
                      <Timer size={14} /> Messages paused 9:00 PM — 9:00 AM · Calls restricted to 9 AM — 9 PM (TRAI)
                    </div>
                  )}
                </div>
              </div>
            </Card>
          )}

          {/* Schedule */}
          {step.key === 'schedule' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Schedule</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RadioCard selected={scheduleType === 'onetime'} onClick={() => setScheduleType('onetime')} icon={Calendar} title="One-time Execution" desc="Run once at a specific date and time" />
                <RadioCard selected={scheduleType === 'recurring'} onClick={() => setScheduleType('recurring')} icon={RotateCcw} title="Recurring Execution" desc="Run on a repeating schedule" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Date</label>
                  <input type="date" defaultValue="2026-04-08" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-exotel-purple focus:ring-1 focus:ring-exotel-purple outline-none" />
                </div>
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-1">Time</label>
                  <input type="time" defaultValue="10:00" className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:border-exotel-purple focus:ring-1 focus:ring-exotel-purple outline-none" />
                </div>
              </div>
              {scheduleType === 'recurring' && (
                <div>
                  <label className="text-sm font-medium text-gray-700 block mb-2">Frequency</label>
                  <div className="flex gap-2 flex-wrap">
                    {['daily', 'weekly', 'monthly', 'custom'].map(f => (
                      <button key={f} onClick={() => setRecurFreq(f)} className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${recurFreq === f ? 'bg-exotel-purple text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{f}</button>
                    ))}
                  </div>
                  {recurFreq === 'weekly' && (
                    <div className="flex gap-2 mt-3">
                      {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                        <button key={d} className="w-10 h-10 rounded-lg border border-gray-200 text-xs font-medium hover:bg-purple-50 hover:border-exotel-purple transition-colors">{d}</button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </Card>
          )}

          {/* Processing */}
          {step.key === 'processing' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Data Processing</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <RadioCard selected={processingMode === 'incremental'} onClick={() => setProcessingMode('incremental')} icon={RefreshCw} title="Incremental Mode" desc="Only process new or changed records since last run" />
                <RadioCard selected={processingMode === 'full'} onClick={() => setProcessingMode('full')} icon={RotateCcw} title="Full Re-run Mode" desc="Reprocess all records from scratch" />
              </div>
              <div className="bg-blue-50 text-blue-700 text-sm p-3 rounded-lg flex items-start gap-2">
                <Info size={16} className="shrink-0 mt-0.5" />
                {processingMode === 'incremental'
                  ? 'Only contacts added or modified since the last execution will be processed. Faster and more cost-efficient for recurring campaigns.'
                  : 'All contacts matching your criteria will be reprocessed. Use this when filters have changed or you need a complete refresh.'
                }
              </div>
            </Card>
          )}

          {/* AI Check */}
          {step.key === 'ai_check' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2"><Sparkles size={18} className="text-exotel-purple" /> AI Pre-Check</h2>
              {aiChecking ? (
                <div className="py-12 text-center">
                  <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }} className="inline-block">
                    <Sparkles size={32} className="text-exotel-purple" />
                  </motion.div>
                  <p className="text-sm text-gray-600 mt-4">Analyzing your journey configuration...</p>
                  <p className="text-xs text-gray-400 mt-1">Checking data quality, compliance, and optimization opportunities</p>
                </div>
              ) : aiDone ? (
                <div className="space-y-3">
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-red-700 font-semibold text-sm"><XCircle size={16} /> Errors (2)</div>
                    <div className="text-sm text-red-600">• 15 contacts missing phone numbers — will be skipped for Call/IVR channels</div>
                    <div className="text-sm text-red-600">• DND registry overlap: 230 contacts flagged — will not receive calls</div>
                  </div>
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm"><AlertTriangle size={16} /> Warnings (3)</div>
                    <div className="text-sm text-amber-600">• Optimal send time for your audience is 10:00 AM IST (current: 10:00 AM ✓)</div>
                    <div className="text-sm text-amber-600">• 3 contacts are in an active journey — "Skip Active" safeguard enabled</div>
                    <div className="text-sm text-amber-600">• 847 contacts have not interacted in 90+ days — consider re-engagement first</div>
                  </div>
                  <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 space-y-2">
                    <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm"><Lightbulb size={16} /> AI Suggestions</div>
                    <div className="text-sm text-blue-600">• Adding WhatsApp fallback could increase reach by 23% based on channel preference data</div>
                    <div className="text-sm text-blue-600">• Next Best Action: 34% prefer WhatsApp at 10 AM, 28% respond better to calls at 2 PM</div>
                    <div className="text-sm text-blue-600">• Generated 3 message variants per channel — review in journey canvas</div>
                  </div>
                </div>
              ) : (
                <div className="py-12 text-center">
                  <Sparkles size={32} className="text-gray-300 mx-auto" />
                  <p className="text-sm text-gray-500 mt-3">Click "Run AI Check" to analyze your journey</p>
                </div>
              )}
            </Card>
          )}

          {/* Approval */}
          {step.key === 'approval' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800 flex items-center gap-2"><ShieldCheck size={18} /> Approval Workflow</h2>
              <div className="flex items-center gap-4">
                {['Creator', 'Reviewer', 'Approver'].map((role, i) => (
                  <div key={role} className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${i <= (approved ? 2 : 0) ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                      {i <= (approved ? 2 : 0) ? <Check size={14} /> : i + 1}
                    </div>
                    <span className="text-sm text-gray-700">{role}</span>
                    {i < 2 && <div className={`w-8 h-0.5 ${i < (approved ? 2 : 0) ? 'bg-green-300' : 'bg-gray-200'}`} />}
                  </div>
                ))}
              </div>
              {!approved ? (
                <div className="space-y-3">
                  <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                    <div className="text-sm font-medium text-amber-700">Pending Approval</div>
                    <div className="text-xs text-amber-600 mt-1">Waiting for reviewer sign-off before execution</div>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => setApproved(true)} className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">Approve</button>
                    <button className="px-4 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">Skip Approval</button>
                  </div>
                </div>
              ) : (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-green-600" />
                  <div>
                    <div className="text-sm font-medium text-green-700">Approved</div>
                    <div className="text-xs text-green-600">Approved by Admin · Just now</div>
                  </div>
                </div>
              )}
            </Card>
          )}

          {/* Review */}
          {step.key === 'review' && (
            <Card className="p-6 space-y-5">
              <h2 className="text-base font-bold text-gray-800">Pre-Execution Review</h2>
              <div className="text-sm text-gray-500">Journey ID: <span className="font-mono font-semibold text-gray-800">{journeyId}</span></div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-green-700 font-semibold text-sm mb-2"><CheckCircle2 size={16} /> Pre-execution Checks</div>
                  {['Data validation passed', 'DND compliance verified', 'Opt-in status confirmed', 'Quiet hours configured'].map(c => (
                    <div key={c} className="flex items-center gap-2 text-sm text-green-600 py-0.5"><Check size={14} /> {c}</div>
                  ))}
                </div>
                <div className="bg-blue-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-blue-700 font-semibold text-sm mb-2"><Users size={16} /> Audience & Channels</div>
                  <div className="text-sm text-blue-600">Audience: {formatNumber(45230)} contacts</div>
                  <div className="text-sm text-blue-600">Control group: {controlGroupPct}% ({formatNumber(Math.round(45230 * controlGroupPct / 100))})</div>
                  <div className="flex gap-1 mt-2 flex-wrap">
                    {(template?.channels || ['sms', 'whatsapp', 'call'] as ChannelType[]).map(ch => <ChannelPill key={ch} channel={ch} />)}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-purple-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-purple-700 font-semibold text-sm mb-2"><BarChart3 size={16} /> Conversion Goals</div>
                  <div className="text-sm text-purple-600">Primary: Payment Completed</div>
                  <div className="text-sm text-purple-600">Milestone 1: Link Clicked</div>
                  <div className="text-sm text-purple-600">Milestone 2: Payment Page Visited</div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="flex items-center gap-2 text-gray-700 font-semibold text-sm mb-2"><Cpu size={16} /> System Load</div>
                  <div className="text-sm text-gray-600">Current capacity: 82%</div>
                  <div className="text-sm text-gray-600">Est. throughput: 12K msgs/min</div>
                  <div className="text-sm text-green-600 font-medium mt-1">✓ System ready</div>
                </div>
              </div>

              <div className="bg-amber-50 rounded-xl p-4">
                <div className="flex items-center gap-2 text-amber-700 font-semibold text-sm mb-2"><DollarSign size={16} /> Cost Estimate & ROI</div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div><div className="text-gray-500">Total Cost</div><div className="font-bold text-gray-800">{formatCurrency(245000)}</div></div>
                  <div><div className="text-gray-500">Projected Revenue</div><div className="font-bold text-green-600">{formatCurrency(8500000)}</div></div>
                  <div><div className="text-gray-500">Est. ROI</div><div className="font-bold text-exotel-purple">34.7x</div></div>
                </div>
              </div>
            </Card>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <button onClick={prev} disabled={stepIdx === 0} className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        {step.key === 'review' ? (
          <button onClick={() => navigate('/journeys')} className="flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white rounded-lg text-sm font-bold hover:bg-green-700 transition-colors shadow-sm">
            <Play size={16} /> Execute Journey
          </button>
        ) : (
          <button onClick={next} className="flex items-center gap-2 px-4 py-2 bg-exotel-purple text-white rounded-lg text-sm font-medium hover:bg-exotel-purple-dark transition-colors">
            {step.key === 'ai_check' && !aiDone ? 'Run AI Check' : 'Next'} <ArrowRight size={16} />
          </button>
        )}
      </div>
    </div>
  );
}
