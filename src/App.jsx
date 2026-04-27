import React, { useState, useMemo, useEffect, useRef } from 'react';
import { XAxis, YAxis, Tooltip, ResponsiveContainer, Area, AreaChart, CartesianGrid, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import {
  Home as HomeIcon, Target, Wallet, TrendingUp, User, Plus, Trash2, Pencil, Languages,
  Sparkles, Check, X, ChevronRight, ChevronLeft, Plane, Shield, Car, ShoppingBag, CreditCard,
  BarChart3, PiggyBank, Heart, Gem, Circle, Globe, RotateCcw, ArrowRight, LineChart as LineChartIcon,
  AlertCircle, Settings, ArrowDownUp
} from 'lucide-react';

// ============================================================
// COPY
// ============================================================
const copy = {
  en: {
    locale: 'en-GB', currency: 'GBP', currencySymbol: '£', country: 'uk',
    brand: 'Nest',
    nav: { home: 'Home', allocate: 'Allocate', goals: 'Goals', wealth: 'Wealth', forecast: 'Forecast' },
    month: { names: ['January','February','March','April','May','June','July','August','September','October','November','December'] },
    onboarding: {
      welcome: {
        eyebrow: 'Welcome',
        title: 'Your money,',
        titleBold: 'beautifully simple.',
        sub: 'Plan. Grow. Reflect monthly. No daily tracking.',
        cta: 'Get started',
      },
      country: {
        title: 'Where do you',
        titleBold: 'live?',
        sub: 'So we can show the right benchmarks.',
        options: [
          { v: 'uk', l: 'United Kingdom', currency: 'GBP', symbol: '£' },
          { v: 'br', l: 'Brazil', currency: 'BRL', symbol: 'R$' },
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
      thisMonth: 'This month',
      income: 'Income',
      allocated: 'Allocated',
      free: 'Unassigned',
      over: 'Over income',
      wealth: 'Wealth',
      today: 'Today',
      in10: '10 years',
      goalsTitle: 'Goals',
      insightsTitle: 'What matters',
      noInsights: 'Your plan looks steady.',
      checkInTitle: 'Time for your monthly check-in',
      checkInSub: 'Update your wealth and goals to see fresh projections.',
      checkInCta: 'Start check-in',
      lastChecked: 'Last checked',
      months: (n) => `${n} ${n === 1 ? 'month' : 'months'} in a row`,
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
        needs: { name: 'Needs', sub: 'Things you must pay', color: '#3B82F6' },
        wants: { name: 'Wants', sub: 'Things you choose', color: '#A855F7' },
        wealth: { name: 'Wealth', sub: 'Your future self', color: '#2E8B88' },
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
      surplusSplit: 'Split across Wealth',
      sendTo: (name) => `Send to ${name}`,
      templates: 'Or pick a template',
      lastMonth: (amt) => `Last month: ${amt}`,
      planHint: 'Nest is a planner. Set how your money flows each month.',
      saved: 'Saved for',
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
          balanced: 'Even share across Needs, Wants, and Wealth.',
          debt: 'More goes to Debt pillar. Less lifestyle for now.',
          emergency: 'Emergency fund builds faster. Less invested.',
          invest: 'Heavier on Investments. Tighter lifestyle.',
          savings: 'Savings get priority. Slower lifestyle spend.',
          big: 'Savings pillar leads. Other pillars trim.',
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
    },
    common: { edit: 'Edit', done: 'Done', cancel: 'Cancel', save: 'Save', delete: 'Remove', year: 'Y', today: 'today', daysAgo: (n) => `${n}d ago` },
  },
  pt: {
    locale: 'pt-BR', currency: 'BRL', currencySymbol: 'R$', country: 'br',
    brand: 'Nest',
    nav: { home: 'Início', allocate: 'Alocar', goals: 'Metas', wealth: 'Patrimônio', forecast: 'Previsão' },
    month: { names: ['Janeiro','Fevereiro','Março','Abril','Maio','Junho','Julho','Agosto','Setembro','Outubro','Novembro','Dezembro'] },
    onboarding: {
      welcome: {
        eyebrow: 'Bem-vindo',
        title: 'Seu dinheiro,',
        titleBold: 'simples e bonito.',
        sub: 'Planeje. Cresça. Reflita mensalmente. Sem rastreio diário.',
        cta: 'Começar',
      },
      country: {
        title: 'Onde você',
        titleBold: 'mora?',
        sub: 'Para mostrar os benchmarks certos.',
        options: [
          { v: 'uk', l: 'Reino Unido', currency: 'GBP', symbol: '£' },
          { v: 'br', l: 'Brasil', currency: 'BRL', symbol: 'R$' },
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
        sub: 'Isso define seus baldes de patrimônio sugeridos.',
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
      thisMonth: 'Este mês',
      income: 'Renda',
      allocated: 'Alocado',
      free: 'Sem destino',
      over: 'Acima da renda',
      wealth: 'Patrimônio',
      today: 'Hoje',
      in10: '10 anos',
      goalsTitle: 'Metas',
      insightsTitle: 'O que importa',
      noInsights: 'Seu plano está estável.',
      checkInTitle: 'Hora do seu check-in mensal',
      checkInSub: 'Atualize patrimônio e metas para ver novas projeções.',
      checkInCta: 'Começar check-in',
      lastChecked: 'Última revisão',
      months: (n) => `${n} ${n === 1 ? 'mês' : 'meses'} seguidos`,
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
        needs: { name: 'Necessidades', sub: 'O que você precisa pagar', color: '#3B82F6' },
        wants: { name: 'Desejos', sub: 'O que você escolhe', color: '#A855F7' },
        wealth: { name: 'Patrimônio', sub: 'Seu eu futuro', color: '#2E8B88' },
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
      surplusSplit: 'Dividir no Patrimônio',
      sendTo: (name) => `Mandar pra ${name}`,
      templates: 'Ou escolha um modelo',
      lastMonth: (amt) => `Mês passado: ${amt}`,
      planHint: 'O Nest é um planejador. Defina como seu dinheiro flui a cada mês.',
      saved: 'Salvo em',
      smartCard: {
        title: 'Não sabe como dividir?',
        sub: '3 perguntas rápidas. Dois planos sugeridos.',
        cta: 'Ver sugestões',
      },
      copyLastCard: {
        title: 'Começar do mês passado',
        sub: 'Use seu último plano salvo como ponto de partida.',
        cta: 'Copiar',
      },
      smart: {
        title: 'Divisão Inteligente',
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
        balanced: { label: 'Balanceado', sub: 'Progresso constante entre pilares', badge: 'BALANCEADO' },
        focused: { label: 'Focado', sub: 'Foco na sua meta principal', badge: 'FOCADO' },
        apply: 'Usar este plano',
        recalc: 'Responder de novo',
        tradeoff: {
          balanced: 'Divisão equilibrada entre Necessidades, Desejos e Patrimônio.',
          debt: 'Mais para quitar dívidas. Menos lazer por enquanto.',
          emergency: 'Reserva cresce mais rápido. Menos investido.',
          invest: 'Mais em Investimentos. Lazer mais apertado.',
          savings: 'Reserva em primeiro lugar. Gasto com lazer mais lento.',
          big: 'Poupança lidera. Outros pilares reduzem.',
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
      new: 'Nova meta',
    },
    wealth: {
      title: 'Patrimônio',
      sub: 'Seus baldes, seu horizonte.',
      addBucket: 'Adicionar balde',
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
      bucketCount: (n) => n === 1 ? '1 balde' : `${n} baldes`,
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
      empty: 'Adicione valores aos seus baldes pra ver a previsão.',
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
    },
    common: { edit: 'Editar', done: 'Pronto', cancel: 'Cancelar', save: 'Salvar', delete: 'Remover', year: 'A', today: 'hoje', daysAgo: (n) => `há ${n}d` },
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
    { pillar: 'needs', name: 'Housing', icon: 'house', benchmarkKey: 'housing' },
    { pillar: 'needs', name: 'Utilities', icon: 'line', benchmarkKey: 'utilities' },
    { pillar: 'needs', name: 'Groceries', icon: 'bag', benchmarkKey: 'groceries' },
    { pillar: 'needs', name: 'Transport', icon: 'car', benchmarkKey: 'transport' },
    { pillar: 'wants', name: 'Lifestyle', icon: 'gem', benchmarkKey: 'lifestyle' },
    { pillar: 'wealth', name: 'Emergency fund', icon: 'shield', benchmarkKey: 'emergency' },
    { pillar: 'wealth', name: 'Savings', icon: 'piggy', benchmarkKey: 'savings' },
    { pillar: 'wealth', name: 'Investments', icon: 'line', benchmarkKey: 'investments' },
  ],
  pt: [
    { pillar: 'needs', name: 'Moradia', icon: 'house', benchmarkKey: 'housing' },
    { pillar: 'needs', name: 'Contas', icon: 'line', benchmarkKey: 'utilities' },
    { pillar: 'needs', name: 'Mercado', icon: 'bag', benchmarkKey: 'groceries' },
    { pillar: 'needs', name: 'Transporte', icon: 'car', benchmarkKey: 'transport' },
    { pillar: 'wants', name: 'Lazer', icon: 'gem', benchmarkKey: 'lifestyle' },
    { pillar: 'wealth', name: 'Reserva', icon: 'shield', benchmarkKey: 'emergency' },
    { pillar: 'wealth', name: 'Poupança', icon: 'piggy', benchmarkKey: 'savings' },
    { pillar: 'wealth', name: 'Investimentos', icon: 'line', benchmarkKey: 'investments' },
  ],
};

// Benchmarks available per pillar. Used by the inline-edit picker so an item
// in the Wealth pillar can't accidentally be compared against the Housing
// benchmark, etc.
const PILLAR_BENCHMARKS = {
  needs: ['housing', 'utilities', 'groceries', 'transport'],
  wants: ['lifestyle'],
  wealth: ['savings', 'emergency', 'investments'],
  debt: ['debt'],
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

// Suggestion chips used to seed an empty pillar.
const STARTER_ITEMS = {
  en: {
    needs: [
      { name: 'Rent', icon: 'house', benchmarkKey: 'housing' },
      { name: 'Utilities', icon: 'line', benchmarkKey: 'utilities' },
      { name: 'Groceries', icon: 'bag', benchmarkKey: 'groceries' },
      { name: 'Transport', icon: 'car', benchmarkKey: 'transport' },
    ],
    wants: [
      { name: 'Subscriptions', icon: 'gem', benchmarkKey: 'lifestyle' },
      { name: 'Dining', icon: 'gem', benchmarkKey: 'lifestyle' },
      { name: 'Travel', icon: 'gem', benchmarkKey: 'lifestyle' },
    ],
    wealth: [
      { name: 'Emergency fund', icon: 'shield', benchmarkKey: 'emergency' },
      { name: 'Savings', icon: 'piggy', benchmarkKey: 'savings' },
      { name: 'Investments', icon: 'line', benchmarkKey: 'investments' },
    ],
    debt: [
      { name: 'Credit card', icon: 'card', benchmarkKey: 'debt' },
      { name: 'Loan', icon: 'card', benchmarkKey: 'debt' },
    ],
  },
  pt: {
    needs: [
      { name: 'Aluguel', icon: 'house', benchmarkKey: 'housing' },
      { name: 'Contas', icon: 'line', benchmarkKey: 'utilities' },
      { name: 'Mercado', icon: 'bag', benchmarkKey: 'groceries' },
      { name: 'Transporte', icon: 'car', benchmarkKey: 'transport' },
    ],
    wants: [
      { name: 'Assinaturas', icon: 'gem', benchmarkKey: 'lifestyle' },
      { name: 'Restaurantes', icon: 'gem', benchmarkKey: 'lifestyle' },
      { name: 'Viagens', icon: 'gem', benchmarkKey: 'lifestyle' },
    ],
    wealth: [
      { name: 'Reserva', icon: 'shield', benchmarkKey: 'emergency' },
      { name: 'Poupança', icon: 'piggy', benchmarkKey: 'savings' },
      { name: 'Investimentos', icon: 'line', benchmarkKey: 'investments' },
    ],
    debt: [
      { name: 'Cartão', icon: 'card', benchmarkKey: 'debt' },
      { name: 'Empréstimo', icon: 'card', benchmarkKey: 'debt' },
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

  // Core state
  const [salary, setSalary] = useState(saved?.salary ?? 3000);
  const [items, setItems] = useState(saved?.items || []);
  const [buckets, setBuckets] = useState(saved?.buckets || []);
  const [goals, setGoals] = useState(saved?.goals || []);

  // Monthly snapshots
  const [snapshots, setSnapshots] = useState(saved?.snapshots || []);
  const [lastCheckIn, setLastCheckIn] = useState(saved?.lastCheckIn || null);
  const [checkInStreak, setCheckInStreak] = useState(saved?.checkInStreak || 0);
  // Target pillar percentages, set when the user applies a Smart Split.
  const [targetSplitPct, setTargetSplitPct] = useState(saved?.targetSplitPct || null);
  // Manual pillar targets in absolute currency. Optional, top-down planning.
  const [pillarTargets, setPillarTargets] = useState(saved?.pillarTargets || {});
  const [editingPillarTarget, setEditingPillarTarget] = useState(null);
  const [surplusRedirectOpen, setSurplusRedirectOpen] = useState(false);

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

  // Persist state whenever anything important changes
  useEffect(() => {
    saveState({
      lang, phase, onboardStep,
      country, mainGoal, investorProfile, saveForPicks,
      salary, items, buckets, goals,
      snapshots, lastCheckIn, checkInStreak,
      targetSplitPct, pillarTargets,
    });
  }, [lang, phase, onboardStep, country, mainGoal, investorProfile, saveForPicks,
      salary, items, buckets, goals, snapshots, lastCheckIn, checkInStreak, targetSplitPct, pillarTargets]);

  // ==================== DERIVED ====================
  const allocated = useMemo(() => items.reduce((sum, c) => sum + (Number(c.amount) || 0), 0), [items]);
  const unassigned = salary - allocated;
  const totalWealth = useMemo(() => buckets.reduce((sum, b) => sum + (Number(b.current) || 0), 0), [buckets]);
  const monthlyContrib = useMemo(() => buckets.reduce((sum, b) => sum + (Number(b.monthly) || 0), 0), [buckets]);

  // Monthly contribution from Allocate's Wealth pillar (auto-computed)
  const wealthFromAllocate = useMemo(() =>
    items.filter(i => i.pillar === 'wealth').reduce((sum, i) => sum + (Number(i.amount) || 0), 0),
    [items]
  );

  // Pillar totals
  const pillarTotals = useMemo(() => {
    const out = { needs: 0, wants: 0, wealth: 0, debt: 0 };
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
            ? `${pct}% of your wealth is in ${biggest.name}. Worth considering diversification.`
            : `${pct}% do seu patrimônio está em ${biggest.name}. Vale pensar em diversificar.`,
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
            ? `At this pace, you reach ${fmtShort(in10, t)} in 10 years.`
            : `Nesse ritmo, você chega em ${fmtShort(in10, t)} em 10 anos.`,
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
              ? `"${g.name}" is ${pct}% complete. About ${monthsLeft} months to go.`
              : `"${g.name}" está ${pct}% completa. Faltam uns ${monthsLeft} meses.`,
          });
        }
      }
    });
    return out.slice(0, 3);
  }, [buckets, goals, totalWealth, lang, t]);

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
    }));
    setItems(defaultItems);

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

    // Seed goals from saveFor picks
    const savForOptions = copy[langKey].onboarding.saveFor.options;
    const selected = savForOptions.filter(o => saveForPicks.includes(o.v));
    const defaultTargets = { emergency: 10000, vacation: 5000, car: 15000, home: 50000, wedding: 20000, retirement: 100000, other: 5000 };
    setGoals(selected.map(o => ({
      id: Math.random().toString(36),
      name: o.l,
      icon: o.icon,
      type: 'savings',
      target: defaultTargets[o.v] || 5000,
      current: 0,
      monthly: 0,
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
    const wealthItems = items.filter(i => i.pillar === 'wealth');
    if (wealthItems.length === 0) return;
    const share = unassigned / wealthItems.length;
    setItems(items.map(i => i.pillar === 'wealth' ? { ...i, amount: (Number(i.amount) || 0) + share } : i));
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
    const newSnapshot = {
      monthKey,
      salary,
      items: items.map(i => ({ ...i })),
      buckets: buckets.map(b => ({ ...b })),
      goals: goals.map(g => ({ ...g })),
      date: now.toISOString(),
    };
    // Replace if same month exists, else append
    const existingIdx = snapshots.findIndex(s => s.monthKey === monthKey);
    const newSnapshots = existingIdx >= 0
      ? snapshots.map((s, i) => i === existingIdx ? newSnapshot : s)
      : [...snapshots, newSnapshot];
    setSnapshots(newSnapshots);

    // Streak
    const prev = lastCheckIn ? new Date(lastCheckIn) : null;
    if (prev) {
      const daysSince = (now - prev) / (1000 * 60 * 60 * 24);
      setCheckInStreak(daysSince <= 45 ? checkInStreak + 1 : 1);
    } else {
      setCheckInStreak(1);
    }
    setLastCheckIn(now.toISOString());

    // Smart Allocate→Wealth feed: map wealth items to matching buckets by type
    // Emergency fund → cash buckets · Savings → cash/bonds · Investments → stocks/reits/crypto
    const wealthItems = items.filter(i => i.pillar === 'wealth' && Number(i.amount) > 0);
    if (wealthItems.length > 0 && buckets.length > 0) {
      // Classify each wealth item by benchmarkKey
      const contribByBenchmark = { emergency: 0, savings: 0, investments: 0 };
      wealthItems.forEach(i => {
        const key = i.benchmarkKey || 'savings';
        if (contribByBenchmark[key] !== undefined) contribByBenchmark[key] += Number(i.amount);
        else contribByBenchmark.savings += Number(i.amount);
      });

      // Target bucket types for each wealth item type
      const targetTypes = {
        emergency: ['cash'],
        savings: ['cash', 'bonds'],
        investments: ['stocks', 'reits', 'crypto', 'bonds'],
      };

      // Build new bucket monthly values
      const newBuckets = buckets.map(b => ({ ...b, monthly: 0 }));

      Object.entries(contribByBenchmark).forEach(([key, total]) => {
        if (total <= 0) return;
        const matches = newBuckets.filter(b => targetTypes[key].includes(b.type));
        if (matches.length === 0) {
          // No matching bucket type — spread across all as fallback
          const share = total / newBuckets.length;
          newBuckets.forEach(b => { b.monthly += share; });
        } else {
          // Distribute by existing bucket value weight, or equally if all zero
          const totalCurrent = matches.reduce((s, b) => s + Number(b.current || 0), 0);
          matches.forEach(b => {
            const weight = totalCurrent > 0 ? (Number(b.current || 0) / totalCurrent) : (1 / matches.length);
            b.monthly += total * weight;
          });
        }
      });

      // Round and commit
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
    topbar: { padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'sticky', top: 0, zIndex: 10, background: `${C.bg}F0`, backdropFilter: 'blur(10px)', borderBottom: `1px solid ${C.lineSoft}` },
    brandWrap: { display: 'flex', alignItems: 'center', gap: 8 },
    brandMark: { width: 26, height: 26, borderRadius: 7, background: C.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.surface, fontSize: 13, fontWeight: 700 },
    brand: { fontWeight: 600, fontSize: 17, color: C.ink, letterSpacing: '-0.02em' },
    iconBtn: { width: 34, height: 34, borderRadius: 17, background: C.surfaceAlt, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.inkSoft, fontFamily: fontSans },
    main: { maxWidth: 640, margin: '0 auto', padding: '20px 20px' },

    // Onboarding
    onboardMain: { maxWidth: 480, margin: '0 auto', padding: '30px 24px 140px', minHeight: 'calc(100dvh - 100px)', display: 'flex', flexDirection: 'column' },
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
    bottomCTA: { position: 'fixed', bottom: 20, left: 20, right: 20, maxWidth: 440, margin: '0 auto', zIndex: 20 },
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

  // ============ ONBOARDING ============
  if (phase === 'onboarding') {
    const toggleSaveFor = (v) => {
      if (saveForPicks.includes(v)) setSaveForPicks(saveForPicks.filter(x => x !== v));
      else setSaveForPicks([...saveForPicks, v]);
    };

    const canAdvance = () => {
      if (onboardStep === 0) return true;
      if (onboardStep === 1) return country !== null;
      if (onboardStep === 2) return mainGoal !== null;
      if (onboardStep === 3) return investorProfile !== null;
      if (onboardStep === 4) return true;
      return false;
    };

    const handleNext = () => {
      if (onboardStep < 4) setOnboardStep(onboardStep + 1);
      else finishOnboarding();
    };

    return (
      <div style={s.app}>
        <div style={s.onboardMain}>
          <div style={s.dots}>
            {[0,1,2,3,4].map(i => <div key={i} style={s.dot(onboardStep === i)} />)}
          </div>

          {onboardStep === 0 && (
            <>
              <div style={s.onboardEyebrow}>● {t.onboarding.welcome.eyebrow}</div>
              <h1 style={{ ...s.onboardTitle, textAlign: 'center', fontSize: 36, marginTop: 20 }}>
                {t.onboarding.welcome.title}<br />
                <span style={s.onboardTitleBold}>{t.onboarding.welcome.titleBold}</span>
              </h1>
              <p style={{ ...s.onboardSub, textAlign: 'center', maxWidth: 360, margin: '0 auto 24px' }}>
                {t.onboarding.welcome.sub}
              </p>
              <div style={{ ...s.heroCard, marginTop: 16 }}>
                <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', marginBottom: 10, opacity: 0.85 }}>Preview</div>
                <div style={{ fontSize: 26, fontWeight: 700 }}>£3,000</div>
                <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, marginTop: 12, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '80%', background: C.surface }} />
                </div>
              </div>
            </>
          )}

          {onboardStep === 1 && (
            <>
              <h1 style={s.onboardTitle}>
                {t.onboarding.country.title}{' '}
                <span style={s.onboardTitleBold}>{t.onboarding.country.titleBold}</span>
              </h1>
              <p style={s.onboardSub}>{t.onboarding.country.sub}</p>
              {t.onboarding.country.options.map(opt => (
                <div key={opt.v} style={s.optionCard(country === opt.v)} onClick={() => setCountry(opt.v)}>
                  <div style={s.optionIconBox(country === opt.v)}>
                    <Globe size={16} color={country === opt.v ? C.surface : C.inkSoft} strokeWidth={2} />
                  </div>
                  <div style={s.optionLabel}>
                    <div style={s.optionLabelMain}>{opt.l}</div>
                    <div style={s.optionLabelSub}>{opt.symbol} ({opt.currency})</div>
                  </div>
                  <div style={s.optionCheck(country === opt.v)}>{country === opt.v && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                </div>
              ))}
            </>
          )}

          {onboardStep === 2 && (
            <>
              <h1 style={s.onboardTitle}>
                {t.onboarding.goal.title}{' '}
                <span style={s.onboardTitleBold}>{t.onboarding.goal.titleBold}</span>
              </h1>
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

          {onboardStep === 3 && (
            <>
              <h1 style={s.onboardTitle}>
                {t.onboarding.profile.title}{' '}
                <span style={s.onboardTitleBold}>{t.onboarding.profile.titleBold}</span>
              </h1>
              <p style={s.onboardSub}>{t.onboarding.profile.sub}</p>
              {t.onboarding.profile.options.map(opt => (
                <div key={opt.v} style={s.optionCard(investorProfile === opt.v)} onClick={() => setInvestorProfile(opt.v)}>
                  <div style={s.optionIconBox(investorProfile === opt.v)}>{renderIcon(opt.icon, 16, investorProfile === opt.v ? C.surface : C.inkSoft, 2)}</div>
                  <div style={s.optionLabel}>
                    <div style={s.optionLabelMain}>{opt.l}</div>
                    <div style={s.optionLabelSub}>{opt.sub}</div>
                  </div>
                  <div style={s.optionCheck(investorProfile === opt.v)}>{investorProfile === opt.v && <Check size={12} color={C.surface} strokeWidth={3} />}</div>
                </div>
              ))}
            </>
          )}

          {onboardStep === 4 && (
            <>
              <h1 style={s.onboardTitle}>
                {t.onboarding.saveFor.title}{' '}
                <span style={s.onboardTitleBold}>{t.onboarding.saveFor.titleBold}</span>
              </h1>
              <p style={s.onboardSub}>{t.onboarding.saveFor.sub}</p>
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
        </div>

        <div style={s.bottomCTA}>
          <button style={s.ctaBtn(!canAdvance())} onClick={handleNext} disabled={!canAdvance()}>
            {t.onboarding.cta} <ArrowRight size={16} />
          </button>
          {onboardStep === 4 && (
            <button style={s.skipBtn} onClick={finishOnboarding}>{t.onboarding.saveFor.skip}</button>
          )}
          <div style={{ textAlign: 'center', marginTop: 8 }}>
            <button style={{ ...s.ghostBtn, fontSize: 12, color: C.inkMuted }} onClick={() => setLang(lang === 'en' ? 'pt' : 'en')}>
              <Globe size={12} /> {lang === 'en' ? 'Português' : 'English'}
            </button>
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
    setItems(items.map(c => c.id === id ? { ...c, [field]: field === 'amount' ? (value === '' ? 0 : Number(value)) : value } : c));
  };
  const removeItem = (id) => setItems(items.filter(c => c.id !== id));
  const computePillarPctFromSplit = (split) => {
    const pillarMap = { housing: 'needs', utilities: 'needs', groceries: 'needs', transport: 'needs', lifestyle: 'wants', emergency: 'wealth', savings: 'wealth', investments: 'wealth', debt: 'debt' };
    const totals = { needs: 0, wants: 0, wealth: 0, debt: 0 };
    let sum = 0;
    Object.entries(split).forEach(([k, amt]) => {
      const p = pillarMap[k];
      if (!p) return;
      totals[p] += Number(amt) || 0;
      sum += Number(amt) || 0;
    });
    if (sum === 0) return null;
    return {
      needs: Math.round((totals.needs / sum) * 100),
      wants: Math.round((totals.wants / sum) * 100),
      wealth: Math.round((totals.wealth / sum) * 100),
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

  const applySmartSplit = (split) => {
    // Map split keys to item names, icons, pillars, and benchmark keys
    const nameMap = lang === 'en'
      ? { housing: 'Housing', utilities: 'Utilities', groceries: 'Groceries', transport: 'Transport', lifestyle: 'Lifestyle', emergency: 'Emergency fund', savings: 'Savings', investments: 'Investments', debt: 'Debt payoff' }
      : { housing: 'Moradia', utilities: 'Contas', groceries: 'Mercado', transport: 'Transporte', lifestyle: 'Lazer', emergency: 'Reserva', savings: 'Poupança', investments: 'Investimentos', debt: 'Quitar dívidas' };
    const iconMap = { housing: 'house', utilities: 'line', groceries: 'bag', transport: 'car', lifestyle: 'gem', emergency: 'shield', savings: 'piggy', investments: 'line', debt: 'card' };
    const pillarMap = { housing: 'needs', utilities: 'needs', groceries: 'needs', transport: 'needs', lifestyle: 'wants', emergency: 'wealth', savings: 'wealth', investments: 'wealth', debt: 'debt' };
    const benchmarkMap = { housing: 'housing', utilities: 'utilities', groceries: 'groceries', transport: 'transport', lifestyle: 'lifestyle', emergency: 'emergency', savings: 'savings', investments: 'investments', debt: 'debt' };

    const newItems = Object.entries(split)
      .filter(([_, amt]) => amt > 0)
      .map(([k, amt]) => ({
        id: Math.random().toString(36),
        name: nameMap[k],
        icon: iconMap[k],
        pillar: pillarMap[k],
        benchmarkKey: benchmarkMap[k],
        amount: amt,
      }));
    setItems(newItems);
    setTargetSplitPct(computePillarPctFromSplit(split));
    setSmartStep(null);
    setSmartAnswers({});
    setSmartResult(null);
  };

  const addItem = (pillar, preset = null) => {
    const base = preset || { name: t.allocate.newItem, icon: 'circle', benchmarkKey: null };
    const id = Math.random().toString(36);
    setItems([...items, { id, name: base.name, icon: base.icon, pillar, benchmarkKey: base.benchmarkKey, amount: 0 }]);
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
    setGoals(goals.map(g => g.id === id ? { ...g, [field]: ['target', 'current', 'monthly'].includes(field) ? (value === '' ? 0 : Number(value)) : value } : g));
  };
  const removeGoal = (id) => { setGoals(goals.filter(g => g.id !== id)); if (editingGoalId === id) setEditingGoalId(null); };
  const addGoal = () => {
    const newGoal = { id: Math.random().toString(36), name: t.goals.new, icon: 'circle', type: 'savings', target: 1000, current: 0, monthly: 0 };
    setGoals([...goals, newGoal]);
    setEditingGoalId(newGoal.id);
  };

  const pieData = buckets.filter(b => b.current > 0).map(b => ({ name: b.name, value: Number(b.current), key: b.id, color: BUCKET_COLORS[b.type] || C.inkMuted }));
  const maxExtra = Math.max(salary * 0.5, 500);

  // Group items by pillar
  const itemsByPillar = (pillarKey) => items.filter(i => i.pillar === pillarKey);

  return (
    <div style={s.app}>
      <div style={s.topbar}>
        <div style={s.brandWrap}>
          <div style={s.brandMark}>N</div>
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
                ● {t.home.greeting}
              </div>
              <h1 style={s.h1}>{monthName} <span style={{ color: C.inkMuted, fontWeight: 400 }}>{year}</span></h1>
            </div>

            <div style={s.heroCard}>
              <div style={{ position: 'absolute', top: -30, right: -30, width: 140, height: 140, borderRadius: '50%', background: 'rgba(255,255,255,0.15)', pointerEvents: 'none' }} />
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>
                {t.home.thisMonth}
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <div>
                  <div style={{ fontSize: 11, opacity: 0.8, marginBottom: 4 }}>{t.home.income}</div>
                  <div style={{ fontSize: 30, fontWeight: 700, letterSpacing: '-0.02em' }}>{fmt(salary, t)}</div>
                </div>
                <button style={{ background: 'rgba(255,255,255,0.15)', border: 'none', color: C.surface, padding: '6px 12px', borderRadius: 999, fontSize: 11, fontWeight: 500, cursor: 'pointer' }} onClick={() => setTab('allocate')}>
                  <Pencil size={10} style={{ marginRight: 4, verticalAlign: -1 }} /> {t.common.edit}
                </button>
              </div>
              <div style={{ height: 6, background: 'rgba(255,255,255,0.25)', borderRadius: 3, overflow: 'hidden', marginTop: 12 }}>
                <div style={{ height: '100%', width: `${Math.min(100, allocPct)}%`, background: C.surface, borderRadius: 3 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10, fontSize: 12 }}>
                <span style={{ opacity: 0.85 }}>{t.home.allocated} <strong>{fmt(allocated, t)}</strong></span>
                <span style={{ fontWeight: 600 }}>{isOver ? `${t.home.over} ${fmt(-unassigned, t)}` : `${t.home.free} ${fmt(unassigned, t)}`}</span>
              </div>
            </div>

            {/* Check-in prompt */}
            {needsCheckIn && (
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
                  <div style={{ ...s.metricValue, color: C.ink }}>{fmtShort(totalWealth, t)}</div>
                </div>
                <div style={s.metric}>
                  <div style={s.metricLabel}>{t.home.in10}</div>
                  <div style={{ ...s.metricValue, color: C.accent }}>{fmtShort(in10y, t)}</div>
                </div>
              </div>
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
                  return (
                    <div key={i} style={{ ...s.insightRow, background: C.accentSoft }}>
                      <div style={{ width: 28, height: 28, borderRadius: 8, background: C.surface, display: 'flex', alignItems: 'center', justifyContent: 'center', color: C.accent, flexShrink: 0 }}>
                        <Icon size={13} color={C.accent} strokeWidth={2} />
                      </div>
                      <div style={{ flex: 1, fontSize: 13, lineHeight: 1.4 }}>{ins.text}</div>
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
              <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', opacity: 0.85, marginBottom: 10 }}>{t.allocate.income}</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span style={{ fontSize: 24, opacity: 0.7 }}>{t.currencySymbol}</span>
                <MoneyInput value={salary} t={t} style={{ flex: 1, fontFamily: fontSans, fontSize: 32, fontWeight: 700, padding: 0, border: 'none', background: 'transparent', color: C.surface, outline: 'none', width: '100%', minWidth: 0, letterSpacing: '-0.02em' }} onChange={(v) => setSalary(v)} />
              </div>
              {salary > 0 && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: '1px solid rgba(255,255,255,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12 }}>
                  <span style={{ opacity: 0.85 }}>{t.allocate.total} <strong style={{ fontVariantNumeric: 'tabular-nums' }}>{fmt(allocated, t)}</strong></span>
                  <span style={{ fontWeight: 700, color: unassigned < 0 ? '#FFB89A' : C.surface, fontVariantNumeric: 'tabular-nums' }}>
                    {unassigned < 0 ? `${t.allocate.overIncome} ${fmt(-unassigned, t)}` : `${fmt(unassigned, t)} ${t.allocate.remaining.toLowerCase()}`}
                  </span>
                </div>
              )}
            </div>

            {/* Money flow bar */}
            {smartStep === null && (
              <div style={s.card}>
                <div style={{ ...s.cardLabel, marginBottom: 10 }}>{t.allocate.flow}</div>
                {allocated === 0 ? (
                  <div style={{ fontSize: 12, color: C.inkMuted, lineHeight: 1.5 }}>{t.allocate.moneyFlowEmpty}</div>
                ) : (
                  <>
                    <div style={{ display: 'flex', height: 14, borderRadius: 8, overflow: 'hidden', background: C.lineSoft }}>
                      {['needs', 'wants', 'wealth', 'debt'].map(p => {
                        const amt = pillarTotals[p] || 0;
                        if (amt === 0) return null;
                        const pct = (amt / allocated) * 100;
                        return <div key={p} style={{ width: `${pct}%`, background: t.allocate.pillars[p].color }} />;
                      })}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 12px', marginTop: 12 }}>
                      {['needs', 'wants', 'wealth', 'debt'].map(p => {
                        const amt = pillarTotals[p] || 0;
                        const pct = allocated > 0 ? Math.round((amt / allocated) * 100) : 0;
                        return (
                          <div key={p} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 10, height: 10, borderRadius: 3, background: t.allocate.pillars[p].color, flexShrink: 0 }} />
                            <span style={{ fontSize: 12, fontWeight: 500, color: C.ink, flex: 1 }}>{t.allocate.pillars[p].name}</span>
                            <span style={{ fontSize: 11, color: C.inkMuted, fontVariantNumeric: 'tabular-nums' }}>{pct}%</span>
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
                        <button key={tpl.key} onClick={() => applyTemplate(tpl.key)} style={{ flexShrink: 0, minWidth: 130, textAlign: 'left', padding: '10px 12px', borderRadius: 12, border: `1px solid ${C.line}`, background: C.surfaceAlt, cursor: 'pointer', fontFamily: fontSans }}>
                          <div style={{ fontSize: 12, fontWeight: 700, color: C.ink }}>{tpl.name}</div>
                          <div style={{ fontSize: 10, color: C.inkMuted, marginTop: 2 }}>{tpl.sub}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Smart Split questions */}
            {smartStep && smartStep !== 'result' && (
              <div style={s.card}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                  <div style={s.cardLabel}>{t.allocate.smart.title} · {t.allocate.smart.step(smartStep === 'q1' ? 1 : smartStep === 'q2' ? 2 : 3)}</div>
                  <button style={s.ghostBtn} onClick={() => { setSmartStep(null); setSmartAnswers({}); }}><X size={12} /></button>
                </div>
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
              </div>
            )}

            {/* Smart Split results */}
            {smartStep === 'result' && smartResult && (
              <>
                <div style={{ ...s.card, padding: '14px 16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: C.ink }}>{t.allocate.smart.title}</div>
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
                  onApply={() => applySmartSplit(smartResult.balanced)}
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
                  onApply={() => applySmartSplit(smartResult.focused)}
                  isFocused
                />
              </>
            )}

            {/* Pillars */}
            {['needs', 'wants', 'wealth', 'debt'].map(pillarKey => {
              const pillar = t.allocate.pillars[pillarKey];
              const pillarItems = itemsByPillar(pillarKey);
              const pillarTotal = pillarTotals[pillarKey] || 0;
              const pillarPct = allocated > 0 ? Math.round((pillarTotal / allocated) * 100) : 0;
              const targetPct = targetSplitPct ? targetSplitPct[pillarKey] : null;
              const diff = targetPct != null ? pillarPct - targetPct : null;
              const status = diff == null ? null : Math.abs(diff) < 5 ? 'ok' : diff > 0 ? 'over' : 'under';
              const statusColor = status === 'ok' ? C.accent : status ? C.yellow : C.inkMuted;
              const starters = (STARTER_ITEMS[lang] || STARTER_ITEMS.en)[pillarKey] || [];
              const targetAbs = Number(pillarTargets[pillarKey]) || 0;
              const isEditingTarget = editingPillarTarget === pillarKey;
              const overTarget = targetAbs > 0 && pillarTotal > targetAbs;

              return (
                <div key={pillarKey} style={s.card}>
                  <div style={s.pillarHeader}>
                    <div style={s.pillarDot(pillar.color)} />
                    <div style={{ flex: 1 }}>
                      <div style={s.pillarName}>{pillar.name}</div>
                      <div style={{ fontSize: 11, color: C.inkMuted, marginTop: 1 }}>{pillar.sub}</div>
                    </div>
                    <div style={{ textAlign: 'right', minWidth: 0 }}>
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
                      ) : targetPct != null && pillarTotal > 0 ? (
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
                  </div>

                  {pillarItems.length === 0 && (
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

                  {pillarItems.map(item => {
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
                            <div style={{ fontSize: 14, fontWeight: 500, lineHeight: 1.25, wordBreak: 'break-word', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.name}</div>
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
                            <button onClick={() => { removeItem(item.id); setEditingItemId(null); }} style={{ background: 'transparent', border: `1px solid ${C.lineSoft}`, color: C.red, padding: '8px 12px', borderRadius: 10, cursor: 'pointer', fontFamily: fontSans, fontSize: 12, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                              <Trash2 size={13} /> {t.common.delete}
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}

                  <button style={{ ...s.ghostBtn, marginTop: 10, border: `1px dashed ${C.line}`, borderRadius: 10, padding: '8px 14px', width: '100%', justifyContent: 'center' }} onClick={() => addItem(pillarKey)}>
                    <Plus size={12} /> {t.allocate.addItem}
                  </button>
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
                      <button key={tpl.key} onClick={() => applyTemplate(tpl.key)} style={{ flexShrink: 0, padding: '6px 12px', borderRadius: 999, border: `1px solid ${C.line}`, background: C.surface, cursor: 'pointer', fontFamily: fontSans, fontSize: 11, fontWeight: 600, color: C.inkSoft }}>
                        {tpl.name}
                      </button>
                    ))}
                  </div>
                )}
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
              const wealthItemsExist = items.some(i => i.pillar === 'wealth');
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
          </>
        )}

        {/* ============ GOALS ============ */}
        {tab === 'goals' && (
          <>
            <div style={{ marginBottom: 20 }}>
              <h1 style={s.h1}>{t.goals.title}</h1>
              <div style={s.sub}>{t.goals.sub}</div>
            </div>

            {goals.map(g => {
              const pct = g.target > 0 ? Math.round((g.current / g.target) * 100) : 0;
              const isEditing = editingGoalId === g.id;
              return (
                <div key={g.id} style={s.card}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                    <div style={s.rowIconBox}>{renderIcon(g.icon, 16, C.accent, 2)}</div>
                    {isEditing ? (
                      <input style={{ ...s.input, flex: 1, padding: '8px 12px', fontSize: 16 }} value={g.name} onChange={(e) => updateGoal(g.id, 'name', e.target.value)} />
                    ) : (
                      <div style={{ flex: 1, fontSize: 16, fontWeight: 600 }}>{g.name}</div>
                    )}
                    {isEditing ? (
                      <button style={s.ghostBtn} onClick={() => setEditingGoalId(null)}><Check size={14} /></button>
                    ) : (
                      <div style={{ ...s.num, fontSize: 18, color: g.type === 'debt' ? C.red : C.ink }}>{fmt(g.current, t)}</div>
                    )}
                  </div>

                  {!isEditing && (
                    <>
                      <div style={s.progressTrack}><div style={s.progressFill(pct)} /></div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 8, fontSize: 12, color: C.inkMuted }}>
                        <span>{fmt(0, t)}</span>
                        <span style={{ fontWeight: 600, color: C.ink }}>{pct}%</span>
                        <span>{fmt(g.target, t)}</span>
                      </div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10, fontSize: 12, color: C.inkSoft }}>
                        <span>{t.goals.monthly} <strong style={{ color: C.ink, ...s.num }}>{fmt(g.monthly, t)}</strong></span>
                        <button style={s.ghostBtn} onClick={() => setEditingGoalId(g.id)}><Pencil size={11} /> {t.goals.editGoal}</button>
                      </div>
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
                  <div style={{ ...s.cardLabel, marginBottom: 14 }}>{t.wealth.allocBalance}</div>

                  {currentRisk > 0 && (
                    <div style={{ marginBottom: 16, paddingBottom: 14, borderBottom: `1px solid ${C.lineSoft}` }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 8 }}>
                        <span style={{ fontSize: 11, color: C.inkMuted, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase' }}>{t.wealth.riskLabel}</span>
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
                            <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.growth} %</div>
                            <input type="number" inputMode="decimal" step="0.1" style={{ ...s.inputNum, width: '100%', textAlign: 'left' }} value={b.growth || ''} placeholder="0" onChange={(e) => updateBucket(b.id, 'growth', e.target.value)} />
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 10, color: C.inkMuted, marginBottom: 4, textTransform: 'uppercase', letterSpacing: '0.15em', fontWeight: 600 }}>{t.wealth.dividend} %</div>
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
                      <div style={{ fontSize: 12, color: C.inkSoft, fontWeight: 600 }}>{realMode ? t.forecast.real : t.forecast.nominal}</div>
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
          </>
        )}
      </div>

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
  const pillarMap = { housing: 'needs', utilities: 'needs', groceries: 'needs', transport: 'needs', lifestyle: 'wants', emergency: 'wealth', savings: 'wealth', investments: 'wealth', debt: 'debt' };
  const pillarTotals = { needs: 0, wants: 0, wealth: 0, debt: 0 };
  Object.entries(split).forEach(([k, v]) => { if (pillarMap[k]) pillarTotals[pillarMap[k]] += v; });

  const pillarOrder = ['needs', 'wants', 'wealth', 'debt'];

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
