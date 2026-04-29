import React, { useState, useMemo, useEffect, useRef } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import {
  Home as HomeIcon, Target, Wallet, TrendingUp, User, Plus, Trash2, Pencil, Languages,
  Sparkles, Check, X, ChevronRight, ChevronLeft, Plane, Shield, Car, ShoppingBag, CreditCard,
  BarChart3, PiggyBank, Heart, Gem, Circle, Globe, RotateCcw, ArrowRight, LineChart as LineChartIcon,
  AlertCircle, Settings, ArrowDownUp, Zap, Phone
} from 'lucide-react';

// ============================================================
// COPY
// ============================================================
const copy = {
  en: {
    locale: 'en-GB', currency: 'GBP', currencySymbol: '£', country: 'uk',
    brand: 'Nort',
    nav: { home: 'Home', allocate: 'Allocate', goals: 'Goals', wealth: 'Wealth', forecast: 'Forecast' },
    month: { names: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
    onboarding: {
      welcome: {
        eyebrow: 'Welcome to Nort',
        title: 'Your money plan,',
        titleBold: 'in five taps.',
        sub: 'A simple monthly rhythm. No daily tracking.',
        cta: 'Get started',
        values: {
          plan: { title: 'Plan', sub: 'Allocate income across pillars' },
          grow: { title: 'Grow', sub: 'Track wealth and project forward' },
          reflect: { title: 'Reflect', sub: 'Check in once a month' },
        },
        privacy: 'Stays on your device. No account needed.',
        namePlaceholder: 'Your name (optional)',
      },
      summary: {
        title: 'You\'re set!',
        sub: 'Here\'s the plan we\'ll start with. Change anything later in Settings.',
        country: 'Country',
        income: 'Monthly income',
        goal: 'Main goal',
        profile: 'Investor profile',
        saveFor: 'Saving for',
        none: '—',
        ctaContinue: 'Continue to your plan',
      },
      income: {
        title: 'What\'s your',
        titleBold: 'monthly income?',
        sub: 'We\'ll plan around this number. You can change it anytime.',
        placeholder: 'e.g. 3,000',
      },
      country: {
        title: 'Where do you',
        titleBold: 'live?',
        sub: 'So we can show the right benchmarks.',
        options: [
          { v: 'uk', l: 'United Kingdom', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
          { v: 'br', l: 'Brazil', currency: 'BRL', symbol: 'R$', flag: '🇧🇷' },
        ],
      },
      goal: {
        title: 'What\'s your main',
        titleBold: 'financial goal?',
        options: [
          { v: 'save_big', l: 'Save for a big purchase', icon: 'bag' },
          { v: 'debt', l: 'Pay off debts', icon: 'card' },
          { v: 'emergency', l: 'Build emergency fund', icon: 'shield' },
          { v: 'invest', l: 'Invest for the future', icon: 'line' },
          { v: 'budget', l: 'General budgeting', icon: 'bars' },
          { v: 'savings', l: 'Build savings', icon: 'piggy' },
        ],
      },
      profile: {
        title: 'Your investor',
        titleBold: 'profile?',
        sub: 'This shapes your suggested wealth buckets.',
        options: [
          { v: 'conservative', l: 'Conservative', sub: 'Safety first. Cash and bonds.', icon: 'shield' },
          { v: 'balanced', l: 'Balanced', sub: 'A mix of stocks, bonds, and cash.', icon: 'bars' },
          { v: 'growth', l: 'Growth', sub: 'Mostly stocks. Higher risk, higher return.', icon: 'line' },
        ],
      },
      saveFor: {
        title: 'What would you like',
        titleBold: 'to save for?',
        sub: 'Pick as many as you want.',
        options: [
          { v: 'emergency', l: 'Emergency fund', icon: 'shield' },
          { v: 'vacation', l: 'Vacation', icon: 'plane' },
          { v: 'car', l: 'New car', icon: 'car' },
          { v: 'home', l: 'New home', icon: 'house' },
          { v: 'wedding', l: 'Wedding', icon: 'gem' },
          { v: 'retirement', l: 'Retirement', icon: 'heart' },
          { v: 'other', l: 'Other', icon: 'circle' },
        ],
        skip: 'Skip for now',
      },
      cta: 'Continue',
    },
    home: {
      greeting: 'Good day',
      greetings: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', night: 'Hi' },
      monthPrompts: { firstWeek: 'Time to plan this month', lastWeek: 'Time for your check-in' },
      thisMonth: 'This month',
      income: 'Income',
      allocated: 'Allocated',
      free: 'Unassigned',
      over: 'Over income',
      wealth: 'Wealth',
      today: 'Today',
      in10: '10 years',
      goalsTitle: 'Goals',
      goalsEmpty: 'No goals yet. Add one in the Goals tab.',
      goalsViewAll: 'View all',
      goalThisMonth: (amt) => `+${amt} this month`,
      vsLastMonth: (delta, label, monthName) => `${delta} ${label} vs ${monthName}`,
      saved: 'saved',
      spent: 'spent',
      insightsTitle: 'What matters',
      noInsights: 'Your plan looks steady.',
      insightActions: { rebalance: 'Rebalance', view: 'View', adjust: 'Adjust' },
      checkInTitle: 'Time for your monthly check-in',
      checkInSub: 'Update your wealth and goals to see fresh projections.',
      checkInCta: 'Start check-in',
      lastChecked: 'Last checked',
      months: (n) => `${n} ${n === 1 ? 'month' : 'months'} in a row`,
      streakBanner: {
        sub3: 'Habit forming. Keep it up.',
        sub6: 'Six months strong.',
        sub12: 'A full year of monthly check-ins.',
        subN: 'Strong, steady, and stacking up.',
      },
      pastView: 'Past view',
      history: 'History',
      viewMonth: 'View',
      noHistory: 'No saved months yet. Save your first plan on Allocate.',
      currentMonth: 'Current',
      swipeHint: 'Swipe or tap arrows to explore past months',
    },
    allocate: {
      title: 'This month',
      sub: 'Plan where your income goes.',
      income: 'Monthly income',
      savePlan: 'Save this month',
      newItem: 'New item',
      pillars: {
        save: { name: 'Save', sub: 'Pay yourself first', color: '#2E8B88' },
        bills: { name: 'Bills', sub: 'Fixed monthly costs', color: '#3B82F6' },
        spend: { name: 'Spend', sub: 'Day-to-day variable costs', color: '#A855F7' },
        debt: { name: 'Debt', sub: 'Money you\'re paying down', color: '#E06B53' },
      },
      total: 'Allocated',
      remaining: 'Unassigned',
      overIncome: 'Over income',
      benchmark: 'Typical',
      benchmarkHigh: 'Above typical',
      benchmarkOk: 'In range',
      benchmarkLow: 'Below typical',
      addItem: 'Add item',
      flow: 'Money flow',
      onTrack: 'on track',
      over: (n) => `+${n}% over`,
      under: (n) => `-${n}% under`,
      target: 'target',
      starterTitle: 'Quick start',
      moneyFlowEmpty: 'Add items below to see how your money is split.',
      ofIncome: 'of income',
      benchmarkPick: 'Compare to',
      benchmarkNone: 'None',
      benchmarkLabels: { housing: 'Housing', utilities: 'Utilities', groceries: 'Groceries', transport: 'Transport', lifestyle: 'Lifestyle', savings: 'Savings', emergency: 'Emergency', investments: 'Investments', debt: 'Debt' },
      quickAdd: 'Quick add',
      reset: 'Reset',
      setTarget: 'Set target',
      target: 'target',
      surplusTitle: 'You have unassigned money',
      surplusBody: (amt) => `${amt} is still unassigned. Where should it go?`,
      surplusKeep: 'Save as is',
      surplusSplit: 'Split across Save',
      sendTo: (name) => `Send to ${name}`,
      replaceTitle: 'Replace your current plan?',
      replaceBody: 'Items stay; only the amounts change to follow the recommended pillar shares.',
      replaceCta: 'Replace plan',
      clearPlan: 'Clear plan',
      clearTitle: 'Clear your current plan?',
      clearBody: 'All item amounts go to zero. Items, names, and benchmarks stay.',
      clearCta: 'Clear',
      smartSheet: 'Smart Split',
      templates: 'Or pick a template',
      lastMonth: (amt) => `Last month: ${amt}`,
      planSaved: 'Plan saved',
      recurring: 'Recurring',
      oneOff: 'One-off this month',
      oneOffTag: 'one-off',
      ofTarget: 'of target',
      addSource: 'Add another income source',
      totalIncome: 'Total income',
      planHint: 'Nort is a planner. Set how your money flows each month.',
      saved: 'Saved for',
      review: {
        eyebrow: 'Month review',
        title: (m) => `${m} · saved`,
        headline: 'Here\'s what changed.',
        empty: 'Plan saved. Come back next month for your first review.',
        deltasTitle: 'Vs last month',
        saveUp: (amt) => `Save +${amt}`,
        saveDown: (amt) => `Save −${amt}`,
        spendUp: (amt) => `Spend +${amt}`,
        spendDown: (amt) => `Spend −${amt}`,
        spendFlat: 'Spend unchanged',
        saveFlat: 'Save unchanged',
        goalsTitle: 'Goals you moved',
        goalAdded: (amt) => `+${amt} this month`,
        goalRemoved: (amt) => `−${amt} this month`,
        goalAhead: (n) => `${n}mo ahead of target`,
        goalBehind: (n) => `${n}mo behind target`,
        goalOnTrack: 'on track',
        driftTitle: 'Your plan is shifting',
        driftDown: (pillar, pp) => `${pillar} dropped ${pp}pp vs your 3-month average.`,
        driftUp: (pillar, pp) => `${pillar} rose ${pp}pp vs your 3-month average.`,
        benchmarkTitle: 'Vs typical',
        benchmarkAbove: (pillar, current, target) => `${pillar} is ${current}% — typical is around ${target}%.`,
        benchmarkBelow: (pillar, current, target) => `${pillar} is ${current}% — typical is around ${target}%.`,
        cta: 'Looks good',
        adjust: 'Adjust plan',
      },
      pillarLabels: { save: 'Save', bills: 'Bills', spend: 'Spend', debt: 'Debt' },
      benchmarkCard: {
        title: 'How you compare',
        sub: 'Typical share of income for your country.',
        on: 'on track',
        above: 'above typical',
        below: 'below typical',
      },
      typical: 'typical',
      consequence: {
        eyebrow: 'What this plan gets you',
        goalOnTrack: (goal, date) => `On track to hit ${goal} by ${date}.`,
        goalEta: (goal, date) => `At this pace, ${goal} ready by ${date}.`,
        savesYear: (amt) => `This plan adds ${amt} to your wealth this year.`,
        empty: 'Plan how your income flows this month.',
      },
      smartAction: {
        spendHighTitle: 'Spend is above typical',
        spendInfoSub: (gap, amt) => `${gap}pp over. Cutting ~${amt} to typical would unlock:`,
        billsHighTitle: 'Bills are above typical',
        billsHighSub: (gap) => `${gap}pp over. Real-world levers — not a number trick.`,
        billsHighCta: 'See levers',
        saveLowTitle: 'Save is below typical',
        saveLowSub: (gap) => `${gap}pp under. Try paying yourself before discretionary spend.`,
        saveLowCta: 'How',
      },
      swap: {
        consequenceGoal: (goal, months) => `${goal} ${months}mo sooner`,
        consequenceNewEta: (goal, months) => `${goal} in ~${months}mo`,
      },
      billsTips: {
        title: 'Trim your Bills',
        sub: (gap) => `Bills are ${gap}pp above typical. Real-world levers — not a number trick.`,
        close: 'Got it',
      },
      saveTips: {
        title: 'Pay yourself first',
        sub: 'Save isn\'t what\'s left over — it\'s what comes off the top.',
        close: 'Got it',
        tips: [
          { title: 'Automate the transfer', body: 'Set a standing order on payday for your Save amount. You can\'t skip it if it\'s already gone.' },
          { title: 'Save the raise', body: 'When income jumps, send the difference to Save before lifestyle catches up.' },
          { title: 'One-account rule', body: 'Keep Save in a separate account you don\'t see day-to-day.' },
        ],
      },
      link: {
        chip: 'Link to goal',
        chipLinked: (name) => `→ ${name}`,
        sheetTitle: 'Link this item to a goal',
        sheetSub: 'When you check in, this amount adds to the goal automatically.',
        empty: 'No matching goals yet. Add one in the Goals tab first.',
        unlink: 'Unlink',
        close: 'Close',
      },
      fundedBy: 'Funded by Allocate',
      feedsWealth: '→ Wealth:',
      smartCard: {
        title: 'Not sure how to split?',
        sub: '3 quick questions. Two suggested plans.',
        cta: 'Get suggestions',
      },
      copyLastCard: {
        title: 'Start from last month',
        sub: 'Use your last saved plan as a starting point.',
        cta: 'Copy',
      },
      smart: {
        title: 'Smart Split',
        step: (n) => `Step ${n} of 3`,
        q1: { label: 'Who lives with you?', options: [
          { v: 'alone', l: 'Just me' },
          { v: 'partner', l: 'With partner' },
          { v: 'kids', l: 'With kids' },
          { v: 'family', l: 'With family' },
        ]},
        q2: { label: 'Your housing?', options: [
          { v: 'rent', l: 'Renting' },
          { v: 'mortgage', l: 'Mortgage' },
          { v: 'free', l: 'Living rent-free' },
        ]},
        q3: { label: 'Where do you live?', options: [
          { v: 'hcol', l: 'High-cost city' },
          { v: 'mcol', l: 'Mid-size city' },
          { v: 'lcol', l: 'Smaller town' },
        ]},
        balanced: { label: 'Balanced', sub: 'Steady progress across pillars', badge: 'BALANCED' },
        focused: { label: 'Focused', sub: 'Leans into your main goal', badge: 'FOCUSED' },
        apply: 'Use this plan',
        recalc: 'Answer again',
        tradeoff: {
          balanced: 'Even share across Save, Bills, and Spend.',
          debt: 'More goes to Debt pillar. Spend tightens for now.',
          emergency: 'Emergency fund builds faster. Less invested.',
          invest: 'Heavier on Investments. Spend tightens.',
          savings: 'Savings get priority. Spend slows down.',
          big: 'Save pillar leads. Other pillars trim.',
        },
      },
    },
    goals: {
      title: 'Goals',
      sub: 'What you\'re working toward.',
      addGoal: 'Add a goal',
      target: 'Target',
      current: 'Current',
      monthly: 'Monthly',
      type: 'Type',
      savings: 'Savings',
      debt: 'Debt',
      editGoal: 'Edit',
      delete: 'Remove',
      new: 'New goal',
      overviewSaved: 'saved',
      overviewToGo: 'to go',
      overviewCount: (n) => n === 1 ? '1 goal' : `${n} goals`,
      monthsLeft: (n) => n === 0 ? 'Reaching this month' : n === 1 ? '1 month left' : `${n} months left`,
      reachedBy: (label) => `Reached by ${label}`,
      noEta: 'Set a monthly amount to see when you\'ll reach it',
      thisMonth: 'this month',
      complete: 'Complete!',
      quickAdd: 'Add to goal',
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      apply: 'Apply',
      amount: 'Amount',
      starterTitle: 'Quick start',
      starterSub: 'Pick a goal to begin',
      starters: [
        { key: 'emergency', name: 'Emergency fund', icon: 'shield', target: 10000, type: 'savings' },
        { key: 'vacation', name: 'Vacation', icon: 'plane', target: 3000, type: 'savings' },
        { key: 'home', name: 'Home deposit', icon: 'house', target: 30000, type: 'savings' },
        { key: 'wedding', name: 'Wedding', icon: 'gem', target: 15000, type: 'savings' },
        { key: 'car', name: 'New car', icon: 'car', target: 12000, type: 'savings' },
        { key: 'debt', name: 'Pay off debt', icon: 'card', target: 5000, type: 'debt' },
      ],
      celebrationTitle: 'Goal achieved!',
      celebrationSub: 'Time to set a new one or keep building.',
      deadline: 'Deadline',
      deadlineHint: 'optional · sets a target date',
      onTrack: 'On track',
      ahead: (n) => n === 1 ? '1 month ahead' : `${n} months ahead`,
      behind: (n) => n === 1 ? '1 month behind' : `${n} months behind`,
      historyTitle: 'Contributions',
      historyEmpty: 'No contributions yet. Use the + button to log one.',
      removeEntryQ: 'Remove this entry?',
    },
    wealth: {
      title: 'Wealth',
      sub: 'Your buckets, your horizon.',
      addBucket: 'Add bucket',
      total: 'Total wealth',
      projection: 'Projection',
      baseline: 'Current',
      scenario: 'With changes',
      whatIf: 'What if you saved more?',
      whatIfSub: 'Drag to see impact.',
      extra: 'Extra per month',
      reset: 'Reset',
      monthly: 'Monthly',
      growth: 'Growth',
      dividend: 'Dividend',
      diff10y: (amt) => `In 10 years, +${amt} vs. current plan.`,
      ofTotal: 'of total',
      allocBalance: 'Allocation vs your profile',
      diversifyHint: 'Spreading across types reduces the bumps.',
      target: 'target',
      onTrack: 'on track',
      over: (n) => `+${n}% over`,
      under: (n) => `-${n}% under`,
      updated: 'Updated',
      justNow: 'just now',
      today: 'today',
      daysAgo: (n) => `${n}d ago`,
      weeksAgo: (n) => `${n}w ago`,
      monthsAgo: (n) => `${n}mo ago`,
      yearsAgo: (n) => `${n}y ago`,
      types: { stocks: 'Stocks', crypto: 'Crypto', bonds: 'Bonds', cash: 'Cash', reits: 'REITs', pension: 'Pension', other: 'Other' },
      riskLabel: 'Portfolio risk',
      riskScale: ['Safe', 'Defensive', 'Balanced', 'Aggressive', 'Speculative'],
      risk: 'Risk',
      riskDefault: 'using type default',
      account: 'Account',
      accountOptional: 'optional (e.g. ISA, SIPP)',
      categories: { equities: 'Equities', fixed: 'Fixed income', cash: 'Cash', alternatives: 'Alternatives' },
      addShort: { equities: 'Equity', fixed: 'Fixed', cash: 'Cash', alternatives: 'Alt' },
      bucketCount: (n) => n === 1 ? '1 bucket' : `${n} buckets`,
      deposit: 'Deposit',
      withdraw: 'Withdraw',
      apply: 'Apply',
      moveAmount: 'Amount',
      move: 'Move',
      recentActivity: 'Recent activity',
      history: 'History',
      noHistory: 'No transactions yet. Use the move button to log a deposit or withdrawal.',
      removeEntryQ: 'Remove this entry?',
      showAll: (n) => `Show all (${n})`,
      collapse: 'Collapse',
    },
    forecast: {
      title: 'Forecast',
      sub: 'Your wealth, month by month.',
      empty: 'Add values to your wealth buckets to see a forecast.',
      whyMatters: 'The magic of compound: money earning money over time.',
      yearCol: 'Year',
      wealthCol: 'Wealth',
      growthCol: 'Growth',
      monthsRange: 'Range',
      thisMonth: 'Now',
      tapYear: 'Tap a year to see months',
      totalContrib: 'Contributed',
      interestEarned: 'Interest',
      priceGrowth: 'Price growth',
      dividendReinvested: 'Dividend reinvested',
      filterAll: 'All',
      filterBy: 'View',
      composition: 'Composition over time',
      diff: (amt, years) => <>Over {years}y, +{amt} vs. current plan.</>,
      nominal: 'Nominal',
      real: 'Real',
      realHint: (rate) => `today's £, ${rate}%/yr inflation`,
    },
    profile: {
      title: 'Profile',
      settings: 'Settings',
      language: 'Language',
      currency: 'Currency',
      country: 'Country',
      investorProfile: 'Investor profile',
      reset: 'Reset all data',
      resetConfirm: 'This will clear everything. Are you sure?',
      version: 'Version 1.0',
      help: 'Help',
    },
    tooltips: {
      investorProfile: {
        title: 'What\'s an investor profile?',
        body: 'How much risk you\'re comfortable with. Lower-risk favours cash and bonds — slower growing, steadier. Higher-risk favours stocks — bumpier, but more potential over the long run.',
      },
      portfolioRisk: {
        title: 'Portfolio risk',
        body: 'How bumpy your wealth\'s ride could be. We blend the risk of each bucket weighted by its share. Cash sits at "Safe", stocks around "Aggressive", crypto at "Speculative". The tick on the bar is the target based on your investor profile.',
      },
      growth: {
        title: 'Growth %',
        body: 'The yearly price return you expect this asset to gain, separate from any dividends. For reference: a global stocks ETF has averaged ~7% real return over decades; cash ~1–4%; bonds 3–5%.',
      },
      dividend: {
        title: 'Dividend %',
        body: 'The yearly cash payout from this asset, separate from price growth. Reinvested dividends compound alongside the price, so 7% growth + 3% dividend behaves like ~10% total return.',
      },
      realNominal: {
        title: 'Real vs Nominal',
        body: '"Nominal" is what the number on your statement will literally read in the future. "Real" shows the same wealth in today\'s spending power, after inflation. Real is the more honest measure for long-term value.',
      },
      benchmark: {
        title: 'What\'s a benchmark?',
        body: 'A typical share of net income people in your country spend on this category, sourced from official statistics (ONS for UK, IBGE for BR). It\'s a sanity check, not a rule.',
      },
    },
    faq: [
      { q: 'What\'s the difference between Save, Bills, and Spend?', a: 'Save = money you\'re putting away for future-you (emergency, savings, investments). Bills = fixed monthly costs that don\'t change much (rent, utilities, council tax). Spend = the variable day-to-day stuff you can flex up or down (groceries, dining, hobbies). Putting Save first is the "pay yourself first" idea — saving comes off the top, not whatever\'s left.' },
      { q: 'Why does the app suggest these amounts?', a: 'Smart Split asks 3 questions about your situation and produces shares that fit the typical pattern for your country, adjusted for whether you rent / own, have kids, etc. Templates apply named presets (Aggressive saver, Debt destroyer, etc.) without questions. Both distribute your income proportionally to recommended pillar shares.' },
      { q: 'What do the benchmark percentages mean?', a: 'They\'re typical shares of net income people spend on each category, from official UK (ONS) and Brazilian (IBGE) statistics. Green/amber/red coloured bars tell you whether you\'re below, near, or above the typical band. Useful as a sanity check — not a rule.' },
      { q: 'What\'s compound growth?', a: 'Earnings on your earnings. If your money grows 7% a year, the gain itself starts earning 7% next year. Over decades it\'s the single biggest driver of wealth — far more than how much you save in a single month.' },
      { q: 'What\'s the difference between Wealth and Goals?', a: 'Wealth tracks what you have right now (account balances, investments). Goals tracks what you\'re working toward (a house deposit, a holiday, debt-free). Money flows from your monthly Save pillar into Wealth buckets, and contributions to Goals come from there too.' },
      { q: 'Why is my plan locked behind a confirmation when I tap a template?', a: 'Templates redistribute your existing item amounts. To prevent a misclick from wiping your careful tuning, the app asks before applying when you already have a plan in place.' },
      { q: 'Does any of this leave my phone?', a: 'No. Everything is stored locally on your device. There\'s no account, no server, no tracking. The trade-off is: if you delete the app or lose your phone, the data goes with it.' },
      { q: 'Why "monthly" everywhere?', a: 'Most household money runs on a monthly cycle — salary, rent, bills. Planning monthly matches reality and keeps the discipline tight without being a daily chore. Hence the tagline: "Plan. Grow. Reflect monthly. No daily tracking."' },
    ],
    common: { edit: 'Edit', done: 'Done', cancel: 'Cancel', save: 'Save', delete: 'Remove', year: 'Y', today: 'today', daysAgo: (n) => `${n}d ago`, gotIt: 'Got it' },
  },
  pt: {
    locale: 'pt-BR', currency: 'BRL', currencySymbol: 'R$', country: 'br',
    brand: 'Nort',
    nav: { home: 'Início', allocate: 'Alocar', goals: 'Metas', wealth: 'Patrimônio', forecast: 'Previsão' },
    month: { names: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'] },
    onboarding: {
      welcome: {
        eyebrow: 'Bem-vindo ao Nort',
        title: 'Seu plano financeiro,',
        titleBold: 'em cinco passos.',
        sub: 'Um ritmo mensal simples. Sem ficar checando todo dia.',
        cta: 'Começar',
        values: {
          plan: { title: 'Planejar', sub: 'Aloque sua renda nos pilares' },
          grow: { title: 'Crescer', sub: 'Acompanhe e projete seu patrimônio' },
          reflect: { title: 'Refletir', sub: 'Faça um check-in mensal' },
        },
        privacy: 'Tudo fica no seu aparelho. Sem cadastro.',
        namePlaceholder: 'Seu nome (opcional)',
      },
      summary: {
        title: 'Tudo pronto!',
        sub: 'Esse é o plano inicial. Você pode mudar tudo depois em Ajustes.',
        country: 'País',
        income: 'Renda mensal',
        goal: 'Meta principal',
        profile: 'Perfil de investidor',
        saveFor: 'Guardando para',
        none: '—',
        ctaContinue: 'Ir pro meu plano',
      },
      income: {
        title: 'Qual é sua',
        titleBold: 'renda mensal?',
        sub: 'Vamos planejar com base nesse número. Pode mudar quando quiser.',
        placeholder: 'ex: 3.000',
      },
      country: {
        title: 'Onde você',
        titleBold: 'mora?',
        sub: 'Para mostrar os benchmarks certos.',
        options: [
          { v: 'uk', l: 'Reino Unido', currency: 'GBP', symbol: '£', flag: '🇬🇧' },
          { v: 'br', l: 'Brasil', currency: 'BRL', symbol: 'R$', flag: '🇧🇷' },
        ],
      },
      goal: {
        title: 'Qual sua principal',
        titleBold: 'meta financeira?',
        options: [
          { v: 'save_big', l: 'Poupar para uma compra grande', icon: 'bag' },
          { v: 'debt', l: 'Quitar dívidas', icon: 'card' },
          { v: 'emergency', l: 'Criar reserva de emergência', icon: 'shield' },
          { v: 'invest', l: 'Investir para o futuro', icon: 'line' },
          { v: 'budget', l: 'Organizar o orçamento', icon: 'bars' },
          { v: 'savings', l: 'Guardar dinheiro', icon: 'piggy' },
        ],
      },
      profile: {
        title: 'Seu perfil',
        titleBold: 'de investidor?',
        sub: 'Define a alocação sugerida do seu patrimônio.',
        options: [
          { v: 'conservative', l: 'Conservador', sub: 'Segurança primeiro. Renda fixa.', icon: 'shield' },
          { v: 'balanced', l: 'Balanceado', sub: 'Mix de ações, renda fixa e reserva.', icon: 'bars' },
          { v: 'growth', l: 'Agressivo', sub: 'Maioria em ações. Mais risco, mais retorno.', icon: 'line' },
        ],
      },
      saveFor: {
        title: 'O que você quer',
        titleBold: 'conquistar?',
        sub: 'Escolha quantas quiser.',
        options: [
          { v: 'emergency', l: 'Reserva de emergência', icon: 'shield' },
          { v: 'vacation', l: 'Viagem', icon: 'plane' },
          { v: 'car', l: 'Carro novo', icon: 'car' },
          { v: 'home', l: 'Casa própria', icon: 'house' },
          { v: 'wedding', l: 'Casamento', icon: 'gem' },
          { v: 'retirement', l: 'Aposentadoria', icon: 'heart' },
          { v: 'other', l: 'Outro', icon: 'circle' },
        ],
        skip: 'Pular por agora',
      },
      cta: 'Continuar',
    },
    home: {
      greeting: 'Olá',
      greetings: { morning: 'Bom dia', afternoon: 'Boa tarde', evening: 'Boa noite', night: 'Olá' },
      monthPrompts: { firstWeek: 'Hora de planejar o mês', lastWeek: 'Hora do seu check-in' },
      thisMonth: 'Este mês',
      income: 'Renda',
      allocated: 'Alocado',
      free: 'Sem destino',
      over: 'Acima da renda',
      wealth: 'Patrimônio',
      today: 'Hoje',
      in10: '10 anos',
      goalsTitle: 'Metas',
      goalsEmpty: 'Sem metas ainda. Adicione uma na aba Metas.',
      goalsViewAll: 'Ver todas',
      goalThisMonth: (amt) => `+${amt} este mês`,
      vsLastMonth: (delta, label, monthName) => `${delta} ${label} vs ${monthName}`,
      saved: 'guardado',
      spent: 'gasto',
      insightsTitle: 'O que importa',
      noInsights: 'Seu plano está estável.',
      insightActions: { rebalance: 'Rebalancear', view: 'Ver', adjust: 'Ajustar' },
      checkInTitle: 'Hora do seu check-in mensal',
      checkInSub: 'Atualize patrimônio e metas para ver novas projeções.',
      checkInCta: 'Começar check-in',
      lastChecked: 'Última revisão',
      months: (n) => `${n} ${n === 1 ? 'mês' : 'meses'} seguidos`,
      streakBanner: {
        sub3: 'Hábito se formando. Continue.',
        sub6: 'Seis meses firme.',
        sub12: 'Um ano inteiro de check-ins.',
        subN: 'Forte, constante e acumulando.',
      },
      pastView: 'Vista do passado',
      history: 'Histórico',
      viewMonth: 'Ver',
      noHistory: 'Nenhum mês salvo ainda. Salve seu primeiro plano em Alocar.',
      currentMonth: 'Atual',
      swipeHint: 'Deslize ou toque nas setas para explorar meses passados',
    },
    allocate: {
      title: 'Este mês',
      sub: 'Planeje para onde sua renda vai.',
      income: 'Renda mensal',
      savePlan: 'Salvar este mês',
      newItem: 'Novo item',
      pillars: {
        save: { name: 'Guardar', sub: 'Pague-se primeiro', color: '#2E8B88' },
        bills: { name: 'Contas', sub: 'Despesas fixas mensais', color: '#3B82F6' },
        spend: { name: 'Gastos', sub: 'Despesas variáveis do dia a dia', color: '#A855F7' },
        debt: { name: 'Dívidas', sub: 'Dívidas em pagamento', color: '#E06B53' },
      },
      total: 'Alocado',
      remaining: 'Sem destino',
      overIncome: 'Acima da renda',
      benchmark: 'Típico',
      benchmarkHigh: 'Acima do típico',
      benchmarkOk: 'Na faixa',
      benchmarkLow: 'Abaixo do típico',
      addItem: 'Adicionar item',
      flow: 'Fluxo do dinheiro',
      onTrack: 'no caminho',
      over: (n) => `+${n}% acima`,
      under: (n) => `-${n}% abaixo`,
      target: 'alvo',
      starterTitle: 'Início rápido',
      moneyFlowEmpty: 'Adicione itens abaixo para ver a divisão do seu dinheiro.',
      ofIncome: 'da renda',
      benchmarkPick: 'Comparar com',
      benchmarkNone: 'Nenhum',
      benchmarkLabels: { housing: 'Moradia', utilities: 'Contas', groceries: 'Mercado', transport: 'Transporte', lifestyle: 'Lazer', savings: 'Poupança', emergency: 'Reserva', investments: 'Investimentos', debt: 'Dívidas' },
      quickAdd: 'Adicionar rápido',
      reset: 'Zerar',
      setTarget: 'Definir alvo',
      target: 'alvo',
      surplusTitle: 'Você ainda tem dinheiro sobrando',
      surplusBody: (amt) => `${amt} ainda não foi alocado. Onde colocar?`,
      surplusKeep: 'Salvar mesmo assim',
      surplusSplit: 'Dividir no Guardar',
      sendTo: (name) => `Mandar pra ${name}`,
      replaceTitle: 'Substituir seu plano atual?',
      replaceBody: 'Os itens continuam; apenas os valores mudam pra seguir as proporções recomendadas.',
      replaceCta: 'Substituir plano',
      clearPlan: 'Limpar plano',
      clearTitle: 'Limpar seu plano atual?',
      clearBody: 'Todos os valores vão pra zero. Itens, nomes e benchmarks ficam.',
      clearCta: 'Limpar',
      smartSheet: 'Plano Inteligente',
      templates: 'Ou escolha um modelo',
      lastMonth: (amt) => `Mês passado: ${amt}`,
      planSaved: 'Plano salvo',
      recurring: 'Recorrente',
      oneOff: 'Só este mês',
      oneOffTag: 'pontual',
      ofTarget: 'do alvo',
      addSource: 'Adicionar outra fonte de renda',
      totalIncome: 'Renda total',
      planHint: 'O Nort é um planejador. Defina como seu dinheiro flui a cada mês.',
      saved: 'Salvo em',
      review: {
        eyebrow: 'Resumo do mês',
        title: (m) => `${m} · salvo`,
        headline: 'O que mudou.',
        empty: 'Plano salvo. No próximo mês você vê o primeiro resumo.',
        deltasTitle: 'Vs mês passado',
        saveUp: (amt) => `Guardar +${amt}`,
        saveDown: (amt) => `Guardar −${amt}`,
        spendUp: (amt) => `Gastar +${amt}`,
        spendDown: (amt) => `Gastar −${amt}`,
        spendFlat: 'Gasto sem mudança',
        saveFlat: 'Guardar sem mudança',
        goalsTitle: 'Metas que avançaram',
        goalAdded: (amt) => `+${amt} este mês`,
        goalRemoved: (amt) => `−${amt} este mês`,
        goalAhead: (n) => `${n} meses adiantado`,
        goalBehind: (n) => `${n} meses atrasado`,
        goalOnTrack: 'no ritmo',
        driftTitle: 'Seu plano está mudando',
        driftDown: (pillar, pp) => `${pillar} caiu ${pp}pp vs sua média de 3 meses.`,
        driftUp: (pillar, pp) => `${pillar} subiu ${pp}pp vs sua média de 3 meses.`,
        benchmarkTitle: 'Vs o típico',
        benchmarkAbove: (pillar, current, target) => `${pillar} está em ${current}% — o típico fica em torno de ${target}%.`,
        benchmarkBelow: (pillar, current, target) => `${pillar} está em ${current}% — o típico fica em torno de ${target}%.`,
        cta: 'Tudo certo',
        adjust: 'Ajustar plano',
      },
      pillarLabels: { save: 'Guardar', bills: 'Contas', spend: 'Gastar', debt: 'Dívida' },
      benchmarkCard: {
        title: 'Como você se compara',
        sub: 'Faixa típica da renda no seu país.',
        on: 'no padrão',
        above: 'acima do típico',
        below: 'abaixo do típico',
      },
      typical: 'típico',
      consequence: {
        eyebrow: 'O que esse plano te dá',
        goalOnTrack: (goal, date) => `No ritmo pra conquistar ${goal} em ${date}.`,
        goalEta: (goal, date) => `Nesse ritmo, ${goal} pronto em ${date}.`,
        savesYear: (amt) => `Esse plano soma ${amt} ao seu patrimônio este ano.`,
        empty: 'Planeje como seu dinheiro flui este mês.',
      },
      smartAction: {
        spendHighTitle: 'Gasto está acima do típico',
        spendInfoSub: (gap, amt) => `${gap}pp a mais. Cortar ~${amt} pro típico libera:`,
        billsHighTitle: 'Contas estão acima do típico',
        billsHighSub: (gap) => `${gap}pp a mais. Mexa no real — não só no número.`,
        billsHighCta: 'Ver alavancas',
        saveLowTitle: 'Guardar está abaixo do típico',
        saveLowSub: (gap) => `${gap}pp a menos. Tente pagar você primeiro, antes do gasto livre.`,
        saveLowCta: 'Como',
      },
      swap: {
        consequenceGoal: (goal, months) => `${goal} ${months} meses antes`,
        consequenceNewEta: (goal, months) => `${goal} em ~${months} meses`,
      },
      billsTips: {
        title: 'Reduzir suas Contas',
        sub: (gap) => `Contas estão ${gap}pp acima do típico. Mexa no real — não só no número.`,
        close: 'Entendi',
      },
      saveTips: {
        title: 'Pague você primeiro',
        sub: 'Guardar não é o que sobra — é o que sai antes.',
        close: 'Entendi',
        tips: [
          { title: 'Automatize a transferência', body: 'Programe uma transferência no dia do pagamento pro valor que você vai guardar. Não tem como pular se já saiu.' },
          { title: 'Guarde o aumento', body: 'Quando a renda subir, mande a diferença pra Guardar antes do estilo de vida acompanhar.' },
          { title: 'Conta separada', body: 'Deixe a reserva numa conta que você não vê no dia a dia.' },
        ],
      },
      link: {
        chip: 'Vincular a meta',
        chipLinked: (name) => `→ ${name}`,
        sheetTitle: 'Vincular este item a uma meta',
        sheetSub: 'Quando você fizer o check-in, esse valor entra na meta automaticamente.',
        empty: 'Nenhuma meta compatível ainda. Adicione uma na aba Metas primeiro.',
        unlink: 'Desvincular',
        close: 'Fechar',
      },
      fundedBy: 'Vem do Alocar',
      feedsWealth: '→ Patrimônio:',
      smartCard: {
        title: 'Não sabe como dividir sua renda?',
        sub: '3 perguntas rápidas. Dois planos sugeridos.',
        cta: 'Ver sugestões',
      },
      copyLastCard: {
        title: 'Começar do mês passado',
        sub: 'Use seu último plano salvo como ponto de partida.',
        cta: 'Copiar',
      },
      smart: {
        title: 'Plano Inteligente',
        step: (n) => `Passo ${n} de 3`,
        q1: { label: 'Quem mora com você?', options: [
          { v: 'alone', l: 'Só eu' },
          { v: 'partner', l: 'Com parceiro(a)' },
          { v: 'kids', l: 'Com filhos' },
          { v: 'family', l: 'Com família' },
        ]},
        q2: { label: 'Sua moradia?', options: [
          { v: 'rent', l: 'Alugo' },
          { v: 'mortgage', l: 'Financiamento' },
          { v: 'free', l: 'Moro sem custo' },
        ]},
        q3: { label: 'Onde você mora?', options: [
          { v: 'hcol', l: 'Capital / cidade cara' },
          { v: 'mcol', l: 'Cidade média' },
          { v: 'lcol', l: 'Cidade pequena' },
        ]},
        balanced: { label: 'Equilibrado', sub: 'Avanço constante em todos os pilares', badge: 'EQUILIBRADO' },
        focused: { label: 'Focado', sub: 'Foco na sua meta principal', badge: 'FOCADO' },
        apply: 'Usar este plano',
        recalc: 'Responder de novo',
        tradeoff: {
          balanced: 'Divisão equilibrada entre Guardar, Contas e Gastos.',
          debt: 'Mais pra quitar dívidas. Gasto aperta por enquanto.',
          emergency: 'A reserva cresce mais rápido. Menos investido.',
          invest: 'Mais em Investimentos. Gasto aperta.',
          savings: 'Guardar em primeiro lugar. Gasto desacelera.',
          big: 'O pilar Guardar lidera. Os outros pilares reduzem.',
        },
      },
    },
    goals: {
      title: 'Metas',
      sub: 'O que você está conquistando.',
      addGoal: 'Adicionar meta',
      target: 'Meta',
      current: 'Atual',
      monthly: 'Mensal',
      type: 'Tipo',
      savings: 'Poupança',
      debt: 'Dívida',
      editGoal: 'Editar',
      delete: 'Remover',
      overviewSaved: 'guardado',
      overviewToGo: 'restantes',
      overviewCount: (n) => n === 1 ? '1 meta' : `${n} metas`,
      monthsLeft: (n) => n === 0 ? 'Conquistando este mês' : n === 1 ? '1 mês restante' : `${n} meses restantes`,
      reachedBy: (label) => `Conquista em ${label}`,
      noEta: 'Defina um valor mensal pra ver quando vai conquistar',
      thisMonth: 'este mês',
      complete: 'Conquistado!',
      quickAdd: 'Adicionar à meta',
      deposit: 'Depositar',
      withdraw: 'Retirar',
      apply: 'Aplicar',
      amount: 'Valor',
      starterTitle: 'Início rápido',
      starterSub: 'Escolha uma meta pra começar',
      starters: [
        { key: 'emergency', name: 'Reserva de emergência', icon: 'shield', target: 30000, type: 'savings' },
        { key: 'vacation', name: 'Férias', icon: 'plane', target: 10000, type: 'savings' },
        { key: 'home', name: 'Entrada da casa', icon: 'house', target: 80000, type: 'savings' },
        { key: 'wedding', name: 'Casamento', icon: 'gem', target: 40000, type: 'savings' },
        { key: 'car', name: 'Carro novo', icon: 'car', target: 50000, type: 'savings' },
        { key: 'debt', name: 'Quitar dívidas', icon: 'card', target: 10000, type: 'debt' },
      ],
      celebrationTitle: 'Meta conquistada!',
      celebrationSub: 'Hora de definir uma nova ou continuar.',
      deadline: 'Prazo',
      deadlineHint: 'opcional · define uma data alvo',
      onTrack: 'No caminho',
      ahead: (n) => n === 1 ? '1 mês adiantado' : `${n} meses adiantado`,
      behind: (n) => n === 1 ? '1 mês atrasado' : `${n} meses atrasado`,
      historyTitle: 'Contribuições',
      historyEmpty: 'Sem contribuições ainda. Use o botão + pra registrar.',
      removeEntryQ: 'Remover este registro?',
      new: 'Nova meta',
    },
    wealth: {
      title: 'Patrimônio',
      sub: 'Suas categorias, seu horizonte.',
      addBucket: 'Adicionar categoria',
      total: 'Patrimônio total',
      projection: 'Projeção',
      baseline: 'Plano atual',
      scenario: 'Com mudanças',
      whatIf: 'E se você guardasse mais?',
      whatIfSub: 'Arraste pra ver o impacto.',
      extra: 'Extra por mês',
      reset: 'Resetar',
      monthly: 'Mensal',
      growth: 'Crescimento',
      dividend: 'Dividendo',
      diff10y: (amt) => `Em 10 anos, +${amt} vs. plano atual.`,
      ofTotal: 'do total',
      allocBalance: 'Alocação vs seu perfil',
      diversifyHint: 'Espalhar entre tipos reduz as oscilações.',
      target: 'alvo',
      onTrack: 'no caminho',
      over: (n) => `+${n}% acima`,
      under: (n) => `-${n}% abaixo`,
      updated: 'Atualizado',
      justNow: 'agora',
      today: 'hoje',
      daysAgo: (n) => `há ${n}d`,
      weeksAgo: (n) => `há ${n}sem`,
      monthsAgo: (n) => `há ${n}m`,
      yearsAgo: (n) => `há ${n}a`,
      types: { stocks: 'Ações', crypto: 'Cripto', bonds: 'Renda fixa', cash: 'Reserva', reits: 'FIIs', pension: 'Previdência', other: 'Outros' },
      riskLabel: 'Risco da carteira',
      riskScale: ['Seguro', 'Defensivo', 'Balanceado', 'Agressivo', 'Especulativo'],
      risk: 'Risco',
      riskDefault: 'padrão do tipo',
      account: 'Conta',
      accountOptional: 'opcional (ex: Tesouro, CDB)',
      categories: { equities: 'Renda variável', fixed: 'Renda fixa', cash: 'Reserva', alternatives: 'Alternativos' },
      addShort: { equities: 'Ações', fixed: 'Fixa', cash: 'Reserva', alternatives: 'Alt' },
      bucketCount: (n) => n === 1 ? '1 categoria' : `${n} categorias`,
      deposit: 'Depositar',
      withdraw: 'Retirar',
      apply: 'Aplicar',
      moveAmount: 'Valor',
      move: 'Mover',
      recentActivity: 'Atividade recente',
      history: 'Histórico',
      noHistory: 'Sem transações ainda. Use o botão mover para registrar um depósito ou retirada.',
      removeEntryQ: 'Remover este registro?',
      showAll: (n) => `Ver tudo (${n})`,
      collapse: 'Recolher',
    },
    forecast: {
      title: 'Previsão',
      sub: 'Seu patrimônio, mês a mês.',
      empty: 'Adicione valores às suas categorias pra ver a previsão.',
      whyMatters: 'A mágica dos juros compostos: rendimento gerando rendimento ao longo do tempo.',
      yearCol: 'Ano',
      wealthCol: 'Patrimônio',
      growthCol: 'Crescimento',
      monthsRange: 'Intervalo',
      thisMonth: 'Agora',
      tapYear: 'Toque num ano pra ver os meses',
      totalContrib: 'Aportado',
      interestEarned: 'Juros',
      priceGrowth: 'Crescimento',
      dividendReinvested: 'Dividendos reinvestidos',
      composition: 'Composição ao longo do tempo',
      diff: (amt, years) => <>Em {years}a, +{amt} vs. plano atual.</>,
      nominal: 'Nominal',
      real: 'Real',
      realHint: (rate) => `R$ de hoje, ${rate}%/ano de inflação`,
      filterAll: 'Todos',
      filterBy: 'Ver',
    },
    profile: {
      title: 'Perfil',
      settings: 'Ajustes',
      language: 'Idioma',
      currency: 'Moeda',
      country: 'País',
      investorProfile: 'Perfil de investidor',
      reset: 'Apagar todos os dados',
      resetConfirm: 'Isso vai apagar tudo. Tem certeza?',
      version: 'Versão 1.0',
      help: 'Ajuda',
    },
    tooltips: {
      investorProfile: {
        title: 'O que é perfil de investidor?',
        body: 'Quanto risco você aceita. Perfis mais conservadores priorizam reserva e renda fixa — crescem devagar, mas são mais estáveis. Perfis mais agressivos priorizam ações — oscilam mais, mas têm mais potencial no longo prazo.',
      },
      portfolioRisk: {
        title: 'Risco da carteira',
        body: 'Quão volátil é o caminho do seu patrimônio. Misturamos o risco de cada balde ponderado pela participação. Reserva fica em "Seguro", ações perto de "Agressivo", cripto em "Especulativo". O traço na barra é o alvo do seu perfil de investidor.',
      },
      growth: {
        title: 'Crescimento %',
        body: 'O retorno anual de preço esperado pra esse ativo, sem contar dividendos. Pra referência: ETFs globais de ações têm rendido ~7% reais ao ano em décadas; reserva ~1–4%; renda fixa 3–5%.',
      },
      dividend: {
        title: 'Dividendo %',
        body: 'O pagamento anual em dinheiro do ativo, separado do crescimento de preço. Dividendos reinvestidos compõem junto com o preço, então 7% de crescimento + 3% de dividendo se comporta como ~10% no total.',
      },
      realNominal: {
        title: 'Real vs Nominal',
        body: '"Nominal" mostra o número que vai aparecer no extrato no futuro. "Real" mostra o mesmo patrimônio no poder de compra de hoje, descontando inflação. Real é a medida mais honesta pra longo prazo.',
      },
      benchmark: {
        title: 'O que é um benchmark?',
        body: 'A fatia típica da renda líquida que pessoas no seu país gastam em cada categoria, vinda de estatísticas oficiais (ONS no UK, IBGE no Brasil). É um sanity check, não uma regra.',
      },
    },
    faq: [
      { q: 'Qual a diferença entre Guardar, Contas e Gastos?', a: 'Guardar = dinheiro que você guarda pro seu eu futuro (reserva, poupança, investimentos). Contas = despesas mensais fixas que pouco mudam (aluguel, luz, condomínio). Gastos = as variáveis do dia a dia que você pode flexibilizar (mercado, restaurantes, hobbies). Colocar Guardar primeiro é a ideia "pague-se primeiro" — guardar vem do topo, não do que sobra.' },
      { q: 'Por que o app sugere esses valores?', a: 'O Plano Inteligente faz 3 perguntas sobre você e produz proporções típicas pro seu país, ajustadas se você aluga / é dono, tem filhos, etc. Modelos aplicam presets nomeados (Investidor agressivo, Quitar dívidas, etc.) sem perguntas. Ambos distribuem sua renda nas proporções recomendadas.' },
      { q: 'O que significam as porcentagens de benchmark?', a: 'São fatias típicas da renda líquida que pessoas gastam em cada categoria, segundo estatísticas oficiais do UK (ONS) e do Brasil (IBGE). Barras coloridas verde/amarelo/vermelho indicam se você está abaixo, perto ou acima do típico. Sanity check, não regra.' },
      { q: 'O que é juros compostos?', a: 'Rendimento sobre rendimento. Se seu dinheiro cresce 7% ao ano, o ganho começa a render 7% no ano seguinte. Em décadas é o maior motor de patrimônio — muito mais do que quanto você guarda em um único mês.' },
      { q: 'Qual a diferença entre Patrimônio e Metas?', a: 'Patrimônio acompanha o que você tem agora (saldos, investimentos). Metas acompanha o que você está conquistando (entrada da casa, viagem, ficar sem dívida). O dinheiro flui do pilar Guardar mensal pro Patrimônio, e contribuições pras Metas saem dali também.' },
      { q: 'Por que o app pede confirmação ao tocar em um modelo?', a: 'Modelos redistribuem os valores dos seus itens. Pra evitar que um toque errado apague seu ajuste cuidadoso, o app pergunta antes de aplicar quando você já tem um plano.' },
      { q: 'Algo disso sai do meu celular?', a: 'Não. Tudo fica armazenado localmente no aparelho. Sem cadastro, sem servidor, sem rastreio. O lado ruim: se você apagar o app ou perder o celular, os dados vão junto.' },
      { q: 'Por que tudo é "mensal"?', a: 'A maior parte do dinheiro doméstico segue um ciclo mensal — salário, aluguel, contas. Planejar mensalmente bate com a realidade e mantém a disciplina firme sem virar uma tarefa diária. Daí o lema: "Plane. Cresça. Reflita mensalmente. Sem rastreio diário."' },
    ],
    common: { edit: 'Editar', done: 'Pronto', cancel: 'Cancelar', save: 'Salvar', delete: 'Remover', year: 'A', today: 'hoje', daysAgo: (n) => `há ${n}d`, gotIt: 'Entendi' },
  },
};

// ============================================================
// BENCHMARKS — sourced from ONS (UK FYE 2024) and IBGE POF (BR)
// Values are % of net income. Each item has {green: max%, yellow: max%}
// Green = below yellow threshold, Yellow = between green and yellow, Red = above yellow
// ============================================================
const BENCHMARKS = {
  uk: {
    // Source: ONS Family Spending FYE 2024
    housing:    { green: 30, yellow: 40, source: 'ONS FYE 2024' },
    utilities:  { green: 8,  yellow: 12, source: 'ONS FYE 2024' },
    groceries:  { green: 12, yellow: 16, source: 'ONS FYE 2024' },
    transport:  { green: 12, yellow: 16, source: 'ONS FYE 2024' },
    lifestyle:  { green: 15, yellow: 22, source: 'ONS FYE 2024' },
    savings:    { green: 20, yellow: 100, source: 'General guidance', invert: true }, // higher is better
    emergency:  { green: 5,  yellow: 100, source: 'General guidance', invert: true },
    investments:{ green: 10, yellow: 100, source: 'General guidance', invert: true },
    debt:       { green: 15, yellow: 30, source: 'General guidance' },
  },
  br: {
    // Source: IBGE POF 2017-2018 (most recent published)
    housing:    { green: 28, yellow: 38, source: 'IBGE POF' },
    utilities:  { green: 8,  yellow: 12, source: 'IBGE POF' },
    groceries:  { green: 15, yellow: 22, source: 'IBGE POF' },
    transport:  { green: 14, yellow: 20, source: 'IBGE POF' },
    lifestyle:  { green: 12, yellow: 18, source: 'IBGE POF' },
    savings:    { green: 15, yellow: 100, source: 'Orientação geral', invert: true },
    emergency:  { green: 5,  yellow: 100, source: 'Orientação geral', invert: true },
    investments:{ green: 8,  yellow: 100, source: 'Orientação geral', invert: true },
    debt:       { green: 15, yellow: 30, source: 'Orientação geral' },
  },
};

// ============================================================
// INVESTOR PROFILE — suggested bucket mix
// ============================================================
const PROFILE_BUCKETS = {
  conservative: {
    uk: [
      { name: 'Cash savings', type: 'cash', growth: 4, share: 0.6 },
      { name: 'Bonds / Gilts', type: 'bonds', growth: 5, share: 0.3 },
      { name: 'Stocks / ETFs', type: 'stocks', growth: 7, share: 0.1 },
    ],
    br: [
      { name: 'Tesouro Selic', type: 'bonds', growth: 11, share: 0.7 },
      { name: 'CDB / Poupança', type: 'cash', growth: 8, share: 0.3 },
    ],
  },
  balanced: {
    uk: [
      { name: 'Stocks / ETFs', type: 'stocks', growth: 7, share: 0.5 },
      { name: 'Bonds / Gilts', type: 'bonds', growth: 5, share: 0.3 },
      { name: 'Cash savings', type: 'cash', growth: 4, share: 0.2 },
    ],
    br: [
      { name: 'Ações / ETFs', type: 'stocks', growth: 10, share: 0.4 },
      { name: 'Tesouro IPCA+', type: 'bonds', growth: 9, share: 0.35 },
      { name: 'FIIs', type: 'reits', growth: 9, share: 0.15 },
      { name: 'Reserva', type: 'cash', growth: 8, share: 0.1 },
    ],
  },
  growth: {
    uk: [
      { name: 'Stocks / ETFs', type: 'stocks', growth: 7, share: 0.7 },
      { name: 'Crypto', type: 'crypto', growth: 15, share: 0.15 },
      { name: 'Bonds / Gilts', type: 'bonds', growth: 5, share: 0.1 },
      { name: 'Cash savings', type: 'cash', growth: 4, share: 0.05 },
    ],
    br: [
      { name: 'Ações / ETFs', type: 'stocks', growth: 10, share: 0.55 },
      { name: 'FIIs', type: 'reits', growth: 9, share: 0.2 },
      { name: 'Cripto', type: 'crypto', growth: 15, share: 0.15 },
      { name: 'Reserva', type: 'cash', growth: 8, share: 0.1 },
    ],
  },
};

// ============================================================
// DEFAULT ALLOCATE ITEMS (grouped by pillar, with benchmark keys)
// ============================================================
const DEFAULT_ITEMS = {
  en: [
    { pillar: 'save', name: 'Emergency fund', icon: 'shield', benchmarkKey: 'emergency', typicalShare: 5 },
    { pillar: 'save', name: 'Savings', icon: 'piggy', benchmarkKey: 'savings', typicalShare: 5 },
    { pillar: 'save', name: 'Investments', icon: 'line', benchmarkKey: 'investments', typicalShare: 10 },
    { pillar: 'bills', name: 'Rent / Mortgage', icon: 'house', benchmarkKey: 'housing', typicalShare: 25 },
    { pillar: 'bills', name: 'Council tax', icon: 'house', benchmarkKey: null, typicalShare: 4 },
    { pillar: 'bills', name: 'Electricity & gas', icon: 'line', benchmarkKey: 'utilities', typicalShare: 4 },
    { pillar: 'bills', name: 'Water', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Internet', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Mobile', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'spend', name: 'Groceries', icon: 'bag', benchmarkKey: 'groceries', typicalShare: 12 },
    { pillar: 'spend', name: 'Transport', icon: 'car', benchmarkKey: 'transport', typicalShare: 10 },
    { pillar: 'spend', name: 'Dining out', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 5 },
    { pillar: 'spend', name: 'Personal cash', icon: 'gem', benchmarkKey: null, typicalShare: 4 },
  ],
  pt: [
    { pillar: 'save', name: 'Reserva de emergência', icon: 'shield', benchmarkKey: 'emergency', typicalShare: 5 },
    { pillar: 'save', name: 'Poupança', icon: 'piggy', benchmarkKey: 'savings', typicalShare: 5 },
    { pillar: 'save', name: 'Investimentos', icon: 'line', benchmarkKey: 'investments', typicalShare: 8 },
    { pillar: 'bills', name: 'Aluguel / Financiamento', icon: 'house', benchmarkKey: 'housing', typicalShare: 25 },
    { pillar: 'bills', name: 'Condomínio', icon: 'house', benchmarkKey: null, typicalShare: 5 },
    { pillar: 'bills', name: 'Luz', icon: 'line', benchmarkKey: 'utilities', typicalShare: 3 },
    { pillar: 'bills', name: 'Água', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Gás', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Internet', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Celular', icon: 'line', benchmarkKey: null, typicalShare: 1 },
    { pillar: 'bills', name: 'Plano de saúde', icon: 'shield', benchmarkKey: null, typicalShare: 5 },
    { pillar: 'spend', name: 'Mercado', icon: 'bag', benchmarkKey: 'groceries', typicalShare: 15 },
    { pillar: 'spend', name: 'Transporte', icon: 'car', benchmarkKey: 'transport', typicalShare: 8 },
    { pillar: 'spend', name: 'Restaurantes', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 5 },
    { pillar: 'spend', name: 'Dinheiro pessoal', icon: 'gem', benchmarkKey: null, typicalShare: 4 },
  ],
};

// Benchmarks available per pillar. Used by the inline-edit picker so an item
// in the Save pillar can't accidentally be compared against the Housing
// benchmark, etc.
const PILLAR_BENCHMARKS = {
  save: ['savings', 'emergency', 'investments'],
  bills: ['housing', 'utilities'],
  spend: ['groceries', 'transport', 'lifestyle'],
  debt: ['debt'],
};

// Maps a benchmark key to its pillar. Used by Smart Split / templates to
// route generated items into the right pillar.
const BENCHMARK_TO_PILLAR = {
  housing: 'bills', utilities: 'bills',
  groceries: 'spend', transport: 'spend', lifestyle: 'spend',
  emergency: 'save', savings: 'save', investments: 'save',
  debt: 'debt',
};

// Named templates: faster, less personalised alternative to Smart Split.
// Each template's fractions are already normalised to sum to 1.
const TEMPLATES_EN = [
  { key: 'starter', name: 'Starter', sub: '50/30/20 baseline', fractions: { housing: 0.30, utilities: 0.07, groceries: 0.11, transport: 0.12, lifestyle: 0.15, emergency: 0.05, savings: 0.10, investments: 0.10, debt: 0 } },
  { key: 'aggressive', name: 'Aggressive saver', sub: 'Front-load investing', fractions: { housing: 0.25, utilities: 0.06, groceries: 0.10, transport: 0.10, lifestyle: 0.10, emergency: 0.05, savings: 0.15, investments: 0.19, debt: 0 } },
  { key: 'debt', name: 'Debt destroyer', sub: 'Pay debts down fast', fractions: { housing: 0.30, utilities: 0.07, groceries: 0.11, transport: 0.10, lifestyle: 0.10, emergency: 0.02, savings: 0.05, investments: 0.05, debt: 0.20 } },
  { key: 'fire', name: 'FIRE chaser', sub: 'Aim for early retirement', fractions: { housing: 0.25, utilities: 0.06, groceries: 0.10, transport: 0.10, lifestyle: 0.10, emergency: 0.04, savings: 0.10, investments: 0.25, debt: 0 } },
  { key: 'family', name: 'Family essentials', sub: 'Higher household needs', fractions: { housing: 0.30, utilities: 0.08, groceries: 0.16, transport: 0.12, lifestyle: 0.08, emergency: 0.05, savings: 0.10, investments: 0.10, debt: 0.01 } },
];
const TEMPLATES_PT = [
  { key: 'starter', name: 'Iniciante', sub: 'Base 50/30/20', fractions: { housing: 0.28, utilities: 0.07, groceries: 0.15, transport: 0.14, lifestyle: 0.12, emergency: 0.05, savings: 0.09, investments: 0.10, debt: 0 } },
  { key: 'aggressive', name: 'Investidor agressivo', sub: 'Foco em investir', fractions: { housing: 0.24, utilities: 0.06, groceries: 0.13, transport: 0.10, lifestyle: 0.10, emergency: 0.05, savings: 0.10, investments: 0.22, debt: 0 } },
  { key: 'debt', name: 'Quitar dívidas', sub: 'Pagar dívidas rápido', fractions: { housing: 0.28, utilities: 0.07, groceries: 0.15, transport: 0.10, lifestyle: 0.10, emergency: 0.02, savings: 0.05, investments: 0.03, debt: 0.20 } },
  { key: 'fire', name: 'Aposentadoria cedo', sub: 'Independência financeira', fractions: { housing: 0.24, utilities: 0.06, groceries: 0.13, transport: 0.10, lifestyle: 0.08, emergency: 0.04, savings: 0.10, investments: 0.25, debt: 0 } },
  { key: 'family', name: 'Família', sub: 'Mais para a casa', fractions: { housing: 0.28, utilities: 0.08, groceries: 0.20, transport: 0.12, lifestyle: 0.08, emergency: 0.05, savings: 0.09, investments: 0.09, debt: 0.01 } },
];

// Country-aware levers for cutting Bills. These are real-world actions —
// the app intentionally won't auto-rewrite Bill amounts, since paying less
// for a service requires the user to actually take the action.
const BILLS_TIPS = {
  en: {
    uk: [
      { icon: 'bolt', title: 'Switch energy provider', body: 'Compare on Uswitch or MoneySuperMarket. Switching once a year typically saves £200–500.' },
      { icon: 'phone', title: 'Renegotiate phone & broadband', body: 'Out-of-contract bills are usually 30–50% higher. Call to leave; they\'ll offer a retention deal.' },
      { icon: 'subs', title: 'Audit subscriptions', body: 'Most people pay £80–150/mo across streaming, gym, software. Cancel anything you didn\'t open this month.' },
      { icon: 'home', title: 'Check your council tax band', body: '~10% of UK homes are in the wrong band. The Valuation Office can reassess for free.' },
      { icon: 'shield', title: 'Compare insurance at renewal', body: 'Auto-renewals are rarely the best price. Compare home, car, and life every year.' },
    ],
    br: [
      { icon: 'bolt', title: 'Reveja a tarifa de energia', body: 'Tarifa branca, troca de bandeira e (se possível) trocar de geradora pode reduzir a conta em 10–20%.' },
      { icon: 'phone', title: 'Negocie internet e celular', body: 'Antes do vencimento do contrato, ligue pra cancelar — vão oferecer desconto. Portabilidade também ajuda.' },
      { icon: 'subs', title: 'Auditoria de assinaturas', body: 'Maioria gasta R$300–500/mês em streaming, academia, software que mal usa. Corte o que não abriu este mês.' },
      { icon: 'home', title: 'Plano de saúde', body: 'Compare todo ano. Coparticipação ou planos por adesão costumam ser mais baratos.' },
      { icon: 'shield', title: 'Renovação de seguros', body: 'Renovação automática raramente é o melhor preço. Cotar auto e residencial todo ano dá pra economizar muito.' },
    ],
  },
  pt: {
    uk: [
      { icon: 'bolt', title: 'Trocar de fornecedora de energia', body: 'Compare no Uswitch ou MoneySuperMarket. Trocar uma vez por ano costuma economizar £200–500.' },
      { icon: 'phone', title: 'Renegociar telefone e internet', body: 'Contas fora de contrato custam 30–50% a mais. Ligue dizendo que vai sair; eles oferecem desconto.' },
      { icon: 'subs', title: 'Auditar assinaturas', body: 'A maioria gasta £80–150/mês em streaming, academia, software. Cancele o que não abriu este mês.' },
      { icon: 'home', title: 'Reveja seu council tax band', body: '~10% das casas no Reino Unido estão na faixa errada. O Valuation Office reavalia de graça.' },
      { icon: 'shield', title: 'Comparar seguros na renovação', body: 'Renovação automática raramente é o melhor preço. Compare casa, carro e vida todo ano.' },
    ],
    br: [
      { icon: 'bolt', title: 'Reveja a tarifa de energia', body: 'Tarifa branca, troca de bandeira e (se possível) trocar de geradora pode reduzir a conta em 10–20%.' },
      { icon: 'phone', title: 'Negocie internet e celular', body: 'Antes do vencimento do contrato, ligue pra cancelar — vão oferecer desconto. Portabilidade também ajuda.' },
      { icon: 'subs', title: 'Auditoria de assinaturas', body: 'Maioria gasta R$300–500/mês em streaming, academia, software que mal usa. Corte o que não abriu este mês.' },
      { icon: 'home', title: 'Plano de saúde', body: 'Compare todo ano. Coparticipação ou planos por adesão costumam ser mais baratos.' },
      { icon: 'shield', title: 'Renovação de seguros', body: 'Renovação automática raramente é o melhor preço. Cotar auto e residencial todo ano dá pra economizar muito.' },
    ],
  },
};

// Suggestion chips used to seed an empty pillar.
const STARTER_ITEMS = {
  en: {
    save: [
      { name: 'Emergency fund', icon: 'shield', benchmarkKey: 'emergency', typicalShare: 5 },
      { name: 'Savings', icon: 'piggy', benchmarkKey: 'savings', typicalShare: 5 },
      { name: 'Investments', icon: 'line', benchmarkKey: 'investments', typicalShare: 10 },
      { name: 'Pension', icon: 'piggy', benchmarkKey: null, typicalShare: 8 },
    ],
    bills: [
      { name: 'Rent / Mortgage', icon: 'house', benchmarkKey: 'housing', typicalShare: 25 },
      { name: 'Council tax', icon: 'house', benchmarkKey: null, typicalShare: 4 },
      { name: 'Electricity & gas', icon: 'line', benchmarkKey: 'utilities', typicalShare: 4 },
      { name: 'Water', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Internet', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Mobile', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'TV licence', icon: 'line', benchmarkKey: null, typicalShare: 0.5 },
      { name: 'Streaming', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Insurance', icon: 'shield', benchmarkKey: null, typicalShare: 4 },
      { name: 'Gym', icon: 'gem', benchmarkKey: null, typicalShare: 2 },
    ],
    spend: [
      { name: 'Groceries', icon: 'bag', benchmarkKey: 'groceries', typicalShare: 12 },
      { name: 'Transport', icon: 'car', benchmarkKey: 'transport', typicalShare: 10 },
      { name: 'Dining out', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 5 },
      { name: 'Clothes', icon: 'bag', benchmarkKey: null, typicalShare: 3 },
      { name: 'Personal care', icon: 'gem', benchmarkKey: null, typicalShare: 2 },
      { name: 'Hobbies', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 4 },
      { name: 'Travel', icon: 'gem', benchmarkKey: null, typicalShare: 5 },
      { name: 'Personal cash', icon: 'gem', benchmarkKey: null, typicalShare: 4 },
    ],
    debt: [
      { name: 'Credit card', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
      { name: 'Loan', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
      { name: 'Student loan', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
    ],
  },
  pt: {
    save: [
      { name: 'Reserva de emergência', icon: 'shield', benchmarkKey: 'emergency', typicalShare: 5 },
      { name: 'Poupança', icon: 'piggy', benchmarkKey: 'savings', typicalShare: 5 },
      { name: 'Investimentos', icon: 'line', benchmarkKey: 'investments', typicalShare: 8 },
      { name: 'Previdência', icon: 'piggy', benchmarkKey: null, typicalShare: 6 },
    ],
    bills: [
      { name: 'Aluguel / Financiamento', icon: 'house', benchmarkKey: 'housing', typicalShare: 25 },
      { name: 'Condomínio', icon: 'house', benchmarkKey: null, typicalShare: 5 },
      { name: 'IPTU', icon: 'house', benchmarkKey: null, typicalShare: 2 },
      { name: 'Luz', icon: 'line', benchmarkKey: 'utilities', typicalShare: 3 },
      { name: 'Água', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Gás', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Internet', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Celular', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Streaming', icon: 'line', benchmarkKey: null, typicalShare: 1 },
      { name: 'Plano de saúde', icon: 'shield', benchmarkKey: null, typicalShare: 5 },
      { name: 'Seguros', icon: 'shield', benchmarkKey: null, typicalShare: 3 },
      { name: 'IPVA', icon: 'car', benchmarkKey: null, typicalShare: 1 },
      { name: 'Academia', icon: 'gem', benchmarkKey: null, typicalShare: 2 },
    ],
    spend: [
      { name: 'Mercado', icon: 'bag', benchmarkKey: 'groceries', typicalShare: 15 },
      { name: 'Transporte', icon: 'car', benchmarkKey: 'transport', typicalShare: 8 },
      { name: 'Combustível', icon: 'car', benchmarkKey: 'transport', typicalShare: 4 },
      { name: 'Restaurantes', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 5 },
      { name: 'Roupas', icon: 'bag', benchmarkKey: null, typicalShare: 3 },
      { name: 'Cuidados pessoais', icon: 'gem', benchmarkKey: null, typicalShare: 2 },
      { name: 'Hobbies', icon: 'gem', benchmarkKey: 'lifestyle', typicalShare: 4 },
      { name: 'Viagens', icon: 'gem', benchmarkKey: null, typicalShare: 5 },
      { name: 'Dinheiro pessoal', icon: 'gem', benchmarkKey: null, typicalShare: 4 },
    ],
    debt: [
      { name: 'Cartão', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
      { name: 'Empréstimo', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
      { name: 'Financiamento', icon: 'card', benchmarkKey: 'debt', typicalShare: 5 },
    ],
  },
};

// Icon mapping
const ICONS = {
  plane: Plane, shield: Shield, car: Car, house: HomeIcon, gem: Gem, heart: Heart, circle: Circle,
  bag: ShoppingBag, card: CreditCard, line: LineChartIcon, bars: BarChart3, piggy: PiggyBank,
};

// Helpers
const fmt = (n, t) => new Intl.NumberFormat(t.locale, { style: 'currency', currency: t.currency, maximumFractionDigits: 0 }).format(n || 0);
const fmtNumber = (n, t) => new Intl.NumberFormat(t.locale, { maximumFractionDigits: 0 }).format(n || 0);
const fmtShortDate = (ts, t) => new Intl.DateTimeFormat(t.locale, { day: 'numeric', month: 'short' }).format(new Date(ts));
// Parse locale-formatted number string back to a number. Strips spaces and the
// locale's thousands separator; treats the locale's decimal separator as '.'.
function parseLocaleNumber(str, locale) {
  if (str == null) return 0;
  const trimmed = String(str).trim();
  if (trimmed === '') return 0;
  const sample = (1234.5).toLocaleString(locale);
  const decimalSep = sample.charAt(sample.length - 2);
  const thousandsSep = decimalSep === ',' ? '.' : ',';
  const cleaned = trimmed.split(thousandsSep).join('').replace(decimalSep, '.');
  const n = Number(cleaned.replace(/[^\d.\-]/g, ''));
  return Number.isFinite(n) ? n : 0;
}
// Money input: displays formatted (with thousands separator) when not focused,
// raw editable digits when focused. iOS shows the numeric keyboard via inputMode.
function MoneyInput({ value, onChange, t, style, placeholder = '0' }) {
  const [focused, setFocused] = React.useState(false);
  const [raw, setRaw] = React.useState('');
  const num = Number(value) || 0;
  const display = focused ? raw : (num > 0 ? fmtNumber(num, t) : '');
  return (
    <input
      type="text"
      inputMode="decimal"
      value={display}
      placeholder={placeholder}
      onFocus={() => { setRaw(num > 0 ? String(num) : ''); setFocused(true); }}
      onBlur={() => setFocused(false)}
      onChange={(e) => {
        const v = e.target.value;
        setRaw(v);
        onChange(parseLocaleNumber(v, t.locale));
      }}
      style={style}
    />
  );
}
const fmtShort = (n, t) => {
  if (!n || isNaN(n)) return fmt(0, t);
  if (Math.abs(n) >= 1e6) return `${t.currencySymbol}${(n / 1e6).toFixed(1)}M`;
  if (Math.abs(n) >= 1e3) return `${t.currencySymbol}${(n / 1e3).toFixed(1)}k`;
  return fmt(n, t);
};

function projectWealth(buckets, years, extraMonthly = 0) {
  const months = years * 12;
  const initialTotal = buckets.reduce((sum, b) => sum + (Number(b.current) || 0), 0);
  const points = [{ year: 0, total: initialTotal }];
  const state = buckets.map(b => ({ ...b, value: Number(b.current) || 0 }));
  const extraShare = state.length > 0 ? extraMonthly / state.length : 0;
  for (let m = 1; m <= months; m++) {
    state.forEach(b => {
      const monthlyRate = ((Number(b.growth) || 0) + (Number(b.dividend) || 0)) / 100 / 12;
      b.value = b.value * (1 + monthlyRate) + (Number(b.monthly) || 0) + extraShare;
    });
    if (m % 12 === 0) points.push({ year: m / 12, total: state.reduce((sum, b) => sum + b.value, 0) });
  }
  return points;
}

// Month-by-month projection. Returns an array of points with the running total,
// cumulative contributions, the value of each bucket, and the price-growth vs
// dividend portions earned that month (both reinvested into the bucket).
function projectWealthMonthly(buckets, years, extraMonthly = 0) {
  const months = years * 12;
  const startDate = new Date();
  const initialTotal = buckets.reduce((sum, b) => sum + (Number(b.current) || 0), 0);
  const state = buckets.map(b => ({ ...b, value: Number(b.current) || 0 }));
  const extraShare = state.length > 0 ? extraMonthly / state.length : 0;
  const monthlyContribBase = buckets.reduce((sum, b) => sum + (Number(b.monthly) || 0), 0) + extraMonthly;

  const initialByBucket = {};
  state.forEach(b => { initialByBucket[b.id] = b.value; });

  const points = [{
    monthIndex: 0,
    year: startDate.getFullYear(),
    month: startDate.getMonth(),
    total: initialTotal,
    cumulativeContributed: 0,
    byBucket: initialByBucket,
    priceGrowthThisMonth: 0,
    dividendThisMonth: 0,
  }];

  let cumContrib = 0;
  for (let m = 1; m <= months; m++) {
    let priceGrowthThisMonth = 0;
    let dividendThisMonth = 0;
    state.forEach(b => {
      const priceRate = (Number(b.growth) || 0) / 100 / 12;
      const divRate = (Number(b.dividend) || 0) / 100 / 12;
      const priceGrowth = b.value * priceRate;
      const dividend = b.value * divRate;
      priceGrowthThisMonth += priceGrowth;
      dividendThisMonth += dividend;
      b.value = b.value + priceGrowth + dividend + (Number(b.monthly) || 0) + extraShare;
    });
    cumContrib += monthlyContribBase;
    const d = new Date(startDate.getFullYear(), startDate.getMonth() + m, 1);
    const total = state.reduce((sum, b) => sum + b.value, 0);
    const byBucket = {};
    state.forEach(b => { byBucket[b.id] = b.value; });
    points.push({
      monthIndex: m,
      year: d.getFullYear(),
      month: d.getMonth(),
      total,
      cumulativeContributed: cumContrib,
      byBucket,
      priceGrowthThisMonth,
      dividendThisMonth,
    });
  }
  return points;
}

// Relative-time formatter for "Updated X ago" stamps.
function relativeTime(ts, t) {
  if (!ts) return t.wealth.justNow;
  const ms = Date.now() - ts;
  if (ms < 60_000) return t.wealth.justNow;
  const days = Math.floor(ms / 86_400_000);
  if (days <= 0) return t.wealth.today;
  if (days < 7) return t.wealth.daysAgo(days);
  if (days < 30) return t.wealth.weeksAgo(Math.floor(days / 7));
  if (days < 365) return t.wealth.monthsAgo(Math.floor(days / 30));
  return t.wealth.yearsAgo(Math.floor(days / 365));
}

// Aggregate a list of {type, share|current} entries into a normalised
// shares-by-type map summing to 1.
function sharesByType(entries, valueKey) {
  const totals = {};
  let sum = 0;
  entries.forEach(e => {
    const v = Number(e[valueKey]) || 0;
    totals[e.type] = (totals[e.type] || 0) + v;
    sum += v;
  });
  if (sum === 0) return {};
  Object.keys(totals).forEach(k => { totals[k] = totals[k] / sum; });
  return totals;
}

// Implicit risk score (1 = safest, 5 = riskiest) per bucket type. The user
// can override per bucket via bucket.risk; this is the fallback default.
const TYPE_RISK = { cash: 1, bonds: 2, pension: 2, reits: 3, other: 3, stocks: 4, crypto: 5 };

function riskOf(bucket) {
  const r = Number(bucket.risk);
  return r >= 1 && r <= 5 ? r : (TYPE_RISK[bucket.type] ?? 3);
}

// Weighted risk across a list of buckets, using each bucket's effective risk.
function blendedRiskFromBuckets(buckets) {
  let weighted = 0, total = 0;
  buckets.forEach(b => {
    const value = Number(b.current) || 0;
    if (value <= 0) return;
    weighted += riskOf(b) * value;
    total += value;
  });
  return total > 0 ? weighted / total : 0;
}

// Map bucket types to broader display categories. Used to group the list once
// the user has enough buckets that scanning becomes a chore.
const CATEGORY_OF = { stocks: 'equities', reits: 'equities', bonds: 'fixed', pension: 'fixed', cash: 'cash', crypto: 'alternatives', other: 'alternatives' };
const CATEGORY_ORDER = ['equities', 'fixed', 'cash', 'alternatives'];
const CATEGORY_COLORS = { equities: '#2E8B88', fixed: '#88A6A4', cash: '#5CAB7D', alternatives: '#D4A35C' };

// Weighted-average risk from a shares-by-type map.
function blendedRisk(sharesMap) {
  let weighted = 0, total = 0;
  Object.entries(sharesMap).forEach(([type, share]) => {
    const r = TYPE_RISK[type];
    if (r != null) { weighted += r * share; total += share; }
  });
  return total > 0 ? weighted / total : 0;
}

// Default annual inflation rate per country (used by the Forecast real/nominal toggle).
const COUNTRY_INFLATION = { uk: 2.5, br: 4.5 };

// Benchmark status for an item
function getBenchmarkStatus(item, salary, country) {
  if (!item.benchmarkKey || !salary) return null;
  const bm = BENCHMARKS[country]?.[item.benchmarkKey];
  if (!bm) return null;
  const pct = (item.amount / salary) * 100;
  let status;
  if (bm.invert) {
    // higher is better (savings, emergency, investments)
    if (pct >= bm.green) status = 'green';
    else if (pct >= bm.green / 2) status = 'yellow';
    else status = 'red';
  } else {
    if (pct <= bm.green) status = 'green';
    else if (pct <= bm.yellow) status = 'yellow';
    else status = 'red';
  }
  return { status, pct: Math.round(pct), threshold: bm.green, yellowThreshold: bm.yellow, source: bm.source, invert: bm.invert };
}

// Generate pillar-aware split. Returns { balanced, focused, tradeoffKey }
// Each split is { needs: {housing, utilities, groceries, transport}, wants: {lifestyle}, wealth: {emergency, savings, investments}, debt: {debt} }
// Values are absolute amounts in user's currency.
function generatePillarSplit(salary, answers, mainGoal, country) {
  // Baseline fractions of income, aligned to benchmarks
  const base = {
    housing: country === 'br' ? 0.28 : 0.30,
    utilities: 0.07,
    groceries: country === 'br' ? 0.15 : 0.11,
    transport: country === 'br' ? 0.14 : 0.12,
    lifestyle: 0.12,
    emergency: 0.05,
    savings: 0.06,
    investments: 0.05,
    debt: 0,
  };

  // Adjust for answers
  const adjust = (r) => {
    const out = { ...r };
    if (answers.q2 === 'free') {
      const freed = out.housing;
      out.housing = 0;
      out.savings += freed * 0.4;
      out.investments += freed * 0.3;
      out.emergency += freed * 0.3;
    } else if (answers.q2 === 'mortgage') {
      out.housing = Math.max(0, out.housing - 0.02);
      out.investments += 0.02;
    }
    if (answers.q1 === 'kids') {
      out.groceries += 0.04; out.utilities += 0.01;
      out.lifestyle = Math.max(0, out.lifestyle - 0.03);
      out.investments = Math.max(0, out.investments - 0.02);
    } else if (answers.q1 === 'partner') {
      out.groceries += 0.02;
    }
    if (answers.q3 === 'hcol') {
      out.housing += 0.03;
      out.lifestyle = Math.max(0, out.lifestyle - 0.02);
      out.investments = Math.max(0, out.investments - 0.01);
    } else if (answers.q3 === 'lcol') {
      out.housing = Math.max(0, out.housing - 0.04);
      out.savings += 0.02;
      out.investments += 0.02;
    }
    // Normalize so it sums to 1
    const sum = Object.values(out).reduce((a, b) => a + b, 0);
    if (sum > 0) Object.keys(out).forEach(k => { out[k] = out[k] / sum; });
    return out;
  };

  const balanced = adjust(base);

  // Focused variant based on main goal
  let focused = { ...base };
  let tradeoffKey = 'balanced';
  if (mainGoal === 'debt') {
    focused.debt = 0.22;
    focused.lifestyle = Math.max(0, focused.lifestyle - 0.05);
    focused.savings = Math.max(0, focused.savings - 0.02);
    focused.investments = Math.max(0, focused.investments - 0.03);
    tradeoffKey = 'debt';
  } else if (mainGoal === 'emergency') {
    focused.emergency = 0.20;
    focused.investments = Math.max(0, focused.investments - 0.03);
    focused.lifestyle = Math.max(0, focused.lifestyle - 0.02);
    tradeoffKey = 'emergency';
  } else if (mainGoal === 'invest') {
    focused.investments = 0.20;
    focused.lifestyle = Math.max(0, focused.lifestyle - 0.04);
    focused.savings = Math.max(0, focused.savings - 0.02);
    tradeoffKey = 'invest';
  } else if (mainGoal === 'savings' || mainGoal === 'save_big') {
    focused.savings = 0.20;
    focused.lifestyle = Math.max(0, focused.lifestyle - 0.04);
    focused.investments = Math.max(0, focused.investments - 0.02);
    tradeoffKey = mainGoal === 'save_big' ? 'big' : 'savings';
  }
  focused = adjust(focused);

  const toAmounts = (r) => {
    const out = {};
    Object.keys(r).forEach(k => { out[k] = Math.round(salary * r[k]); });
    return out;
  };

  return {
    balanced: toAmounts(balanced),
    focused: toAmounts(focused),
    tradeoffKey,
  };
}

// ============================================================
// THEME — Soft Teal
// ============================================================
const C = {
  bg: '#F5F5F1', surface: '#FFFFFF', surfaceAlt: '#F0F3F2',
  line: '#E5E8E6', lineSoft: '#EEF1EF',
  ink: '#1E2826', inkSoft: '#636B69', inkMuted: '#9DA5A3',
  accent: '#2E8B88', accentDeep: '#1F6B68', accentLight: '#3FA5A1', accentSoft: '#DDEBE9',
  // Traffic light palette
  green: '#5CAB7D', greenSoft: '#DFEEE4',
  yellow: '#D4A35C', yellowSoft: '#F5EBD7',
  red: '#D97057', redSoft: '#F5DFD7',
  // Pillar colors used in subtle bg tints
  pillarNeeds: '#3B82F6', pillarWants: '#A855F7', pillarWealth: '#2E8B88', pillarDebt: '#E06B53',
};

const BUCKET_COLORS = {
  stocks: '#2E8B88', reits: '#3FA5A1', crypto: '#D4A35C',
  cash: '#5CAB7D', bonds: '#88A6A4', pension: '#A88FBE', other: '#9DA5A3'
};

// ============================================================
// PERSISTENCE — safe localStorage with graceful fallback
// Claude artifact preview blocks localStorage; this falls back to in-memory
// so the app doesn't crash. Real deployment (Vercel etc) will persist normally.
// ============================================================
const STORAGE_KEY = 'nest_app_state_v1';

function loadState() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return null;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    // localStorage not available (Claude artifact, private browsing, etc.)
    return null;
  }
}

function saveState(state) {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    // Silent fallback — state just won't persist
  }
}

function clearState() {
  try {
    if (typeof window === 'undefined' || !window.localStorage) return;
    window.localStorage.removeItem(STORAGE_KEY);
  } catch (e) {}
}

// ============================================================
// MAIN APP
// ============================================================
export default function FinanceApp() {
  // Attempt to load persisted state once at startup
  const saved = loadState();

  const [lang, setLang] = useState(saved?.lang || 'en');
  const [phase, setPhase] = useState(saved?.phase || 'onboarding');
  const [onboardStep, setOnboardStep] = useState(saved?.onboardStep || 0);
  const [tab, setTab] = useState('home'); // don't persist tab — always start on Home
  const t = copy[lang];

  // Onboarding state
  const [country, setCountry] = useState(saved?.country || null);
  const [mainGoal, setMainGoal] = useState(saved?.mainGoal || null);
  const [investorProfile, setInvestorProfile] = useState(saved?.investorProfile || null);
  const [saveForPicks, setSaveForPicks] = useState(saved?.saveForPicks || []);
  const [userName, setUserName] = useState(saved?.userName || '');

  // Core state
  // Income sources. Migrated from the legacy single-salary field on first
  // load. Effective salary is the sum of these sources.
  const [incomeSources, setIncomeSources] = useState(() => {
    if (saved?.incomeSources && saved.incomeSources.length > 0) return saved.incomeSources;
    return [{ id: 'main', name: 'Salary', amount: saved?.salary ?? 3000 }];
  });
  const salary = useMemo(() => incomeSources.reduce((sum, s) => sum + (Number(s.amount) || 0), 0), [incomeSources]);
  const setSalary = (v) => {
    const n = Number(v) || 0;
    setIncomeSources(prev => prev.length === 1
      ? [{ ...prev[0], amount: n }]
      : [{ id: 'main', name: 'Salary', amount: n }]);
  };
  const addIncomeSource = () => {
    setIncomeSources(prev => [...prev, { id: Math.random().toString(36), name: lang === 'pt' ? 'Renda extra' : 'Side income', amount: 0 }]);
  };
  const updateIncomeSource = (id, field, value) => {
    setIncomeSources(prev => prev.map(s => s.id === id ? { ...s, [field]: field === 'amount' ? (value === '' ? 0 : Number(value)) : value } : s));
  };
  const removeIncomeSource = (id) => {
    setIncomeSources(prev => prev.length <= 1 ? prev : prev.filter(s => s.id !== id));
  };
  const [items, setItems] = useState(() => (saved?.items || []).map(it => {
    if (['save', 'bills', 'spend', 'debt'].includes(it.pillar)) return it;
    let pillar = it.pillar;
    if (pillar === 'needs') pillar = ['housing', 'utilities'].includes(it.benchmarkKey) ? 'bills' : 'spend';
    else if (pillar === 'wants') pillar = 'spend';
    else if (pillar === 'wealth') pillar = 'save';
    return { ...it, pillar };
  }));
  const [buckets, setBuckets] = useState(saved?.buckets || []);
  const [goals, setGoals] = useState(saved?.goals || []);

  // Monthly snapshots
  const [snapshots, setSnapshots] = useState(saved?.snapshots || []);
  const [lastCheckIn, setLastCheckIn] = useState(saved?.lastCheckIn || null);
  const [checkInStreak, setCheckInStreak] = useState(saved?.checkInStreak || 0);
  // Target pillar percentages, set when the user applies a Smart Split.
  const [targetSplitPct, setTargetSplitPct] = useState(() => {
    const t = saved?.targetSplitPct;
    if (!t) return null;
    if (t.save != null || t.bills != null || t.spend != null) return t;
    // Migrate from old keys
    return {
      save: t.wealth || 0,
      bills: Math.round((t.needs || 0) * 0.6),
      spend: Math.round((t.needs || 0) * 0.4) + (t.wants || 0),
      debt: t.debt || 0,
    };
  });
  // Manual pillar targets in absolute currency. Optional, top-down planning.
  // Persisted set of pillar keys the user has collapsed on Allocate. Default
  // (everyone starts) all expanded; once collapsed, the choice sticks.
  const [collapsedPillars, setCollapsedPillars] = useState(() => Array.isArray(saved?.collapsedPillars) ? saved.collapsedPillars : []);
  const togglePillarCollapsed = (key) => {
    setCollapsedPillars(prev => prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]);
  };
  const [pillarTargets, setPillarTargets] = useState(() => {
    const t = saved?.pillarTargets || {};
    if (Object.keys(t).some(k => ['save', 'bills', 'spend'].includes(k))) return t;
    // Migrate from old keys
    const out = { ...t };
    if (t.wealth != null) out.save = t.wealth;
    if (t.wants != null) out.spend = (out.spend || 0) + t.wants;
    if (t.needs != null) {
      out.bills = (out.bills || 0) + Math.round(t.needs * 0.6);
      out.spend = (out.spend || 0) + Math.round(t.needs * 0.4);
    }
    delete out.needs; delete out.wants; delete out.wealth;
    return out;
  });
  const [editingPillarTarget, setEditingPillarTarget] = useState(null);
  const [surplusRedirectOpen, setSurplusRedirectOpen] = useState(false);
  const [pendingApply, setPendingApply] = useState(null);
  const [confirmingClear, setConfirmingClear] = useState(false);
  const [saveToast, setSaveToast] = useState(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [billsTipsOpen, setBillsTipsOpen] = useState(false);
  const [saveTipsOpen, setSaveTipsOpen] = useState(false);
  const [linkSheetItemId, setLinkSheetItemId] = useState(null);

  // UI state — don't persist editing flags etc.
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingBucketId, setEditingBucketId] = useState(null);
  const justAddedIdRef = useRef(null);
  const [pieExpanded, setPieExpanded] = useState(false);
  const [txBucketId, setTxBucketId] = useState(null);
  const [txMode, setTxMode] = useState('deposit');
  const [txAmount, setTxAmount] = useState('');
  const [confirmRemove, setConfirmRemove] = useState(null); // { bucketId, idx }
  const [expandedHistoryIds, setExpandedHistoryIds] = useState([]);
  const [editingGoalId, setEditingGoalId] = useState(null);
  const [txGoalId, setTxGoalId] = useState(null);
  const [txGoalMode, setTxGoalMode] = useState('deposit');
  const [txGoalAmount, setTxGoalAmount] = useState('');
  const [confirmRemoveGoalEntry, setConfirmRemoveGoalEntry] = useState(null); // { goalId, idx }
  const [openInfo, setOpenInfo] = useState(null); // tooltip key
  const [openFaq, setOpenFaq] = useState(null); // expanded FAQ index
  const [scenarioExtra, setScenarioExtra] = useState(0);

  // Smart split flow — don't persist
  const [smartStep, setSmartStep] = useState(null);
  const [smartAnswers, setSmartAnswers] = useState({});
  const [smartResult, setSmartResult] = useState(null);

  // History nav — don't persist
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Forecast tab — don't persist
  const [expandedYear, setExpandedYear] = useState(null);
  const [forecastYears, setForecastYears] = useState(10);
  const [forecastBucketId, setForecastBucketId] = useState('all');
  const [realMode, setRealMode] = useState(false);

  // Hide floating bottom nav while the on-screen keyboard is open (iOS Safari pushes fixed elements up)
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  useEffect(() => {
    const isField = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable);
    const onFocusIn = (e) => { if (isField(e.target)) setKeyboardOpen(true); };
    const onFocusOut = () => setKeyboardOpen(false);
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);
    return () => {
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  // One-time migration: a prior version of the link PR seeded a duplicate
  // Save item for save-for picks that overlapped with default items
  // (e.g. Emergency fund). For each goalId-bearing item with a £0 amount and
  // a name twin in the same pillar that has no link, transfer the link to
  // the original and drop the duplicate.
  useEffect(() => {
    const norm = (s) => (s || '').trim().toLowerCase();
    const dupes = items.filter(i => i.goalId && (Number(i.amount) || 0) === 0);
    let needsMigration = false;
    const merged = [];
    const consumed = new Set();
    items.forEach(i => {
      if (consumed.has(i.id)) return;
      const isDupe = dupes.some(d => d.id === i.id);
      if (isDupe) {
        const twin = items.find(o => o.id !== i.id && o.pillar === i.pillar && !o.goalId && norm(o.name) === norm(i.name));
        if (twin) {
          needsMigration = true;
          consumed.add(i.id);
          merged.push({ ...twin, goalId: i.goalId });
          consumed.add(twin.id);
          return;
        }
      }
      if (!consumed.has(i.id)) merged.push(i);
    });
    if (needsMigration) setItems(merged);
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Persist state whenever anything important changes
  useEffect(() => {
    saveState({
      lang, phase, onboardStep,
      country, mainGoal, investorProfile, saveForPicks, userName,
      salary, incomeSources, items, buckets, goals,
      snapshots, lastCheckIn, checkInStreak,
      targetSplitPct, pillarTargets, collapsedPillars,
    });
  }, [lang, phase, onboardStep, country, mainGoal, investorProfile, saveForPicks, userName,
      salary, incomeSources, items, buckets, goals, snapshots, lastCheckIn, checkInStreak, targetSplitPct, pillarTargets, collapsedPillars]);

  // ==================== DERIVED ====================
  const allocated = useMemo(() => items.reduce((sum, c) => sum + (Number(c.amount) || 0), 0), [items]);
  const unassigned = salary - allocated;
  const totalWealth = useMemo(() => buckets.reduce((sum, b) => sum + (Number(b.current) || 0), 0), [buckets]);
  const monthlyContrib = useMemo(() => buckets.reduce((sum, b) => sum + (Number(b.monthly) || 0), 0), [buckets]);

  // Pillar totals
  const pillarTotals = useMemo(() => {
    const out = { save: 0, bills: 0, spend: 0, debt: 0 };
    items.forEach(i => { out[i.pillar] = (out[i.pillar] || 0) + (Number(i.amount) || 0); });
    return out;
  }, [items]);

  // Forward-looking insights
  const insights = useMemo(() => {
    const out = [];
    // 1) Wealth concentration
    if (totalWealth > 0) {
      const biggest = buckets.reduce((max, b) => (Number(b.current) > Number(max?.current || 0) ? b : max), null);
      if (biggest && biggest.current / totalWealth > 0.6) {
        const pct = Math.round((biggest.current / totalWealth) * 100);
        out.push({
          icon: 'alert',
          text: lang === 'en'
            ? `Most of your money (${pct}%) sits in ${biggest.name}. Spreading it across types softens the bumps when markets move.`
            : `A maior parte do seu dinheiro (${pct}%) está em ${biggest.name}. Espalhar entre tipos suaviza as oscilações quando o mercado mexe.`,
          action: { tab: 'wealth', label: t.home.insightActions.rebalance },
        });
      }
    }
    // 2) Projection milestone
    if (totalWealth > 0) {
      const in10 = projectWealth(buckets, 10, 0).at(-1)?.total || 0;
      if (in10 > totalWealth * 1.1) {
        out.push({
          icon: 'trending',
          text: lang === 'en'
            ? `Stay the course and you'll be at ~${fmtShort(in10, t)} in 10 years — that's the magic of compound growth.`
            : `Mantendo o ritmo, você chega em ~${fmtShort(in10, t)} em 10 anos — essa é a mágica dos juros compostos.`,
          action: { tab: 'forecast', label: t.home.insightActions.view },
        });
      }
    }
    // 3) Goal nearing
    goals.forEach(g => {
      if (g.target > 0 && g.current > 0 && g.monthly > 0) {
        const pct = Math.round((g.current / g.target) * 100);
        if (pct >= 80 && pct < 100) {
          const monthsLeft = Math.ceil((g.target - g.current) / g.monthly);
          out.push({
            icon: 'goal',
            text: lang === 'en'
              ? `You're ${pct}% of the way to "${g.name}" — about ${monthsLeft} months to go. Keep the momentum.`
              : `Você está ${pct}% do caminho até "${g.name}" — faltam uns ${monthsLeft} meses. Mantenha o ritmo.`,
            action: { tab: 'goals', label: t.home.insightActions.view },
          });
        }
      }
    });
    return out.slice(0, 3);
  }, [buckets, goals, totalWealth, lang, t]);

  // Time-aware + month-aware greeting.
  const homeGreeting = useMemo(() => {
    const now = new Date();
    const h = now.getHours();
    const day = now.getDate();
    const totalDays = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
    const timeKey = h < 5 || h >= 23 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : 'evening';
    const greeting = (t.home.greetings && t.home.greetings[timeKey]) || t.home.greeting;
    const monthPrompt = day <= 7 ? t.home.monthPrompts?.firstWeek : day >= totalDays - 5 ? t.home.monthPrompts?.lastWeek : null;
    return { greeting, monthPrompt };
  }, [t]);

  // Most-recent prior snapshot, for the "vs last month" delta.
  const lastSnapshot = useMemo(() => {
    if (!snapshots.length) return null;
    const now = new Date();
    const currentKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    return snapshots.filter(s => s.monthKey !== currentKey).slice(-1)[0] || null;
  }, [snapshots]);

  // Wealth trajectory across the last 6 saved months + current point.
  const wealthSparkline = useMemo(() => {
    if (snapshots.length < 1) return null;
    const recent = snapshots.slice(-6);
    const past = recent.map(s => Number(s.buckets?.reduce((sum, b) => sum + (Number(b.current) || 0), 0)) || 0);
    return [...past, totalWealth];
  }, [snapshots, totalWealth]);

  const monthlyDelta = useMemo(() => {
    if (!lastSnapshot) return null;
    const normPillar = (p) => p === 'wealth' ? 'save' : p === 'wants' ? 'spend' : p === 'needs' ? 'bills' : p;
    const sumPillar = (its, target) => its.filter(i => normPillar(i.pillar) === target).reduce((s, i) => s + (Number(i.amount) || 0), 0);
    const lastSave = sumPillar(lastSnapshot.items, 'save');
    const lastSpend = sumPillar(lastSnapshot.items, 'spend');
    const saveDelta = (pillarTotals.save || 0) - lastSave;
    const spendDelta = (pillarTotals.spend || 0) - lastSpend;
    const monthIdx = parseInt(lastSnapshot.monthKey.split('-')[1]) - 1;
    return { saveDelta, spendDelta, monthName: t.month.names[monthIdx] };
  }, [lastSnapshot, pillarTotals, t]);

  // Country-specific allocation benchmarks (typical share of income).
  // UK: tilted toward Bills (housing-heavy). BR: tilted toward Bills + Save.
  // Used by the Month Review and Allocate benchmark callout.
  const allocationBenchmark = useMemo(() => {
    if (country === 'br') return { bills: 0.50, save: 0.20, spend: 0.25, debt: 0.05 };
    return { bills: 0.50, save: 0.20, spend: 0.25, debt: 0.05 };
  }, [country]);

  // Goal updates between this month and the most recent prior snapshot.
  // Joins by goal id so renamed/deleted goals don't ghost-appear.
  const goalDeltas = useMemo(() => {
    if (!lastSnapshot) return [];
    return goals.map(g => {
      const prev = lastSnapshot.goals?.find(pg => pg.id === g.id);
      if (!prev) return null;
      const delta = (Number(g.current) || 0) - (Number(prev.current) || 0);
      if (delta === 0) return null;
      const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
      const remaining = Math.max(0, (Number(g.target) || 0) - (Number(g.current) || 0));
      const months = (Number(g.monthly) || 0) > 0 ? Math.ceil(remaining / Number(g.monthly)) : null;
      let paceDiff = null;
      if (g.deadline && months != null) {
        const dl = new Date(g.deadline + '-01');
        const now = new Date();
        const monthsToDeadline = (dl.getFullYear() - now.getFullYear()) * 12 + (dl.getMonth() - now.getMonth());
        if (monthsToDeadline > 0) paceDiff = monthsToDeadline - months;
      }
      return { id: g.id, name: g.name, icon: g.icon, type: g.type, delta, pct, months, paceDiff };
    }).filter(Boolean);
  }, [goals, lastSnapshot]);

  // Pillar drift: average of last 3 snapshots' pillar % vs current.
  // Flags shifts >= 5pp. Surfaces in Home insights and Month Review.
  const pillarDrift = useMemo(() => {
    if (snapshots.length < 2 || allocated <= 0) return [];
    const recent = snapshots.slice(-3);
    const pillarKeys = ['save', 'bills', 'spend', 'debt'];
    const norm = (p) => p === 'wealth' ? 'save' : p === 'wants' ? 'spend' : p === 'needs' ? 'bills' : p;
    const avgs = pillarKeys.map(key => {
      const totals = recent.map(snap => {
        const sum = snap.items.reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
        const pillarSum = snap.items.filter(i => norm(i.pillar) === key).reduce((acc, i) => acc + (Number(i.amount) || 0), 0);
        return sum > 0 ? pillarSum / sum : 0;
      });
      const avg = totals.reduce((a, b) => a + b, 0) / totals.length;
      return { key, avg };
    });
    const out = [];
    avgs.forEach(({ key, avg }) => {
      const current = (pillarTotals[key] || 0) / allocated;
      const diffPp = Math.round((current - avg) * 100);
      if (Math.abs(diffPp) >= 5) out.push({ pillar: key, diffPp, currentPct: Math.round(current * 100), avgPct: Math.round(avg * 100) });
    });
    return out;
  }, [snapshots, pillarTotals, allocated]);

  // Pillar vs country benchmark — flags any pillar more than 5pp off norm.
  const pillarBenchmarkGaps = useMemo(() => {
    if (allocated <= 0) return [];
    const out = [];
    Object.entries(allocationBenchmark).forEach(([key, target]) => {
      const current = (pillarTotals[key] || 0) / allocated;
      const diffPp = Math.round((current - target) * 100);
      if (Math.abs(diffPp) >= 5) out.push({ pillar: key, diffPp, currentPct: Math.round(current * 100), targetPct: Math.round(target * 100) });
    });
    return out;
  }, [allocationBenchmark, pillarTotals, allocated]);

  const daysSinceCheckIn = useMemo(() => {
    if (!lastCheckIn) return null;
    return Math.floor((new Date() - new Date(lastCheckIn)) / (1000 * 60 * 60 * 24));
  }, [lastCheckIn]);
  const needsCheckIn = daysSinceCheckIn === null || daysSinceCheckIn >= 25;

  // Month labels (used by Home and activeView)
  const monthName = t.month.names[new Date().getMonth()];
  const year = new Date().getFullYear();

  // Active view for Home: either current live state or a snapshot
  // NOTE: must be declared before any conditional return to keep hook order stable
  const activeView = useMemo(() => {
    if (historyIndex === -1 || !snapshots[historyIndex]) {
      return {
        label: `${monthName} ${year}`,
        isCurrent: true,
        salary,
        allocated,
        items,
        totalWealth,
      };
    }
    const snap = snapshots[historyIndex];
    const [y, m] = snap.monthKey.split('-');
    const snapAlloc = snap.items.reduce((sum, i) => sum + (Number(i.amount) || 0), 0);
    const snapWealth = snap.buckets.reduce((sum, b) => sum + (Number(b.current) || 0), 0);
    return {
      label: `${t.month.names[parseInt(m) - 1]} ${y}`,
      isCurrent: false,
      salary: snap.salary,
      allocated: snapAlloc,
      items: snap.items,
      totalWealth: snapWealth,
    };
  }, [historyIndex, snapshots, monthName, year, salary, allocated, items, totalWealth, t]);

  // Forecast data: monthly projection up to forecastYears, grouped by year
  // Filters based on forecastBucketId ('all' or a bucket id) and the
  // scenarioExtra (extra monthly contribution from the What-if slider).
  const forecastData = useMemo(() => {
    if (buckets.length === 0) return { months: [], years: [], filteredBuckets: [], baselineFinal: 0, scenarioFinal: 0 };
    const filteredBuckets = forecastBucketId === 'all'
      ? buckets
      : buckets.filter(b => b.id === forecastBucketId);
    if (filteredBuckets.length === 0) return { months: [], years: [], filteredBuckets: [], baselineFinal: 0, scenarioFinal: 0 };
    const inflRate = realMode ? (COUNTRY_INFLATION[country] || 2.5) : 0;
    const deflate = (value, monthIdx) => inflRate > 0 ? value / Math.pow(1 + inflRate / 100, monthIdx / 12) : value;
    const rawMonths = projectWealthMonthly(filteredBuckets, forecastYears, scenarioExtra);
    const months = rawMonths.map(p => {
      if (inflRate === 0) return p;
      const f = Math.pow(1 + inflRate / 100, p.monthIndex / 12);
      const byBucket = {};
      Object.entries(p.byBucket).forEach(([k, v]) => { byBucket[k] = v / f; });
      return {
        ...p,
        total: p.total / f,
        cumulativeContributed: p.cumulativeContributed / f,
        priceGrowthThisMonth: p.priceGrowthThisMonth / f,
        dividendThisMonth: p.dividendThisMonth / f,
        byBucket,
      };
    });
    const scenarioFinal = months[months.length - 1].total;
    const baselineFinal = scenarioExtra > 0
      ? deflate(projectWealthMonthly(filteredBuckets, forecastYears, 0).at(-1).total, forecastYears * 12)
      : scenarioFinal;
    // Group by year
    const yearMap = {};
    months.forEach(p => {
      if (!yearMap[p.year]) {
        yearMap[p.year] = { year: p.year, months: [], startTotal: p.total, endTotal: p.total, startContrib: p.cumulativeContributed, priceGrowthThisYear: 0, dividendThisYear: 0 };
      }
      const yr = yearMap[p.year];
      yr.months.push(p);
      yr.endTotal = p.total;
      yr.endContrib = p.cumulativeContributed;
      yr.endByBucket = p.byBucket;
      yr.priceGrowthThisYear += p.priceGrowthThisMonth;
      yr.dividendThisYear += p.dividendThisMonth;
    });
    const years = Object.values(yearMap).sort((a, b) => a.year - b.year);
    years.forEach((y, i) => {
      const prevEnd = i > 0 ? years[i - 1].endTotal : y.startTotal;
      y.growth = y.endTotal - prevEnd;
      y.contributedThisYear = y.endContrib - (i > 0 ? years[i - 1].endContrib : 0);
      y.interestThisYear = y.growth - y.contributedThisYear;
    });
    return { months, years, filteredBuckets, baselineFinal, scenarioFinal };
  }, [buckets, forecastYears, forecastBucketId, scenarioExtra, realMode, country]);

  // ==================== ONBOARDING HELPERS ====================
  const finishOnboarding = () => {
    // Set country-specific defaults
    setLang(country === 'br' ? 'pt' : 'en');
    const langKey = country === 'br' ? 'pt' : 'en';

    // Seed items from defaults
    const defaultItems = DEFAULT_ITEMS[langKey].map(i => ({
      ...i,
      id: Math.random().toString(36),
      amount: 0,
      goalId: null,
    }));

    // Seed goals from saveFor picks.
    const savForOptions = copy[langKey].onboarding.saveFor.options;
    const selected = savForOptions.filter(o => saveForPicks.includes(o.v));
    const defaultTargets = { emergency: 10000, vacation: 5000, car: 15000, home: 50000, wedding: 20000, retirement: 100000, other: 5000 };
    const seededGoals = selected.map(o => ({
      id: Math.random().toString(36),
      name: o.l,
      icon: o.icon,
      type: 'savings',
      target: defaultTargets[o.v] || 5000,
      current: 0,
      monthly: 0,
    }));

    // For each seeded goal, either link to an existing default Save item with
    // a matching name (Emergency fund, Savings, Investments) or create a new
    // linked item (Vacation, New car, Home, etc.). This avoids the duplicate
    // "Emergency fund" rows that the first version of this PR shipped.
    const norm = (s) => (s || '').trim().toLowerCase();
    const usedItemIds = new Set();
    const seededItems = [...defaultItems];
    seededGoals.forEach(g => {
      const match = seededItems.find(i => i.pillar === 'save' && !i.goalId && !usedItemIds.has(i.id) && norm(i.name) === norm(g.name));
      if (match) {
        usedItemIds.add(match.id);
        match.goalId = g.id;
      } else {
        seededItems.push({
          id: Math.random().toString(36),
          name: g.name,
          pillar: 'save',
          amount: 0,
          benchmarkKey: 'savings',
          icon: g.icon,
          goalId: g.id,
        });
      }
    });
    setItems(seededItems);
    setGoals(seededGoals);

    // Seed buckets from investor profile
    const profileBuckets = PROFILE_BUCKETS[investorProfile || 'balanced'][country] || PROFILE_BUCKETS.balanced.uk;
    setBuckets(profileBuckets.map(b => ({
      ...b,
      id: Math.random().toString(36),
      current: 0,
      monthly: 0,
      dividend: 0,
      lastUpdated: Date.now(),
    })));

    setPhase('app');
    setTab('home');
  };

  const sendSurplusToItem = (benchmarkKey) => {
    if (unassigned <= 0) return;
    const target = items.find(i => i.benchmarkKey === benchmarkKey);
    if (!target) return;
    setItems(items.map(i => i.id === target.id ? { ...i, amount: (Number(i.amount) || 0) + unassigned } : i));
    setSurplusRedirectOpen(false);
  };
  const splitSurplusAcrossWealth = () => {
    if (unassigned <= 0) return;
    const saveItems = items.filter(i => i.pillar === 'save');
    if (saveItems.length === 0) return;
    const share = unassigned / saveItems.length;
    setItems(items.map(i => i.pillar === 'save' ? { ...i, amount: (Number(i.amount) || 0) + share } : i));
    setSurplusRedirectOpen(false);
  };

  const handleSavePlan = () => {
    if (unassigned > 0) {
      setSurplusRedirectOpen(true);
      return;
    }
    doCheckIn();
  };
  const doCheckIn = () => {
    const now = new Date();
    const monthKey = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
    const existingIdx = snapshots.findIndex(s => s.monthKey === monthKey);
    const isFirstCheckInThisMonth = existingIdx === -1;

    // Credit linked goals on the first check-in of this month. Subsequent
    // saves in the same month don't double-count. Save items add to the
    // goal balance; Debt items also add (current = amount paid toward debt).
    let updatedGoals = goals;
    if (isFirstCheckInThisMonth) {
      updatedGoals = goals.map(g => {
        const linkedItem = items.find(i => i.goalId === g.id);
        if (!linkedItem) return g;
        const credit = Math.max(0, Number(linkedItem.amount) || 0);
        if (credit <= 0) return g;
        const newCurrent = (Number(g.current) || 0) + credit;
        const entry = { ts: now.getTime(), delta: credit, balanceAfter: newCurrent, source: 'allocate' };
        return { ...g, current: newCurrent, history: [...(g.history || []), entry] };
      });
      setGoals(updatedGoals);
    }

    const newSnapshot = {
      monthKey,
      salary,
      items: items.map(i => ({ ...i })),
      buckets: buckets.map(b => ({ ...b })),
      goals: updatedGoals.map(g => ({ ...g })),
      date: now.toISOString(),
    };
    const newSnapshots = isFirstCheckInThisMonth
      ? [...snapshots, newSnapshot]
      : snapshots.map((s, i) => i === existingIdx ? newSnapshot : s);
    setSnapshots(newSnapshots);

    // Streak — counts CONSECUTIVE MONTHS, not check-in events. Multiple
    // saves in the same month don't bump the counter; a one-month gap
    // resets to 1.
    const prev = lastCheckIn ? new Date(lastCheckIn) : null;
    if (prev) {
      const prevKey = `${prev.getFullYear()}-${String(prev.getMonth() + 1).padStart(2, '0')}`;
      if (prevKey === monthKey) {
        // same month, no change
      } else {
        const monthsApart = (now.getFullYear() - prev.getFullYear()) * 12 + (now.getMonth() - prev.getMonth());
        setCheckInStreak(monthsApart === 1 ? checkInStreak + 1 : 1);
      }
    } else {
      setCheckInStreak(1);
    }
    setLastCheckIn(now.toISOString());

    // Open the Month Review sheet with deltas, goal pace, drift, and benchmark callouts.
    setReviewOpen(true);

    // Allocate→Wealth feed: at check-in, route Save-pillar items into matching
    // Wealth buckets and update each bucket's `monthly` field (the planned
    // contribution that drives Forecast). The bucket's `current` (actual
    // balance) is intentionally NOT touched — that stays a manual update so
    // Wealth keeps reflecting what's really in your accounts.
    // Mapping: Emergency fund → cash · Savings → cash/bonds · Investments →
    // stocks/reits/crypto/bonds. Items without a benchmarkKey default to
    // savings.
    const saveItems = items.filter(i => i.pillar === 'save' && Number(i.amount) > 0);
    if (saveItems.length > 0 && buckets.length > 0) {
      const contribByBenchmark = { emergency: 0, savings: 0, investments: 0 };
      saveItems.forEach(i => {
        const key = i.benchmarkKey || 'savings';
        if (contribByBenchmark[key] !== undefined) contribByBenchmark[key] += Number(i.amount);
        else contribByBenchmark.savings += Number(i.amount);
      });

      const targetTypes = {
        emergency: ['cash'],
        savings: ['cash', 'bonds'],
        investments: ['stocks', 'reits', 'crypto', 'bonds'],
      };

      const newBuckets = buckets.map(b => ({ ...b, monthly: 0 }));

      Object.entries(contribByBenchmark).forEach(([key, total]) => {
        if (total <= 0) return;
        const matches = newBuckets.filter(b => targetTypes[key].includes(b.type));
        if (matches.length === 0) {
          const share = total / newBuckets.length;
          newBuckets.forEach(b => { b.monthly += share; });
        } else {
          const totalCurrent = matches.reduce((s, b) => s + Number(b.current || 0), 0);
          matches.forEach(b => {
            const weight = totalCurrent > 0 ? (Number(b.current || 0) / totalCurrent) : (1 / matches.length);
            b.monthly += total * weight;
          });
        }
      });

      newBuckets.forEach(b => { b.monthly = Math.round(b.monthly); });
      setBuckets(newBuckets);
    }
  };

  // Copy the most recent snapshot's items and salary as the starting point for this month
  const copyLastMonth = () => {
    if (snapshots.length === 0) return;
    const latest = snapshots[snapshots.length - 1];
    setSalary(latest.salary);
    setItems(latest.items.map(i => ({ ...i, id: Math.random().toString(36) })));
  };

  const resetAll = () => {
    if (!window.confirm(t.profile.resetConfirm)) return;
    clearState();
    setPhase('onboarding');
    setOnboardStep(0);
    setCountry(null);
    setMainGoal(null);
    setInvestorProfile(null);
    setSaveForPicks([]);
    setSalary(3000);
    setItems([]);
    setBuckets([]);
    setGoals([]);
    setSnapshots([]);
    setLastCheckIn(null);
    setCheckInStreak(0);
    setSmartStep(null);
    setSmartAnswers({});
    setSmartResult(null);
    setForecastBucketId('all');
    setExpandedYear(null);
  };

  // Fonts
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap';
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const fontSans = '"Inter", -apple-system, system-ui, sans-serif';

  const renderIcon = (iconKey, size = 16, color = C.accent, stroke = 1.8) => {
    const Icon = ICONS[iconKey] || Circle;
    return <Icon size={size} color={color} strokeWidth={stroke} />;
  };

  // ==================== STYLES ====================
  const s = {
    app: { minHeight: '100dvh', background: C.bg, color: C.ink, fontFamily: fontSans, paddingBottom: phase === 'app' ? 'calc(100px + env(safe-area-inset-bottom))' : 'calc(130px + env(safe-area-inset-bottom))', WebkitFontSmoothing: 'antialiased' },
    topbar: { padding: 'calc(14px + env(safe-area-inset-top)) 20px 14px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, background: `${C.bg}F0`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.lineSoft}` },
    brandWrap: { display: 'flex', alignItems: 'center', gap: 8 },
    brandMark: { width: 26, height: 26, borderRadius: 7, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.surface, fontSize: 13, fontWeight: 700 },
    brand: { fontWeight: 600, fontSize: 17, color: C.ink, letterSpacing: '-0.02em' },
    iconBtn: { width: 34, height: 34, borderRadius: 17, background: C.surfaceAlt, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.inkSoft, fontFamily: fontSans },
    main: { maxWidth: 640, margin: '0 auto', padding: '20px 20px' },

    // Onboarding
    onboardMain: { maxWidth: 480, margin: '0 auto', padding: '0 24px 340px', display: 'flex', flexDirection: 'column' },
    onboardStickyHeader: { position: 'sticky', top: 0, background: C.bg, paddingTop: 'calc(20px + env(safe-area-inset-top))', paddingBottom: 14, margin: '0 -24px', paddingLeft: 24, paddingRight: 24, zIndex: 5 },
    dots: { display: 'flex', gap: 5, justifyContent: 'center', marginBottom: 36 },
    dot: (active) => ({ width: active ? 22 : 6, height: 6, borderRadius: 3, background: active ? C.accent : C.line, transition: 'all 0.3s' }),
    onboardEyebrow: { fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', textAlign: 'center', marginBottom: 12 },
    onboardTitle: { fontSize: 32, fontWeight: 700, lineHeight: 1.05, letterSpacing: '-0.03em', margin: '0 0 14px', color: C.ink },
    onboardTitleBold: { color: C.accent },
    onboardSub: { fontSize: 15, color: C.inkSoft, lineHeight: 1.5, marginBottom: 28 },
    optionCard: (selected) => ({ display: 'flex', alignItems: 'center', gap: 14, background: C.surface, borderRadius: 14, padding: '14px 16px', border: `1.5px solid ${selected ? C.accent : C.line}`, marginBottom: 10, cursor: 'pointer', boxShadow: selected ? `0 2px 8px ${C.accentSoft}` : 'none', transition: 'all 0.15s' }),
    optionIconBox: (selected) => ({ width: 36, height: 36, borderRadius: 10, background: selected ? C.accent : C.surfaceAlt, display: 'flex', alignItems: 'center', justifyContent: 'center', color: selected ? C.surface : C.inkSoft, flexShrink: 0, transition: 'all 0.15s' }),
    optionLabel: { flex: 1 },
    optionLabelMain: { fontSize: 15, fontWeight: 500, color: C.ink },
    optionLabelSub: { fontSize: 12, color: C.inkMuted, marginTop: 2 },
    optionCheck: (selected) => ({ width: 22, height: 22, borderRadius: 11, border: `1.5px solid ${selected ? C.accent : C.line}`, background: selected ? C.accent : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }),
    bottomCTA: { position: 'fixed', bottom: 0, left: 0, right: 0, background: C.bg, borderTop: `1px solid ${C.lineSoft}`, paddingTop: 14, paddingBottom: 'calc(14px + env(safe-area-inset-bottom))', paddingLeft: 20, paddingRight: 20, zIndex: 20 },
    bottomCTAInner: { maxWidth: 440, margin: '0 auto' },
    ctaBtn: (disabled) => ({ width: '100%', background: disabled ? C.line : C.accent, color: disabled ? C.inkMuted : C.surface, border: 'none', padding: '16px', borderRadius: 14, fontSize: 15, fontWeight: 600, cursor: disabled ? 'default' : 'pointer', fontFamily: fontSans, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, boxShadow: disabled ? 'none' : `0 4px 16px ${C.accent}30` }),
    skipBtn: { width: '100%', background: 'transparent', color: C.inkSoft, border: 'none', padding: '12px', fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: fontSans },

    // App cards
    card: { background: C.surface, borderRadius: 20, padding: 20, border: `1px solid ${C.lineSoft}`, marginBottom: 12 },
    cardLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: C.inkMuted, fontWeight: 600, marginBottom: 12 },
    heroCard: { background: `linear-gradient(135deg, ${C.accent} 0%, ${C.accentLight} 100%)`, borderRadius: 22, padding: 22, marginBottom: 12, color: C.surface, position: 'relative', overflow: 'hidden' },
    h1: { fontSize: 26, fontWeight: 700, letterSpacing: '-0.02em', margin: '0 0 4px', lineHeight: 1.1, color: C.ink },
    sub: { color: C.inkSoft, fontSize: 14, lineHeight: 1.5 },

    // Bottom nav
    bottomNav: { position: 'fixed', bottom: 'calc(14px + env(safe-area-inset-bottom))', left: 14, right: 14, maxWidth: 440, margin: '0 auto', background: C.surface, borderRadius: 999, padding: 5, display: 'flex', gap: 2, zIndex: 20, border: `1px solid ${C.line}`, boxShadow: '0 8px 24px rgba(30,40,38,0.06)' },
    navBtn: (active) => ({ flex: 1, background: active ? C.accent : 'transparent', color: active ? C.surface : C.inkMuted, border: 'none', padding: '10px 6px', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.2s' }),

    primaryBtn: { background: C.accent, color: C.surface, border: 'none', padding: '12px 20px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer', fontFamily: fontSans, display: 'inline-flex', alignItems: 'center', gap: 6 },
    ghostBtn: { background: 'transparent', border: 'none', color: C.inkSoft, padding: '6px 10px', fontSize: 12, fontWeight: 500, cursor: 'pointer', fontFamily: fontSans, display: 'inline-flex', alignItems: 'center', gap: 4 },
    input: { width: '100%', padding: '12px 14px', fontSize: 16, fontFamily: fontSans, border: `1px solid ${C.line}`, borderRadius: 12, background: C.surfaceAlt, boxSizing: 'border-box', color: C.ink, outline: 'none' },
    inputNum: { padding: '9px 12px', fontSize: 16, fontFamily: fontSans, fontVariantNumeric: 'tabular-nums', fontWeight: 600, border: `1px solid ${C.line}`, borderRadius: 10, background: C.surfaceAlt, textAlign: 'right', width: 100, outline: 'none', color: C.ink, boxSizing: 'border-box' },

    progressTrack: { height: 6, background: C.surfaceAlt, borderRadius: 3, overflow: 'hidden' },
    progressFill: (pct, color = C.accent) => ({ height: '100%', width: `${Math.min(100, Math.max(0, pct))}%`, background: color, borderRadius: 3, transition: 'width 0.4s' }),

    metric: { background: C.surfaceAlt, borderRadius: 14, padding: '14px 16px' },
    metricLabel: { fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.2em', color: C.inkMuted, fontWeight: 600, marginBottom: 6 },
    metricValue: { fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' },
    num: { fontVariantNumeric: 'tabular-nums', fontWeight: 600 },

    rowIconBox: { width: 36, height: 36, borderRadius: 10, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent, flexShrink: 0 },

    // Pillar card
    pillarHeader: { display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12, paddingBottom: 10, borderBottom: `1px solid ${C.lineSoft}` },
    pillarDot: (color) => ({ width: 10, height: 10, borderRadius: 5, background: color }),
    pillarName: { fontSize: 14, fontWeight: 700, color: C.ink, letterSpacing: '-0.01em' },
    pillarSub: { fontSize: 11, color: C.inkMuted, marginLeft: 4 },
    pillarTotal: { fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: 15, color: C.ink, marginLeft: 'auto' },

    // Item row with benchmark flag
    itemRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0' },
    benchmarkBadge: (status) => {
      const map = {
        green: { bg: C.greenSoft, fg: C.green },
        yellow: { bg: C.yellowSoft, fg: C.yellow },
        red: { bg: C.redSoft, fg: C.red },
      };
      const cols = map[status] || map.green;
      return { background: cols.bg, color: cols.fg, padding: '2px 7px', borderRadius: 999, fontSize: 10, fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: 4 };
    },
    benchmarkDot: (status) => ({ width: 6, height: 6, borderRadius: 3, background: status === 'green' ? C.green : status === 'yellow' ? C.yellow : C.red }),
    insightRow: { display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, marginBottom: 8 },
    slider: { width: '100%', accentColor: C.accent, height: 4 },
  };

  // Inline (i) icon that opens a plain-English glossary sheet for the given key.
  // Defined here (before any conditional return) so every render path can use it.
  const Info = ({ k }) => (
    <button
      onClick={(e) => { e.stopPropagation(); setOpenInfo(k); }}
      style={{ background: 'transparent', border: 'none', padding: 0, marginLeft: 4, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', verticalAlign: 'middle' }}
      aria-label="More info"
    >
      <span style={{ width: 14, height: 14, borderRadius: 7, border: `1.5px solid ${C.inkMuted}`, color: C.inkMuted, fontSize: 9, fontWeight: 700, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', lineHeight: 1 }}>i</span>
    </button>
  );

  // ============ ONBOARDING ============
  if (phase === 'onboarding') {
    const toggleSaveFor = (v) => {
      if (saveForPicks.includes(v)) setSaveForPicks(saveForPicks.filter(x => x !== v));
      else setSaveForPicks([...saveForPicks, v]);
    };

    const canAdvance = () => {
      if (onboardStep === 0) return true;
      if (onboardStep === 1) return country !== null;
      if (onboardStep === 2) return salary > 0;
      if (onboardStep === 3) return mainGoal !== null;
      if (onboardStep === 4) return investorProfile !== null;
      if (onboardStep === 5) return true;
      if (onboardStep === 6) return true;
      return false;
    };

    const handleNext = () => {
      if (onboardStep < 6) setOnboardStep(onboardStep + 1);
      else finishOnboarding();
    };

    const stickyHeader = (() => {
      if (onboardStep === 0) return { title: t.onboarding.welcome.title, bold: t.onboarding.welcome.titleBold, sub: t.onboarding.welcome.sub, eyebrow: t.onboarding.welcome.eyebrow };
      if (onboardStep === 1) return { title: t.onboarding.country.title, bold: t.onboarding.country.titleBold, sub: t.onboarding.country.sub };
      if (onboardStep === 2) return { title: t.onboarding.income.title, bold: t.onboarding.income.titleBold, sub: t.onboarding.income.sub };
      if (onboardStep === 3) return { title: t.onboarding.goal.title, bold: t.onboarding.goal.titleBold, sub: null };
      if (onboardStep === 4) return { title: t.onboarding.profile.title, bold: t.onboarding.profile.titleBold, sub: t.onboarding.profile.sub, small: true, infoKey: 'investorProfile' };
      if (onboardStep === 5) return { title: t.onboarding.saveFor.title, bold: t.onboarding.saveFor.titleBold, sub: t.onboarding.saveFor.sub };
      if (onboardStep === 6) return { title: t.onboarding.summary.title, bold: '', sub: t.onboarding.summary.sub };
      return null;
    })();

    const fixedPage = onboardStep !== 5;
    return (
      <div style={{ ...s.app, height: '100dvh', overflow: fixedPage ? 'hidden' : 'auto' }}>
        <div style={{ ...s.onboardMain, paddingBottom: onboardStep === 5 ? 340 : 200 }}>
          <div style={s.onboardStickyHeader}>
            <div style={{ ...s.dots, marginBottom: stickyHeader ? 14 : 28 }}>
              {[0,1,2,3,4,5,6].map(i => <div key={i} style={s.dot(onboardStep === i)} />)}
            </div>
            {stickyHeader && (
              <>
                {stickyHeader.eyebrow && (
                  <div style={{ ...s.onboardEyebrow, textAlign: 'center', marginBottom: 8 }}>{stickyHeader.eyebrow}</div>
                )}
                <h1 style={{ ...s.onboardTitle, fontSize: stickyHeader.small ? 26 : 28, marginBottom: stickyHeader.sub ? 6 : 0, textAlign: 'center' }}>
                  {stickyHeader.title} <span style={s.onboardTitleBold}>{stickyHeader.bold}</span>
                  {stickyHeader.infoKey && <Info k={stickyHeader.infoKey} />}
                </h1>
                {stickyHeader.sub && <p style={{ ...s.onboardSub, marginBottom: 0, textAlign: 'center' }}>{stickyHeader.sub}</p>}
              </>
            )}
          </div>

          {onboardStep === 0 && (
            <>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {[
                  { key: 'plan', icon: Wallet, color: '#3B82F6' },
                  { key: 'grow', icon: TrendingUp, color: C.accent },
                  { key: 'reflect', icon: Heart, color: '#A855F7' },
                ].map(({ key, icon: Icon, color }) => (
                  <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', background: C.surface, border: `1px solid ${C.lineSoft}`, borderRadius: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '15', color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Icon size={16} strokeWidth={2} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{t.onboarding.welcome.values[key].title}</div>
                      <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{t.onboarding.welcome.values[key].sub}</div>
                    </div>
                  </div>
                ))}
              </div>
              <input
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder={t.onboarding.welcome.namePlaceholder}
                style={{ ...s.input, marginTop: 16, padding: '12px 14px', fontSize: 16, textAlign: 'center' }}
              />
              <p style={{ fontSize: 11, color: C.inkMuted, textAlign: 'center', marginTop: 14, marginBottom: 0 }}>
                {t.onboarding.welcome.privacy}
              </p>
            </>
          )}

          {onboardStep === 1 && (
            <>
              {t.onboarding.country.options.map(opt => (
                <div key={opt.v} style={s.optionCard(country === opt.v)} onClick={() => setCountry(opt.v)}>
                  <div style={{ ...s.optionIconBox(country === opt.v), background: country === opt.v ? C.accent : C.surfaceAlt, fontSize: 22, lineHeight: 1 }}>
                    <span aria-hidden="true">{opt.flag}</span>
                  </div>
                  <div style={s.optionLabel}>
                    <div style={s.optionLabelMain}>{opt.l}</div>
                    <div style={s.optionLabelSub}>{opt.symbol} · {opt.currency}</div>
                  </div>
                  <div style={s.optionCheck(country === opt.v)}>{country === opt.v && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                </div>
              ))}
            </>
          )}

          {onboardStep === 2 && (
            <>
              <div style={{ ...s.heroCard, marginTop: 8 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 12 }}>
                  {t.allocate.income}
                </div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 26, opacity: 0.7 }}>{(country === 'br') ? 'R$' : '£'}</span>
                  <MoneyInput value={incomeSources[0]?.amount || 0} t={t} style={{ flex: 1, fontFamily: fontSans, fontSize: 36, fontWeight: 700, padding: 0, border: 'none', background: 'transparent', color: C.surface, outline: 'none', width: '100%', minWidth: 0, letterSpacing: '-0.02em' }} placeholder={t.onboarding.income.placeholder} onChange={(v) => updateIncomeSource(incomeSources[0]?.id || 'main', 'amount', v)} />
                </div>
              </div>
            </>
          )}

          {onboardStep === 3 && (
            <>
              <div style={{ marginTop: 8 }}>
                {t.onboarding.goal.options.map(opt => (
                  <div key={opt.v} style={s.optionCard(mainGoal === opt.v)} onClick={() => setMainGoal(opt.v)}>
                    <div style={s.optionIconBox(mainGoal === opt.v)}>{renderIcon(opt.icon, 16, mainGoal === opt.v ? C.surface : C.inkSoft, 2)}</div>
                    <div style={s.optionLabel}><div style={s.optionLabelMain}>{opt.l}</div></div>
                    <div style={s.optionCheck(mainGoal === opt.v)}>{mainGoal === opt.v && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                  </div>
                ))}
              </div>
            </>
          )}

          {onboardStep === 4 && (
            <>
              {t.onboarding.profile.options.map(opt => {
                const profileBuckets = (PROFILE_BUCKETS[opt.v] && PROFILE_BUCKETS[opt.v][country]) || [];
                const totalShare = profileBuckets.reduce((sum, b) => sum + b.share, 0) || 1;
                const sel = investorProfile === opt.v;
                return (
                  <div key={opt.v} style={{ ...s.optionCard(sel), alignItems: 'flex-start', flexDirection: 'column', gap: 0, padding: 14 }} onClick={() => setInvestorProfile(opt.v)}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: '100%' }}>
                      <div style={s.optionIconBox(sel)}>{renderIcon(opt.icon, 16, sel ? C.surface : C.inkSoft, 2)}</div>
                      <div style={{ ...s.optionLabel, flex: 1 }}>
                        <div style={s.optionLabelMain}>{opt.l}</div>
                        <div style={s.optionLabelSub}>{opt.sub}</div>
                      </div>
                      <div style={s.optionCheck(sel)}>{sel && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                    </div>
                    {profileBuckets.length > 0 && (
                      <div style={{ width: '100%', marginTop: 12, boxSizing: 'border-box' }}>
                        <div style={{ display: 'flex', height: 8, borderRadius: 4, overflow: 'hidden', background: C.lineSoft }}>
                          {profileBuckets.map((b, i) => (
                            <div key={i} style={{ width: `${(b.share / totalShare) * 100}%`, background: BUCKET_COLORS[b.type] || C.inkMuted }} />
                          ))}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8, fontSize: 11, color: C.inkSoft }}>
                          {profileBuckets.map((b, i) => (
                            <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: (BUCKET_COLORS[b.type] || C.inkMuted) + '15', color: BUCKET_COLORS[b.type] || C.inkMuted, fontWeight: 600 }}>
                              <span style={{ width: 6, height: 6, borderRadius: 2, background: BUCKET_COLORS[b.type] || C.inkMuted }} />
                              {b.name} {Math.round(b.share * 100)}%
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </>
          )}

          {onboardStep === 5 && (
            <>
              {t.onboarding.saveFor.options.map(opt => {
                const sel = saveForPicks.includes(opt.v);
                return (
                  <div key={opt.v} style={s.optionCard(sel)} onClick={() => toggleSaveFor(opt.v)}>
                    <div style={s.optionIconBox(sel)}>{renderIcon(opt.icon, 16, sel ? C.surface : C.inkSoft, 2)}</div>
                    <div style={s.optionLabel}><div style={s.optionLabelMain}>{opt.l}</div></div>
                    <div style={s.optionCheck(sel)}>{sel && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                  </div>
                );
              })}
            </>
          )}

          {onboardStep === 6 && (() => {
            const countryOpt = t.onboarding.country.options.find(o => o.v === country);
            const goalOpt = t.onboarding.goal.options.find(o => o.v === mainGoal);
            const profileOpt = t.onboarding.profile.options.find(o => o.v === investorProfile);
            const saveForLabels = t.onboarding.saveFor.options.filter(o => saveForPicks.includes(o.v)).map(o => o.l).join(', ');
            const rows = [
              { label: t.onboarding.summary.country, value: countryOpt ? `${countryOpt.flag} ${countryOpt.l}` : t.onboarding.summary.none },
              { label: t.onboarding.summary.income, value: salary > 0 ? fmt(salary, t) : t.onboarding.summary.none },
              { label: t.onboarding.summary.goal, value: goalOpt?.l || t.onboarding.summary.none },
              { label: t.onboarding.summary.profile, value: profileOpt?.l || t.onboarding.summary.none },
              { label: t.onboarding.summary.saveFor, value: saveForLabels || t.onboarding.summary.none },
            ];
            return (
              <>
                <div style={{ width: 56, height: 56, borderRadius: 28, background: C.accent, color: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '8px auto 16px' }}>
                  <Check size={26} strokeWidth={3} />
                </div>
                <div style={{ background: C.surface, border: `1px solid ${C.lineSoft}`, borderRadius: 14, padding: 4, marginTop: 4 }}>
                  {rows.map((r, i) => (
                    <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 12, padding: '12px 14px', borderBottom: i < rows.length - 1 ? `1px solid ${C.lineSoft}` : 'none' }}>
                      <span style={{ fontSize: 12, color: C.inkMuted, fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', flexShrink: 0 }}>{r.label}</span>
                      <span style={{ fontSize: 13, color: C.ink, fontWeight: 600, textAlign: 'right', overflow: 'hidden', textOverflow: 'ellipsis' }}>{r.value}</span>
                    </div>
                  ))}
                </div>
              </>
            );
          })()}
        </div>

        <div style={s.bottomCTA}>
          <div style={s.bottomCTAInner}>
            <button style={s.ctaBtn(!canAdvance())} onClick={handleNext} disabled={!canAdvance()}>
              {onboardStep === 6 ? t.onboarding.summary.ctaContinue : t.onboarding.cta} <ArrowRight size={16} />
            </button>
            {onboardStep === 5 && (
              <button style={s.skipBtn} onClick={finishOnboarding}>{t.onboarding.saveFor.skip}</button>
            )}
            <div style={{ textAlign: 'center', marginTop: 8 }}>
              <button style={{ ...s.ghostBtn, fontSize: 12, color: C.inkMuted }} onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>
                <Globe size={12} /> {lang === 'en' ? 'Português' : 'English'}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ============ APP ============
  const allocPct = salary > 0 ? (allocated / salary) * 100 : 0;
  const isOver = allocated > salary;
  const in10y = projectWealth(buckets, 10, 0).at(-1)?.total || totalWealth;

  const activeAllocPct = activeView.salary > 0 ? (activeView.allocated / activeView.salary) * 100 : 0;
  const activeUnassigned = activeView.salary - activeView.allocated;
  const activeIsOver = activeView.allocated > activeView.salary;
  const canGoBack = historyIndex === -1 ? snapshots.length > 0 : historyIndex > 0;
  const canGoForward = historyIndex !== -1;

  const goBackInHistory = () => {
    if (historyIndex === -1 && snapshots.length > 0) setHistoryIndex(snapshots.length - 1);
    else if (historyIndex > 0) setHistoryIndex(historyIndex - 1);
  };
  const goForwardInHistory = () => {
    if (historyIndex !== -1) {
      if (historyIndex >= snapshots.length - 1) setHistoryIndex(-1);
      else setHistoryIndex(historyIndex + 1);
    }
  };

  // Handlers
  const updateItem = (id, field, value) => {
    const next = field === 'amount' ? (value === '' ? 0 : Number(value)) : value;
    setItems(items.map(c => c.id === id ? { ...c, [field]: next } : c));
    // Linked-goal sync: editing the item amount updates the goal's monthly.
    if (field === 'amount') {
      const it = items.find(c => c.id === id);
      if (it && it.goalId) {
        setGoals(goals.map(g => g.id === it.goalId ? { ...g, monthly: Number(next) || 0 } : g));
      }
    }
  };
  const removeItem = (id) => setItems(items.filter(c => c.id !== id));
  const linkItemToGoal = (itemId, goalId) => {
    const goal = goals.find(g => g.id === goalId);
    if (!goal) return;
    setItems(items.map(i => {
      // Enforce 1-to-1 by clearing any other item that points at the same goal.
      if (i.goalId === goalId && i.id !== itemId) return { ...i, goalId: null };
      if (i.id !== itemId) return i;
      return { ...i, goalId };
    }));
    // Sync the goal's monthly to whatever the item amount is right now.
    const item = items.find(i => i.id === itemId);
    if (item) setGoals(goals.map(g => g.id === goalId ? { ...g, monthly: Number(item.amount) || 0 } : g));
  };
  const unlinkItem = (itemId) => {
    setItems(items.map(i => i.id === itemId ? { ...i, goalId: null } : i));
  };
  const computePillarPctFromSplit = (split) => {
    const totals = { save: 0, bills: 0, spend: 0, debt: 0 };
    let sum = 0;
    Object.entries(split).forEach(([k, amt]) => {
      const p = BENCHMARK_TO_PILLAR[k];
      if (!p) return;
      totals[p] += Number(amt) || 0;
      sum += Number(amt) || 0;
    });
    if (sum === 0) return null;
    return {
      save: Math.round((totals.save / sum) * 100),
      bills: Math.round((totals.bills / sum) * 100),
      spend: Math.round((totals.spend / sum) * 100),
      debt: Math.round((totals.debt / sum) * 100),
    };
  };
  const applyTemplate = (templateKey) => {
    const list = lang === 'pt' ? TEMPLATES_PT : TEMPLATES_EN;
    const tpl = list.find(t => t.key === templateKey);
    if (!tpl || !salary) return;
    const split = {};
    Object.entries(tpl.fractions).forEach(([k, frac]) => { split[k] = Math.round(salary * frac); });
    applySmartSplit(split);
  };

  // Gate destructive apply (Smart Split / template) behind a confirmation
  // sheet whenever the user already has an allocation in place. First-time
  // setup (allocated === 0) applies directly.
  const requestApply = (fn) => {
    if (allocated > 0) {
      setPendingApply(() => fn);
    } else {
      fn();
    }
  };

  const clearPlan = () => {
    setItems(items.map(it => ({ ...it, amount: 0 })));
    setConfirmingClear(false);
  };

  const applySmartSplit = (split) => {
    // Aggregate the recommended split into pillar totals.
    const pillarTargets = { save: 0, bills: 0, spend: 0, debt: 0 };
    Object.entries(split).forEach(([k, amt]) => {
      const p = BENCHMARK_TO_PILLAR[k];
      if (p) pillarTargets[p] += Number(amt) || 0;
    });

    // For each pillar, distribute its target across the user's existing
    // items: proportional to current amounts when any are non-zero, evenly
    // when all are zero. Items in pillars with no target (debt without debt
    // items, etc.) are left at zero. If a pillar has no items at all, the
    // total goes onto a synthetic placeholder so the user still sees it.
    const nameMap = lang === 'en'
      ? { save: 'Savings', bills: 'Bills', spend: 'Spending', debt: 'Debt payoff' }
      : { save: 'Poupança', bills: 'Contas', spend: 'Gastos', debt: 'Quitar dívidas' };
    const iconMap = { save: 'piggy', bills: 'house', spend: 'bag', debt: 'card' };

    const grouped = { save: [], bills: [], spend: [], debt: [] };
    items.forEach(it => { if (grouped[it.pillar]) grouped[it.pillar].push(it); });

    const updated = items.map(it => {
      const target = pillarTargets[it.pillar];
      const peers = grouped[it.pillar];
      if (!target || peers.length === 0) return { ...it, amount: 0 };
      const peerTotal = peers.reduce((sum, p) => sum + (Number(p.amount) || 0), 0);
      let share;
      if (peerTotal > 0) {
        // Proportional to existing amounts (preserves user's relative emphasis).
        share = ((Number(it.amount) || 0) / peerTotal) * target;
      } else {
        // All zero — distribute proportional to typicalShare. Items missing
        // typicalShare get a sensible fallback (the average share of the
        // pillar's items that DO have one, or 1 as a final default).
        const sharedItems = peers.filter(p => Number(p.typicalShare) > 0);
        const avgShare = sharedItems.length > 0
          ? sharedItems.reduce((s, p) => s + Number(p.typicalShare), 0) / sharedItems.length
          : 1;
        const effective = Number(it.typicalShare) > 0 ? Number(it.typicalShare) : avgShare;
        const pillarShareSum = peers.reduce((s, p) => s + (Number(p.typicalShare) > 0 ? Number(p.typicalShare) : avgShare), 0);
        share = pillarShareSum > 0 ? (effective / pillarShareSum) * target : target / peers.length;
      }
      return { ...it, amount: Math.round(share) };
    });

    // Add placeholders for any pillar that has a target but no items.
    const extras = [];
    Object.entries(pillarTargets).forEach(([p, t]) => {
      if (t > 0 && grouped[p].length === 0) {
        extras.push({ id: Math.random().toString(36), name: nameMap[p], icon: iconMap[p], pillar: p, benchmarkKey: null, amount: Math.round(t) });
      }
    });

    setItems([...updated, ...extras]);
    setTargetSplitPct(computePillarPctFromSplit(split));
    setSmartStep(null);
    setSmartAnswers({});
    setSmartResult(null);
  };

  const addItem = (pillar, preset = null) => {
    const base = preset || { name: t.allocate.newItem, icon: 'circle', benchmarkKey: null };
    const id = Math.random().toString(36);
    setItems([...items, { id, name: base.name, icon: base.icon, pillar, benchmarkKey: base.benchmarkKey, amount: 0, typicalShare: base.typicalShare ?? null }]);
    setEditingItemId(id);
  };

  const updateBucket = (id, field, value) => {
    setBuckets(buckets.map(b => b.id === id ? { ...b, [field]: ['current', 'monthly', 'growth', 'dividend', 'risk'].includes(field) ? (value === '' ? 0 : Number(value)) : value, lastUpdated: Date.now() } : b));
  };
  const removeBucket = (id) => {
    setBuckets(buckets.filter(b => b.id !== id));
    if (editingBucketId === id) setEditingBucketId(null);
    if (txBucketId === id) setTxBucketId(null);
  };

  const applyTx = (id) => {
    const amt = Number(txAmount);
    if (!amt || amt <= 0) return;
    const delta = txMode === 'withdraw' ? -amt : amt;
    setBuckets(buckets.map(b => {
      if (b.id !== id) return b;
      const newCurrent = Math.max(0, (Number(b.current) || 0) + delta);
      const entry = { ts: Date.now(), delta, balanceAfter: newCurrent };
      return { ...b, current: newCurrent, lastUpdated: Date.now(), history: [...(b.history || []), entry] };
    }));
    setTxBucketId(null);
    setTxAmount('');
  };

  const removeHistoryEntry = (bucketId, idx) => {
    setBuckets(buckets.map(b => {
      if (b.id !== bucketId) return b;
      const history = b.history || [];
      if (idx < 0 || idx >= history.length) return b;
      const entry = history[idx];
      const newCurrent = Math.max(0, (Number(b.current) || 0) - entry.delta);
      const newHistory = history.filter((_, i) => i !== idx);
      return { ...b, current: newCurrent, history: newHistory, lastUpdated: Date.now() };
    }));
    setConfirmRemove(null);
  };
  const addBucketOfType = (type) => {
    const defaults = {
      stocks: { name: 'Stocks', growth: 7, dividend: 2 },
      bonds: { name: 'Bonds', growth: 5, dividend: 0 },
      cash: { name: 'Cash', growth: 4, dividend: 0 },
      crypto: { name: 'Crypto', growth: 15, dividend: 0 },
    };
    const d = defaults[type] || { name: 'New', growth: 5, dividend: 0 };
    const id = Math.random().toString(36);
    setBuckets([...buckets, { id, name: d.name, type, current: 0, monthly: 0, growth: d.growth, dividend: d.dividend, lastUpdated: Date.now() }]);
    justAddedIdRef.current = id;
    setEditingBucketId(id);
  };
  const addBucket = () => addBucketOfType('other');

  const updateGoal = (id, field, value) => {
    const next = ['target', 'current', 'monthly'].includes(field) ? (value === '' ? 0 : Number(value)) : value;
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: next } : g));
    // Linked-item sync: editing the goal's monthly updates the linked Allocate item's amount.
    if (field === 'monthly') {
      const linked = items.find(i => i.goalId === id);
      if (linked) setItems(items.map(i => i.id === linked.id ? { ...i, amount: Number(next) || 0 } : i));
    }
  };
  const removeGoalHistoryEntry = (goalId, idx) => {
    setGoals(goals.map(g => {
      if (g.id !== goalId) return g;
      const history = g.history || [];
      if (idx < 0 || idx >= history.length) return g;
      const entry = history[idx];
      const newCurrent = Math.max(0, (Number(g.current) || 0) - entry.delta);
      return { ...g, current: newCurrent, history: history.filter((_, i) => i !== idx) };
    }));
    setConfirmRemoveGoalEntry(null);
  };
  const removeGoal = (id) => {
    setGoals(goals.filter(g => g.id !== id));
    setItems(items.map(i => i.goalId === id ? { ...i, goalId: null } : i));
    if (editingGoalId === id) setEditingGoalId(null);
    if (txGoalId === id) setTxGoalId(null);
  };
  const addGoal = () => {
    const newGoal = { id: Math.random().toString(36), name: t.goals.new, icon: 'circle', type: 'savings', target: 1000, current: 0, monthly: 0 };
    setGoals([...goals, newGoal]);
    setEditingGoalId(newGoal.id);
  };

  const addGoalFromPreset = (preset) => {
    const id = Math.random().toString(36);
    setGoals([...goals, { id, name: preset.name, icon: preset.icon, type: preset.type || 'savings', target: preset.target, current: 0, monthly: 0 }]);
    setEditingGoalId(id);
  };

  const applyGoalTx = (id) => {
    const amt = Number(txGoalAmount);
    if (!amt || amt <= 0) return;
    const delta = txGoalMode === 'withdraw' ? -amt : amt;
    setGoals(goals.map(g => {
      if (g.id !== id) return g;
      const newCurrent = Math.max(0, (Number(g.current) || 0) + delta);
      const entry = { ts: Date.now(), delta, balanceAfter: newCurrent };
      return { ...g, current: newCurrent, history: [...(g.history || []), entry] };
    }));
    setTxGoalId(null);
    setTxGoalAmount('');
  };

  const pieData = buckets.filter(b => b.current > 0).map(b => ({ name: b.name, value: Number(b.current), key: b.id, color: BUCKET_COLORS[b.type] || C.inkMuted }));
  const maxExtra = Math.max(salary * 0.5, 500);

  // Group items by pillar
  const itemsByPillar = (pillarKey) => items.filter(i => i.pillar === pillarKey);

  return (
    <div style={s.app}>
      <div style={s.topbar}>
        <div style={s.brandWrap}>
          <div style={s.brandMark} aria-label={t.brand}>
            <svg width="16" height="16" viewBox="0 0 512 512" aria-hidden="true">
              <path d="M150 360V152h44l124 138V200H290L340 80l50 120H362v160h-44L194 222v138z" fill="#FFFFFF"/>
            </svg>
          </div>
          <div style={s.brand}>{t.brand}</div>
        </div>
        <div style={{ display: 'flex', gap: 6 }}>
          <button style={s.iconBtn} onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>
            <Globe size={14} />
          </button>
          <button style={{ ...s.iconBtn, background: tab === 'settings' ? C.accentSoft : C.surfaceAlt, color: tab === 'settings' ? C.accent : C.inkSoft }} onClick={() => setTab('settings')}>
            <Settings size={14} />
          </button>
        </div>
      </div>

      <div style={s.main}>
        {/* ============ HOME ============ */}
        {tab === 'home' && (
          <>
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 4 }}>
                ● {homeGreeting.greeting}{userName ? `, ${userName}` : ''}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                <button
                  onClick={goBackInHistory}
                  disabled={!canGoBack}
                  style={{ background: 'transparent', border: 'none', color: canGoBack ? C.inkSoft : C.lineSoft, padding: 6, cursor: canGoBack ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}
                  aria-label="Previous month"
                >
                  <ChevronLeft size={20} />
                </button>
                <h1 style={{ ...s.h1, margin: 0, textAlign: 'center', flex: 1 }}>
                  {activeView.label.split(' ')[0]} <span style={{ color: C.inkMuted, fontWeight: 400 }}>{activeView.label.split(' ')[1]}</span>
                </h1>
                <button
                  onClick={goForwardInHistory}
                  disabled={!canGoForward}
                  style={{ background: 'transparent', border: 'none', color: canGoForward ? C.inkSoft : C.lineSoft, padding: 6, cursor: canGoForward ? 'pointer' : 'default', display: 'flex', alignItems: 'center' }}
                  aria-label="Next month"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
              {!activeView.isCurrent && (
                <div style={{ fontSize: 11, color: C.accent, fontWeight: 600, textAlign: 'center', marginTop: 2 }}>{t.home.pastView}</div>
              )}
              {activeView.isCurrent && homeGreeting.monthPrompt && (
                <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4, textAlign: 'center' }}>{homeGreeting.monthPrompt}</div>
              )}
            </div>

            <div style={s.heroCard}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
                {t.home.thisMonth}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>{t.home.income}</div>
                  <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(activeView.salary, t)}</div>
                </div>
                {activeView.isCurrent && (
                  <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: C.surface, padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500, cursor: 'pointer' }} onClick={() => setTab('allocate')}>
                    <Pencil size={10} style={{ marginRight: 4, verticalAlign: -1 }} /> {t.common.edit}
                  </button>
                )}
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden', marginTop: 12 }}>
                <div style={{ height: '100%', width: `${Math.min(100, activeAllocPct)}%`, background: C.surface, borderRadius: 3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                <span style={{ opacity: 0.85 }}>{t.home.allocated} <strong>{fmt(activeView.allocated, t)}</strong></span>
                <span style={{ fontWeight: 600 }}>{activeIsOver ? `${t.home.over} ${fmt(-activeUnassigned, t)}` : `${t.home.free} ${fmt(activeUnassigned, t)}`}</span>
              </div>
              {activeView.isCurrent && monthlyDelta && (monthlyDelta.saveDelta !== 0 || monthlyDelta.spendDelta !== 0) && (
                <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid rgba(255,255,255,0.18)', fontSize: 11, opacity: 0.9, display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                  {monthlyDelta.saveDelta !== 0 && (
                    <span>
                      {monthlyDelta.saveDelta > 0 ? '↑' : '↓'} {fmt(Math.abs(monthlyDelta.saveDelta), t)} {t.home.saved}
                    </span>
                  )}
                  {monthlyDelta.spendDelta !== 0 && (
                    <span>
                      {monthlyDelta.spendDelta > 0 ? '↑' : '↓'} {fmt(Math.abs(monthlyDelta.spendDelta), t)} {t.home.spent}
                    </span>
                  )}
                  <span style={{ opacity: 0.7 }}>vs {monthlyDelta.monthName}</span>
                </div>
              )}
            </div>

            {/* Streak celebration */}
            {activeView.isCurrent && checkInStreak >= 3 && (() => {
              const sub = checkInStreak >= 12 ? t.home.streakBanner.sub12
                : checkInStreak >= 6 ? t.home.streakBanner.sub6
                : checkInStreak === 3 ? t.home.streakBanner.sub3
                : t.home.streakBanner.subN;
              return (
                <div style={{ ...s.card, background: `linear-gradient(135deg, ${C.accent}, ${C.accentDeep})`, color: C.surface, border: 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 14, background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Sparkles size={20} color={C.surface} strokeWidth={2} />
                  </div>
                  <div>
                    <div style={{ fontSize: 16, fontWeight: 700 }}>{t.home.months(checkInStreak)}</div>
                    <div style={{ fontSize: 12, opacity: 0.9, marginTop: 2 }}>{sub}</div>
                  </div>
                </div>
              );
            })()}

            {/* Check-in prompt */}
            {activeView.isCurrent && needsCheckIn && (
              <div style={{ ...s.card, background: C.accentSoft, border: `1px solid ${C.accent}30`, display: 'flex', alignItems: 'center', gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 14, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Sparkles size={20} color={C.surface} strokeWidth={2} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, marginBottom: 2 }}>{t.home.checkInTitle}</div>
                  <div style={{ fontSize: 12, color: C.inkSoft }}>{t.home.checkInSub}</div>
                </div>
                <button style={s.primaryBtn} onClick={() => setTab('allocate')}>
                  {t.home.checkInCta}
                </button>
              </div>
            )}

            {/* Wealth snapshot */}
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={s.cardLabel}>{t.home.wealth}</div>
                <button style={s.ghostBtn} onClick={() => setTab('wealth')}><ChevronRight size={12} /></button>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                <div style={s.metric}>
                  <div style={s.metricLabel}>{t.home.today}</div>
                  <div style={{ ...s.metricValue, color: C.ink }}>{fmtShort(activeView.totalWealth, t)}</div>
                </div>
                <div style={s.metric}>
                  <div style={s.metricLabel}>{t.home.in10}</div>
                  <div style={{ ...s.metricValue, color: C.accent }}>{fmtShort(in10y, t)}</div>
                </div>
              </div>
              {wealthSparkline && wealthSparkline.length >= 2 && (() => {
                const min = Math.min(...wealthSparkline);
                const max = Math.max(...wealthSparkline);
                const range = max - min || 1;
                const w = 100, h = 28;
                const pts = wealthSparkline.map((v, i) => {
                  const x = (i / (wealthSparkline.length - 1)) * w;
                  const y = h - ((v - min) / range) * h;
                  return `${x.toFixed(2)},${y.toFixed(2)}`;
                }).join(' ');
                const lastUp = wealthSparkline[wealthSparkline.length - 1] >= wealthSparkline[wealthSparkline.length - 2];
                return (
                  <svg viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" style={{ width: '100%', height: 28, marginTop: 12 }}>
                    <polyline points={pts} fill="none" stroke={lastUp ? C.accent : C.red} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />
                  </svg>
                );
              })()}
            </div>

            {/* Goals snapshot */}
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                <div style={s.cardLabel}>{t.home.goalsTitle}</div>
                <button style={s.ghostBtn} onClick={() => setTab('goals')}>
                  {goals.length > 3 ? t.home.goalsViewAll : null} <ChevronRight size={12} />
                </button>
              </div>
              {goals.length === 0 ? (
                <div style={{ ...s.sub, fontSize: 13, color: C.inkMuted, fontStyle: 'italic' }}>{t.home.goalsEmpty}</div>
              ) : (
                goals.slice(0, 3).map((g, i) => {
                  const pct = g.target > 0 ? Math.min(100, Math.round((g.current / g.target) * 100)) : 0;
                  const lastGoal = lastSnapshot?.goals?.find(lg => lg.name === g.name);
                  const monthDelta = lastGoal ? (Number(g.current) || 0) - (Number(lastGoal.current) || 0) : 0;
                  return (
                    <div key={g.id} onClick={() => setTab('goals')} style={{ cursor: 'pointer', padding: '10px 0', borderBottom: i < Math.min(goals.length, 3) - 1 ? `1px solid ${C.lineSoft}` : 'none' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6 }}>
                        <div style={s.rowIconBox}>{renderIcon(g.icon, 14, C.accent, 2)}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                          <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 2, fontVariantNumeric: 'tabular-nums' }}>
                            {fmtShort(g.current, t)} / {fmtShort(g.target, t)}
                            {monthDelta > 0 && <span style={{ color: C.accent, marginLeft: 6 }}>{t.home.goalThisMonth(fmtShort(monthDelta, t))}</span>}
                          </div>
                        </div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: C.accent, fontVariantNumeric: 'tabular-nums' }}>{pct}%</div>
                      </div>
                      <div style={{ height: 4, background: C.lineSoft, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${pct}%`, background: C.accent, borderRadius: 2 }} />
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Insights */}
            <div style={s.card}>
              <div style={{ ...s.cardLabel, display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                <Sparkles size={11} /> {t.home.insightsTitle}
              </div>
              {insights.length === 0 ? (
                <div style={{ ...s.sub, fontSize: 13, color: C.inkMuted, fontStyle: 'italic' }}>{t.home.noInsights}</div>
              ) : (
                insights.map((ins, i) => {
                  const iconMap = { alert: AlertCircle, trending: TrendingUp, goal: Target };
                  const Icon = iconMap[ins.icon] || Sparkles;
                  const clickable = !!ins.action;
                  return (
                    <div
                      key={i}
                      onClick={clickable ? () => setTab(ins.action.tab) : undefined}
                      style={{ ...s.insightRow, background: C.accentSoft, cursor: clickable ? 'pointer' : 'default' }}
                    >
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent, flexShrink: 0 }}>
                        <Icon size={13} color={C.accent} strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>{ins.text}</div>
                      {clickable && (
                        <span style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: C.accent, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
                          {ins.action.label} <ChevronRight size={11} />
                        </span>
                      )}
                    </div>
                  );
                })
              )}
              {lastCheckIn && (
                <div style={{ marginTop: 14, paddingTop: 12, borderTop: `1px solid ${C.lineSoft}`, fontSize: 11, color: C.inkMuted, display: 'flex', justifyContent: 'space-between' }}>
                  <span>{t.home.lastChecked}: {daysSinceCheckIn === 0 ? t.common.today : t.common.daysAgo(daysSinceCheckIn)}</span>
                  {checkInStreak > 1 && <span style={{ color: C.accent, fontWeight: 600 }}>● {t.home.months(checkInStreak)}</span>}
                </div>
              )}
            </div>
          </>
        )}

        {/* ============ ALLOCATE ============ */}
        {tab === 'allocate' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.allocate.title}</h1>
              <div style={s.sub}>{t.allocate.sub}</div>
            </div>

            <div style={s.heroCard}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>{incomeSources.length > 1 ? t.allocate.totalIncome : t.allocate.income}</div>
              {incomeSources.length === 1 ? (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontSize: 24, opacity: 0.7 }}>{t.currencySymbol}</span>
                  <MoneyInput value={incomeSources[0].amount} t={t} style={{ flex: 1, fontFamily: fontSans, fontSize: 32, fontWeight: 700, padding: 0, border: 'none', background: 'transparent', color: C.surface, outline: 'none', width: '100%', minWidth: 0, letterSpacing: '-0.02em' }} onChange={(v) => updateIncomeSource(incomeSources[0].id, 'amount', v)} />
                </div>
              ) : (
                <>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 12 }}>
                    <span style={{ fontSize: 24, opacity: 0.7 }}>{t.currencySymbol}</span>
                    <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{fmtNumber(salary, t)}</span>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {incomeSources.map(src => (
                      <div key={src.id} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                        <input value={src.name} onChange={(e) => updateIncomeSource(src.id, 'name', e.target.value)} style={{ flex: 1, minWidth: 0, fontFamily: fontSans, fontSize: 13, fontWeight: 500, padding: '6px 10px', border: 'none', borderRadius: 8, background: 'rgba(255,255,255,0.12)', color: C.surface, outline: 'none' }} />
                        <MoneyInput value={src.amount} t={t} style={{ width: 96, fontFamily: fontSans, fontSize: 13, fontWeight: 600, padding: '6px 10px', border: 'none', borderRadius: 8, background: 'rgba(255,255,255,0.12)', color: C.surface, outline: 'none', textAlign: 'right' }} onChange={(v) => updateIncomeSource(src.id, 'amount', v)} />
                        <button onClick={() => removeIncomeSource(src.id)} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.7)', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center' }} aria-label={t.common.delete}>
                          <X size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                </>
              )}
              <button onClick={addIncomeSource} style={{ background: 'transparent', border: 'none', color: 'rgba(255,255,255,0.85)', cursor: 'pointer', padding: '8px 0 0', fontFamily: fontSans, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                <Plus size={12} /> {t.allocate.addSource}
              </button>
              {salary > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                  <span style={{ opacity: 0.85 }}>{t.allocate.total} <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(allocated, t)}</strong></span>
                  <span style={{ fontWeight: 700, color: unassigned < 0 ? '#FFB89A' : C.surface, fontVariantNumeric: 'tabular-nums' }}>
                    {unassigned < 0 ? `${t.allocate.overIncome} ${fmt(-unassigned, t)}` : `${fmt(unassigned, t)} ${t.allocate.remaining.toLowerCase()}`}
                  </span>
                </div>
              )}
            </div>

            {/* Consequence line — what the current plan gets the user */}
            {smartStep === null && (() => {
              // Pick the most relevant goal: incomplete, with monthly contribution, prefer one with deadline.
              const candidates = goals.filter(g => Number(g.target) > 0 && Number(g.current) < Number(g.target) && Number(g.monthly) > 0);
              const withDeadline = candidates.find(g => g.deadline);
              const goal = withDeadline || candidates[0];
              let line = null;
              let icon = <TrendingUp size={14} color={C.accent} strokeWidth={2.5} />;
              if (goal) {
                const remaining = Math.max(0, Number(goal.target) - Number(goal.current));
                const months = Math.ceil(remaining / Number(goal.monthly));
                const d = new Date();
                d.setMonth(d.getMonth() + months);
                const dateLabel = `${t.month.names[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
                let onTrack = true;
                if (goal.deadline) {
                  const dl = new Date(goal.deadline + '-01');
                  const monthsToDeadline = (dl.getFullYear() - new Date().getFullYear()) * 12 + (dl.getMonth() - new Date().getMonth());
                  onTrack = monthsToDeadline >= months;
                }
                line = onTrack ? t.allocate.consequence.goalOnTrack(goal.name, dateLabel) : t.allocate.consequence.goalEta(goal.name, dateLabel);
                if (!onTrack) icon = <AlertCircle size={14} color={C.red} strokeWidth={2.5} />;
              } else if ((pillarTotals.save || 0) > 0) {
                line = t.allocate.consequence.savesYear(fmt((pillarTotals.save || 0) * 12, t));
              } else {
                line = t.allocate.consequence.empty;
                icon = <Sparkles size={14} color={C.inkSoft} strokeWidth={2.5} />;
              }
              return (
                <div style={{ marginTop: 12, marginBottom: 12, padding: '14px 16px', background: C.surface, border: `1px solid ${C.lineSoft}`, borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 2 }}>{t.allocate.consequence.eyebrow}</div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>{line}</div>
                  </div>
                </div>
              );
            })()}

            {/* Smart Action — pillar-aware nudge. Bills can't be moved with a button
                (they're real obligations); Save shouldn't be moved by reflex. So:
                - Spend high → honest one-tap shift (the only true rebalance)
                - Bills high → real-world levers sheet
                - Save low → coaching (only when Spend isn't also high) */}
            {smartStep === null && allocated > 0 && (() => {
              const pct = (key) => Math.round(((pillarTotals[key] || 0) / allocated) * 100);
              const target = (key) => Math.round((allocationBenchmark[key] || 0) * 100);
              const spendGap = pct('spend') - target('spend');
              const billsGap = pct('bills') - target('bills');
              const saveGap = target('save') - pct('save');
              const hasSpendItems = items.some(i => i.pillar === 'spend' && Number(i.amount) > 0);
              const hasSaveItems = items.some(i => i.pillar === 'save');
              let card = null;
              if (spendGap >= 5 && hasSpendItems && hasSaveItems) {
                // Insight-only: no button, no auto-action. The user adjusts items
                // manually below. Consequence is computed honestly against the
                // share that actually reaches a linked goal.
                const proposed = Math.max(0, Math.round((pct('spend') - target('spend')) * salary / 100));
                const saveItems = items.filter(i => i.pillar === 'save');
                const saveTotal = saveItems.reduce((s, i) => s + Number(i.amount || 0), 0);
                const candidates = goals.filter(g =>
                  Number(g.target) > 0 &&
                  Number(g.current) < Number(g.target) &&
                  saveItems.some(i => i.goalId === g.id)
                );
                const goal = candidates.find(g => g.deadline) || candidates[0];
                let consequenceText = `+${fmt(proposed * 12, t)} ${lang === 'pt' ? '/ano' : '/yr'}`;
                if (goal && proposed > 0) {
                  const linked = saveItems.find(i => i.goalId === goal.id);
                  const weight = saveTotal > 0
                    ? Number(linked.amount || 0) / saveTotal
                    : (saveItems.length > 0 ? 1 / saveItems.length : 0);
                  const goalShare = weight * proposed;
                  if (goalShare > 0) {
                    const remaining = Math.max(0, Number(goal.target) - Number(goal.current));
                    const currentMonthly = Number(goal.monthly) || 0;
                    if (currentMonthly > 0) {
                      const newMonthly = currentMonthly + goalShare;
                      const oldMonths = Math.ceil(remaining / currentMonthly);
                      const newMonths = Math.ceil(remaining / newMonthly);
                      const saved = oldMonths - newMonths;
                      if (saved >= 1) consequenceText = t.allocate.swap.consequenceGoal(goal.name, saved);
                    } else {
                      const newMonths = Math.ceil(remaining / goalShare);
                      consequenceText = t.allocate.swap.consequenceNewEta(goal.name, newMonths);
                    }
                  }
                }
                card = {
                  kind: 'info',
                  title: t.allocate.smartAction.spendHighTitle,
                  sub: t.allocate.smartAction.spendInfoSub(spendGap, fmt(proposed, t)),
                  consequence: consequenceText,
                  color: C.accent,
                  icon: <ArrowDownUp size={14} color={C.accent} strokeWidth={2.5} />,
                };
              } else if (billsGap >= 5) {
                card = {
                  kind: 'action',
                  title: t.allocate.smartAction.billsHighTitle,
                  sub: t.allocate.smartAction.billsHighSub(billsGap),
                  cta: t.allocate.smartAction.billsHighCta,
                  color: C.inkSoft,
                  icon: <Zap size={14} color={C.inkSoft} strokeWidth={2.5} />,
                  onTap: () => setBillsTipsOpen(true),
                };
              } else if (saveGap >= 5) {
                card = {
                  kind: 'action',
                  title: t.allocate.smartAction.saveLowTitle,
                  sub: t.allocate.smartAction.saveLowSub(saveGap),
                  cta: t.allocate.smartAction.saveLowCta,
                  color: C.accent,
                  icon: <PiggyBank size={14} color={C.accent} strokeWidth={2.5} />,
                  onTap: () => setSaveTipsOpen(true),
                };
              }
              if (!card) return null;
              if (card.kind === 'info') {
                return (
                  <div style={{ marginBottom: 12, padding: '12px 14px', background: `${card.color}10`, border: `1px solid ${card.color}40`, borderRadius: 14, display: 'flex', alignItems: 'flex-start', gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {card.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>{card.title}</div>
                      <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2, lineHeight: 1.4 }}>{card.sub}</div>
                      <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, background: C.surface, border: `1px solid ${card.color}40`, color: card.color, fontSize: 11, fontWeight: 700 }}>
                        <TrendingUp size={11} strokeWidth={2.5} /> {card.consequence}
                      </div>
                    </div>
                  </div>
                );
              }
              return (
                <div style={{ marginBottom: 12, padding: '12px 14px', background: `${card.color}10`, border: `1px solid ${card.color}40`, borderRadius: 14, display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {card.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, lineHeight: 1.3 }}>{card.title}</div>
                    <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2, lineHeight: 1.4 }}>{card.sub}</div>
                  </div>
                  <button onClick={card.onTap} style={{ flexShrink: 0, padding: '8px 12px', borderRadius: 10, border: 'none', background: card.color, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, fontWeight: 700 }}>
                    {card.cta}
                  </button>
                </div>
              );
            })()}

            {/* Money flow + benchmark — single unified card.
                Replaces the prior "Money flow" (share) and "How you compare"
                (vs typical) cards which showed the same percentages twice. */}
            {smartStep === null && (
              <div style={s.card}>
                <div style={{ ...s.cardLabel, marginBottom: 4 }}>{t.allocate.flow}</div>
                {allocated === 0 ? (
                  <div style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.5, marginTop: 6 }}>{t.allocate.moneyFlowEmpty}</div>
                ) : (
                  <>
                    <div style={{ fontSize: 12, color: C.inkSoft, marginBottom: 12 }}>{t.allocate.benchmarkCard.sub}</div>
                    <div style={{ display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden', background: C.lineSoft, marginBottom: 14 }}>
                      {['save', 'bills', 'spend', 'debt'].map(p => {
                        const amt = pillarTotals[p] || 0;
                        if (amt === 0) return null;
                        const pct = (amt / allocated) * 100;
                        return <div key={p} style={{ width: `${pct}%`, background: t.allocate.pillars[p].color }} />;
                      })}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {['save', 'bills', 'spend', 'debt'].map(key => {
                        const target = allocationBenchmark[key];
                        const current = (pillarTotals[key] || 0) / allocated;
                        const diffPp = Math.round((current - target) * 100);
                        const onTrack = Math.abs(diffPp) < 5;
                        const aboveIsGood = key === 'save';
                        const isHealthy = onTrack || (aboveIsGood ? diffPp > 0 : diffPp < 0);
                        const healthColor = isHealthy ? C.accent : C.red;
                        const status = onTrack ? t.allocate.benchmarkCard.on : diffPp > 0 ? t.allocate.benchmarkCard.above : t.allocate.benchmarkCard.below;
                        return (
                          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                            <div style={{ flexShrink: 0, width: 70, fontSize: 12, fontWeight: 600, color: C.ink, display: 'flex', alignItems: 'center', gap: 6 }}>
                              <span style={{ width: 8, height: 8, borderRadius: 2, background: t.allocate.pillars[key].color, flexShrink: 0 }} />
                              {t.allocate.pillarLabels[key]}
                            </div>
                            <div style={{ flex: 1, position: 'relative', height: 8, background: C.line, borderRadius: 4, overflow: 'hidden' }}>
                              <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: `${Math.min(100, Math.round(current * 100))}%`, background: healthColor, transition: 'width 0.3s' }} />
                              <div style={{ position: 'absolute', left: `${Math.round(target * 100)}%`, top: -2, bottom: -2, width: 2, background: C.ink, opacity: 0.4 }} />
                            </div>
                            <div style={{ flexShrink: 0, fontSize: 11, fontWeight: 700, color: healthColor, minWidth: 36, textAlign: 'right', ...s.num }}>{Math.round(current * 100)}%</div>
                            <div style={{ flexShrink: 0, fontSize: 10, color: C.inkMuted, minWidth: 64, textAlign: 'right' }}>{status}</div>
                          </div>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>
            )}

            {/* Setup strip (only when nothing has been allocated yet) */}
            {smartStep === null && allocated === 0 && (
              <div style={s.card}>
                <div style={{ ...s.cardLabel, marginBottom: 10 }}>{t.allocate.starterTitle}</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <button style={{ ...s.primaryBtn, width: '100%', justifyContent: 'center' }} onClick={() => { setSmartStep('q1'); setSmartAnswers({}); setSmartResult(null); }}>
                    <Sparkles size={14} /> {t.allocate.smartCard.cta}
                  </button>
                  {snapshots.length > 0 && (
                    <button style={{ ...s.ghostBtn, width: '100%', justifyContent: 'center', border: `1px solid ${C.line}`, borderRadius: 12, padding: '10px 14px', fontWeight: 600 }} onClick={copyLastMonth}>
                      <RotateCcw size={13} /> {t.allocate.copyLastCard.cta}
                    </button>
                  )}
                </div>
                <div style={{ fontSize: 11, color: C.inkMuted, lineHeight: 1.5, marginTop: 10 }}>{t.allocate.planHint}</div>

                {salary > 0 && (
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${C.lineSoft}` }}>
                    <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.allocate.templates}</div>
                    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 4 }}>
                      {(lang === 'pt' ? TEMPLATES_PT : TEMPLATES_EN).map(tpl => (
                        <button key={tpl.key} onClick={() => requestApply(() => applyTemplate(tpl.key))} style={{ flexShrink: 0, minWidth: 130, textAlign: 'left', padding: '10px 12px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surfaceAlt, cursor: 'pointer', fontFamily: fontSans }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{tpl.name}</div>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>{tpl.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Smart Split bottom sheet (questions + results) */}
            {smartStep && (
              <div onClick={() => { setSmartStep(null); setSmartAnswers({}); setSmartResult(null); }} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, maxHeight: '85dvh', overflowY: 'auto', background: C.bg, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)' }}>
                  <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.ink }}>
                      {t.allocate.smartSheet}
                      {smartStep !== 'result' && <span style={{ fontSize: 12, color: C.inkMuted, marginLeft: 8, fontWeight: 500 }}>· {t.allocate.smart.step(smartStep === 'q1' ? 1 : smartStep === 'q2' ? 2 : 3)}</span>}
                    </div>
                    <button style={s.ghostBtn} onClick={() => { setSmartStep(null); setSmartAnswers({}); setSmartResult(null); }}><X size={14} /></button>
                  </div>

                  {smartStep !== 'result' && (
                    <>
                      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: C.ink }}>{t.allocate.smart[smartStep].label}</div>
                      {t.allocate.smart[smartStep].options.map(opt => (
                        <div
                          key={opt.v}
                          style={s.optionCard(smartAnswers[smartStep] === opt.v)}
                          onClick={() => {
                            const newAns = { ...smartAnswers, [smartStep]: opt.v };
                            setSmartAnswers(newAns);
                            setTimeout(() => {
                              if (smartStep === 'q1') setSmartStep('q2');
                              else if (smartStep === 'q2') setSmartStep('q3');
                              else {
                                const result = generatePillarSplit(salary, newAns, mainGoal, country);
                                setSmartResult(result);
                                setSmartStep('result');
                              }
                            }, 180);
                          }}
                        >
                          <div style={s.optionLabel}><div style={s.optionLabelMain}>{opt.l}</div></div>
                          <div style={s.optionCheck(smartAnswers[smartStep] === opt.v)}>
                            {smartAnswers[smartStep] === opt.v && <Check size={12} color={C.surface} strokeWidth={3} />}
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  {smartStep === 'result' && smartResult && (
                    <>
                      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 10 }}>
                        <button style={s.ghostBtn} onClick={() => { setSmartStep('q1'); setSmartAnswers({}); setSmartResult(null); }}>
                          <RotateCcw size={11} /> {t.allocate.smart.recalc}
                        </button>
                      </div>
                      <SplitOptionCard
                        title={t.allocate.smart.balanced.label}
                        sub={t.allocate.smart.balanced.sub}
                        badge={t.allocate.smart.balanced.badge}
                        tradeoff={t.allocate.smart.tradeoff.balanced}
                        split={smartResult.balanced}
                        salary={salary}
                        t={t}
                        color={C.accent}
                        pillarsCopy={t.allocate.pillars}
                        onApply={() => requestApply(() => applySmartSplit(smartResult.balanced))}
                      />
                      <SplitOptionCard
                        title={t.allocate.smart.focused.label}
                        sub={t.allocate.smart.focused.sub}
                        badge={t.allocate.smart.focused.badge}
                        tradeoff={t.allocate.smart.tradeoff[smartResult.tradeoffKey]}
                        split={smartResult.focused}
                        salary={salary}
                        t={t}
                        color={C.accentDeep}
                        pillarsCopy={t.allocate.pillars}
                        onApply={() => requestApply(() => applySmartSplit(smartResult.focused))}
                        isFocused
                      />
                    </>
                  )}
                </div>
              </div>
            )}

            {/* Pillars */}
            {['save', 'bills', 'spend', 'debt'].map(pillarKey => {
              const pillar = t.allocate.pillars[pillarKey];
              const pillarItems = itemsByPillar(pillarKey);
              const pillarTotal = pillarTotals[pillarKey] || 0;
              const pillarPct = allocated > 0 ? Math.round((pillarTotal / allocated) * 100) : 0;
              // Compare the pillar against the country benchmark (same source as the
              // unified Money flow card up top), not the user's custom targetSplitPct.
              // Otherwise the header can say "on track" while the top card says "above
              // typical" — confusing dual standards. Status here mirrors the top card.
              const benchPct = Math.round((allocationBenchmark[pillarKey] || 0) * 100);
              const diff = allocated > 0 ? pillarPct - benchPct : null;
              const status = diff == null ? null : Math.abs(diff) < 5 ? 'ok' : diff > 0 ? 'over' : 'under';
              const aboveIsGood = pillarKey === 'save';
              const isHealthy = status === 'ok' || (aboveIsGood ? diff > 0 : diff < 0);
              const statusColor = isHealthy ? C.accent : C.red;
              const benchOnTrack = status === 'ok';
              const starters = (STARTER_ITEMS[lang] || STARTER_ITEMS.en)[pillarKey] || [];
              const targetAbs = Number(pillarTargets[pillarKey]) || 0;
              const isEditingTarget = editingPillarTarget === pillarKey;
              const overTarget = targetAbs > 0 && pillarTotal > targetAbs;
              const isCollapsed = collapsedPillars.includes(pillarKey);

              return (
                <div key={pillarKey} style={s.card}>
                  <div style={{ ...s.pillarHeader, cursor: 'pointer' }} onClick={() => togglePillarCollapsed(pillarKey)} role="button" aria-expanded={!isCollapsed}>
                    <div style={s.pillarDot(pillar.color)} />
                    <div style={{ flex: 1 }}>
                      <div style={s.pillarName}>{pillar.name}</div>
                      <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 1 }}>{pillar.sub}</div>
                      {allocated > 0 && (
                        <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 4, fontWeight: 600, fontVariantNumeric: 'tabular-nums', display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <span style={{ width: 6, height: 6, borderRadius: 3, background: benchOnTrack ? C.accent : C.inkMuted, flexShrink: 0 }} />
                          {pillarPct}% · {t.allocate.typical} {benchPct}%
                        </div>
                      )}
                      {targetAbs > 0 && (
                        <div style={{ marginTop: 6 }}>
                          <div style={{ height: 5, background: C.lineSoft, borderRadius: 3, overflow: 'hidden' }}>
                            <div style={{ height: '100%', width: `${Math.min((pillarTotal / targetAbs) * 100, 100)}%`, background: overTarget ? C.red : pillar.color, transition: 'width 0.2s' }} />
                          </div>
                          <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 600, marginTop: 3 }}>
                            {Math.round((pillarTotal / targetAbs) * 100)}% {t.allocate.ofTarget}
                          </div>
                        </div>
                      )}
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 0 }} onClick={(e) => e.stopPropagation()}>
                      <div style={s.pillarTotal}>
                        <span style={{ color: overTarget ? C.red : C.ink }}>{fmt(pillarTotal, t)}</span>
                        {targetAbs > 0 && <span style={{ color: C.inkMuted, fontWeight: 500 }}> / {fmt(targetAbs, t)}</span>}
                      </div>
                      {isEditingTarget ? (
                        <div style={{ display: 'flex', gap: 4, alignItems: 'center', marginTop: 4, justifyContent: 'flex-end' }}>
                          <MoneyInput value={targetAbs} t={t} style={{ ...s.inputNum, width: 92, fontSize: 13, padding: '4px 8px' }} onChange={(v) => setPillarTargets({ ...pillarTargets, [pillarKey]: v })} />
                          <button onClick={() => setEditingPillarTarget(null)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, color: C.accent, display: 'flex', alignItems: 'center' }}>
                            <Check size={14} />
                          </button>
                        </div>
                      ) : targetAbs > 0 ? (
                        <button onClick={() => setEditingPillarTarget(pillarKey)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: C.inkMuted, fontSize: 10, fontFamily: fontSans, marginTop: 2 }}>
                          {t.common.edit} {t.allocate.target}
                        </button>
                      ) : status != null && pillarTotal > 0 ? (
                        <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>
                          {pillarPct}% · <span style={{ color: statusColor, fontWeight: 600 }}>
                            {status === 'ok' ? t.allocate.onTrack : status === 'over' ? t.allocate.over(diff) : t.allocate.under(-diff)}
                          </span>
                        </div>
                      ) : (
                        <button onClick={() => setEditingPillarTarget(pillarKey)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 0, color: pillar.color, fontSize: 10, fontWeight: 600, fontFamily: fontSans, marginTop: 2 }}>
                          {t.allocate.setTarget}
                        </button>
                      )}
                    </div>
                    <ChevronRight size={16} color={C.inkMuted} style={{ flexShrink: 0, transform: isCollapsed ? 'rotate(0deg)' : 'rotate(90deg)', transition: 'transform 0.2s', marginLeft: 4 }} />
                  </div>

                  {!isCollapsed && pillarItems.length === 0 && (
                    <div style={{ paddingBottom: 4 }}>
                      <div style={{ fontSize: 11, color: C.inkMuted, marginBottom: 8, fontStyle: 'italic' }}>
                        {lang === 'en' ? 'Tap to add a starter item:' : 'Toque para adicionar um item:'}
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {starters.map(s => (
                          <button key={s.name} onClick={() => addItem(pillarKey, s)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '6px 10px', borderRadius: 999, border: `1px solid ${pillar.color}40`, background: pillar.color + '12', color: pillar.color, cursor: 'pointer', fontFamily: fontSans }}>
                            <Plus size={11} /> {s.name}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {!isCollapsed && pillarItems.map(item => {
                    const isEditingItem = editingItemId === item.id;
                    const bm = getBenchmarkStatus(item, salary, country);
                    const pct = salary > 0 ? (item.amount / salary) * 100 : 0;
                    const lastSnap = snapshots[snapshots.length - 1];
                    const lastItem = lastSnap?.items?.find(li =>
                      (item.benchmarkKey && li.benchmarkKey === item.benchmarkKey && li.pillar === item.pillar) ||
                      (li.name === item.name && li.pillar === item.pillar)
                    );
                    const lastAmount = lastItem ? Number(lastItem.amount) || 0 : 0;
                    const bmThreshold = bm?.threshold || 0;
                    const barColor = bm?.status === 'green' ? C.accent : bm?.status === 'yellow' ? C.yellow : C.red;
                    // Scale the bar so the threshold sits ~70% across, giving
                    // room to visualise going over without clipping.
                    const scale = bmThreshold > 0 ? Math.max(bmThreshold * 1.4, pct * 1.05) : 0;
                    const bmFillPct = scale > 0 ? Math.min((pct / scale) * 100, 100) : 0;
                    const tickPct = scale > 0 ? (bmThreshold / scale) * 100 : 0;
                    return (
                      <div key={item.id} style={{ padding: '12px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={s.rowIconBox}>{renderIcon(item.icon, 14, C.accent, 2)}</div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.25, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                              {item.name}
                              {item.oneOff && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: pillar.color + '20', color: pillar.color, marginLeft: 6, verticalAlign: 'middle' }}>{t.allocate.oneOffTag}</span>}
                            </div>
                          </div>
                          <MoneyInput value={item.amount} t={t} style={s.inputNum} onChange={(v) => updateItem(item.id, 'amount', v)} />
                          <button onClick={() => setEditingItemId(isEditingItem ? null : item.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: C.inkMuted, padding: 4, display: 'flex', alignItems: 'center' }} aria-label={isEditingItem ? t.common.done : t.common.edit}>
                            <ChevronRight size={16} style={{ transform: isEditingItem ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                          </button>
                        </div>

                        {/* Benchmark progress bar (when item has a benchmark) */}
                        {bm && bmThreshold > 0 && (
                          <div style={{ marginTop: 8, paddingLeft: 36 }}>
                            <div style={{ position: 'relative', height: 4, background: C.lineSoft, borderRadius: 2 }}>
                              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${bmFillPct}%`, background: barColor, borderRadius: 2 }} />
                              <div style={{ position: 'absolute', left: `${tickPct}%`, top: -2, width: 2, height: 8, background: C.ink, opacity: 0.55, borderRadius: 1 }} />
                            </div>
                            <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 4 }}>
                              <span style={{ color: barColor, fontWeight: 600 }}>{bm.pct}%</span> · {t.allocate.benchmark} {bm.invert ? `≥ ${bm.threshold}%` : `≤ ${bm.threshold}%`} · {bm.source}
                            </div>
                          </div>
                        )}

                        {/* Non-benchmarked items get a neutral bar showing share of income */}
                        {!bm && item.amount > 0 && salary > 0 && (
                          <div style={{ marginTop: 8, paddingLeft: 36 }}>
                            <div style={{ position: 'relative', height: 4, background: C.lineSoft, borderRadius: 2 }}>
                              <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(pct, 100)}%`, background: C.inkMuted, borderRadius: 2 }} />
                            </div>
                            <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 4 }}>
                              <span style={{ fontWeight: 600 }}>{pct.toFixed(pct < 1 ? 1 : 0)}%</span> {t.allocate.ofIncome}
                            </div>
                          </div>
                        )}

                        {/* Last-month reference */}
                        {lastAmount > 0 && (
                          <div style={{ marginTop: 4, paddingLeft: 36, fontSize: 10, color: C.inkMuted, fontStyle: 'italic' }}>
                            {t.allocate.lastMonth(fmt(lastAmount, t))}
                          </div>
                        )}

                        {/* Linked-goal chip — only on Save and Debt items, where linking is honest */}
                        {(item.pillar === 'save' || item.pillar === 'debt') && (() => {
                          const linkedGoal = item.goalId ? goals.find(g => g.id === item.goalId) : null;
                          return (
                            <div style={{ marginTop: 6, paddingLeft: 36 }}>
                              <button onClick={() => setLinkSheetItemId(item.id)} style={{ display: 'inline-flex', alignItems: 'center', gap: 5, padding: '4px 10px', borderRadius: 999, border: linkedGoal ? `1px solid ${C.accent}40` : `1px dashed ${C.line}`, background: linkedGoal ? `${C.accent}10` : 'transparent', color: linkedGoal ? C.accent : C.inkMuted, fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: fontSans }}>
                                <Target size={10} strokeWidth={2.5} />
                                {linkedGoal ? t.allocate.link.chipLinked(linkedGoal.name) : t.allocate.link.chip}
                              </button>
                            </div>
                          );
                        })()}

                        {/* Wealth feed hint — Save items get auto-routed into matching bucket
                            types at check-in. Show which buckets will receive the contribution
                            so the connection isn't invisible. */}
                        {item.pillar === 'save' && Number(item.amount) > 0 && (() => {
                          const targetTypes = { emergency: ['cash'], savings: ['cash', 'bonds'], investments: ['stocks', 'reits', 'crypto', 'bonds'] };
                          const types = targetTypes[item.benchmarkKey] || ['cash', 'bonds', 'stocks', 'reits', 'crypto'];
                          const matchingBuckets = buckets.filter(b => types.includes(b.type));
                          if (matchingBuckets.length === 0) return null;
                          const names = matchingBuckets.slice(0, 2).map(b => b.name).join(', ');
                          const more = matchingBuckets.length > 2 ? ` +${matchingBuckets.length - 2}` : '';
                          return (
                            <div style={{ marginTop: 4, paddingLeft: 36, fontSize: 10, color: C.inkMuted, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <TrendingUp size={9} strokeWidth={2.5} />
                              {t.allocate.feedsWealth} {names}{more}
                            </div>
                          );
                        })()}

                        {isEditingItem && (
                          <div style={{ paddingLeft: 36, marginTop: 10 }}>
                            <input style={{ ...s.input, padding: '8px 12px', fontSize: 16, marginBottom: 10 }} value={item.name} onChange={(e) => updateItem(item.id, 'name', e.target.value)} />
                            <div style={{ marginBottom: 10 }}>
                              <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.allocate.quickAdd}</div>
                              <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                {[25, 50, 100, 250, 500].map(d => (
                                  <button key={d} onClick={() => updateItem(item.id, 'amount', (Number(item.amount) || 0) + d)} style={{ padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: C.surfaceAlt, color: C.accent }}>
                                    +{fmt(d, t)}
                                  </button>
                                ))}
                                <button onClick={() => updateItem(item.id, 'amount', 0)} style={{ padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: C.surfaceAlt, color: C.inkSoft, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                                  <X size={11} /> {t.allocate.reset}
                                </button>
                              </div>
                            </div>
                            {(PILLAR_BENCHMARKS[pillarKey] || []).length > 0 && (
                              <div style={{ marginBottom: 10 }}>
                                <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.allocate.benchmarkPick}</div>
                                <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                                  {[null, ...PILLAR_BENCHMARKS[pillarKey]].map(key => {
                                    const selected = (item.benchmarkKey || null) === key;
                                    const label = key == null ? t.allocate.benchmarkNone : t.allocate.benchmarkLabels[key];
                                    return (
                                      <button
                                        key={key || 'none'}
                                        onClick={() => updateItem(item.id, 'benchmarkKey', key)}
                                        style={{ padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: selected ? C.accent : C.surfaceAlt, color: selected ? C.surface : C.inkSoft }}
                                      >
                                        {label}
                                      </button>
                                    );
                                  })}
                                </div>
                              </div>
                            )}
                            {/* Recurring vs one-off toggle */}
                            <div style={{ marginBottom: 10 }}>
                              <div style={{ display: 'flex', gap: 4, background: C.surfaceAlt, padding: 3, borderRadius: 999 }}>
                                <button onClick={() => updateItem(item.id, 'oneOff', false)} style={{ flex: 1, padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: !item.oneOff ? C.accent : 'transparent', color: !item.oneOff ? C.surface : C.inkSoft }}>
                                  {t.allocate.recurring}
                                </button>
                                <button onClick={() => updateItem(item.id, 'oneOff', true)} style={{ flex: 1, padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: item.oneOff ? C.accent : 'transparent', color: item.oneOff ? C.surface : C.inkSoft }}>
                                  {t.allocate.oneOff}
                                </button>
                              </div>
                            </div>
                            <button onClick={() => { removeItem(item.id); setEditingItemId(null); }} style={{ background: 'transparent', border: `1px solid ${C.lineSoft}`, color: C.red, padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Trash2 size={13} /> {t.common.delete}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  {!isCollapsed && (
                    <button style={{ ...s.ghostBtn, marginTop: 10, border: `1px dashed ${C.line}`, borderRadius: 10, padding: '8px 14px', width: '100%', justifyContent: 'center' }} onClick={() => addItem(pillarKey)}>
                      <Plus size={12} /> {t.allocate.addItem}
                    </button>
                  )}
                </div>
              );
            })}

            {/* Re-trigger: Smart Split + templates always one tap away */}
            {smartStep === null && allocated > 0 && (
              <div style={{ marginBottom: 12 }}>
                <button
                  onClick={() => { setSmartStep('q1'); setSmartAnswers({}); setSmartResult(null); }}
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, width: '100%', background: 'transparent', border: `1px dashed ${C.line}`, borderRadius: 12, padding: '12px 16px', cursor: 'pointer', fontFamily: fontSans, fontSize: 12, fontWeight: 600, color: C.accent, marginBottom: 8 }}
                >
                  <Sparkles size={13} /> {t.allocate.smartCard.cta}
                </button>
                {salary > 0 && (
                  <div style={{ display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
                    {(lang === 'pt' ? TEMPLATES_PT : TEMPLATES_EN).map(tpl => (
                      <button key={tpl.key} onClick={() => requestApply(() => applyTemplate(tpl.key))} style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 999, border: `1px solid ${C.line}`, background: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, color: C.inkSoft }}>
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={() => setConfirmingClear(true)} style={{ display: 'inline-flex', alignItems: 'center', gap: 4, marginTop: 10, background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, color: C.inkMuted, padding: 4 }}>
                  <X size={11} /> {t.allocate.clearPlan}
                </button>
              </div>
            )}
            {/* Summary + save */}
            <div style={s.card}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 6 }}>
                <span style={{ color: C.inkSoft }}>{t.allocate.total}</span>
                <span style={{ ...s.num, fontSize: 15 }}>{fmt(allocated, t)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 13, color: C.inkSoft }}>{unassigned < 0 ? t.allocate.overIncome : t.allocate.remaining}</span>
                <span style={{ ...s.num, fontSize: 22, color: unassigned < 0 ? C.red : C.accent }}>{fmt(Math.abs(unassigned), t)}</span>
              </div>
              <button style={{ ...s.primaryBtn, marginTop: 14, width: '100%', justifyContent: 'center' }} onClick={handleSavePlan}>
                {t.allocate.savePlan}
              </button>
              {snapshots.length > 0 && (
                <div style={{ fontSize: 11, color: C.inkMuted, textAlign: 'center', marginTop: 8 }}>
                  {t.allocate.saved} {snapshots.length} {snapshots.length === 1 ? (lang === 'en' ? 'month' : 'mês') : (lang === 'en' ? 'months' : 'meses')}
                </div>
              )}
            </div>

            {/* Surplus redirect sheet */}
            {surplusRedirectOpen && (() => {
              const candidates = ['emergency', 'investments', 'savings']
                .map(key => ({ key, item: items.find(i => i.benchmarkKey === key) }))
                .filter(x => x.item);
              const wealthItemsExist = items.some(i => i.pillar === 'save');
              return (
                <div onClick={() => setSurplusRedirectOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                  <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)' }}>
                    <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 16px' }} />
                    <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t.allocate.surplusTitle}</div>
                    <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>{t.allocate.surplusBody(fmt(unassigned, t))}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                      {candidates.map(({ key, item }) => (
                        <button key={key} onClick={() => { sendSurplusToItem(key); doCheckIn(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surface, color: C.ink, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 600 }}>
                          <span>{t.allocate.sendTo(item.name)}</span>
                          <ArrowRight size={14} color={C.accent} />
                        </button>
                      ))}
                      {wealthItemsExist && (
                        <button onClick={() => { splitSurplusAcrossWealth(); doCheckIn(); }} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surface, color: C.ink, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 600 }}>
                          <span>{t.allocate.surplusSplit}</span>
                          <ArrowRight size={14} color={C.accent} />
                        </button>
                      )}
                      <button onClick={() => { setSurplusRedirectOpen(false); doCheckIn(); }} style={{ padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.lineSoft}`, background: 'transparent', color: C.inkSoft, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 600, marginTop: 4 }}>
                        {t.allocate.surplusKeep}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* Replace plan confirmation */}
            {pendingApply && (
              <div onClick={() => setPendingApply(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)' }}>
                  <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t.allocate.replaceTitle}</div>
                  <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>{t.allocate.replaceBody}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setPendingApply(null)} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.lineSoft}`, background: 'transparent', color: C.inkSoft, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 600 }}>
                      {t.common.cancel}
                    </button>
                    <button onClick={() => { const fn = pendingApply; setPendingApply(null); fn && fn(); }} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 700 }}>
                      {t.allocate.replaceCta}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Clear plan confirmation */}
            {confirmingClear && (
              <div onClick={() => setConfirmingClear(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 50, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)' }}>
                  <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 16px' }} />
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t.allocate.clearTitle}</div>
                  <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 14, lineHeight: 1.5 }}>{t.allocate.clearBody}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <button onClick={() => setConfirmingClear(false)} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.lineSoft}`, background: 'transparent', color: C.inkSoft, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 600 }}>
                      {t.common.cancel}
                    </button>
                    <button onClick={clearPlan} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none', background: C.red, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 700 }}>
                      {t.allocate.clearCta}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* ============ GOALS ============ */}
        {tab === 'goals' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.goals.title}</h1>
              <div style={s.sub}>{t.goals.sub}</div>
            </div>

            {/* Goals overview hero */}
            {goals.length > 0 && (() => {
              const totalTarget = goals.reduce((sum, g) => sum + (Number(g.target) || 0), 0);
              const totalCurrent = goals.reduce((sum, g) => sum + (Number(g.current) || 0), 0);
              const remaining = Math.max(0, totalTarget - totalCurrent);
              const pct = totalTarget > 0 ? Math.min(100, (totalCurrent / totalTarget) * 100) : 0;
              return (
                <div style={s.heroCard}>
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
                    {t.goals.overviewCount(goals.length)}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>{fmtShort(totalCurrent, t)}</span>
                    <span style={{ fontSize: 12, opacity: 0.85 }}>/ {fmtShort(totalTarget, t)}</span>
                  </div>
                  <div style={{ height: 8, background: 'rgba(255,255,255,0.25)', borderRadius: 4, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${pct}%`, background: C.surface, borderRadius: 4 }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                    <span style={{ opacity: 0.85 }}>{fmtShort(totalCurrent, t)} {t.goals.overviewSaved}</span>
                    <span style={{ opacity: 0.85 }}>{fmtShort(remaining, t)} {t.goals.overviewToGo}</span>
                  </div>
                </div>
              );
            })()}

            {/* Empty state with starter chips */}
            {goals.length === 0 && (
              <div style={s.card}>
                <div style={{ ...s.cardLabel, marginBottom: 4 }}>{t.goals.starterTitle}</div>
                <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 14 }}>{t.goals.starterSub}</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
                  {t.goals.starters.map(p => (
                    <button key={p.key} onClick={() => addGoalFromPreset(p)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surface, cursor: 'pointer', fontFamily: fontSans, textAlign: 'left' }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: (p.type === 'debt' ? C.redSoft : C.accentSoft), display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        {renderIcon(p.icon, 14, p.type === 'debt' ? C.red : C.accent, 2)}
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{p.name}</div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>{fmtShort(p.target, t)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {[...goals].sort((a, b) => {
              const ca = a.type === 'debt' ? 1 : 0;
              const cb = b.type === 'debt' ? 1 : 0;
              return ca - cb;
            }).map(g => {
              const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
              const isEditing = editingGoalId === g.id;
              const isTx = txGoalId === g.id;
              const isDebt = g.type === 'debt';
              const isComplete = pct >= 100;
              const remaining = Math.max(0, (Number(g.target) || 0) - (Number(g.current) || 0));
              const months = (Number(g.monthly) || 0) > 0 ? Math.ceil(remaining / Number(g.monthly)) : null;
              const prevSnap = lastSnapshot?.goals?.find(pg => pg.id === g.id);
              const monthDelta = prevSnap ? (Number(g.current) || 0) - (Number(prevSnap.current) || 0) : 0;
              const targetDate = months != null && months > 0 ? (() => {
                const d = new Date();
                d.setMonth(d.getMonth() + months);
                return `${t.month.names[d.getMonth()].slice(0, 3)} ${d.getFullYear()}`;
              })() : null;
              // Deadline-based pace check
              let paceLabel = null;
              let paceColor = null;
              if (g.deadline && months != null) {
                const dl = new Date(g.deadline + '-01');
                const now = new Date();
                const monthsToDeadline = (dl.getFullYear() - now.getFullYear()) * 12 + (dl.getMonth() - now.getMonth());
                if (monthsToDeadline > 0) {
                  const diff = monthsToDeadline - months;
                  if (diff >= 1) { paceLabel = t.goals.ahead(diff); paceColor = C.accent; }
                  else if (diff <= -1) { paceLabel = t.goals.behind(-diff); paceColor = C.red; }
                  else { paceLabel = t.goals.onTrack; paceColor = C.accent; }
                }
              }
              const cardStyle = isComplete
                ? { ...s.card, background: `linear-gradient(135deg, ${C.accent}15, ${C.accentDeep}20)`, border: `1.5px solid ${C.accent}80` }
                : isDebt
                ? { ...s.card, borderLeft: `3px solid ${C.red}` }
                : s.card;
              return (
                <div key={g.id} style={cardStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={{ ...s.rowIconBox, background: isDebt ? C.redSoft : C.accentSoft }}>
                      {renderIcon(g.icon, 16, isDebt ? C.red : C.accent, 2)}
                    </div>
                    {isEditing ? (
                      <input style={{ ...s.input, flex: 1, padding: '8px 12px', fontSize: 16 }} value={g.name} onChange={(e) => updateGoal(g.id, 'name', e.target.value)} />
                    ) : (
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 16, fontWeight: 600 }}>{g.name}</div>
                        {items.some(i => i.goalId === g.id) && (
                          <div style={{ fontSize: 10, color: C.accent, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', marginTop: 2, display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                            <Wallet size={9} strokeWidth={2.5} /> {t.allocate.fundedBy}
                          </div>
                        )}
                      </div>
                    )}
                    {isEditing ? (
                      <button style={s.ghostBtn} onClick={() => setEditingGoalId(null)}><Check size={14} /></button>
                    ) : (
                      <>
                        <div style={{ ...s.num, fontSize: 18, color: isDebt ? C.red : C.ink }}>{fmt(g.current, t)}</div>
                        <button onClick={() => { setTxGoalId(isTx ? null : g.id); setTxGoalMode('deposit'); setTxGoalAmount(''); }} style={{ background: isTx ? (isDebt ? C.redSoft : C.accentSoft) : 'transparent', border: 'none', cursor: 'pointer', color: isTx ? (isDebt ? C.red : C.accent) : C.inkMuted, padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }} aria-label={t.goals.quickAdd}>
                          <Plus size={14} />
                        </button>
                      </>
                    )}
                  </div>

                  {!isEditing && (
                    <>
                      <div style={s.progressTrack}><div style={{ ...s.progressFill(pct), background: isDebt ? C.red : C.accent }} /></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: C.inkMuted }}>
                        <span>{fmt(0, t)}</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{pct}%</span>
                        <span>{fmt(g.target, t)}</span>
                      </div>

                      {monthDelta !== 0 && (() => {
                        const positive = isDebt ? monthDelta < 0 : monthDelta > 0;
                        return (
                          <div style={{ marginTop: 8, display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px', borderRadius: 999, background: positive ? `${C.accent}15` : C.surfaceAlt, color: positive ? C.accent : C.inkSoft, fontSize: 11, fontWeight: 700 }}>
                            {monthDelta > 0 ? `+${fmt(monthDelta, t)}` : `−${fmt(Math.abs(monthDelta), t)}`} {t.goals.thisMonth}
                          </div>
                        );
                      })()}

                      {/* Time-to-target */}
                      {isComplete ? (
                        <div style={{ marginTop: 12, padding: 14, background: 'rgba(46, 139, 136, 0.12)', borderRadius: 14, display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ width: 36, height: 36, borderRadius: 18, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            <Check size={18} color={C.surface} strokeWidth={3} />
                          </div>
                          <div>
                            <div style={{ fontSize: 14, fontWeight: 700, color: C.accent }}>{t.goals.celebrationTitle}</div>
                            <div style={{ fontSize: 12, color: C.inkSoft, marginTop: 2 }}>{t.goals.celebrationSub}</div>
                          </div>
                        </div>
                      ) : months != null ? (
                        <div style={{ marginTop: 10, fontSize: 12, color: C.inkSoft }}>
                          {t.goals.monthsLeft(months)}{targetDate ? ` · ${t.goals.reachedBy(targetDate)}` : ''}
                          {paceLabel && <span style={{ color: paceColor, fontWeight: 700, marginLeft: 6 }}>· {paceLabel}</span>}
                        </div>
                      ) : (
                        <div style={{ marginTop: 10, fontSize: 11, color: C.inkMuted, fontStyle: 'italic' }}>{t.goals.noEta}</div>
                      )}

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 12, color: C.inkSoft }}>
                        <span>{t.goals.monthly} <strong style={{ color: C.ink, ...s.num }}>{fmt(g.monthly, t)}</strong></span>
                        <button style={s.ghostBtn} onClick={() => setEditingGoalId(g.id)}><Pencil size={11} /> {t.goals.editGoal}</button>
                      </div>

                      {/* Quick contribute panel */}
                      {isTx && (
                        <div style={{ marginTop: 12, padding: 12, background: C.surfaceAlt, borderRadius: 12 }}>
                          <div style={{ display: 'flex', gap: 3, background: C.surface, padding: 3, borderRadius: 999, marginBottom: 10 }}>
                            {['deposit', 'withdraw'].map(m => (
                              <button key={m} onClick={() => setTxGoalMode(m)} style={{ flex: 1, padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, fontWeight: 600, background: txGoalMode === m ? (m === 'deposit' ? C.accent : C.red) : 'transparent', color: txGoalMode === m ? C.surface : C.inkSoft }}>
                                {m === 'deposit' ? t.goals.deposit : t.goals.withdraw}
                              </button>
                            ))}
                          </div>
                          <div style={{ display: 'flex', gap: 8 }}>
                            <MoneyInput value={txGoalAmount} t={t} style={{ ...s.inputNum, flex: 1, width: 'auto', minWidth: 0, textAlign: 'left' }} placeholder={t.goals.amount} onChange={(v) => setTxGoalAmount(v)} />
                            <button onClick={() => applyGoalTx(g.id)} disabled={!Number(txGoalAmount)} style={{ flexShrink: 0, background: !Number(txGoalAmount) ? C.line : (txGoalMode === 'deposit' ? C.accent : C.red), color: C.surface, border: 'none', padding: '0 16px', borderRadius: 10, fontFamily: fontSans, fontSize: 13, fontWeight: 600, cursor: !Number(txGoalAmount) ? 'default' : 'pointer' }}>
                              {t.goals.apply}
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {isEditing && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginTop: 8 }}>
                      <div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.goals.target}</div>
                        <MoneyInput value={g.target} t={t} style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} onChange={(v) => updateGoal(g.id, 'target', v)} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.goals.current}</div>
                        <MoneyInput value={g.current} t={t} style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} onChange={(v) => updateGoal(g.id, 'current', v)} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.goals.monthly}</div>
                        <MoneyInput value={g.monthly} t={t} style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} onChange={(v) => updateGoal(g.id, 'monthly', v)} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.goals.type}</div>
                        <div style={{ display: 'flex', gap: 4 }}>
                          <button style={{ flex: 1, padding: '7px 10px', fontSize: 11, fontFamily: fontSans, border: `1px solid ${g.type === 'savings' ? C.accent : C.line}`, background: g.type === 'savings' ? C.accent : 'transparent', color: g.type === 'savings' ? C.surface : C.inkSoft, borderRadius: 10, cursor: 'pointer', fontWeight: 600 }} onClick={() => updateGoal(g.id, 'type', 'savings')}>{t.goals.savings}</button>
                          <button style={{ flex: 1, padding: '7px 10px', fontSize: 11, fontFamily: fontSans, border: `1px solid ${g.type === 'debt' ? C.red : C.line}`, background: g.type === 'debt' ? C.red : 'transparent', color: g.type === 'debt' ? C.surface : C.inkSoft, borderRadius: 10, cursor: 'pointer', fontWeight: 600 }} onClick={() => updateGoal(g.id, 'type', 'debt')}>{t.goals.debt}</button>
                        </div>
                      </div>
                      <div style={{ gridColumn: 'span 2' }}>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                          {t.goals.deadline} <span style={{ color: C.inkMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>· {t.goals.deadlineHint}</span>
                        </div>
                        <input
                          type="month"
                          value={g.deadline || ''}
                          onChange={(e) => updateGoal(g.id, 'deadline', e.target.value)}
                          style={{ ...s.input, padding: '8px 12px', fontSize: 16, color: C.ink }}
                        />
                      </div>
                      {(g.history || []).length > 0 && (
                        <div style={{ gridColumn: 'span 2' }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.goals.historyTitle}</div>
                          <div>
                            {g.history.slice(-10).reverse().map((h, displayIdx) => {
                              const originalIdx = g.history.length - 1 - displayIdx;
                              const isConfirming = confirmRemoveGoalEntry && confirmRemoveGoalEntry.goalId === g.id && confirmRemoveGoalEntry.idx === originalIdx;
                              const isLast = displayIdx === Math.min(g.history.length, 10) - 1;
                              return (
                                <div key={originalIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 0', borderBottom: isLast ? 'none' : `1px solid ${C.lineSoft}` }}>
                                  {isConfirming ? (
                                    <>
                                      <div style={{ fontSize: 11, color: C.inkSoft, flex: 1 }}>{t.goals.removeEntryQ}</div>
                                      <button onClick={() => setConfirmRemoveGoalEntry(null)} style={{ background: 'transparent', border: `1px solid ${C.lineSoft}`, color: C.inkSoft, padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600 }}>{t.common.cancel}</button>
                                      <button onClick={() => removeGoalHistoryEntry(g.id, originalIdx)} style={{ background: C.red, border: 'none', color: C.surface, padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600 }}>{t.common.delete}</button>
                                    </>
                                  ) : (
                                    <>
                                      <div style={{ fontSize: 11, color: C.inkSoft, flexShrink: 0 }}>{fmtShortDate(h.ts, t)}</div>
                                      <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 8 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: h.delta >= 0 ? C.accent : C.red }}>
                                          {h.delta >= 0 ? '+' : '-'}{fmt(Math.abs(h.delta), t)}
                                        </span>
                                        <span style={{ fontSize: 11, color: C.inkMuted, fontVariantNumeric: 'tabular-nums' }}>→ {fmt(h.balanceAfter, t)}</span>
                                      </div>
                                      <button onClick={() => setConfirmRemoveGoalEntry({ goalId: g.id, idx: originalIdx })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: C.inkMuted, padding: 2, display: 'flex', alignItems: 'center' }} aria-label={t.common.delete}>
                                        <X size={13} />
                                      </button>
                                    </>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                      <button style={{ gridColumn: 'span 2', ...s.ghostBtn, justifyContent: 'center', background: C.redSoft, color: C.red, padding: '10px', borderRadius: 10, marginTop: 4 }} onClick={() => removeGoal(g.id)}>
                        <Trash2 size={12} /> {t.goals.delete}
                      </button>
                    </div>
                  )}
                </div>
              );
            })}

            <button style={{ ...s.ghostBtn, width: '100%', justifyContent: 'center', padding: '14px', border: `1px dashed ${C.line}`, background: 'transparent', borderRadius: 12 }} onClick={addGoal}>
              <Plus size={14} /> {t.goals.addGoal}
            </button>
          </>
        )}

        {/* ============ WEALTH ============ */}
        {tab === 'wealth' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.wealth.title}</h1>
              <div style={s.sub}>{t.wealth.sub}</div>
            </div>

            <div style={s.heroCard}>
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>{t.wealth.total}</div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16 }}>
                <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(totalWealth, t)}</div>
                {pieData.length > 0 && (
                  <button onClick={() => setPieExpanded(!pieExpanded)} style={{ width: 64, height: 64, flexShrink: 0, background: 'transparent', border: 'none', padding: 0, cursor: 'pointer' }} aria-label="Toggle composition">
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" innerRadius={20} outerRadius={30} paddingAngle={3} stroke="none">
                          {pieData.map(d => <Cell key={d.key} fill={d.color} />)}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </button>
                )}
              </div>
              {pieExpanded && pieData.length > 0 && (
                <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid rgba(255,255,255,0.18)` }}>
                  <div style={{ height: 180, marginLeft: -10, marginRight: -10 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie data={pieData} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={2} stroke="none">
                          {pieData.map(d => <Cell key={d.key} fill={d.color} />)}
                        </Pie>
                        <Tooltip formatter={(v, name) => [fmt(v, t), name]} contentStyle={{ background: C.ink, border: 'none', borderRadius: 10, color: C.surface, fontFamily: fontSans, fontSize: 11 }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, justifyContent: 'center', marginTop: 8 }}>
                    {pieData.map(d => {
                      const pct = totalWealth > 0 ? Math.round((d.value / totalWealth) * 100) : 0;
                      return (
                        <div key={d.key} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11 }}>
                          <span style={{ width: 10, height: 10, borderRadius: 3, background: d.color }} />
                          <span style={{ opacity: 0.9 }}>{d.name}</span>
                          <span style={{ fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Allocation balance vs investor profile */}
            {totalWealth > 0 && investorProfile && (() => {
              const profileBuckets = (PROFILE_BUCKETS[investorProfile] && PROFILE_BUCKETS[investorProfile][country]) || PROFILE_BUCKETS.balanced.uk;
              const target = sharesByType(profileBuckets, 'share');
              const current = sharesByType(buckets.map(b => ({ type: b.type, value: Number(b.current) || 0 })), 'value');
              const types = Array.from(new Set([...Object.keys(target), ...Object.keys(current)]));
              if (types.length === 0) return null;
              const currentRisk = blendedRiskFromBuckets(buckets);
              const targetRisk = blendedRisk(target);
              const riskPct = ((currentRisk - 1) / 4) * 100;
              const targetRiskPct = ((targetRisk - 1) / 4) * 100;
              const riskLabelIdx = Math.min(4, Math.max(0, Math.round(currentRisk) - 1));
              return (
                <div style={s.card}>
                  <div style={{ ...s.cardLabel, marginBottom: 4 }}>{t.wealth.allocBalance}</div>
                  <div style={{ fontSize: 11, color: C.inkMuted, fontStyle: 'italic', marginBottom: 14 }}>{t.wealth.diversifyHint}</div>

                  {currentRisk > 0 && (
                    <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.lineSoft}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.wealth.riskLabel}<Info k="portfolioRisk" /></span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: C.ink }}>{t.wealth.riskScale[riskLabelIdx]}</span>
                      </div>
                      <div style={{ position: 'relative', height: 8, borderRadius: 4, background: `linear-gradient(to right, ${C.accent}, ${C.yellow}, ${C.red || '#E06B53'})` }}>
                        <div style={{ position: 'absolute', left: `calc(${Math.min(Math.max(riskPct, 0), 100)}% - 6px)`, top: -2, width: 12, height: 12, borderRadius: 6, background: C.surface, border: `2px solid ${C.ink}` }} />
                        {targetRisk > 0 && (
                          <div style={{ position: 'absolute', left: `${Math.min(Math.max(targetRiskPct, 0), 100)}%`, top: -3, width: 2, height: 14, background: C.ink, opacity: 0.5 }} />
                        )}
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: 9, color: C.inkMuted, fontWeight: 600 }}>
                        <span>{t.wealth.riskScale[0]}</span>
                        <span>{t.wealth.riskScale[4]}</span>
                      </div>
                    </div>
                  )}

                  {types.map(type => {
                    const cur = Math.round((current[type] || 0) * 100);
                    const tgt = Math.round((target[type] || 0) * 100);
                    const diff = cur - tgt;
                    const status = tgt === 0 ? null : Math.abs(diff) < 5 ? 'ok' : diff > 0 ? 'over' : 'under';
                    const statusColor = status === 'ok' ? C.accent : status ? C.yellow : C.inkMuted;
                    const color = BUCKET_COLORS[type] || C.inkMuted;
                    return (
                      <div key={type} style={{ marginBottom: 14 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                          <span style={{ width: 10, height: 10, borderRadius: 3, background: color, flexShrink: 0 }} />
                          <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>{t.wealth.types[type] || type}</span>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{cur}%</span>
                        </div>
                        <div style={{ position: 'relative', height: 6, background: C.lineSoft, borderRadius: 3 }}>
                          <div style={{ position: 'absolute', left: 0, top: 0, height: '100%', width: `${Math.min(cur, 100)}%`, background: color, borderRadius: 3 }} />
                          {tgt > 0 && <div style={{ position: 'absolute', left: `${Math.min(tgt, 100)}%`, top: -2, width: 2, height: 10, background: C.ink, borderRadius: 1 }} />}
                        </div>
                        {tgt > 0 && (
                          <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 4 }}>
                            {t.wealth.target} {tgt}% · <span style={{ color: statusColor, fontWeight: 600 }}>
                              {status === 'ok' ? t.wealth.onTrack : status === 'over' ? t.wealth.over(diff) : t.wealth.under(-diff)}
                            </span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })()}

            {/* Recent activity across all buckets */}
            {(() => {
              const entries = buckets
                .flatMap(b => (b.history || []).map(h => ({ ...h, bucketName: b.name, bucketColor: BUCKET_COLORS[b.type] || C.inkMuted, bucketId: b.id })))
                .sort((a, b) => b.ts - a.ts)
                .slice(0, 5);
              if (entries.length === 0) return null;
              return (
                <div style={s.card}>
                  <div style={{ ...s.cardLabel, marginBottom: 12 }}>{t.wealth.recentActivity}</div>
                  {entries.map((e, i) => (
                    <button
                      key={i}
                      onClick={() => setEditingBucketId(e.bucketId)}
                      style={{ display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 0', border: 'none', background: 'transparent', cursor: 'pointer', textAlign: 'left', borderTop: i > 0 ? `1px solid ${C.lineSoft}` : 'none' }}
                    >
                      <span style={{ width: 8, height: 8, borderRadius: 4, background: e.bucketColor, flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 500, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{e.bucketName}</div>
                        <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 1 }}>{fmtShortDate(e.ts, t)}</div>
                      </div>
                      <div style={{ textAlign: 'right', flexShrink: 0 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: e.delta >= 0 ? C.accent : C.red }}>
                          {e.delta >= 0 ? '+' : '-'}{fmt(Math.abs(e.delta), t)}
                        </div>
                        <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 1, fontVariantNumeric: 'tabular-nums' }}>{fmt(e.balanceAfter, t)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              );
            })()}

            {(() => {
              const renderBucketRow = (b) => {
                const isEditing = editingBucketId === b.id;
                const isTx = txBucketId === b.id;
                const color = BUCKET_COLORS[b.type] || C.inkMuted;
                const sharePct = totalWealth > 0 ? (Number(b.current) || 0) / totalWealth * 100 : 0;
                const updatedAge = b.lastUpdated ? Date.now() - b.lastUpdated : 0;
                const stale = updatedAge > 30 * 86_400_000;
                return (
                  <div key={b.id} style={{ padding: '14px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: color + '30', display: 'flex', alignItems: 'center', justifyContent: 'center', color, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>
                        {b.name.charAt(0).toUpperCase()}
                      </div>
                      <div style={{ flex: 1, minWidth: 0, marginLeft: 4 }}>
                        <div style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.25, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{b.name}</div>
                        <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                          {b.account && (
                            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '2px 6px', borderRadius: 4, background: color + '20', color }}>{b.account}</span>
                          )}
                          <span>{t.wealth.monthly} {fmt(b.monthly, t)} · {b.growth}%{Number(b.dividend) > 0 ? ` + ${b.dividend}% div` : ''}/yr{Number(b.risk) >= 1 && Number(b.risk) <= 5 ? ` · ${t.wealth.riskScale[Number(b.risk) - 1]}` : ''}</span>
                        </div>
                      </div>
                      <MoneyInput value={b.current} t={t} style={{ ...s.inputNum, width: 96 }} onChange={(v) => updateBucket(b.id, 'current', v)} />
                      <button onClick={() => { setTxBucketId(isTx ? null : b.id); setTxMode('deposit'); setTxAmount(''); }} style={{ background: isTx ? color + '20' : 'transparent', border: 'none', cursor: 'pointer', color: isTx ? color : C.inkMuted, padding: 6, borderRadius: 8, display: 'flex', alignItems: 'center' }} aria-label={t.wealth.move}>
                        <ArrowDownUp size={14} />
                      </button>
                      <button onClick={() => setEditingBucketId(isEditing ? null : b.id)} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: C.inkMuted, padding: 4, display: 'flex', alignItems: 'center' }} aria-label={isEditing ? t.common.done : t.common.edit}>
                        <ChevronRight size={16} style={{ transform: isEditing ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                      </button>
                    </div>

                    {/* Share + last-updated row */}
                    <div style={{ paddingLeft: 48, marginTop: 8 }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10, color: C.inkMuted, fontWeight: 600, letterSpacing: '0.05em', marginBottom: 4 }}>
                        <span style={{ fontVariantNumeric: 'tabular-nums' }}>{sharePct.toFixed(0)}% {t.wealth.ofTotal}</span>
                        <span style={{ color: stale ? C.yellow : C.inkMuted }}>{t.wealth.updated} {relativeTime(b.lastUpdated, t)}</span>
                      </div>
                      <div style={{ height: 4, background: C.lineSoft, borderRadius: 2, overflow: 'hidden' }}>
                        <div style={{ height: '100%', width: `${Math.min(sharePct, 100)}%`, background: color, borderRadius: 2 }} />
                      </div>
                    </div>

                    {/* Deposit / Withdraw quick panel */}
                    {isTx && (
                      <div style={{ marginTop: 12, padding: 12, background: C.surfaceAlt, borderRadius: 12 }}>
                        <div style={{ display: 'flex', gap: 3, background: C.surface, padding: 3, borderRadius: 999, marginBottom: 10 }}>
                          {['deposit', 'withdraw'].map(m => (
                            <button key={m} onClick={() => setTxMode(m)} style={{ flex: 1, padding: '6px 10px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, fontWeight: 600, background: txMode === m ? (m === 'deposit' ? C.accent : C.red) : 'transparent', color: txMode === m ? C.surface : C.inkSoft }}>
                              {m === 'deposit' ? t.wealth.deposit : t.wealth.withdraw}
                            </button>
                          ))}
                        </div>
                        <div style={{ display: 'flex', gap: 8 }}>
                          <MoneyInput value={txAmount} t={t} style={{ ...s.inputNum, flex: 1, width: 'auto', minWidth: 0, textAlign: 'left' }} placeholder={t.wealth.moveAmount} onChange={(v) => setTxAmount(v)} />
                          <button onClick={() => applyTx(b.id)} disabled={!Number(txAmount)} style={{ flexShrink: 0, background: !Number(txAmount) ? C.line : (txMode === 'deposit' ? C.accent : C.red), color: C.surface, border: 'none', padding: '0 16px', borderRadius: 10, fontFamily: fontSans, fontSize: 13, fontWeight: 600, cursor: !Number(txAmount) ? 'default' : 'pointer' }}>
                            {t.wealth.apply}
                          </button>
                        </div>
                      </div>
                    )}

                    {isEditing && (
                      <div style={{ paddingLeft: 48, marginTop: 12 }}>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.common.edit} {t.wealth.title}</div>
                          <input
                            ref={(el) => {
                              if (el && justAddedIdRef.current === b.id) {
                                justAddedIdRef.current = null;
                                setTimeout(() => { el.focus(); el.select(); }, 50);
                              }
                            }}
                            style={{ ...s.input, padding: '8px 12px', fontSize: 16 }}
                            value={b.name}
                            onChange={(e) => updateBucket(b.id, 'name', e.target.value)}
                          />
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.account} <span style={{ color: C.inkMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>· {t.wealth.accountOptional}</span></div>
                          <input style={{ ...s.input, padding: '8px 12px', fontSize: 16 }} value={b.account || ''} placeholder="" onChange={(e) => updateBucket(b.id, 'account', e.target.value)} />
                        </div>
                        <div style={{ marginBottom: 8 }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.monthly}</div>
                          <MoneyInput value={b.monthly} t={t} style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} onChange={(v) => updateBucket(b.id, 'monthly', v)} />
                        </div>
                        <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.growth} %<Info k="growth" /></div>
                            <input type="number" inputMode="decimal" step="0.1" style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} value={b.growth || ''} placeholder="0" onChange={(e) => updateBucket(b.id, 'growth', e.target.value)} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.dividend} %<Info k="dividend" /></div>
                            <input type="number" inputMode="decimal" step="0.1" style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} value={b.dividend || ''} placeholder="0" onChange={(e) => updateBucket(b.id, 'dividend', e.target.value)} />
                          </div>
                        </div>
                        <div style={{ marginBottom: 12 }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>
                            {t.wealth.risk}
                            {!(Number(b.risk) >= 1 && Number(b.risk) <= 5) && (
                              <span style={{ color: C.inkMuted, fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}> · {t.wealth.riskDefault}</span>
                            )}
                          </div>
                          <div style={{ display: 'flex', gap: 4 }}>
                            {[1, 2, 3, 4, 5].map(r => {
                              const explicit = Number(b.risk) === r;
                              const effective = riskOf(b) === r;
                              return (
                                <button
                                  key={r}
                                  onClick={() => updateBucket(b.id, 'risk', explicit ? 0 : r)}
                                  style={{
                                    flex: 1,
                                    padding: '8px 4px',
                                    border: 'none',
                                    borderRadius: 8,
                                    background: explicit ? C.accent : effective ? C.accentSoft : C.surfaceAlt,
                                    color: explicit ? C.surface : effective ? C.accent : C.inkSoft,
                                    fontSize: 10,
                                    fontWeight: 600,
                                    fontFamily: fontSans,
                                    cursor: 'pointer',
                                  }}
                                >
                                  {t.wealth.riskScale[r - 1]}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                        <div style={{ marginBottom: 12, paddingTop: 12, borderTop: `1px solid ${C.lineSoft}` }}>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 6, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.history}</div>
                          {(b.history || []).length === 0 ? (
                            <div style={{ fontSize: 11, color: C.inkMuted, lineHeight: 1.4, fontStyle: 'italic' }}>{t.wealth.noHistory}</div>
                          ) : (() => {
                            const isHistoryExpanded = expandedHistoryIds.includes(b.id);
                            const visible = isHistoryExpanded ? b.history.slice().reverse() : b.history.slice(-10).reverse();
                            return (
                            <div>
                              <div style={{ maxHeight: isHistoryExpanded && b.history.length > 10 ? 360 : 'none', overflowY: isHistoryExpanded && b.history.length > 10 ? 'auto' : 'visible' }}>
                              {visible.map((h, displayIdx) => {
                                const originalIdx = b.history.length - 1 - displayIdx;
                                const isConfirming = confirmRemove && confirmRemove.bucketId === b.id && confirmRemove.idx === originalIdx;
                                const isLast = displayIdx === visible.length - 1;
                                return (
                                  <div key={originalIdx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '6px 0', borderBottom: isLast ? 'none' : `1px solid ${C.lineSoft}` }}>
                                    {isConfirming ? (
                                      <>
                                        <div style={{ fontSize: 11, color: C.inkSoft, flex: 1 }}>{t.wealth.removeEntryQ}</div>
                                        <button onClick={() => setConfirmRemove(null)} style={{ background: 'transparent', border: `1px solid ${C.lineSoft}`, color: C.inkSoft, padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600 }}>{t.common.cancel}</button>
                                        <button onClick={() => removeHistoryEntry(b.id, originalIdx)} style={{ background: C.red, border: 'none', color: C.surface, padding: '4px 10px', borderRadius: 8, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600 }}>{t.common.delete}</button>
                                      </>
                                    ) : (
                                      <>
                                        <div style={{ fontSize: 11, color: C.inkSoft, flexShrink: 0 }}>{fmtShortDate(h.ts, t)}</div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', justifyContent: 'flex-end', gap: 8 }}>
                                          <span style={{ fontSize: 12, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: h.delta >= 0 ? C.accent : C.red }}>
                                            {h.delta >= 0 ? '+' : '-'}{fmt(Math.abs(h.delta), t)}
                                          </span>
                                          <span style={{ fontSize: 11, color: C.inkMuted, fontVariantNumeric: 'tabular-nums' }}>→ {fmt(h.balanceAfter, t)}</span>
                                        </div>
                                        <button onClick={() => setConfirmRemove({ bucketId: b.id, idx: originalIdx })} style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: C.inkMuted, padding: 2, display: 'flex', alignItems: 'center' }} aria-label={t.common.delete}>
                                          <X size={13} />
                                        </button>
                                      </>
                                    )}
                                  </div>
                                );
                              })}
                              </div>
                              {b.history.length > 10 && (
                                <button
                                  onClick={() => setExpandedHistoryIds(prev => prev.includes(b.id) ? prev.filter(x => x !== b.id) : [...prev, b.id])}
                                  style={{ background: 'transparent', border: 'none', color: C.accent, padding: '8px 0 0', cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}
                                >
                                  {isHistoryExpanded ? t.wealth.collapse : t.wealth.showAll(b.history.length)}
                                </button>
                              )}
                            </div>
                            );
                          })()}
                        </div>
                        <button onClick={() => removeBucket(b.id)} style={{ background: 'transparent', border: `1px solid ${C.lineSoft}`, color: C.red, padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Trash2 size={13} /> {t.common.delete}
                        </button>
                      </div>
                    )}
                  </div>
                );
              };

              const distinctCategories = new Set(buckets.map(b => CATEGORY_OF[b.type])).size;
              const grouped = distinctCategories >= 2;
              return (
                <div style={s.card}>
                  <div style={{ ...s.cardLabel, marginBottom: 4 }}>{t.nav.wealth}</div>
                  {grouped ? CATEGORY_ORDER.map(cat => {
                    const items = buckets.filter(b => CATEGORY_OF[b.type] === cat);
                    if (items.length === 0) return null;
                    const subtotal = items.reduce((sum, b) => sum + (Number(b.current) || 0), 0);
                    const catColor = CATEGORY_COLORS[cat];
                    return (
                      <div key={cat}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 0 6px', marginTop: 8, borderTop: `2px solid ${catColor}` }}>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: catColor, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.wealth.categories[cat]}</span>
                            <span style={{ fontSize: 10, color: C.inkMuted }}>{t.wealth.bucketCount(items.length)}</span>
                          </div>
                          <span style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{fmtShort(subtotal, t)}</span>
                        </div>
                        {items.map(renderBucketRow)}
                      </div>
                    );
                  }) : buckets.map(renderBucketRow)}
                  <div style={{ display: 'flex', gap: 6, marginTop: 14 }}>
                    {[
                      { cat: 'equities', type: 'stocks' },
                      { cat: 'fixed', type: 'bonds' },
                      { cat: 'cash', type: 'cash' },
                      { cat: 'alternatives', type: 'crypto' },
                    ].map(({ cat, type }) => {
                      const cc = CATEGORY_COLORS[cat];
                      return (
                        <button key={cat} onClick={() => addBucketOfType(type)} style={{ ...s.ghostBtn, flex: 1, border: `1px dashed ${cc}80`, color: cc, borderRadius: 10, padding: '10px 6px', justifyContent: 'center', fontSize: 11, fontWeight: 600, gap: 4 }}>
                          <Plus size={12} /> {t.wealth.addShort[cat]}
                        </button>
                      );
                    })}
                  </div>
                </div>
              );
            })()}
          </>
        )}

        {/* ============ FORECAST ============ */}
        {tab === 'forecast' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.forecast.title}</h1>
              <div style={s.sub}>{t.forecast.sub}</div>
              <div style={{ fontSize: 12, color: C.inkMuted, fontStyle: 'italic', marginTop: 4 }}>{t.forecast.whyMatters}</div>
            </div>

            {totalWealth === 0 ? (
              <div style={{ ...s.card, textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ width: 60, height: 60, borderRadius: 30, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px' }}>
                  <TrendingUp size={26} color={C.accent} strokeWidth={1.5} />
                </div>
                <div style={{ fontSize: 14, color: C.inkSoft, lineHeight: 1.5, maxWidth: 260, margin: '0 auto' }}>{t.forecast.empty}</div>
                <button style={{ ...s.primaryBtn, marginTop: 18 }} onClick={() => setTab('wealth')}>
                  {t.wealth.title}
                </button>
              </div>
            ) : (
              <>
                {/* Years range selector */}
                <div style={{ ...s.card, padding: '14px 16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>{t.forecast.monthsRange}</div>
                    <div style={{ display: 'flex', gap: 3, background: C.surfaceAlt, padding: 3, borderRadius: 999 }}>
                      {[5, 10, 20, 30].map(y => (
                        <button key={y} style={{ padding: '5px 12px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: forecastYears === y ? C.accent : 'transparent', color: forecastYears === y ? C.surface : C.inkSoft }} onClick={() => { setForecastYears(y); setExpandedYear(null); }}>{y}{t.common.year}</button>
                      ))}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, paddingTop: 12, borderTop: `1px solid ${C.lineSoft}` }}>
                    <div>
                      <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600, display: 'flex', alignItems: 'center' }}>{realMode ? t.forecast.real : t.forecast.nominal}<Info k="realNominal" /></div>
                      {realMode && <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>{t.forecast.realHint(COUNTRY_INFLATION[country] || 2.5)}</div>}
                    </div>
                    <div style={{ display: 'flex', gap: 3, background: C.surfaceAlt, padding: 3, borderRadius: 999 }}>
                      <button style={{ padding: '5px 12px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: !realMode ? C.accent : 'transparent', color: !realMode ? C.surface : C.inkSoft }} onClick={() => setRealMode(false)}>{t.forecast.nominal}</button>
                      <button style={{ padding: '5px 12px', border: 'none', borderRadius: 999, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, background: realMode ? C.accent : 'transparent', color: realMode ? C.surface : C.inkSoft }} onClick={() => setRealMode(true)}>{t.forecast.real}</button>
                    </div>
                  </div>
                </div>

                {/* Bucket filter — All + one per bucket */}
                <div style={{ ...s.card, padding: '12px 16px' }}>
                  <div style={{ fontSize: 10, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 10 }}>{t.forecast.filterBy}</div>
                  <div style={{ display: 'flex', gap: 6, overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: 2 }}>
                    {[{ id: 'all', name: t.forecast.filterAll }, ...buckets].map(b => {
                      const selected = forecastBucketId === b.id;
                      return (
                        <button
                          key={b.id}
                          onClick={() => { setForecastBucketId(b.id); setExpandedYear(null); }}
                          style={{
                            flexShrink: 0,
                            border: 'none',
                            background: selected ? C.accent : C.surfaceAlt,
                            color: selected ? C.surface : C.accent,
                            padding: '7px 14px',
                            borderRadius: 999,
                            fontSize: 12,
                            fontWeight: 600,
                            fontFamily: fontSans,
                            cursor: 'pointer',
                            transition: 'all 0.15s',
                          }}
                        >
                          {b.name}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* What-if: extra monthly contribution */}
                <div style={{ ...s.card, padding: 16 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <div>
                      <div style={{ ...s.cardLabel, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
                        <Sparkles size={10} /> {t.wealth.whatIf}
                      </div>
                      <div style={{ fontSize: 12, color: C.inkSoft }}>{t.wealth.whatIfSub}</div>
                    </div>
                    {scenarioExtra > 0 && (
                      <button style={s.ghostBtn} onClick={() => setScenarioExtra(0)}><X size={11} /> {t.wealth.reset}</button>
                    )}
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                    <span style={{ fontSize: 11, color: C.inkSoft, textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 600 }}>{t.wealth.extra}</span>
                    <span style={{ ...s.num, fontSize: 20, color: scenarioExtra > 0 ? C.yellow : C.ink }}>+{fmt(scenarioExtra, t)}</span>
                  </div>
                  <input type="range" min="0" max={maxExtra} step="10" value={scenarioExtra} onChange={(e) => setScenarioExtra(Number(e.target.value))} style={s.slider} />
                  {scenarioExtra > 0 && (
                    <div style={{ marginTop: 12, fontSize: 13, color: C.inkSoft, lineHeight: 1.5 }}>
                      {t.forecast.diff(<strong key="d" style={{ color: C.yellow, ...s.num }}>{fmtShort(forecastData.scenarioFinal - forecastData.baselineFinal, t)}</strong>, forecastYears)}
                    </div>
                  )}
                </div>

                {/* Composition bar chart */}
                {forecastData.years.length > 0 && (() => {
                  const chartBuckets = forecastData.filteredBuckets;
                  const chartRows = forecastData.years.map(y => {
                    const row = { year: String(y.year) };
                    chartBuckets.forEach(b => { row[b.id] = (y.endByBucket && y.endByBucket[b.id]) || 0; });
                    return row;
                  });
                  return (
                    <div style={s.card}>
                      <div style={{ ...s.cardLabel, marginBottom: 10 }}>{t.forecast.composition}</div>
                      <div style={{ height: 200, marginLeft: -10 }}>
                        <ResponsiveContainer>
                          <BarChart data={chartRows} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                            <CartesianGrid stroke={C.lineSoft} vertical={false} />
                            <XAxis dataKey="year" tick={{ fontSize: 10, fill: C.inkMuted }} axisLine={{ stroke: C.line }} tickLine={false} interval="preserveStartEnd" />
                            <YAxis tick={{ fontSize: 10, fill: C.inkMuted }} axisLine={{ stroke: C.line }} tickLine={false} tickFormatter={(v) => fmtShort(v, t)} width={50} />
                            <Tooltip
                              cursor={{ fill: C.surfaceAlt }}
                              formatter={(v, name) => [fmt(v, t), chartBuckets.find(b => b.id === name)?.name || name]}
                              labelFormatter={(y) => `${t.common.year}${y}`}
                              contentStyle={{ background: C.ink, border: 'none', borderRadius: 10, color: C.surface, fontFamily: fontSans, fontSize: 11 }}
                            />
                            {chartBuckets.map((b, i) => (
                              <Bar
                                key={b.id}
                                dataKey={b.id}
                                stackId="wealth"
                                fill={BUCKET_COLORS[b.type] || C.inkMuted}
                                radius={i === chartBuckets.length - 1 ? [4, 4, 0, 0] : 0}
                              />
                            ))}
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                      {chartBuckets.length > 1 && (
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginTop: 12, paddingTop: 10, borderTop: `1px solid ${C.lineSoft}` }}>
                          {chartBuckets.map(b => (
                            <div key={b.id} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: C.inkSoft }}>
                              <span style={{ width: 10, height: 10, borderRadius: 3, background: BUCKET_COLORS[b.type] || C.inkMuted }} />
                              {b.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })()}

                {/* Hint */}
                <div style={{ fontSize: 11, color: C.inkMuted, textAlign: 'center', padding: '0 0 8px', fontStyle: 'italic' }}>
                  {t.forecast.tapYear}
                </div>

                {/* Year-by-year table */}
                <div style={s.card}>
                  {/* Table header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr 20px', gap: 8, padding: '8px 6px 10px', borderBottom: `1px solid ${C.line}`, marginBottom: 4 }}>
                    <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.forecast.yearCol}</div>
                    <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.forecast.wealthCol}</div>
                    <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', textAlign: 'right' }}>{t.forecast.growthCol}</div>
                    <div />
                  </div>

                  {forecastData.years.map((yearData, idx) => {
                    const isExpanded = expandedYear === yearData.year;
                    const isCurrentYear = idx === 0;
                    return (
                      <React.Fragment key={yearData.year}>
                        <div
                          onClick={() => setExpandedYear(isExpanded ? null : yearData.year)}
                          style={{
                            display: 'grid',
                            gridTemplateColumns: '50px 1fr 1fr 20px',
                            gap: 8,
                            padding: '12px 6px',
                            borderBottom: idx < forecastData.years.length - 1 && !isExpanded ? `1px solid ${C.lineSoft}` : 'none',
                            cursor: 'pointer',
                            alignItems: 'center',
                            background: isExpanded ? C.accentSoft : 'transparent',
                            borderRadius: 8,
                          }}
                        >
                          <div style={{ fontSize: 13, fontWeight: 600, color: isCurrentYear ? C.accent : C.ink }}>
                            {yearData.year}
                            {isCurrentYear && <span style={{ fontSize: 9, marginLeft: 4, color: C.accent, fontWeight: 700 }}>●</span>}
                          </div>
                          <div style={{ fontSize: 14, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: C.ink }}>
                            {fmtShort(yearData.endTotal, t)}
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 600, fontVariantNumeric: 'tabular-nums', color: C.accent, textAlign: 'right' }}>
                            +{fmtShort(yearData.growth, t)}
                          </div>
                          <div style={{ color: C.inkMuted, display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                            <ChevronRight size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
                          </div>
                        </div>

                        {isExpanded && (
                          <div style={{ padding: '4px 6px 14px', background: C.accentSoft, borderRadius: 8, marginBottom: 6, borderBottom: idx < forecastData.years.length - 1 ? `1px solid ${C.lineSoft}` : 'none' }}>
                            {/* Year summary */}
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '6px 8px 10px', marginBottom: 4 }}>
                              <div>
                                <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.forecast.totalContrib}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2 }}>{fmtShort(yearData.contributedThisYear, t)}</div>
                              </div>
                              <div>
                                <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.forecast.priceGrowth}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2, color: C.accent }}>{fmtShort(yearData.priceGrowthThisYear, t)}</div>
                              </div>
                              <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: 9, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t.forecast.dividendReinvested}</div>
                                <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', marginTop: 2, color: C.accent }}>{fmtShort(yearData.dividendThisYear, t)}</div>
                              </div>
                            </div>

                            {/* Monthly rows */}
                            {yearData.months.map((m, mIdx) => {
                              const isNow = m.monthIndex === 0;
                              return (
                                <div key={m.monthIndex} style={{ display: 'grid', gridTemplateColumns: '50px 1fr 1fr 20px', gap: 8, padding: '6px 8px', alignItems: 'center' }}>
                                  <div style={{ fontSize: 11, color: isNow ? C.accent : C.inkSoft, fontWeight: isNow ? 700 : 500 }}>
                                    {isNow ? t.forecast.thisMonth : t.month.names[m.month].slice(0, 3)}
                                  </div>
                                  <div style={{ fontSize: 12, fontVariantNumeric: 'tabular-nums', color: C.ink, fontWeight: 500 }}>
                                    {fmtShort(m.total, t)}
                                  </div>
                                  <div style={{ fontSize: 11, color: C.inkMuted, fontVariantNumeric: 'tabular-nums', textAlign: 'right' }}>
                                    {mIdx > 0 ? `+${fmtShort(m.total - yearData.months[mIdx - 1].total, t)}` : ''}
                                  </div>
                                  <div />
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </React.Fragment>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}

        {/* ============ SETTINGS (opened from topbar gear) ============ */}
        {tab === 'settings' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.profile.title}</h1>
            </div>

            <div style={{ ...s.card, textAlign: 'center', padding: '28px 20px' }}>
              <div style={{ width: 80, height: 80, borderRadius: 40, background: C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 14px', color: C.accent }}>
                <User size={34} strokeWidth={1.5} />
              </div>
              <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 4 }}>{t.brand}</div>
              <div style={{ fontSize: 12, color: C.inkMuted }}>{t.profile.version}</div>
            </div>

            <div style={s.card}>
              <div style={{ ...s.cardLabel, marginBottom: 14 }}>{t.profile.settings}</div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.lineSoft}`, cursor: 'pointer' }} onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>
                <div style={s.rowIconBox}><Globe size={15} color={C.accent} strokeWidth={2} /></div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.profile.language}</div>
                <div style={{ fontSize: 13, color: C.inkSoft, fontWeight: 500 }}>{lang === 'en' ? 'English' : 'Português'}</div>
                <ChevronRight size={14} color={C.inkMuted} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
                <div style={s.rowIconBox}><Wallet size={15} color={C.accent} strokeWidth={2} /></div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.profile.country}</div>
                <div style={{ fontSize: 13, color: C.inkSoft, fontWeight: 500 }}>{country === 'uk' ? 'UK' : 'Brazil'}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', borderBottom: `1px solid ${C.lineSoft}` }}>
                <div style={s.rowIconBox}><TrendingUp size={15} color={C.accent} strokeWidth={2} /></div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500 }}>{t.profile.investorProfile}</div>
                <div style={{ fontSize: 13, color: C.inkSoft, fontWeight: 500, textTransform: 'capitalize' }}>{investorProfile}</div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 0', cursor: 'pointer' }} onClick={resetAll}>
                <div style={{ ...s.rowIconBox, background: C.redSoft, color: C.red }}><RotateCcw size={15} color={C.red} strokeWidth={2} /></div>
                <div style={{ flex: 1, fontSize: 14, fontWeight: 500, color: C.red }}>{t.profile.reset}</div>
                <ChevronRight size={14} color={C.inkMuted} />
              </div>
            </div>

            {/* Help / FAQ */}
            <div style={s.card}>
              <div style={{ ...s.cardLabel, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
                <Sparkles size={11} /> {t.profile.help}
              </div>
              {t.faq.map((item, i) => {
                const isOpen = openFaq === i;
                return (
                  <div key={i} style={{ borderBottom: i < t.faq.length - 1 ? `1px solid ${C.lineSoft}` : 'none' }}>
                    <button onClick={() => setOpenFaq(isOpen ? null : i)} style={{ width: '100%', textAlign: 'left', background: 'transparent', border: 'none', padding: '12px 0', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontSans }}>
                      <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: C.ink, lineHeight: 1.4 }}>{item.q}</span>
                      <ChevronRight size={14} color={C.inkMuted} style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s', flexShrink: 0 }} />
                    </button>
                    {isOpen && (
                      <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.55, padding: '0 0 14px' }}>{item.a}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Glossary tooltip sheet — global, can open from any tab */}
      {openInfo && t.tooltips[openInfo] && (
        <div onClick={() => setOpenInfo(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)' }}>
            <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
            <div style={{ fontSize: 16, fontWeight: 700, color: C.ink, marginBottom: 8 }}>{t.tooltips[openInfo].title}</div>
            <div style={{ fontSize: 13, color: C.inkSoft, lineHeight: 1.55 }}>{t.tooltips[openInfo].body}</div>
            <button onClick={() => setOpenInfo(null)} style={{ marginTop: 16, width: '100%', padding: '12px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 14, fontWeight: 700 }}>{t.common.gotIt}</button>
          </div>
        </div>
      )}
      {saveToast && (
        <div style={{ position: 'fixed', left: 14, right: 14, maxWidth: 440, margin: '0 auto', bottom: 'calc(82px + env(safe-area-inset-bottom))', zIndex: 25, background: C.ink, color: C.surface, padding: '12px 16px', borderRadius: 14, boxShadow: '0 8px 24px rgba(0,0,0,0.18)', display: 'flex', alignItems: 'center', gap: 10, animation: 'fadeUp 0.3s ease-out' }}>
          <Check size={16} color={C.accent} strokeWidth={3} />
          <span style={{ fontSize: 13, fontWeight: 600 }}>{t.allocate.planSaved}</span>
          <span style={{ fontSize: 12, opacity: 0.7, fontVariantNumeric: 'tabular-nums', marginLeft: 'auto' }}>{saveToast}</span>
        </div>
      )}

      {/* Link picker — pair an Allocate item to a Goal */}
      {linkSheetItemId && (() => {
        const item = items.find(i => i.id === linkSheetItemId);
        if (!item) return null;
        // Save items match savings goals; Debt items match debt goals.
        const eligible = goals.filter(g => item.pillar === 'debt' ? g.type === 'debt' : g.type !== 'debt');
        const linkedGoal = item.goalId ? goals.find(g => g.id === item.goalId) : null;
        return (
          <div onClick={() => setLinkSheetItemId(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, maxHeight: '88vh', background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
              <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 4 }}>{t.allocate.link.sheetTitle}</div>
              <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 16, lineHeight: 1.45 }}>{t.allocate.link.sheetSub}</div>

              {eligible.length === 0 && (
                <div style={{ padding: 14, background: C.surfaceAlt, borderRadius: 12, fontSize: 13, color: C.inkSoft, marginBottom: 16 }}>{t.allocate.link.empty}</div>
              )}

              {eligible.length > 0 && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 12 }}>
                  {eligible.map(g => {
                    const sel = item.goalId === g.id;
                    return (
                      <button key={g.id} onClick={() => { linkItemToGoal(item.id, g.id); setLinkSheetItemId(null); }} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 14px', borderRadius: 12, border: `1px solid ${sel ? C.accent : C.line}`, background: sel ? `${C.accent}10` : C.surface, color: C.ink, cursor: 'pointer', fontFamily: fontSans, textAlign: 'left' }}>
                        <div style={{ width: 32, height: 32, borderRadius: 8, background: g.type === 'debt' ? C.redSoft : C.accentSoft, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          {renderIcon(g.icon, 14, g.type === 'debt' ? C.red : C.accent, 2)}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>{g.name}</div>
                          <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 2 }}>{fmt(g.current, t)} / {fmt(g.target, t)}</div>
                        </div>
                        {sel && <Check size={16} color={C.accent} strokeWidth={3} />}
                      </button>
                    );
                  })}
                </div>
              )}

              <div style={{ display: 'flex', gap: 8 }}>
                {linkedGoal && (
                  <button onClick={() => { unlinkItem(item.id); setLinkSheetItemId(null); }} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surface, color: C.red, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 600 }}>
                    {t.allocate.link.unlink}
                  </button>
                )}
                <button onClick={() => setLinkSheetItemId(null)} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 700 }}>
                  {t.allocate.link.close}
                </button>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Bills levers sheet — country-aware tips, no automation. */}
      {billsTipsOpen && (() => {
        const tips = (BILLS_TIPS[lang] && BILLS_TIPS[lang][country]) || BILLS_TIPS.en.uk;
        const billsPct = allocated > 0 ? Math.round((pillarTotals.bills / allocated) * 100) : 0;
        const billsTarget = Math.round((allocationBenchmark.bills || 0) * 100);
        const gap = Math.max(0, billsPct - billsTarget);
        const iconFor = (k) => {
          if (k === 'bolt') return <Zap size={16} color={C.accent} strokeWidth={2} />;
          if (k === 'phone') return <Phone size={16} color={C.accent} strokeWidth={2} />;
          if (k === 'subs') return <ShoppingBag size={16} color={C.accent} strokeWidth={2} />;
          if (k === 'home') return <HomeIcon size={16} color={C.accent} strokeWidth={2} />;
          if (k === 'shield') return <Shield size={16} color={C.accent} strokeWidth={2} />;
          return <Sparkles size={16} color={C.accent} strokeWidth={2} />;
        };
        return (
          <div onClick={() => setBillsTipsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, maxHeight: '88vh', background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
              <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t.allocate.billsTips.title}</div>
              <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 16, lineHeight: 1.5 }}>{t.allocate.billsTips.sub(gap)}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {tips.map((tip, i) => (
                  <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: C.surfaceAlt, borderRadius: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {iconFor(tip.icon)}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{tip.title}</div>
                      <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.45 }}>{tip.body}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => setBillsTipsOpen(false)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 700 }}>
                {t.allocate.billsTips.close}
              </button>
            </div>
          </div>
        );
      })()}

      {/* Save tips sheet — coaching, not automation. */}
      {saveTipsOpen && (
        <div onClick={() => setSaveTipsOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, maxHeight: '88vh', background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
            <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
            <div style={{ fontSize: 17, fontWeight: 700, color: C.ink, marginBottom: 6 }}>{t.allocate.saveTips.title}</div>
            <div style={{ fontSize: 13, color: C.inkSoft, marginBottom: 16, lineHeight: 1.5 }}>{t.allocate.saveTips.sub}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
              {t.allocate.saveTips.tips.map((tip, i) => (
                <div key={i} style={{ display: 'flex', gap: 10, padding: 12, background: C.surfaceAlt, borderRadius: 12 }}>
                  <div style={{ width: 32, height: 32, borderRadius: 8, background: `${C.accent}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <PiggyBank size={16} color={C.accent} strokeWidth={2} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 3 }}>{tip.title}</div>
                    <div style={{ fontSize: 12, color: C.inkSoft, lineHeight: 1.45 }}>{tip.body}</div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => setSaveTipsOpen(false)} style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 700 }}>
              {t.allocate.saveTips.close}
            </button>
          </div>
        </div>
      )}

      {reviewOpen && (() => {
        // The most recent prior snapshot (excluding this month) is the comparison baseline.
        // On first-ever check-in, every section below gracefully empties out and we show
        // the empty state instead of the cards.
        const r = t.allocate.review;
        const labels = t.allocate.pillarLabels;
        const monthIdx = new Date().getMonth();
        const monthLabel = t.month.names[monthIdx];

        const saveDelta = monthlyDelta?.saveDelta ?? 0;
        const spendDelta = monthlyDelta?.spendDelta ?? 0;
        const hasDeltas = monthlyDelta && (Math.abs(saveDelta) > 0 || Math.abs(spendDelta) > 0);
        const hasGoalDeltas = goalDeltas.length > 0;
        const hasDrift = pillarDrift.length > 0;
        const hasBenchmark = pillarBenchmarkGaps.length > 0;
        const hasAnything = hasDeltas || hasGoalDeltas || hasDrift || hasBenchmark;

        return (
          <div onClick={() => setReviewOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 60, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
            <div onClick={(e) => e.stopPropagation()} style={{ width: '100%', maxWidth: 440, maxHeight: '88vh', background: C.surface, borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, paddingBottom: 'calc(20px + env(safe-area-inset-bottom))', boxShadow: '0 -8px 24px rgba(0,0,0,0.12)', overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>
              <div style={{ width: 36, height: 4, background: C.line, borderRadius: 2, margin: '0 auto 14px' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                <div style={{ width: 32, height: 32, borderRadius: 16, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <Check size={16} color={C.surface} strokeWidth={3} />
                </div>
                <div>
                  <div style={{ fontSize: 11, color: C.accent, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>{r.eyebrow}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.ink }}>{r.title(monthLabel)}</div>
                </div>
              </div>
              <div style={{ fontSize: 13, color: C.inkSoft, marginTop: 4, marginBottom: 18, lineHeight: 1.5 }}>
                {hasAnything ? r.headline : r.empty}
              </div>

              {hasDeltas && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{r.deltasTitle}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {Math.abs(saveDelta) > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: saveDelta > 0 ? `${C.accent}10` : C.surfaceAlt, border: `1px solid ${saveDelta > 0 ? `${C.accent}40` : C.lineSoft}`, borderRadius: 12 }}>
                        <PiggyBank size={16} color={saveDelta > 0 ? C.accent : C.inkSoft} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, flex: 1 }}>
                          {saveDelta > 0 ? r.saveUp(fmt(saveDelta, t)) : r.saveDown(fmt(Math.abs(saveDelta), t))}
                        </span>
                      </div>
                    )}
                    {Math.abs(spendDelta) > 0 && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: spendDelta < 0 ? `${C.accent}10` : C.surfaceAlt, border: `1px solid ${spendDelta < 0 ? `${C.accent}40` : C.lineSoft}`, borderRadius: 12 }}>
                        <ShoppingBag size={16} color={spendDelta < 0 ? C.accent : C.inkSoft} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: C.ink, flex: 1 }}>
                          {spendDelta > 0 ? r.spendUp(fmt(spendDelta, t)) : r.spendDown(fmt(Math.abs(spendDelta), t))}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {hasGoalDeltas && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{r.goalsTitle}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    {goalDeltas.map(g => {
                      const positive = g.type === 'debt' ? g.delta < 0 : g.delta > 0;
                      const accent = positive ? C.accent : C.inkSoft;
                      let paceText = null;
                      if (g.paceDiff != null) {
                        if (g.paceDiff >= 1) paceText = r.goalAhead(g.paceDiff);
                        else if (g.paceDiff <= -1) paceText = r.goalBehind(-g.paceDiff);
                        else paceText = r.goalOnTrack;
                      }
                      return (
                        <div key={g.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', background: C.surfaceAlt, borderRadius: 12 }}>
                          <div style={{ width: 28, height: 28, borderRadius: 8, background: positive ? `${C.accent}15` : C.line, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                            {renderIcon(g.icon, 14, accent, 2)}
                          </div>
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: 13, fontWeight: 600, color: C.ink, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{g.name}</div>
                            <div style={{ fontSize: 11, color: C.inkSoft, marginTop: 2 }}>
                              {g.delta > 0 ? r.goalAdded(fmt(g.delta, t)) : r.goalRemoved(fmt(Math.abs(g.delta), t))}
                              {paceText && <> · <span style={{ color: g.paceDiff < 0 ? C.red : C.accent, fontWeight: 700 }}>{paceText}</span></>}
                            </div>
                          </div>
                          <div style={{ fontSize: 12, fontWeight: 700, color: C.ink, ...s.num }}>{g.pct}%</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {hasDrift && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{r.driftTitle}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {pillarDrift.map(d => (
                      <div key={d.pillar} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: C.surfaceAlt, border: `1px solid ${C.lineSoft}`, borderRadius: 10 }}>
                        <AlertCircle size={14} color={d.diffPp < 0 ? C.red : C.inkSoft} />
                        <span style={{ fontSize: 12, color: C.ink, lineHeight: 1.45 }}>
                          {d.diffPp < 0 ? r.driftDown(labels[d.pillar], -d.diffPp) : r.driftUp(labels[d.pillar], d.diffPp)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasBenchmark && (
                <div style={{ marginBottom: 16 }}>
                  <div style={{ fontSize: 10, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 8 }}>{r.benchmarkTitle}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    {pillarBenchmarkGaps.map(b => (
                      <div key={b.pillar} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 12px', background: C.surfaceAlt, border: `1px solid ${C.lineSoft}`, borderRadius: 10 }}>
                        <BarChart3 size={14} color={C.inkSoft} />
                        <span style={{ fontSize: 12, color: C.ink, lineHeight: 1.45 }}>
                          {b.diffPp > 0 ? r.benchmarkAbove(labels[b.pillar], b.currentPct, b.targetPct) : r.benchmarkBelow(labels[b.pillar], b.currentPct, b.targetPct)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                <button onClick={() => { setReviewOpen(false); setTab('allocate'); }} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surface, color: C.inkSoft, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 600 }}>
                  {r.adjust}
                </button>
                <button onClick={() => setReviewOpen(false)} style={{ flex: 1, padding: '12px 14px', borderRadius: 12, border: 'none', background: C.accent, color: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 13, fontWeight: 700 }}>
                  {r.cta}
                </button>
              </div>
            </div>
          </div>
        );
      })()}
      {!keyboardOpen && (
        <>
          <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, height: 'calc(96px + env(safe-area-inset-bottom))', background: `linear-gradient(to top, ${C.bg} 55%, ${C.bg}00)`, pointerEvents: 'none', zIndex: 19 }} />

          <div style={s.bottomNav}>
            <button style={s.navBtn(tab === 'home')} onClick={() => setTab('home')}><HomeIcon size={17} strokeWidth={2} /></button>
            <button style={s.navBtn(tab === 'allocate')} onClick={() => setTab('allocate')}><Wallet size={17} strokeWidth={2} /></button>
            <button style={s.navBtn(tab === 'goals')} onClick={() => setTab('goals')}><Target size={17} strokeWidth={2} /></button>
            <button style={s.navBtn(tab === 'wealth')} onClick={() => setTab('wealth')}><TrendingUp size={17} strokeWidth={2} /></button>
            <button style={s.navBtn(tab === 'forecast')} onClick={() => setTab('forecast')}><BarChart3 size={17} strokeWidth={2} /></button>
          </div>
        </>
      )}
    </div>
  );
}

// ============================================================
// SPLIT OPTION CARD — shows a pillar-aware recommended split
// ============================================================
function SplitOptionCard({ title, sub, badge, tradeoff, split, salary, t, color, pillarsCopy, onApply, isFocused }) {
  const fontSans = '"Inter", -apple-system, system-ui, sans-serif';
  const C2 = {
    surface: '#FFFFFF', line: '#E5E8E6', lineSoft: '#EEF1EF',
    ink: '#1E2826', inkSoft: '#636B69', inkMuted: '#9DA5A3',
  };

  // Group split by pillar
  const pillarMap = { housing: 'bills', utilities: 'bills', groceries: 'spend', transport: 'spend', lifestyle: 'spend', emergency: 'save', savings: 'save', investments: 'save', debt: 'debt' };
  const pillarTotals = { save: 0, bills: 0, spend: 0, debt: 0 };
  Object.entries(split).forEach(([k, v]) => { if (pillarMap[k]) pillarTotals[pillarMap[k]] += v; });

  const pillarOrder = ['save', 'bills', 'spend', 'debt'];

  return (
    <div style={{
      background: C2.surface, borderRadius: 20, padding: 20,
      border: isFocused ? `1.5px solid ${color}` : `1px solid ${C2.line}`,
      marginBottom: 12,
      boxShadow: isFocused ? `0 4px 16px ${color}22` : 'none',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: C2.ink, letterSpacing: '-0.02em' }}>{title}</div>
          <div style={{ fontSize: 12, color: C2.inkSoft, marginTop: 2 }}>{sub}</div>
        </div>
        <div style={{ background: color + '22', color, padding: '4px 10px', borderRadius: 999, fontSize: 10, fontWeight: 700, letterSpacing: '0.05em' }}>
          {badge}
        </div>
      </div>

      <div style={{ fontSize: 12, color: C2.inkSoft, marginBottom: 14, fontStyle: 'italic', lineHeight: 1.4 }}>
        {tradeoff}
      </div>

      {/* Pillar breakdown */}
      {pillarOrder.filter(p => pillarTotals[p] > 0).map(pillarKey => {
        const pillar = pillarsCopy[pillarKey];
        const total = pillarTotals[pillarKey];
        const pct = salary > 0 ? Math.round((total / salary) * 100) : 0;
        const itemsInPillar = Object.entries(split).filter(([k, v]) => pillarMap[k] === pillarKey && v > 0);

        return (
          <div key={pillarKey} style={{ marginBottom: 10, paddingBottom: 10, borderBottom: `1px solid ${C2.lineSoft}` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
              <div style={{ width: 8, height: 8, borderRadius: 4, background: pillar.color }} />
              <div style={{ fontSize: 12, fontWeight: 700, color: C2.ink }}>{pillar.name}</div>
              <div style={{ fontSize: 11, color: C2.inkMuted, marginLeft: 'auto' }}>{pct}%</div>
              <div style={{ fontSize: 13, fontWeight: 700, fontVariantNumeric: 'tabular-nums', color: C2.ink, minWidth: 70, textAlign: 'right' }}>
                {fmt(total, t)}
              </div>
            </div>
            <div style={{ fontSize: 11, color: C2.inkMuted, marginLeft: 16 }}>
              {itemsInPillar.map(([k]) => {
                const labelMap = t.locale === 'pt-BR'
                  ? { housing: 'Moradia', utilities: 'Contas', groceries: 'Mercado', transport: 'Transporte', lifestyle: 'Lazer', emergency: 'Reserva', savings: 'Poupança', investments: 'Invest.', debt: 'Dívidas' }
                  : { housing: 'Housing', utilities: 'Utilities', groceries: 'Groceries', transport: 'Transport', lifestyle: 'Lifestyle', emergency: 'Emergency', savings: 'Savings', investments: 'Invest.', debt: 'Debt' };
                return labelMap[k];
              }).join(' · ')}
            </div>
          </div>
        );
      })}

      <button
        onClick={onApply}
        style={{
          marginTop: 4, width: '100%', background: color, color: '#FFFFFF', border: 'none',
          padding: '12px', borderRadius: 12, fontSize: 14, fontWeight: 600, cursor: 'pointer',
          fontFamily: fontSans,
        }}
      >
        {t.allocate.smart.apply}
      </button>
    </div>
  );
}
