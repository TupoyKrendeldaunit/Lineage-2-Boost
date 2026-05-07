import React, { useState } from 'react';
import { Calculator, Clock, PlayCircle, Trophy, TrendingUp, Target } from 'lucide-react';
import { getAbsoluteExp, expTable } from '../data/expTable';

function formatLargeNumber(num: number): string {
  if (num >= 1e15) return (num / 1e15).toFixed(2) + ' квдр.';
  if (num >= 1e12) return (num / 1e12).toFixed(2) + ' трлн';
  if (num >= 1e9) return (num / 1e9).toFixed(2) + ' млрд';
  if (num >= 1e6) return (num / 1e6).toFixed(2) + ' млн';
  if (num >= 1e3) return (num / 1e3).toFixed(2) + ' к';
  return Math.floor(num).toLocaleString('ru-RU');
}

function getRuSuffix(val: string): string {
  const num = parseFloat(val.replace(/\s/g, ''));
  if (isNaN(num) || num <= 0) return '';
  if (num >= 1e15) return `(${(num / 1e15).toFixed(3)} квдр.)`;
  if (num >= 1e12) return `(${(num / 1e12).toFixed(3)} трлн)`;
  if (num >= 1e9) return `(${(num / 1e9).toFixed(3)} млрд)`;
  if (num >= 1e6) return `(${(num / 1e6).toFixed(3)} млн)`;
  if (num >= 1e3) return `(${(num / 1e3).toFixed(2)} тыс.)`;
  return '';
}

function formatInputValue(val: string): string {
  if (!val) return '';
  const parts = val.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return parts.join('.');
}

export const ExpCalculator: React.FC = () => {
  const [currentLevel, setCurrentLevel] = useState<string>('120');
  const [currentExpPercent, setCurrentExpPercent] = useState<string>('0');
  
  const [expPerDayRaw, setExpPerDayRaw] = useState<string>('0');
  const [targetLevel, setTargetLevel] = useState<string>('125');

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>, setter: (val: string) => void) => {
    if (e.target.value.replace(/\s/g, '') === '0') {
       setter('');
    }
    e.target.select();
  };

  const handleExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/,/g, '.');
    
    let multiplier = 1;
    const lower = val.toLowerCase();
    
    let stripped = lower.replace(/\s/g, '');
    
    // Support RU translations and legacy K/KK
    if (stripped.endsWith('квдр') || stripped.endsWith('ккккк')) { multiplier = 1e15; stripped = stripped.replace(/квдр|ккккк$/, ''); }
    else if (stripped.endsWith('трлн') || stripped.endsWith('кккк')) { multiplier = 1e12; stripped = stripped.replace(/трлн|кккк$/, ''); }
    else if (stripped.endsWith('млрд') || stripped.endsWith('ккк')) { multiplier = 1e9; stripped = stripped.replace(/млрд|ккк$/, ''); }
    else if (stripped.endsWith('млн') || stripped.endsWith('кк')) { multiplier = 1e6; stripped = stripped.replace(/млн|кк$/, ''); }
    else if (stripped.endsWith('к') || stripped.endsWith('k')) { multiplier = 1e3; stripped = stripped.replace(/[кk]$/, ''); }
    
    // allow only numbers and dot
    stripped = stripped.replace(/[^0-9.]/g, '');
    const parts = stripped.split('.');
    if (parts.length > 2) stripped = parts[0] + '.' + parts.slice(1).join('');

    if (multiplier > 1 && stripped !== '') {
       const parsed = parseFloat(stripped);
       if (!isNaN(parsed)) {
         setExpPerDayRaw((parsed * multiplier).toString());
         return;
       }
    }
    
    setExpPerDayRaw(stripped);
  };

  const cLevel = parseInt(currentLevel) || 1;
  const cExpPct = parseFloat(currentExpPercent) || 0;
  const targetLvl = parseInt(targetLevel) || 132;
  const absExpPerDay = parseFloat(expPerDayRaw) || 0;

  const safeTargetLvl = Math.max(cLevel, Math.min(132, targetLvl));
  const safeCurrentLvl = Math.max(1, Math.min(132, cLevel));

  // Absolute calculations
  const absCurrent = getAbsoluteExp(safeCurrentLvl, cExpPct);
  const absTarget = expTable[safeTargetLvl]?.totalExp || expTable[132].totalExp;
  
  const expNeeded = absTarget - absCurrent;

  const daysToTarget = (expNeeded > 0 && absExpPerDay > 0) ? (expNeeded / absExpPerDay) : 0;
  const hoursToTarget = daysToTarget * 24;

  const currentLevelNeeded = expTable[safeCurrentLvl]?.neededForNext || 1;
  const expPerDayPctEquivalent = currentLevelNeeded > 0 ? (absExpPerDay / currentLevelNeeded) * 100 : 0;
  
  // Absolute exp values for display
  const fmtAbsDaily = new Intl.NumberFormat('ru-RU').format(Math.floor(absExpPerDay));
  const fmtAbsNeeded = new Intl.NumberFormat('ru-RU').format(Math.floor(expNeeded > 0 ? expNeeded : 0));

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-right-8 duration-500 pb-12 w-full max-w-4xl mx-auto px-4 mt-8">
      <div className="border-b border-neutral-800 pb-6 mb-2">
        <h2 className="text-3xl font-light text-green-100 flex items-center gap-3">
          <Calculator size={28} className="text-green-500" />
          <span>
            Калькулятор <span className="font-bold">Опыта</span>
          </span>
        </h2>
        <p className="text-neutral-400 mt-2">
          Укажи свой текущий уровень, процент и сколько опыта ты получаешь в сутки (точным числом).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full relative z-20">
        {/* Карточка 1: Текущее состояние */}
        <div className="flex flex-col gap-4 bg-[#111119]/80 border border-neutral-800/60 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
          <h3 className="text-green-300 font-semibold mb-2 flex flex-row items-center gap-2">
            <PlayCircle size={18} /> Твой Уровень
          </h3>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Твой Уровень</label>
            <input 
              type="number" step="1" min="1" max="132"
              value={currentLevel} 
              onChange={(e) => setCurrentLevel(e.target.value)} 
              onFocus={(e) => handleFocus(e, setCurrentLevel)}
              className="bg-black/50 border border-neutral-700 rounded-lg px-3 py-2 text-white outline-none focus:border-green-500 transition-colors"
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Текущий опыт (%)</label>
            <input 
              type="number" step="0.0001" min="0" max="100"
              value={currentExpPercent} 
              onChange={(e) => setCurrentExpPercent(e.target.value)} 
              onFocus={(e) => handleFocus(e, setCurrentExpPercent)}
              className="bg-black/50 border border-neutral-700 rounded-lg px-3 py-2 text-white outline-none focus:border-green-500 transition-colors"
            />
          </div>
        </div>

        {/* Карточка 2: Цель и Скорость */}
        <div className="flex flex-col gap-4 bg-[#111119]/80 border border-neutral-800/60 p-6 rounded-2xl backdrop-blur-sm shadow-xl">
          <h3 className="text-amber-300 font-semibold mb-2 flex flex-row items-center gap-2">
            <Target size={18} /> Скорость и Цель
          </h3>
          
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-xs text-neutral-400 uppercase tracking-wider">Опыт в сутки (число)</label>
              <span className="text-base text-amber-300 font-mono font-medium italic">{getRuSuffix(expPerDayRaw)}</span>
            </div>
            <input 
              type="text"
              value={formatInputValue(expPerDayRaw)} 
              onChange={handleExpChange} 
              onFocus={(e) => handleFocus(e, setExpPerDayRaw)}
              placeholder="Напр. 100 млн или 123000000"
              className="bg-black/50 border border-neutral-700 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500 transition-colors font-mono"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-neutral-400 uppercase tracking-wider">Желаемый Уровень</label>
            <input 
              type="number" step="1" min="2" max="132"
              value={targetLevel} 
              onChange={(e) => setTargetLevel(e.target.value)} 
              onFocus={(e) => handleFocus(e, setTargetLevel)}
              className="bg-black/50 border border-neutral-700 rounded-lg px-3 py-2 text-white outline-none focus:border-amber-500 transition-colors"
            />
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-br from-green-900/20 to-neutral-900/40 border border-green-500/30 p-6 rounded-2xl backdrop-blur-sm shadow-2xl relative z-20">
         <h3 className="text-white text-xl flex items-center gap-2 mb-6">
            <TrendingUp className="text-green-400" />
            Результаты Расчета ({cLevel} &#8594; {safeTargetLvl})
         </h3>

         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1 p-4 bg-black/40 rounded-xl border border-neutral-800">
               <span className="text-neutral-400 text-xs uppercase tracking-wider">Осталось Опыта (EXP)</span>
               <span className="text-lg font-mono text-neutral-200" title={fmtAbsNeeded}>
                  {formatLargeNumber(expNeeded > 0 ? expNeeded : 0)}
               </span>
            </div>
            
            <div className="flex flex-col gap-1 p-4 bg-black/40 rounded-xl border border-neutral-800">
               <span className="text-neutral-400 text-xs uppercase tracking-wider">Скорость (% / сутки)</span>
               <span className="text-lg font-mono text-green-400">
                  {expPerDayPctEquivalent > 0 ? `+${expPerDayPctEquivalent.toFixed(4)}%` : '0%'}
               </span>
               <span className="text-neutral-500 text-xs font-mono mt-0.5" title={fmtAbsDaily}>
                  (≈ {formatLargeNumber(absExpPerDay)} EXP)
               </span>
            </div>

            <div className="flex flex-col gap-1 p-4 bg-black/40 rounded-xl border border-amber-900/30">
               <span className="text-neutral-400 text-xs uppercase tracking-wider">Осталось часов</span>
               <span className="text-2xl font-mono text-amber-300">
                  {hoursToTarget > 0 ? hoursToTarget.toLocaleString('ru-RU', { maximumFractionDigits: 1 }) : '---'}
               </span>
            </div>

            <div className="flex flex-col gap-1 p-4 bg-black/40 rounded-xl border border-amber-900/50">
               <span className="text-neutral-400 text-xs uppercase tracking-wider">Осталось дней</span>
               <span className="text-2xl font-mono text-amber-400 font-bold">
                  {daysToTarget > 0 ? daysToTarget.toLocaleString('ru-RU', { maximumFractionDigits: 1 }) : '---'}
               </span>
            </div>
         </div>

         {daysToTarget > 0 && (
           <div className="mt-8 flex items-center gap-3 text-sm text-green-200 bg-green-500/10 p-4 rounded-lg border border-green-500/20">
              <Clock className="w-5 h-5 shrink-0" />
              <p>
                Ап с {safeCurrentLvl} ({cExpPct}%) до {safeTargetLvl} уровня займет <strong>{Math.floor(daysToTarget)} дней</strong> и <strong>{Math.floor((daysToTarget % 1) * 24)} часов</strong> беспрерывного кача.
              </p>
           </div>
         )}
      </div>
    </div>
  );
};
