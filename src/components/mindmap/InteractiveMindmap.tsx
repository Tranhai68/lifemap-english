import React, { useState, useRef, useMemo, useEffect, useCallback } from 'react';
import { useApp } from '../../context/AppContext';
import { VocabularyDetailPanel } from './VocabularyDetailPanel';
import { playPronunciation } from '../../utils/audio';
import { 
  ZoomIn, 
  ZoomOut, 
  Maximize2, 
  Search, 
  ChevronDown, 
  ChevronRight, 
  Sparkles, 
  HelpCircle, 
  Volume2, 
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  Crosshair,
  Compass
} from 'lucide-react';
import { MindmapNode, Vocabulary } from '../../types';

export const InteractiveMindmap: React.FC = () => {
  const { 
    selectedTopicId, 
    topics, 
    mindmapNodes, 
    vocabularies, 
    selectedVocabularyId, 
    setSelectedVocabularyId,
    toggleNodeExpansion,
    collapseAllBranches,
    expandAllBranches,
    startQuiz,
    setActiveScreen
  } = useApp();

  const [viewMode, setViewMode] = useState<'mindmap' | 'tree' | 'guided' | 'flashcard'>('mindmap');
  const [zoom, setZoom] = useState<number>(0.85);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [mapSearch, setMapSearch] = useState<string>('');
  const [levelFilter, setLevelFilter] = useState<'all' | 'beginner' | 'advanced'>('all');
  const [hoveredNode, setHoveredNode] = useState<MindmapNode | null>(null);
  const [speakingText, setSpeakingText] = useState<string | null>(null);

  // Guided & Flashcard states
  const [activeGuidedIndex, setActiveGuidedIndex] = useState<number>(0);
  const [isCardFlipped, setIsCardFlipped] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const hScrollbarTrackRef = useRef<HTMLDivElement>(null);
  const vScrollbarTrackRef = useRef<HTMLDivElement>(null);

  const currentTopic = topics.find((t) => t.id === selectedTopicId) || topics[0];
  const topicNodes = mindmapNodes.filter((n) => n.topicId === currentTopic.id);
  const rootNode = topicNodes.find((n) => n.level === 0) || topicNodes[0];

  const topicVocabs = useMemo(() => {
    return vocabularies.filter((v) => v.topicId === currentTopic.id);
  }, [vocabularies, currentTopic.id]);

  const activeVocabs = useMemo(() => {
    return topicVocabs.filter((v) => {
      if (levelFilter === 'beginner') return v.cefr === 'A1' || v.cefr === 'A2';
      if (levelFilter === 'advanced') return v.cefr === 'B1' || v.cefr === 'B2' || v.cefr === 'C1';
      return true;
    });
  }, [topicVocabs, levelFilter]);

  // Branch nodes (Level 1)
  const branchNodes = useMemo(() => {
    return topicNodes.filter((n) => n.level === 1).sort((a, b) => a.order - b.order);
  }, [topicNodes]);

  // Clean mathematical layout relative to center (0, 0)
  const layout = useMemo(() => {
    const computedNodes: Array<{
      node: MindmapNode;
      x: number;
      y: number;
      vocab?: Vocabulary;
      branchColor: string;
      parentPos?: { x: number; y: number };
      columnIndex?: number;
    }> = [];

    // Root node at (0, 0)
    computedNodes.push({
      node: rootNode,
      x: 0,
      y: 0,
      branchColor: '#10B981',
    });

    // 4 Symmetrical Quadrant Branches
    // 0: Top-Right (Branch 1), 1: Bottom-Right (Branch 2), 2: Top-Left (Branch 3), 3: Bottom-Left (Branch 4)
    branchNodes.forEach((branch, bIndex) => {
      const isRightSide = bIndex % 2 === 0;
      const isTopSide = bIndex < 2;

      const branchX = isRightSide ? 340 : -340;
      const branchY = isTopSide ? -330 : 330;
      const branchColor = branch.color || '#38BDF8';

      computedNodes.push({
        node: branch,
        x: branchX,
        y: branchY,
        branchColor,
        parentPos: { x: 0, y: 0 },
      });

      // Child word nodes (Level 2) if branch is expanded
      if (branch.isExpanded !== false) {
        const rawChildWords = topicNodes.filter(
          (n) => n.parentId === branch.id && n.level === 2
        ).sort((a, b) => a.order - b.order);

        // Filter child words based on levelFilter
        const childWords = rawChildWords.filter((wordNode) => {
          const vocab = vocabularies.find((v) => v.id === wordNode.vocabularyId);
          if (levelFilter === 'beginner') {
            return vocab?.cefr === 'A1' || vocab?.cefr === 'A2';
          }
          if (levelFilter === 'advanced') {
            return vocab?.cefr === 'B1' || vocab?.cefr === 'B2' || vocab?.cefr === 'C1';
          }
          return true;
        });

        // Split up to 25 words into two staggered sub-columns:
        const midPoint = Math.ceil(childWords.length / 2);
        const col1Words = childWords.slice(0, midPoint);
        const col2Words = childWords.slice(midPoint);
        const wSpacing = 54;

        // Column 1
        col1Words.forEach((wordNode, wIndex) => {
          const wTotal = col1Words.length;
          const startY = branchY - ((wTotal - 1) * wSpacing) / 2;
          const wordX = isRightSide ? branchX + 260 : branchX - 260;
          const wordY = startY + wIndex * wSpacing;
          const vocab = vocabularies.find((v) => v.id === wordNode.vocabularyId);

          computedNodes.push({
            node: wordNode,
            x: wordX,
            y: wordY,
            vocab,
            branchColor,
            parentPos: { x: branchX, y: branchY },
            columnIndex: 1,
          });
        });

        // Column 2 (further out, staggered)
        col2Words.forEach((wordNode, wIndex) => {
          const wTotal = col2Words.length;
          const startY = branchY - ((wTotal - 1) * wSpacing) / 2;
          const wordX = isRightSide ? branchX + 530 : branchX - 530;
          const wordY = startY + wIndex * wSpacing;
          const vocab = vocabularies.find((v) => v.id === wordNode.vocabularyId);

          // Find anchor parent in column 1 for natural tree branch look
          const parentCol1 = col1Words[Math.min(wIndex, col1Words.length - 1)];
          const parentWordNode = computedNodes.find(c => c.node.id === parentCol1?.id);
          const parentPos = parentWordNode 
            ? { x: parentWordNode.x, y: parentWordNode.y } 
            : { x: branchX, y: branchY };

          computedNodes.push({
            node: wordNode,
            x: wordX,
            y: wordY,
            vocab,
            branchColor,
            parentPos,
            columnIndex: 2,
          });
        });
      }
    });

    return computedNodes;
  }, [branchNodes, rootNode, topicNodes, vocabularies, levelFilter]);

  // Center / reset view to show root node centered
  const handleResetView = useCallback(() => {
    setZoom(0.85);
    setPan({ x: 0, y: 0 });
  }, []);

  // Global mouse drag listener (smooth continuous 60fps pan)
  useEffect(() => {
    const handleWindowMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      setPan((prev) => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY,
      }));
    };

    const handleWindowMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener('mousemove', handleWindowMouseMove);
      window.addEventListener('mouseup', handleWindowMouseUp);
    }

    return () => {
      window.removeEventListener('mousemove', handleWindowMouseMove);
      window.removeEventListener('mouseup', handleWindowMouseUp);
    };
  }, [isDragging]);

  // Mouse pan handlers
  const handleCanvasMouseDown = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('.mindmap-node') || (e.target as HTMLElement).closest('.scrollbar-control')) {
      return;
    }
    setIsDragging(true);
  };

  // Wheel & Trackpad handler: 2-finger scroll pans X & Y; pinch/ctrl zooms
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    if (e.ctrlKey || e.metaKey) {
      const zoomFactor = -e.deltaY * 0.002;
      setZoom((z) => Math.min(2.0, Math.max(0.35, z + zoomFactor)));
    } else {
      setPan((prev) => ({
        x: prev.x - e.deltaX * 1.1,
        y: prev.y - e.deltaY * 1.1,
      }));
    }
  };

  // Directional D-Pad Pan functions
  const panBy = (deltaX: number, deltaY: number) => {
    setPan((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));
  };

  // Pronounce audio helper
  const handlePlayAudio = (text: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setSpeakingText(text);
    playPronunciation(text);
    setTimeout(() => setSpeakingText(null), 1200);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.activeElement?.tagName === 'INPUT' || document.activeElement?.tagName === 'TEXTAREA') return;
      const step = 90;
      if (e.key === 'ArrowUp') panBy(0, step);
      if (e.key === 'ArrowDown') panBy(0, -step);
      if (e.key === 'ArrowLeft') panBy(step, 0);
      if (e.key === 'ArrowRight') panBy(-step, 0);
      if (e.key === ' ' || e.key === 'Home') handleResetView();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleResetView]);

  const handleSelectWord = (vocabId?: string) => {
    if (vocabId) {
      setSelectedVocabularyId(vocabId);
    }
  };

  // Search filter focus
  const matchedNodeIds = useMemo(() => {
    if (!mapSearch.trim()) return [];
    const query = mapSearch.toLowerCase();
    return topicNodes
      .filter((n) => {
        const vocab = vocabularies.find((v) => v.id === n.vocabularyId);
        return (
          n.label.toLowerCase().includes(query) ||
          n.labelVi?.toLowerCase().includes(query) ||
          vocab?.meaningVi.toLowerCase().includes(query)
        );
      })
      .map((n) => n.id);
  }, [mapSearch, topicNodes, vocabularies]);

  // Scrollbar range [-1300, +1300] for X and [-1100, +1100] for Y
  const clamp = (val: number, min: number, max: number) => Math.min(max, Math.max(min, val));
  const hPercent = clamp(((pan.x + 1300) / 2600) * 100, 0, 100);
  const vPercent = clamp(((pan.y + 1100) / 2200) * 100, 0, 100);

  // Scrollbar track click handlers
  const handleHTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!hScrollbarTrackRef.current) return;
    const rect = hScrollbarTrackRef.current.getBoundingClientRect();
    const clickRatio = (e.clientX - rect.left) / rect.width;
    const newPanX = -1300 + clickRatio * 2600;
    setPan((p) => ({ ...p, x: newPanX }));
  };

  const handleVTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!vScrollbarTrackRef.current) return;
    const rect = vScrollbarTrackRef.current.getBoundingClientRect();
    const clickRatio = (e.clientY - rect.top) / rect.height;
    const newPanY = -1100 + clickRatio * 2200;
    setPan((p) => ({ ...p, y: newPanY }));
  };

  return (
    <div className="h-full w-full flex flex-col bg-[#0b0c10] text-[#E1E0CC] overflow-hidden select-none relative">
      {/* Top Mindmap Control Bar */}
      <div className="h-14 border-b border-white/10 bg-[#12131b]/95 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between gap-4 z-30 shrink-0">
        {/* Left: Topic Selector & Back */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveScreen('dashboard')}
            className="p-1.5 rounded-xl bg-white/5 border border-white/10 text-gray-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Quay lại Dashboard"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xs sm:text-sm font-semibold text-white">
                {currentTopic.nameEn}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-medium">
                {currentTopic.cefrRange}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 font-medium">
                {topicVocabs.length} từ vựng
              </span>
            </div>
            <span className="text-[11px] text-gray-400 truncate max-w-xs sm:max-w-md">
              {currentTopic.nameVi} • Di chuyển trái phải, trên xuống bằng chuột hoặc thanh cuộn
            </span>
          </div>
        </div>

        {/* Center: Search within Map */}
        <div className="hidden md:flex items-center relative w-64">
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Tìm từ trong 100 từ của chủ đề này..."
            value={mapSearch}
            onChange={(e) => setMapSearch(e.target.value)}
            className="w-full bg-[#1a1b24] border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-emerald-500/50"
          />
        </div>

        {/* Right: Controls & Learning Modes Switcher */}
        <div className="flex items-center gap-2">
          {/* Learning Mode Switcher */}
          <div className="bg-[#1a1b24] border border-white/10 rounded-xl p-1 flex items-center gap-1 text-xs">
            <button
              onClick={() => setViewMode('mindmap')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                viewMode === 'mindmap'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Mind-map
            </button>
            <button
              onClick={() => setViewMode('guided')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                viewMode === 'guided'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Guided
            </button>
            <button
              onClick={() => setViewMode('flashcard')}
              className={`px-2.5 py-1 rounded-lg transition-colors ${
                viewMode === 'flashcard'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Flashcard
            </button>
            <button
              onClick={() => setViewMode('tree')}
              className={`hidden sm:inline-block px-2.5 py-1 rounded-lg transition-colors ${
                viewMode === 'tree'
                  ? 'bg-emerald-500 text-black font-semibold shadow'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tree View
            </button>
          </div>

          {/* Quiz CTA */}
          <button
            onClick={() => startQuiz(currentTopic.id, 'topic')}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-500 text-black font-semibold text-xs hover:bg-emerald-400 transition-all shadow-md"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Topic Quiz</span>
          </button>
        </div>
      </div>

      {/* Sub-bar: Level Filter (Dành cho người mới A1-A2 vs Nâng cao) */}
      <div className="h-10 border-b border-white/5 bg-[#0e1017]/95 px-4 sm:px-6 flex items-center justify-between gap-3 shrink-0 text-xs z-20">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 font-medium text-[11px]">Cấp độ:</span>
          <div className="bg-[#181a24] border border-white/10 rounded-lg p-0.5 flex items-center gap-1">
            <button
              onClick={() => setLevelFilter('all')}
              className={`px-2.5 py-0.5 rounded-md transition-all text-[11px] ${
                levelFilter === 'all'
                  ? 'bg-white/20 text-white font-semibold'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Tất cả (100 từ)
            </button>
            <button
              onClick={() => setLevelFilter('beginner')}
              className={`px-2.5 py-0.5 rounded-md transition-all text-[11px] flex items-center gap-1.5 ${
                levelFilter === 'beginner'
                  ? 'bg-emerald-500 text-black font-semibold'
                  : 'text-emerald-400/90 hover:text-emerald-300'
              }`}
            >
              <span>🌱 Người mới bắt đầu (50 từ cơ bản A1-A2)</span>
            </button>
            <button
              onClick={() => setLevelFilter('advanced')}
              className={`px-2.5 py-0.5 rounded-md transition-all text-[11px] flex items-center gap-1.5 ${
                levelFilter === 'advanced'
                  ? 'bg-purple-500 text-white font-semibold'
                  : 'text-purple-400/90 hover:text-purple-300'
              }`}
            >
              <span>🚀 Nâng cao (50 từ B1-C1)</span>
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4 text-[11px] text-gray-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>50 từ cơ bản (A1 & A2)</span>
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-purple-400"></span>
            <span>50 từ nâng cao (B1-C1)</span>
          </span>
          <span className="text-gray-600">|</span>
          <span className="text-gray-300">Phát âm mọi từ và nhánh bằng nút loa 🔊</span>
        </div>
      </div>

      {/* Main Workspace Area */}
      <div className="flex-1 flex relative overflow-hidden">
        {/* VIEW MODE 1: ORGANIC MIND-MAP */}
        {viewMode === 'mindmap' && (
          <div
            ref={containerRef}
            onMouseDown={handleCanvasMouseDown}
            onWheel={handleWheel}
            className={`flex-1 h-full relative cursor-grab active:cursor-grabbing overflow-hidden bg-[#0a0b0e] select-none ${
              selectedVocabularyId ? 'pr-0 lg:pr-96' : ''
            }`}
          >
            {/* Background Dot Grid Pattern */}
            <div 
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.25) 1px, transparent 1px)',
                backgroundSize: '28px 28px',
              }}
            />

            {/* Transform Canvas Centered at Viewport (50%, 50%) */}
            <div
              className="absolute top-1/2 left-1/2 will-change-transform"
              style={{
                transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
              }}
            >
              {/* SVG Curved Connections */}
              <svg 
                className="absolute top-0 left-0 pointer-events-none overflow-visible"
                style={{ width: '1px', height: '1px' }}
              >
                <defs>
                  <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feGaussianBlur stdDeviation="3" result="blur" />
                    <feComposite in="SourceGraphic" in2="blur" operator="over" />
                  </filter>
                </defs>
                {layout.map(({ node, x, y, parentPos, branchColor, columnIndex }) => {
                  if (!parentPos) return null;
                  const dx = x - parentPos.x;
                  const dy = y - parentPos.y;
                  // Bezier organic curve
                  const cx1 = parentPos.x + dx * 0.5;
                  const cy1 = parentPos.y;
                  const cx2 = parentPos.x + dx * 0.5;
                  const cy2 = y;
                  const path = `M ${parentPos.x} ${parentPos.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${x} ${y}`;

                  const strokeW = node.level === 1 ? '3' : columnIndex === 1 ? '2.2' : '1.6';

                  return (
                    <g key={`path-${node.id}`}>
                      {/* Subtle outer glow line */}
                      <path
                        d={path}
                        stroke={branchColor}
                        strokeWidth="5"
                        strokeOpacity="0.25"
                        fill="none"
                        strokeLinecap="round"
                      />
                      {/* Core stroke line */}
                      <path
                        d={path}
                        stroke={branchColor}
                        strokeWidth={strokeW}
                        strokeOpacity="0.9"
                        fill="none"
                        strokeLinecap="round"
                        className="mindmap-branch-path"
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Render Nodes relative to (0, 0) */}
              {layout.map(({ node, x, y, vocab, branchColor }) => {
                const isRoot = node.level === 0;
                const isBranch = node.level === 1;
                const isWord = node.level === 2;
                const isSelected = selectedVocabularyId === node.vocabularyId;
                const isMatch = matchedNodeIds.includes(node.id);

                return (
                  <div
                    key={node.id}
                    style={{
                      transform: `translate(${x}px, ${y}px) translate(-50%, -50%)`,
                    }}
                    className="absolute top-0 left-0 mindmap-node transition-all duration-150"
                    onMouseEnter={() => setHoveredNode(node)}
                    onMouseLeave={() => setHoveredNode(null)}
                  >
                    {/* LEVEL 0: ROOT TOPIC NODE (With Pronunciation Audio) */}
                    {isRoot && (
                      <div className="px-6 py-4 rounded-3xl bg-[#151722]/95 border-2 border-emerald-500/60 text-center shadow-2xl backdrop-blur-md flex flex-col items-center justify-center min-w-[240px] hover:border-emerald-400 transition-colors">
                        <div className="flex items-center gap-2 mb-1.5">
                          <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                            <Sparkles className="w-4 h-4" />
                          </div>
                          {/* Audio button for Central Topic */}
                          <button
                            onClick={(e) => handlePlayAudio(node.label, e)}
                            className="p-1.5 rounded-full bg-white/10 hover:bg-emerald-500/30 text-white hover:text-emerald-400 transition-colors"
                            title={`Phát âm: "${node.label}"`}
                          >
                            <Volume2 className={`w-4 h-4 ${speakingText === node.label ? 'text-emerald-400 animate-pulse' : ''}`} />
                          </button>
                        </div>
                        <h1 className="text-base sm:text-lg font-bold text-white tracking-tight">
                          {node.label}
                        </h1>
                        <span className="text-[11px] text-emerald-400/90 mt-0.5">{node.labelVi}</span>
                        <div className="text-[10px] text-gray-400 mt-1 font-mono">
                          {topicVocabs.length} từ vựng • 4 nhánh
                        </div>
                      </div>
                    )}

                    {/* LEVEL 1: BRANCH NODE (Collapsible & With Pronunciation Audio) */}
                    {isBranch && (
                      <div
                        onClick={() => toggleNodeExpansion(node.id)}
                        className={`cursor-pointer px-4 py-2.5 rounded-2xl border transition-all duration-300 flex items-center gap-2.5 shadow-xl backdrop-blur-md hover:scale-105 ${
                          node.isExpanded !== false
                            ? 'bg-[#181a24] text-white'
                            : 'bg-[#101118] text-gray-400 opacity-80'
                        }`}
                        style={{
                          borderColor: branchColor,
                          boxShadow: `0 0 20px ${branchColor}35`,
                        }}
                      >
                        <div
                          className="w-3 h-3 rounded-full shrink-0"
                          style={{ backgroundColor: branchColor }}
                        />
                        
                        <div className="text-left">
                          <div className="text-xs sm:text-sm font-semibold">{node.label}</div>
                          {node.labelVi && (
                            <div className="text-[10px] text-gray-400">{node.labelVi}</div>
                          )}
                        </div>

                        {/* Audio button for Branch Phrase */}
                        <button
                          onClick={(e) => handlePlayAudio(node.label, e)}
                          className="p-1 rounded-full text-gray-400 hover:text-emerald-400 hover:bg-white/10 transition-colors ml-1"
                          title={`Phát âm cụm: "${node.label}"`}
                        >
                          <Volume2 className={`w-3.5 h-3.5 ${speakingText === node.label ? 'text-emerald-400 animate-pulse' : ''}`} />
                        </button>

                        <div className="text-gray-400">
                          {node.isExpanded !== false ? (
                            <ChevronDown className="w-3.5 h-3.5" />
                          ) : (
                            <ChevronRight className="w-3.5 h-3.5" />
                          )}
                        </div>
                      </div>
                    )}

                    {/* LEVEL 2: VOCABULARY WORD NODE */}
                    {isWord && (
                      <div className="relative group">
                        <div
                          onClick={() => handleSelectWord(node.vocabularyId)}
                          className={`cursor-pointer px-3.5 py-2 rounded-xl border text-left transition-all duration-200 flex items-center gap-2.5 shadow-lg backdrop-blur-md ${
                            isSelected
                              ? 'bg-emerald-500 text-black border-emerald-400 font-semibold scale-110 shadow-emerald-500/30 z-30'
                              : isMatch
                              ? 'bg-amber-400/20 border-amber-400 text-amber-300 ring-2 ring-amber-400/30'
                              : 'bg-[#141620]/95 hover:bg-[#1d202e] text-gray-200 border-white/10 hover:border-white/30'
                          }`}
                        >
                          {/* Audio button on Word Node */}
                          <button
                            onClick={(e) => {
                              if (vocab) handlePlayAudio(vocab.word, e);
                            }}
                            className={`p-1 rounded-full transition-colors ${
                              isSelected
                                ? 'text-black hover:bg-black/10'
                                : 'text-gray-400 hover:text-emerald-400 hover:bg-white/5'
                            }`}
                            title="Nghe phát âm"
                          >
                            <Volume2 className={`w-3.5 h-3.5 ${speakingText === vocab?.word ? 'text-emerald-400 animate-pulse' : ''}`} />
                          </button>

                          <div>
                            <div className="text-xs font-semibold tracking-wide">
                              {node.label}
                            </div>
                            {vocab && (
                              <div
                                className={`text-[10px] font-mono leading-none mt-0.5 ${
                                  isSelected ? 'text-black/80' : 'text-emerald-400/80'
                                }`}
                              >
                                {vocab.ipa}
                              </div>
                            )}
                          </div>

                          {/* Status Indicator Badge */}
                          {vocab?.status === 'mastered' && (
                            <span className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-[10px]">
                              ✓
                            </span>
                          )}
                        </div>

                        {/* Hover Tooltip on Desktop */}
                        {hoveredNode?.id === node.id && vocab && (
                          <div className="hidden lg:block absolute bottom-full left-1/2 -translate-x-1/2 mb-2 p-2.5 rounded-xl bg-black/95 border border-white/20 shadow-2xl text-[11px] text-gray-200 w-52 pointer-events-none z-50">
                            <div className="font-semibold text-emerald-400">{vocab.word}</div>
                            <div className="text-gray-300 mt-0.5">{vocab.meaningVi}</div>
                            <div className="text-[10px] text-gray-400 italic mt-1">
                              Bấm để mở thẻ từ vựng đầy đủ
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* VISIBLE INTERACTIVE VERTICAL SCROLLBAR (Right Edge) */}
            <div className="scrollbar-control absolute right-2 top-16 bottom-20 w-5 z-20 flex flex-col items-center bg-[#151720]/80 backdrop-blur-md border border-white/10 rounded-full py-1">
              <button
                onClick={() => panBy(0, 140)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Cuộn lên trên (Pan Down)"
              >
                <ArrowUp className="w-3 h-3" />
              </button>
              <div
                ref={vScrollbarTrackRef}
                onClick={handleVTrackClick}
                className="flex-1 w-1.5 bg-white/10 rounded-full relative my-1 cursor-pointer overflow-hidden"
              >
                <div
                  style={{ top: `${vPercent}%` }}
                  className="absolute left-0 right-0 h-8 -translate-y-1/2 bg-emerald-500 rounded-full shadow-lg"
                />
              </div>
              <button
                onClick={() => panBy(0, -140)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
                title="Cuộn xuống dưới (Pan Up)"
              >
                <ArrowDown className="w-3 h-3" />
              </button>
            </div>

            {/* VISIBLE INTERACTIVE HORIZONTAL SCROLLBAR (Bottom Edge) */}
            <div className="scrollbar-control absolute bottom-2 left-6 right-24 h-6 z-20 flex items-center bg-[#151720]/80 backdrop-blur-md border border-white/10 rounded-full px-2 gap-2">
              <span className="text-[10px] font-mono text-gray-400 shrink-0">Thanh cuộn ngang:</span>
              <button
                onClick={() => panBy(140, 0)}
                className="text-xs text-gray-400 hover:text-white px-1"
                title="Cuộn sang trái"
              >
                ◄
              </button>
              <div
                ref={hScrollbarTrackRef}
                onClick={handleHTrackClick}
                className="flex-1 h-1.5 bg-white/10 rounded-full relative cursor-pointer overflow-hidden"
              >
                <div
                  style={{ left: `${hPercent}%` }}
                  className="absolute top-0 bottom-0 w-12 -translate-x-1/2 bg-emerald-500 rounded-full shadow-lg"
                />
              </div>
              <button
                onClick={() => panBy(-140, 0)}
                className="text-xs text-gray-400 hover:text-white px-1"
                title="Cuộn sang phải"
              >
                ►
              </button>
            </div>

            {/* 4-WAY D-PAD DIRECTIONAL CONTROLLER (Bottom Right) */}
            <div className="scrollbar-control absolute bottom-12 right-6 z-20 flex flex-col items-center bg-[#151720]/90 backdrop-blur-md border border-white/10 rounded-2xl p-2 shadow-2xl">
              <button
                onClick={() => panBy(0, 140)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 active:bg-emerald-500 active:text-black transition-colors"
                title="Di chuyển lên trên (ArrowUp)"
              >
                <ArrowUp className="w-3.5 h-3.5" />
              </button>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => panBy(140, 0)}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 active:bg-emerald-500 active:text-black transition-colors"
                  title="Di chuyển sang trái (ArrowLeft)"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={handleResetView}
                  className="p-1.5 rounded-lg text-emerald-400 hover:bg-white/10 transition-colors"
                  title="Về trung tâm sơ đồ (Home / Space)"
                >
                  <Crosshair className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => panBy(-140, 0)}
                  className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 active:bg-emerald-500 active:text-black transition-colors"
                  title="Di chuyển sang phải (ArrowRight)"
                >
                  <ArrowLeft className="w-3.5 h-3.5 rotate-180" />
                </button>
              </div>
              <button
                onClick={() => panBy(0, -140)}
                className="p-1.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 active:bg-emerald-500 active:text-black transition-colors"
                title="Di chuyển xuống dưới (ArrowDown)"
              >
                <ArrowDown className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Floating Map Zoom & Controls Toolbar (Bottom Left) */}
            <div className="absolute bottom-12 left-6 z-20 flex items-center gap-1.5 bg-[#151720]/90 backdrop-blur-md border border-white/10 rounded-2xl p-1.5 shadow-2xl">
              <button
                onClick={() => setZoom((z) => Math.min(2.0, z + 0.15))}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom in (+)"
              >
                <ZoomIn className="w-4 h-4" />
              </button>
              <button
                onClick={() => setZoom((z) => Math.max(0.35, z - 0.15))}
                className="p-2 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-colors"
                title="Zoom out (-)"
              >
                <ZoomOut className="w-4 h-4" />
              </button>
              <button
                onClick={handleResetView}
                className="p-2 rounded-xl text-emerald-400 hover:bg-white/10 transition-colors"
                title="Căn giữa màn hình"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
              <div className="h-4 w-px bg-white/10 mx-1" />
              <button
                onClick={collapseAllBranches}
                className="px-2.5 py-1 text-[11px] text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Thu gọn các nhánh"
              >
                Thu gọn
              </button>
              <button
                onClick={expandAllBranches}
                className="px-2.5 py-1 text-[11px] text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Mở toàn bộ 100 từ"
              >
                Mở 100 từ
              </button>
            </div>
          </div>
        )}

        {/* VIEW MODE 2: TREE & LIST VIEW */}
        {viewMode === 'tree' && (
          <div className="flex-1 h-full overflow-y-auto p-6 max-w-4xl mx-auto space-y-6">
            <div className="border-b border-white/10 pb-4 flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-white">{currentTopic.nameEn}</h2>
                <p className="text-xs text-gray-400">
                  {currentTopic.nameVi} — Cấu trúc 100 từ vựng ({activeVocabs.length} từ đang hiển thị theo bộ lọc)
                </p>
              </div>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium">
                {activeVocabs.length} / 100 từ
              </span>
            </div>

            <div className="space-y-4">
              {branchNodes.map((branch) => {
                const childWords = topicNodes.filter(
                  (n) => n.parentId === branch.id && n.level === 2 && (!n.vocabularyId || activeVocabs.some((v) => v.id === n.vocabularyId))
                );
                if (childWords.length === 0) return null;
                const isBeginnerBranch = branch.id.includes('b1') || branch.id.includes('b2');
                return (
                  <div key={branch.id} className="p-4 rounded-2xl bg-[#14151e] border border-white/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: branch.color || '#10B981' }} />
                        <span className="font-semibold text-white">{branch.label}</span>
                        <span className="text-xs text-gray-400">({branch.labelVi})</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono ${isBeginnerBranch ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}`}>
                          {isBeginnerBranch ? '🌱 Cơ bản (A1-A2)' : '🚀 Nâng cao (B1-C1)'}
                        </span>
                        <button
                          onClick={(e) => handlePlayAudio(branch.label, e)}
                          className="p-1 rounded-full text-gray-400 hover:text-emerald-400"
                        >
                          <Volume2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-xs text-gray-400">{childWords.length} từ</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                      {childWords.map((node) => {
                        const vocab = vocabularies.find((v) => v.id === node.vocabularyId);
                        const isA = vocab?.cefr === 'A1' || vocab?.cefr === 'A2';
                        return (
                          <div
                            key={node.id}
                            onClick={() => handleSelectWord(node.vocabularyId)}
                            className="cursor-pointer p-2.5 rounded-xl bg-[#1c1e2a] hover:bg-[#252838] border border-white/5 flex items-center justify-between group"
                          >
                            <div className="min-w-0 pr-2">
                              <div className="flex items-center gap-1.5">
                                <span className="text-xs font-semibold text-white truncate">{node.label}</span>
                                {vocab && (
                                  <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${isA ? 'bg-emerald-500/20 text-emerald-300' : 'bg-blue-500/20 text-blue-300'}`}>
                                    {vocab.cefr}
                                  </span>
                                )}
                              </div>
                              <div className="text-[10px] text-gray-400 truncate">{vocab?.meaningVi}</div>
                            </div>
                            <button
                              onClick={(e) => {
                                if (vocab) handlePlayAudio(vocab.word, e);
                              }}
                              className="p-1 text-gray-400 hover:text-emerald-400 shrink-0"
                            >
                              <Volume2 className="w-3 h-3" />
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* VIEW MODE 3: GUIDED FOCUS MODE */}
        {viewMode === 'guided' && (
          <div className="flex-1 h-full flex flex-col items-center justify-center p-6 text-center">
            {activeVocabs.length > 0 ? (
              <div className="max-w-md w-full bg-[#14151e] border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-emerald-400">
                    Từ {Math.min(activeGuidedIndex + 1, activeVocabs.length)} / {activeVocabs.length}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    activeVocabs[activeGuidedIndex % activeVocabs.length]?.cefr?.startsWith('A')
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : 'bg-purple-500/20 text-purple-300'
                  }`}>
                    {activeVocabs[activeGuidedIndex % activeVocabs.length]?.cefr} • {
                      activeVocabs[activeGuidedIndex % activeVocabs.length]?.cefr?.startsWith('A') ? 'Cơ bản' : 'Nâng cao'
                    }
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white">
                    {activeVocabs[activeGuidedIndex % activeVocabs.length]?.word}
                  </h3>
                  <div className="text-sm font-mono text-gray-400 mt-1">
                    {activeVocabs[activeGuidedIndex % activeVocabs.length]?.ipa}
                  </div>
                </div>
                <button
                  onClick={() => handlePlayAudio(activeVocabs[activeGuidedIndex % activeVocabs.length]?.word || '')}
                  className="mx-auto flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 transition-colors"
                >
                  <Volume2 className="w-4 h-4" />
                  <span>Nghe phát âm</span>
                </button>
                <div className="p-4 rounded-2xl bg-black/40 text-sm text-gray-200">
                  {activeVocabs[activeGuidedIndex % activeVocabs.length]?.meaningVi}
                </div>
                <div className="flex items-center justify-between gap-3">
                  <button
                    onClick={() => setActiveGuidedIndex((i) => Math.max(0, i - 1))}
                    disabled={activeGuidedIndex === 0}
                    className="flex-1 py-2 rounded-xl bg-white/10 text-white disabled:opacity-30"
                  >
                    Từ trước
                  </button>
                  <button
                    onClick={() => setActiveGuidedIndex((i) => Math.min(activeVocabs.length - 1, i + 1))}
                    disabled={activeGuidedIndex >= activeVocabs.length - 1}
                    className="flex-1 py-2 rounded-xl bg-emerald-500 text-black font-semibold disabled:opacity-30"
                  >
                    Từ kế tiếp
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-gray-400">Không có từ vựng nào phù hợp với bộ lọc hiện tại.</div>
            )}
          </div>
        )}

        {/* VIEW MODE 4: FLASHCARD */}
        {viewMode === 'flashcard' && (
          <div className="flex-1 h-full flex flex-col items-center justify-center p-6 text-center">
            {activeVocabs.length > 0 ? (
              <>
                <div 
                  onClick={() => setIsCardFlipped(!isCardFlipped)}
                  className="cursor-pointer max-w-md w-full h-72 bg-[#14151e] border-2 border-emerald-500/30 rounded-3xl p-8 shadow-2xl flex flex-col items-center justify-center space-y-4 hover:border-emerald-500 transition-colors"
                >
                  {!isCardFlipped ? (
                    <>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">
                        {activeVocabs[activeGuidedIndex % activeVocabs.length]?.cefr} • {
                          activeVocabs[activeGuidedIndex % activeVocabs.length]?.cefr?.startsWith('A') ? 'Cơ bản' : 'Nâng cao'
                        }
                      </span>
                      <div className="text-3xl font-bold text-white">
                        {activeVocabs[activeGuidedIndex % activeVocabs.length]?.word}
                      </div>
                      <div className="text-sm font-mono text-emerald-400">
                        {activeVocabs[activeGuidedIndex % activeVocabs.length]?.ipa}
                      </div>
                      <div className="text-xs text-gray-500 mt-4">Chạm để lật xem nghĩa tiếng Việt</div>
                    </>
                  ) : (
                    <>
                      <div className="text-xl font-bold text-emerald-400">
                        {activeVocabs[activeGuidedIndex % activeVocabs.length]?.meaningVi}
                      </div>
                      <div className="text-xs text-gray-300 italic px-4">
                        "{activeVocabs[activeGuidedIndex % activeVocabs.length]?.context?.examples?.[0]?.en}"
                      </div>
                      <div className="text-[11px] text-gray-400 italic">
                        "{activeVocabs[activeGuidedIndex % activeVocabs.length]?.context?.examples?.[0]?.vi}"
                      </div>
                      <div className="text-xs text-gray-500 mt-4">Chạm để lật lại</div>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-3 mt-6">
                  <button
                    onClick={() => {
                      setActiveGuidedIndex((i) => Math.max(0, i - 1));
                      setIsCardFlipped(false);
                    }}
                    disabled={activeGuidedIndex === 0}
                    className="px-4 py-2 rounded-xl bg-white/10 text-white text-xs disabled:opacity-30"
                  >
                    Thẻ trước
                  </button>
                  <span className="text-xs text-gray-400 font-mono">
                    {Math.min(activeGuidedIndex + 1, activeVocabs.length)} / {activeVocabs.length}
                  </span>
                  <button
                    onClick={() => {
                      setActiveGuidedIndex((i) => Math.min(activeVocabs.length - 1, i + 1));
                      setIsCardFlipped(false);
                    }}
                    disabled={activeGuidedIndex >= activeVocabs.length - 1}
                    className="px-4 py-2 rounded-xl bg-emerald-500 text-black font-semibold text-xs disabled:opacity-30"
                  >
                    Thẻ kế tiếp
                  </button>
                </div>
              </>
            ) : (
              <div className="text-gray-400">Không có từ vựng nào phù hợp với bộ lọc hiện tại.</div>
            )}
          </div>
        )}

        {/* Slide-over Vocabulary Detail Panel */}
        {selectedVocabularyId && (
          <VocabularyDetailPanel
            onClose={() => setSelectedVocabularyId(null)}
          />
        )}
      </div>
    </div>
  );
};
