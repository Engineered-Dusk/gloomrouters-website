(() => {
  'use strict';

  const ASSET_ROOT = '/assets/card-assets';
  const FACTIONS = ['aurora', 'vesper', 'nova'];
  const TYPE_FOLDER = { mech: 'mechs', node: 'nodes', module: 'modules', directive: 'directives', route: 'routes', pathing: 'pathing' };
  const TIMING_ICONS = {
    Attack: 'attack', Defense: 'defense', Aftermath: 'aftermath', Armistice: 'armistice', Deployment: 'deployment', Passive: 'passive', Refresh: 'refresh', Route: 'route', 'Attack or Defense': 'attack'
  };

  const CARDS = {
    dreadwake_breacher: { name: 'Dreadwake Breacher', type: 'mech', rarity: 'rare', cost: 4, ev: 3, flavorText: 'The first swing is only momentum for the second.', rulesText: 'Aftermath: If you won a Combat engagement with this Mech, ready it.' },
    blackcore_hauler: { name: 'Blackcore Hauler', type: 'mech', rarity: 'rare', cost: 5, ev: 4, flavorText: 'The spare power arrives with its serials burned off.', rulesText: 'Armistice: If you control a Ready Mech, add 2 Counterfeit Core cards to your hand.' },
    mute_guillotine: { name: 'Mute Guillotine', type: 'mech', rarity: 'rare', cost: 4, ev: 2, flavorText: 'Some names end in silence.', rulesText: 'Deployment: When you deploy this Mech from your hand, you may commit it to choose an opposing Mech with EV 2 or lower.\nDestroy the chosen Mech.' },
    whisper_net_skimmer: { name: 'Whisper Net Skimmer', type: 'mech', rarity: 'rare', cost: 4, ev: 2, flavorText: 'The silence is deafening.', rulesText: 'Aftermath: If you won a Tactical engagement with this Mech, draw 2 cards.' },
    ruinlight_grappler: { name: 'Ruinlight Grappler', type: 'mech', rarity: 'rare', cost: 4, ev: 3, flavorText: 'It drags the light into the old world.', rulesText: 'Attack: After this Mech wins an engagement, secure 1 Relic from the Relic Site.' },
    iron_decree_harbinger: { name: 'Iron Decree Harbinger', type: 'mech', rarity: 'rare', cost: 4, ev: 3, flavorText: 'Resistance thins when command arrives alone.', rulesText: 'Attack: While this Mech is attacking, if your opponent controls no Rare Mechs, this engagement cannot be defended.' },
    null_signal_anchor: { name: 'Null-Signal Anchor', type: 'mech', rarity: 'rare', cost: 3, ev: 3, flavorText: 'When the signal dies, only force remains.', rulesText: 'Attack or Defense: While this Mech is attacking or defending, your opponent cannot play Directives or trigger abilities on cards they control for this engagement.' },
    glimmermerk_lancer: { name: 'Glimmermerk Lancer', type: 'mech', rarity: 'rare', cost: 3, ev: 3, flavorText: 'A glaring lance in the darkness.', rulesText: 'Aftermath: If you won a Relic engagement by 4 or more EV with this Mech, ready it.' },
    heliostride_colossus: { name: 'Heliostride Colossus', type: 'mech', rarity: 'rare', cost: 6, ev: 6, flavorText: 'The Array follows in its wake.', rulesText: "Deployment: If you control another Rare Mech, reduce this Mech's CC by 1.\nAttack: After this Mech wins an engagement, secure 1 Relic from the Relic Site." },
    glasscore_launderer: { name: 'Glasscore Launderer', type: 'mech', rarity: 'rare', cost: 5, ev: 3, flavorText: "Things aren't always as they seem in the Gloom.", rulesText: 'Armistice: Discard all Counterfeit Core cards from your hand, if able.\nIf this Mech is Ready, gain 2 Cores.\nRefresh: Add 2 Counterfeit Core cards to your hand.' },
    ironhand_bulwark: { name: 'Ironhand Bulwark', type: 'mech', rarity: 'si', cost: 4, ev: 4, flavorText: 'Orders end where its armor begins.', rulesText: "Passive: This Mech cannot be chosen by opposing Mech abilities or Directives.\nAftermath: If this Mech was destroyed this engagement, put the top card of your opponent's deck into their discard pile." },
    compliance_interdictor: { name: 'Compliance Interdictor', type: 'mech', rarity: 'si', cost: 4, ev: 3, flavorText: 'A bend of will before a break of frame.', rulesText: 'Deployment: When you deploy this Mech from your hand, choose an opposing Mech.\nCommit that Mech.' },
    echo_breacher: { name: 'Echo Breacher', type: 'mech', rarity: 'si', cost: 3, ev: 2, flavorText: 'It leaves only to hit from a better angle.', rulesText: 'Aftermath: Once per round, after this Mech resolves an engagement, ready it.' },
    core_runner: { name: 'Core Runner', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'No armor. No escort.\nJust the battery.', rulesText: 'Deployment: When you deploy this Mech from your hand, gain 1 Core.' },
    ashwake_scavenger: { name: 'Ashwake Scavenger', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'Nothing burns too clean to recover.', rulesText: 'Aftermath: If this Mech was destroyed this engagement, generate Ashwake Recovery in your hand.' },
    bullhelm_charger: { name: 'Bullhelm Charger', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'No fittings. No patience.\nNo warning.', rulesText: 'Passive: Modules cannot be attached to this Mech.\nAttack: When this Mech attacks, choose an opposing Mech. The chosen Mech cannot defend this engagement.' },
    scrapwake_dropframe: { name: 'Scrapwake Dropframe', type: 'mech', rarity: 'si', cost: 2, ev: 1, flavorText: 'Tethered to wreckage.', rulesText: 'Aftermath: While this card is in your hand, if a friendly Mech was destroyed this engagement, you may deploy this Mech into the Corridor at no cost.\nLimit once per engagement.' },
    stormwall_phalanx: { name: 'Stormwall Phalanx', type: 'mech', rarity: 'si', cost: 5, ev: 6, flavorText: 'It holds because there is nowhere else to go.', rulesText: '' },
    vintage_lunchbox_project_10010: { name: 'Vintage Lunchbox Project 10010', type: 'mech', rarity: 'si', cost: 0, ev: 1, flavorText: 'There is such a thing as a free lunch.', rulesText: '' },
    gilded_decoy: { name: 'Gilded Decoy', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'It never pays the price itself.', rulesText: 'Passive: If this Mech would be destroyed or discarded from play, return it to your hand instead.' },
    lowband_siren: { name: 'Lowband Siren', type: 'mech', rarity: 'si', cost: 2, ev: 2, flavorText: 'An unnerving wavelength radiates outward.', rulesText: 'Attack: Before you declare this attack, you may commit this Mech to choose an opposing Mech with EV 2 or lower.\nThe chosen Mech must defend this engagement, if able.' },
    gloamveil_snare: { name: 'Gloamveil Snare', type: 'mech', rarity: 'si', cost: 2, ev: 1, flavorText: 'The burdened are easiest to turn.', rulesText: 'Attack or Defense: If your opponent has more Relics than you, commit this Mech to choose an opposing Mech.\nCommit the chosen Mech.' },
    static_clamp: { name: 'Static Clamp', type: 'mech', rarity: 'si', cost: 2, ev: 1, flavorText: 'The signal means nothing now.', rulesText: 'Attack or Defense: If this Mech is face down in the Gloom, reveal it to choose an SI Mech.\nIts text box is blank until end of engagement.' },
    circuit_scrubber: { name: 'Circuit Scrubber', type: 'mech', rarity: 'si', cost: 2, ev: 2, flavorText: 'The signal will carry clean or not at all.', rulesText: 'Deployment: When you deploy this Mech from your hand, you may commit it to choose an opposing Module.\nDiscard the chosen Module.' },
    lightspill_spotter: { name: 'Lightspill Spotter', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'It goes down shining the way back.', rulesText: 'Aftermath: If this Mech was destroyed this engagement, generate Prism Revector in your hand.' },
    lastlight_warden: { name: 'Lastlight Warden', type: 'mech', rarity: 'si', cost: 2, ev: 2, flavorText: 'The last light stands in first.', rulesText: 'Passive: The first time another friendly Mech would be destroyed each round, destroy this Mech instead.' },
    rare_parts_broker: { name: 'Rare Parts Broker', type: 'mech', rarity: 'si', cost: 1, ev: 1, flavorText: 'The right part costs less when nobody asks where it came from.', rulesText: 'Deployment: When you deploy this Mech from your hand, you may commit it.\nIf you do, reduce the CC of the next Rare Mech you deploy this phase by 1.' },
    hardlight_bastion: { name: 'Hardlight Bastion', type: 'mech', rarity: 'si', cost: 3, ev: 4, flavorText: 'No pilot. No pulse.\nJust light under orders.', rulesText: '' },
    hardlight_scout: { name: 'Hardlight Scout', type: 'mech', rarity: 'si', cost: 1, ev: 2, flavorText: 'A small answer from a distant sun.', rulesText: '' },
    salvage_broker_bot: { name: 'Salvage Broker Bot', type: 'mech', rarity: 'si', cost: 3, ev: 2, flavorText: 'Bought cheap.\nSent first.', rulesText: 'Deployment: When you deploy this Mech from your hand, gain 1 Core.' },
    reserve_relay: { name: 'Reserve Relay', type: 'node', rarity: 'neutral', cost: 1, flavorText: 'Idle power is still power.', rulesText: 'Refresh: Gain 1 Core.' },
    survey_relay: { name: 'Survey Relay', type: 'node', rarity: 'neutral', cost: 1, flavorText: 'A brief glimpse into the Gloom is enough.', rulesText: 'Deployment: When you deploy this Node from your hand, draw 1 card, then discard 1 card.\nRefresh: Gain 1 Core.' },
    scrapline_lens: { name: 'Scrapline Lens', type: 'node', rarity: 'neutral', cost: 1, flavorText: 'Nothing useful stays buried long.', rulesText: 'Deployment: When you deploy this Node from your hand, you may return the topmost Directive or Module from your discard pile to your hand.\nRefresh: Gain 1 Core.' },
    anchored_prism: { name: 'Anchored Prism', type: 'node', rarity: 'aurora', cost: 2, flavorText: 'Stable hosts draw cleaner power.', rulesText: 'Armistice: If you control a Ready Mech in the Corridor, gain 1 Core.\nRefresh: Gain 1 Core.' },
    corridor_splitter: { name: 'Corridor Splitter', type: 'node', rarity: 'aurora', cost: 2, flavorText: 'The first route opens cleanest.', rulesText: 'Refresh: Gain 1 Core.\nDeployment: The first time each round you deploy a Mech into the Corridor, reduce its CC by 1.' },
    recovery_lens: { name: 'Recovery Lens', type: 'node', rarity: 'aurora', cost: 2, flavorText: 'It marks the ruins worth dying over.', rulesText: 'Refresh: Gain 1 Core.\nAttack: The first time each round you win a Relic engagement, secure 1 Relic from the Relic Site.' },
    shade_siphon_splitter: { name: 'Shade Siphon Splitter', type: 'node', rarity: 'vesper', cost: 2, flavorText: 'The dark rewards those who can hold still.', rulesText: 'Refresh: Gain 1 Core.\nArmistice: If you control a face-down Mech or Ready Mech in the Gloom, gain 1 Core.' },
    gloam_lens: { name: 'Gloam Lens', type: 'node', rarity: 'vesper', cost: 2, flavorText: 'The dark shows only what it chooses.', rulesText: 'Refresh: Gain 1 Core.\nDeployment: The first time each round you deploy a Mech face down into the Gloom, draw 1 card.' },
    gloam_tithe_node: { name: 'Gloam Tithe Node', type: 'node', rarity: 'vesper', cost: 2, flavorText: 'Reaping rewards from the shadows.', rulesText: 'Refresh: Gain 1 Core.\nAttack: The first time each round you win a Tactical engagement, secure 1 Relic from the Relic Site.' },
    command_prism: { name: 'Command Prism', type: 'node', rarity: 'nova', cost: 2, flavorText: 'Authority stores its own voltage.', rulesText: 'Refresh: Gain 1 Core.\nDeployment: The first time each round you deploy a Rare Mech, gain 1 Core.' },
    shatter_splitter: { name: 'Shatter Splitter', type: 'node', rarity: 'nova', cost: 2, flavorText: 'Broken armor broadcasts beautifully.', rulesText: 'Refresh: Gain 1 Core.\nAftermath: The first time each round you win a Combat engagement, draw 1 card.' },
    breach_lens: { name: 'Breach Lens', type: 'node', rarity: 'nova', cost: 2, flavorText: 'Extreme force is a universal language.', rulesText: 'Refresh: Gain 1 Core.\nAttack: If you win a Combat engagement, secure 1 Relic from the Relic Site.' },
    salvage_plating: { name: 'Salvage Plating', type: 'module', rarity: 'neutral', cost: 2, flavorText: 'The shell outlasts the order that built it.', rulesText: 'Passive: Attached Mech gets +1 EV.\nPassive: If attached Mech would be destroyed, destroy this Module instead of that Mech.' },
    signal_scope: { name: 'Signal Scope', type: 'module', rarity: 'neutral', cost: 1, flavorText: 'The lens is cracked.\nThe aim is not.', rulesText: 'Passive: Attached Mech gets +1 EV while attacking.\nDeployment: When you attach this Module, draw 1 card, then discard 1 card.' },
    vector_harness: { name: 'Vector Harness', type: 'module', rarity: 'neutral', cost: 1, flavorText: 'Cold calculation.', rulesText: 'Deployment: When you attach this Module, draw 1 card.\nPassive: Attached Mech gets +1 EV.' },
    prism_calibrator: { name: 'Prism Calibrator', type: 'module', rarity: 'aurora', cost: 1, flavorText: 'The smallest adjustments have the largest consequences.', rulesText: 'Passive: Attached Mech gets +1 EV.\nDeployment: When you attach this Module, generate Prism Revector in your hand.' },
    null_mantle: { name: 'Null Mantle', type: 'module', rarity: 'vesper', cost: 1, flavorText: 'The Gloom fits like a second hull.', rulesText: 'Passive: Attached Mech gets +1 EV.\nDeployment: When you attach this Module, if attached Mech is in the Gloom, draw 1 card.' },
    impact_calibrator: { name: 'Impact Calibrator', type: 'module', rarity: 'nova', cost: 1, flavorText: 'Force is cleaner when calculated.', rulesText: 'Passive: Attached Mech gets +1 EV.\nDeployment: When you attach this Module, generate Predatory Geometry in your hand.' },
    predatory_geometry: { name: 'Predatory Geometry', type: 'directive', rarity: 'nova', cost: 0, flavorText: 'The angle kills before the shot does.', rulesText: 'Attack: Commit a Ready Mech you control, then choose an attacking Mech.\nIt gets +2 EV until end of engagement. If you win this engagement, draw 2 cards. Limit 1 per engagement.' },
    breach_reckoning: { name: 'Breach Reckoning', type: 'directive', rarity: 'nova', cost: 0, flavorText: 'Losses are paid in metal.', rulesText: 'Defense: Choose 1 Ready, friendly Mech and 1 opposing, attacking Mech.\nIf you lose this engagement, commit the chosen friendly Mech to destroy the chosen attacking Mech.' },
    node_annexation: { name: 'Node Annexation', type: 'directive', rarity: 'aurora', cost: 0, flavorText: 'Relics are not the only thing taken.', rulesText: 'Attack: Choose an opposing Node.\nIf you win a Relic engagement this attack, take control of the chosen Node.' },
    hardlight_muster: { name: 'Hardlight Muster', type: 'directive', rarity: 'aurora', cost: 0, flavorText: 'The Array answers in shapes built to survive.', rulesText: 'Deployment: Choose one: generate a Hardlight Bastion card (CC 3, EV 4) in your hand, or generate a Hardlight Scout card (CC 1, EV 2) in your hand.' },
    prism_lockdown: { name: 'Prism Lockdown', type: 'directive', rarity: 'aurora', cost: 0, flavorText: 'A blinding coordination of angles.', rulesText: 'Defense: If you control 2 or more Nodes, add +4 EV to your defense total.' },
    nova_signal_trace: { name: 'Nova Signal Trace', type: 'directive', rarity: 'nova', cost: 0, flavorText: 'Follow the stronger signal.', rulesText: 'Deployment: If you control more Nodes than your opponent, draw 2 cards from your deck.\nIf your opponent controls more Nodes than you, discard the top 2 cards from their deck.' },
    gloam_override: { name: 'Gloam Override', type: 'directive', rarity: 'vesper', cost: 0, flavorText: 'The unforeseen force of invisible light.', rulesText: 'Attack: Choose an opposing SI Mech.\nIf you win this Relic engagement by 4 or more EV, take control of the chosen Mech.' },
    prism_revector: { name: 'Prism Revector', type: 'directive', rarity: 'neutral', cost: 0, flavorText: 'Even a Mech can find beauty in its majesty.', rulesText: 'Attack or Defense: Choose 1 committed friendly Rare Mech.\nReady it.' },
    emergency_requisition: { name: 'Emergency Requisition', type: 'directive', rarity: 'neutral', cost: 0, flavorText: 'The Spectres call it logistics when it works.', rulesText: 'Deployment: Lose 1 Relic.\nReveal a random Mech, Node, and Module from your deck, add them to your hand, then shuffle.' },
    holographic_hallucinations: { name: 'Holographic Hallucinations', type: 'directive', rarity: 'vesper', cost: 0, flavorText: 'It was right here...', rulesText: "Attack: Choose an opposing Mech with EV 2 or lower.\nReturn it to its owner's hand." },
    black_market_bots: { name: 'Black Market Bots', type: 'directive', rarity: 'vesper', cost: 0, flavorText: 'Save your fair trades for the Twilights.', rulesText: 'Deployment: To play this Directive, lose 1 Relic.\nGenerate 2 Salvage Broker Bot cards in your hand.' }
  };

  const DECKS = {
    aurora: { name: 'Aurora', mainDeck: [['compliance_interdictor',1],['echo_breacher',2],['glimmermerk_lancer',1],['heliostride_colossus',1],['ironhand_bulwark',1],['ruinlight_grappler',1],['stormwall_phalanx',1],['core_runner',2],['lastlight_warden',2],['lightspill_spotter',2],['rare_parts_broker',1],['vintage_lunchbox_project_10010',1],['recovery_lens',1],['corridor_splitter',1],['anchored_prism',1],['reserve_relay',1],['scrapline_lens',1],['survey_relay',1],['emergency_requisition',1],['hardlight_muster',1],['node_annexation',1],['prism_lockdown',1],['prism_revector',1],['prism_calibrator',1],['vector_harness',1],['salvage_plating',1]] },
    vesper: { name: 'Vesper', mainDeck: [['compliance_interdictor',1],['echo_breacher',1],['glasscore_launderer',1],['ironhand_bulwark',1],['mute_guillotine',1],['null_signal_anchor',1],['stormwall_phalanx',1],['whisper_net_skimmer',1],['ashwake_scavenger',1],['gilded_decoy',1],['gloamveil_snare',2],['static_clamp',2],['lowband_siren',1],['vintage_lunchbox_project_10010',1],['gloam_lens',1],['gloam_tithe_node',1],['shade_siphon_splitter',1],['reserve_relay',1],['scrapline_lens',1],['survey_relay',1],['emergency_requisition',1],['black_market_bots',1],['gloam_override',1],['holographic_hallucinations',1],['prism_revector',1],['null_mantle',1],['vector_harness',1],['signal_scope',1]] },
    nova: { name: 'Nova', mainDeck: [['blackcore_hauler',1],['compliance_interdictor',1],['echo_breacher',1],['iron_decree_harbinger',1],['ironhand_bulwark',2],['dreadwake_breacher',1],['stormwall_phalanx',1],['bullhelm_charger',2],['circuit_scrubber',2],['core_runner',1],['rare_parts_broker',1],['scrapwake_dropframe',2],['breach_lens',1],['command_prism',1],['shatter_splitter',1],['reserve_relay',1],['scrapline_lens',1],['survey_relay',1],['breach_reckoning',1],['emergency_requisition',1],['nova_signal_trace',1],['predatory_geometry',1],['prism_revector',1],['impact_calibrator',1],['salvage_plating',1],['signal_scope',1]] }
  };

  Object.entries(CARDS).forEach(([id, card]) => { card.id = id; });

  function asset(path) { return `${ASSET_ROOT}/${path}`; }
  function artSrc(card) { return asset(`${TYPE_FOLDER[card.type]}/${card.id}.png`); }
  function frameSrc(faction, card) { return card.type === 'route' || card.type === 'pathing' ? asset(`route-frames/${faction}-route-frame.png`) : asset(`frames/${faction}-frame.png`); }
  function iconSrc(name) { return asset(`icons/${name}.png`); }
  function backgroundFor(faction) { return asset(`backgrounds/${faction === 'vesper' ? 'gloom' : faction === 'nova' ? 'neutral' : 'corridor'}-pixel.png`); }
  function fitClass(text, prefix = '') {
    const len = (text || '').replace(/[^A-Za-z0-9]/g, '').length;
    if (len >= 22) return `${prefix}fit-extra-long`;
    if (len >= 17) return `${prefix}fit-long`;
    if (len >= 13) return `${prefix}fit-medium`;
    return '';
  }
  function rulesFitClass(card) {
    const rows = parseRules(card.rulesText);
    const len = [card.flavorText || '', ...rows.map(r => `${r.label || ''} ${r.text}`)].join(' ').replace(/[^A-Za-z0-9]/g, '').length;
    const count = rows.length + (card.flavorText ? 1 : 0);
    if (len >= 220) return 'fit-extra-long';
    if ((count >= 2 && len >= 95) || len >= 125) return 'fit-long';
    if (len >= 95) return 'fit-medium';
    return '';
  }
  function parseRules(text) {
    if (!text) return [];
    return text.split('\n').filter(Boolean).map(line => {
      const label = Object.keys(TIMING_ICONS).sort((a, b) => b.length - a.length).find(key => line.startsWith(`${key}:`));
      return label ? { label, text: line.slice(label.length + 1).trim(), icon: TIMING_ICONS[label] } : { text: line };
    });
  }
  function el(tag, className, attrs = {}) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    Object.entries(attrs).forEach(([key, value]) => {
      if (key === 'text') node.textContent = value;
      else if (value !== undefined && value !== null) node.setAttribute(key, value);
    });
    return node;
  }
  function appendImg(parent, className, src, alt = '') {
    const img = el('img', className, { src, alt, loading: 'lazy', decoding: 'async' });
    parent.append(img);
    return img;
  }
  function renderRules(parent, rows) {
    rows.forEach(row => {
      const p = el('p', row.icon ? 'rule-row rule-row--icon' : 'rule-row');
      if (row.icon) appendImg(p, '', iconSrc(row.icon), '');
      const span = el('span', '');
      if (row.label) {
        const strong = el('strong', '', { text: `${row.label}: ` });
        span.append(strong, document.createTextNode(row.text));
      } else span.textContent = row.text;
      p.append(span);
      parent.append(p);
    });
  }
  function renderCard(card, faction) {
    const landscape = card.type === 'route' || card.type === 'pathing';
    const root = el('article', `rendered-card rendered-card--${card.type}${card.type !== 'mech' ? ' rendered-card--support' : ''}${landscape ? ' rendered-card--landscape' : ''}`, { 'aria-label': `${card.name} ${card.type} card` });
    const art = el('div', 'card-art-window');
    if (card.type === 'mech') appendImg(art, 'card-art-bg', backgroundFor(faction), '');
    appendImg(art, card.type === 'mech' ? 'card-art-main' : 'card-art-main', artSrc(card), '');
    root.append(art);
    appendImg(root, 'card-frame', frameSrc(faction, card), '');

    if (landscape) {
      [['cores', 'core'], ['draw', 'draw'], ['magnitude', 'magnitude']].forEach(([slot, icon]) => {
        const stat = el('div', `route-stat route-stat--${slot}`);
        appendImg(stat, '', iconSrc(icon), '');
        stat.append(el('strong', '', { text: card[`route${slot[0].toUpperCase()}${slot.slice(1)}`] ?? 0 }));
        root.append(stat);
      });
      root.append(el('div', `landscape-name ${fitClass(card.name)}`, { text: card.name }));
      const text = el('div', `landscape-text ${rulesFitClass(card)}`);
      if (card.flavorText) text.append(el('div', 'landscape-flavor', { text: card.flavorText }));
      renderRules(text, parseRules(card.rulesText));
      root.append(text);
      return root;
    }

    const topIcon = el('div', card.type === 'mech' ? 'card-icon card-icon--ev' : 'card-icon card-icon--type');
    appendImg(topIcon, '', iconSrc(card.type === 'mech' ? 'ev' : card.type), '');
    if (card.type === 'mech') topIcon.append(el('strong', '', { text: card.ev }));
    root.append(topIcon);

    const cost = el('div', 'card-icon card-icon--cost');
    appendImg(cost, '', iconSrc('core-cost'), '');
    cost.append(el('strong', '', { text: card.cost }));
    root.append(cost);
    root.append(el('div', `card-name ${fitClass(card.name)}`, { text: card.name }));
    if (card.rarity === 'rare' || card.rarity === 'si') {
      const rarity = el('div', 'card-rarity');
      appendImg(rarity, '', iconSrc(card.rarity), `${card.rarity} rarity`);
      root.append(rarity);
    }
    if (card.flavorText) root.append(el('div', 'card-flavor', { text: card.flavorText }));
    const rows = parseRules(card.rulesText);
    if (rows.length) {
      const rules = el('div', `card-rules ${rulesFitClass(card)}`);
      renderRules(rules, rows);
      root.append(rules);
    }
    return root;
  }
  function expandedDeck(faction) {
    return DECKS[faction].mainDeck.flatMap(([id, count]) => Array.from({ length: count }, (_, copyIndex) => ({ id, copyIndex, card: CARDS[id] })));
  }
  function renderPage() {
    const root = document.getElementById('card-browser');
    if (!root) return;
    const fragment = document.createDocumentFragment();
    FACTIONS.forEach(faction => {
      const deckCards = expandedDeck(faction);
      const section = el('section', 'deck-section', { 'data-faction': faction, 'aria-labelledby': `${faction}-heading` });
      const heading = el('div', 'deck-heading');
      heading.append(el('h2', '', { id: `${faction}-heading`, text: DECKS[faction].name }));
      heading.append(el('div', 'deck-count', { text: `${deckCards.length} main-deck cards` }));
      section.append(heading);
      const grid = el('div', 'card-grid');
      deckCards.forEach(({ id, copyIndex, card }) => {
        const button = el('button', 'card-tile', { type: 'button', 'data-card-id': id, 'data-faction': faction, 'aria-label': `${DECKS[faction].name} ${card.name} copy ${copyIndex + 1}` });
        button.append(renderCard(card, faction));
        grid.append(button);
      });
      section.append(grid);
      fragment.append(section);
    });
    root.replaceChildren(fragment);
  }
  function renderHomepageShowcase() {
    const root = document.getElementById('homepage-card-showcase');
    if (!root) return;

    const featuredCards = [
      ['echo_breacher', 'aurora'],
      ['stormwall_phalanx', 'aurora'],
      ['survey_relay', 'aurora'],
      ['prism_calibrator', 'aurora'],
      ['vintage_lunchbox_project_10010', 'aurora'],
      ['iron_decree_harbinger', 'nova'],
      ['ashwake_scavenger', 'vesper'],
      ['whisper_net_skimmer', 'vesper'],
      ['gilded_decoy', 'vesper']
    ];

    const fragment = document.createDocumentFragment();
    featuredCards.forEach(([id, faction]) => {
      const card = CARDS[id];
      if (!card) return;
      const item = el('div', 'card-showcase__item');
      item.append(renderCard(card, faction));
      fragment.append(item);
    });
    root.replaceChildren(fragment);
  }

  function cloneRenderedCard(tile) {
    const card = tile.querySelector('.rendered-card');
    return card ? card.cloneNode(true) : null;
  }
  function setupInteraction() {
    const preview = document.getElementById('hover-preview');
    const modal = document.getElementById('card-modal');
    if (!preview || !modal) return;
    const modalContent = modal.querySelector('.card-modal__content');
    const close = modal.querySelector('.card-modal__close');
    if (!modalContent || !close) return;
    const finePointer = matchMedia('(pointer: fine)').matches;
    document.addEventListener('mouseover', event => {
      if (!finePointer) return;
      const tile = event.target.closest('.card-tile');
      if (!tile) return;
      const clone = cloneRenderedCard(tile);
      if (!clone) return;
      preview.replaceChildren(clone);
      preview.classList.add('is-visible');
      preview.setAttribute('aria-hidden', 'false');
    });
    document.addEventListener('focusin', event => {
      if (!finePointer) return;
      const tile = event.target.closest('.card-tile');
      if (!tile) return;
      const clone = cloneRenderedCard(tile);
      if (!clone) return;
      preview.replaceChildren(clone);
      preview.classList.add('is-visible');
      preview.setAttribute('aria-hidden', 'false');
    });
    document.addEventListener('mouseout', event => {
      if (!finePointer || !event.target.closest('.card-tile')) return;
      preview.classList.remove('is-visible');
      preview.setAttribute('aria-hidden', 'true');
    });
    document.addEventListener('focusout', event => {
      if (!finePointer || !event.target.closest('.card-tile')) return;
      preview.classList.remove('is-visible');
      preview.setAttribute('aria-hidden', 'true');
    });
    document.addEventListener('click', event => {
      const tile = event.target.closest('.card-tile');
      if (!tile) return;
      const clone = cloneRenderedCard(tile);
      if (!clone) return;
      modalContent.replaceChildren(clone);
      modal.hidden = false;
      close.focus({ preventScroll: true });
    });
    function closeModal() { modal.hidden = true; modalContent.replaceChildren(); }
    close.addEventListener('click', closeModal);
    modal.addEventListener('click', event => { if (event.target === modal) closeModal(); });
    document.addEventListener('keydown', event => { if (event.key === 'Escape' && !modal.hidden) closeModal(); });
  }
  function validate() {
    const counts = Object.fromEntries(FACTIONS.map(f => [DECKS[f].name, expandedDeck(f).length]));
    const total = Object.values(counts).reduce((sum, count) => sum + count, 0);
    const missingDefs = FACTIONS.flatMap(f => expandedDeck(f).filter(entry => !entry.card).map(entry => entry.id));
    console.info('Gloom Routers card browser validation', { counts, total, missingDefs });
  }

  renderPage();
  renderHomepageShowcase();
  setupInteraction();
  validate();
})();
