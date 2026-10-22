import React from 'react';
import { Button } from '../common/Button';
import { ArrowLeft } from 'lucide-react';
import { audioEngine } from '../../utils/audioEngine';
import { cn } from '../../utils/cn';

export interface RealmLayoutProps {
  characterName: string;
  kanji: string;
  epithet: string;
  themeColor?: string;
  onBack: () => void;
  backgroundCanvas: React.ReactNode;
  centralEyeStage: React.ReactNode;
  actionBar?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
  onCanvasClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const RealmLayout: React.FC<RealmLayoutProps> = ({
  characterName,
  kanji,
  epithet,
  onBack,
  backgroundCanvas,
  centralEyeStage,
  actionBar,
  children,
  className = '',
  onCanvasClick,
}) => {
  return (
    <div
      onClick={onCanvasClick}
      className={cn(
        'relative min-h-[calc(100vh-4rem)] w-full flex flex-col items-center select-none overflow-x-hidden',
        className
      )}
    >
      {/* Background Interactive Canvas Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {backgroundCanvas}
      </div>

      {/* Floating Top Bar */}
      <div className="relative z-20 w-full max-w-7xl px-6 pt-6 flex items-center justify-between">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            audioEngine.playActivation();
            onBack();
          }}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Gateways [Esc]
        </Button>

        <div className="flex flex-col items-end text-right">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono tracking-widest text-red-500 uppercase font-semibold">
              {kanji}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-red-600 shadow-[0_0_8px_#ff2222]" />
          </div>
          <span className="text-xs text-zinc-400 font-medium">{epithet}</span>
        </div>
      </div>

      {/* Central Hero Stage */}
      <section className="relative z-10 max-w-5xl w-full flex flex-col items-center text-center gap-5 mt-2 px-6">
        <h1 className="text-4xl md:text-6xl font-black text-white tracking-wider drop-shadow-[0_0_30px_rgba(230,25,25,0.35)]">
          {characterName}
        </h1>

        {/* Central Eye Viewport */}
        <div className="my-2 transition-transform duration-500">
          {centralEyeStage}
        </div>

        {/* Action Controls Bar */}
        {actionBar && <div className="mt-2 w-full flex justify-center">{actionBar}</div>}
      </section>

      {/* Main Content & Lore Section */}
      <section className="relative z-10 max-w-5xl w-full px-6 py-10 flex flex-col gap-8">
        {children}
      </section>
    </div>
  );
};
