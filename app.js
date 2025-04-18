// Mock data for partners and opportunities
const mockData = [
  { partner: "Dell", opportunities: [] },
  { partner: "Cisco", opportunities: [] },
  { partner: "HPE", opportunities: [] },
  { partner: "NetApp", opportunities: [] },
  { partner: "Pure Storage", opportunities: [] },
  { partner: "VAST", opportunities: [] },
  { partner: "Hammerspace", opportunities: [] },
  { partner: "VMware", opportunities: [] },
  { partner: "Microsoft", opportunities: [] },
  { partner: "Red Hat", opportunities: [] },
  { partner: "Nutanix", opportunities: [] },
  { partner: "Rubrik", opportunities: [] },
  { partner: "Druva", opportunities: [] },
  { partner: "Cohesity", opportunities: [] },
  { partner: "VEEAM", opportunities: [] },
  { partner: "AWS", opportunities: [] },
  { partner: "Azure", opportunities: [] },
  { partner: "HashiCorp", opportunities: [] },
  { partner: "DataDobi", opportunities: [] },
  { partner: "Komprise", opportunities: [] },
  { partner: "Orchestry", opportunities: [] },
  { partner: "Palo Alto", opportunities: [] },
  { partner: "Okta", opportunities: [] },
  { partner: "Juniper", opportunities: [] }
];

const companyNames = [
  "Globex Corp", "Initech", "Umbrella Inc", "Soylent LLC", "Hooli", "Stark Industries", "Wayne Enterprises", "Wonka Industries", "Cyberdyne Systems", "Aperture Science", "Gekko & Co", "Duff Brewing", "Oceanic Airlines", "Acme Corp", "Monsters Inc", "Gringotts Bank", "Oscorp", "Pied Piper", "Vandelay Industries", "Massive Dynamic", "Virtucon", "Tyrell Corp"
];

// Helper to generate random opportunities for all partners
function addSampleOpportunities() {
  const statuses = ["Closed Won", "Closed Lost", "Forecasted"];
  const reps = ["Jane Doe", "John Lee", "Chris Ray", "Morgan Lee", "Sara Kim", "Robin Chan", "Alex Smith", "Jordan Wu"];
  const sas = ["Alex Smith", "Morgan Lee", "Robin Chan", "Jordan Wu", "Taylor Fox", "Jamie Park"];
  const today = new Date();
  const getRandomAmount = () => {
    // $15,000 to $2,000,000
    return Math.floor(Math.random() * (2000000 - 15000 + 1)) + 15000;
  };
  const getRandomGP = rev => Math.floor(rev * (0.12 + Math.random() * 0.13)); // 12%-25% GP
  const getRandomDate = (status, period) => {
    let d = new Date(today);
    if (period === 'week') {
      d.setDate(today.getDate() - Math.floor(Math.random() * 7));
    } else if (period === 'month') {
      d.setDate(today.getDate() - Math.floor(Math.random() * 30));
    } else if (period === 'quarter') {
      d.setDate(today.getDate() - Math.floor(Math.random() * 90));
    } else {
      if (status === "Forecasted") {
        d.setDate(today.getDate() + Math.floor(Math.random() * 180) + 1);
      } else {
        d.setDate(today.getDate() - Math.floor(Math.random() * 365));
      }
    }
    return d.toISOString().slice(0,10);
  };
  mockData.forEach((partner, idx) => {
    partner.opportunities = [];
    // Weekly
    for (let i = 0; i < 6; ++i) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const revenue = getRandomAmount();
      partner.opportunities.push({
        name: `${partner.partner} Weekly Opp ${i+1}`,
        status: status,
        revenue: revenue,
        grossProfit: getRandomGP(revenue),
        salesRep: reps[(idx + i) % reps.length],
        sa: sas[(idx + i) % sas.length],
        closeDate: getRandomDate(status, 'week'),
        company: companyNames[Math.floor(Math.random() * companyNames.length)]
      });
    }
    // Monthly
    for (let i = 0; i < 6; ++i) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const revenue = getRandomAmount();
      partner.opportunities.push({
        name: `${partner.partner} Monthly Opp ${i+1}`,
        status: status,
        revenue: revenue,
        grossProfit: getRandomGP(revenue),
        salesRep: reps[(idx + i + 6) % reps.length],
        sa: sas[(idx + i + 6) % sas.length],
        closeDate: getRandomDate(status, 'month'),
        company: companyNames[Math.floor(Math.random() * companyNames.length)]
      });
    }
    // Quarterly
    for (let i = 0; i < 6; ++i) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const revenue = getRandomAmount();
      partner.opportunities.push({
        name: `${partner.partner} Quarterly Opp ${i+1}`,
        status: status,
        revenue: revenue,
        grossProfit: getRandomGP(revenue),
        salesRep: reps[(idx + i + 12) % reps.length],
        sa: sas[(idx + i + 12) % sas.length],
        closeDate: getRandomDate(status, 'quarter'),
        company: companyNames[Math.floor(Math.random() * companyNames.length)]
      });
    }
    // Additional random opps for year
    const oppCount = Math.floor(Math.random() * 13) + 10; // 10-22
    for (let i = 0; i < oppCount; ++i) {
      const status = statuses[Math.floor(Math.random() * statuses.length)];
      const revenue = getRandomAmount();
      partner.opportunities.push({
        name: `${partner.partner} Opp ${i+1}`,
        status: status,
        revenue: revenue,
        grossProfit: getRandomGP(revenue),
        salesRep: reps[(idx + i + 18) % reps.length],
        sa: sas[(idx + i + 18) % sas.length],
        closeDate: getRandomDate(status, null),
        company: companyNames[Math.floor(Math.random() * companyNames.length)]
      });
    }
  });
}

addSampleOpportunities();

const timeFilter = document.getElementById('time-filter');
const yearSelect = document.getElementById('year-select');
const tableBody = document.querySelector('#dashboard-table tbody');
const modal = document.getElementById('details-modal');
const modalBody = document.getElementById('modal-body');
const closeBtn = document.querySelector('.close-btn');

function getTimeRange(filter, year) {
  const now = new Date();
  let baseYear = year ? parseInt(year) : now.getFullYear();
  if (filter === 'week') {
    let start, end;
    if (baseYear === now.getFullYear()) {
      start = new Date(now); start.setDate(now.getDate() - now.getDay());
      end = now;
    } else {
      start = new Date(baseYear, 0, 1);
      end = new Date(baseYear, 0, 7);
    }
    return { start, end };
  }
  if (filter === 'month') {
    let start, end;
    if (baseYear === now.getFullYear()) {
      start = new Date(now.getFullYear(), now.getMonth(), 1);
      end = now;
    } else {
      start = new Date(baseYear, 0, 1);
      end = new Date(baseYear, 0, 31);
    }
    return { start, end };
  }
  if (filter === 'quarter') {
    let start, end;
    if (baseYear === now.getFullYear()) {
      const quarter = Math.floor((now.getMonth() + 3) / 3);
      start = new Date(now.getFullYear(), (quarter - 1) * 3, 1);
      end = now;
    } else {
      start = new Date(baseYear, 0, 1);
      end = new Date(baseYear, 2, 31);
    }
    return { start, end };
  }
  if (filter === 'year') {
    const start = new Date(baseYear, 0, 1);
    const end = new Date(baseYear, 11, 31, 23, 59, 59);
    return { start, end };
  }
}

function filterOpportunities(opps, filter, year) {
  const { start, end } = getTimeRange(filter, year);
  return opps.filter(opp => {
    const close = new Date(opp.closeDate);
    return close >= start && close <= end;
  });
}

function aggregate(partner, filter, year) {
  const filtered = filterOpportunities(partner.opportunities, filter, year);
  let closedWon = { rev: 0, gp: 0, opps: [] };
  let closedLost = { rev: 0, gp: 0, opps: [] };
  let forecast = { rev: 0, gp: 0, opps: [] };
  filtered.forEach(opp => {
    if (opp.status === 'Closed Won') {
      closedWon.rev += opp.revenue;
      closedWon.gp += opp.grossProfit;
      closedWon.opps.push(opp);
    } else if (opp.status === 'Closed Lost') {
      closedLost.rev += opp.revenue;
      closedLost.gp += opp.grossProfit;
      closedLost.opps.push(opp);
    } else if (opp.status === 'Forecasted') {
      forecast.rev += opp.revenue;
      forecast.gp += opp.grossProfit;
      forecast.opps.push(opp);
    }
  });
  return { closedWon, closedLost, forecast };
}

// --- Sorting Logic ---
let currentSort = { col: null, dir: 'asc' };

function sortData(data, filter, col, dir, year) {
  // Aggregate for all partners
  const aggData = data.map(partner => {
    const agg = aggregate(partner, filter, year);
    return {
      partner: partner.partner,
      closedWon: agg.closedWon.rev,
      closedLost: agg.closedLost.rev,
      forecast: agg.forecast.rev,
      _agg: agg,
      _partner: partner
    };
  });
  let key = col;
  aggData.sort((a, b) => {
    let v1 = a[key], v2 = b[key];
    if (key === 'partner') {
      v1 = v1.toLowerCase(); v2 = v2.toLowerCase();
      if (v1 < v2) return dir === 'asc' ? -1 : 1;
      if (v1 > v2) return dir === 'asc' ? 1 : -1;
      return 0;
    } else {
      return dir === 'asc' ? v1 - v2 : v2 - v1;
    }
  });
  return aggData.map(x => x._partner);
}

function clearSortIndicators() {
  document.querySelectorAll('.sortable').forEach(th => {
    th.classList.remove('sorted-asc', 'sorted-desc');
  });
}

function renderTable(filter, year) {
  tableBody.innerHTML = '';
  let dataToRender = mockData;
  if (currentSort.col) {
    dataToRender = sortData(mockData, filter, currentSort.col, currentSort.dir, year);
  }
  let totalWon = 0, totalWonGP = 0, totalLost = 0, totalLostGP = 0, totalForecast = 0, totalForecastGP = 0;
  dataToRender.forEach((partner, idx) => {
    const agg = aggregate(partner, filter, year);
    totalWon += agg.closedWon.rev;
    totalWonGP += agg.closedWon.gp;
    totalLost += agg.closedLost.rev;
    totalLostGP += agg.closedLost.gp;
    totalForecast += agg.forecast.rev;
    totalForecastGP += agg.forecast.gp;
    const row = document.createElement('tr');
    // Partner cell clickable
    const partnerCell = document.createElement('td');
    const partnerLink = document.createElement('a');
    partnerLink.textContent = partner.partner;
    partnerLink.className = 'partner-link';
    partnerLink.href = '#';
    partnerLink.onclick = e => {
      e.preventDefault();
      showOpportunities(partner.partner, filter, year);
    };
    partnerCell.appendChild(partnerLink);
    row.appendChild(partnerCell);
    // Closed Won
    const wonCell = document.createElement('td');
    const wonLink = document.createElement('span');
    wonLink.className = 'value-link';
    wonLink.textContent = `$${agg.closedWon.rev.toLocaleString()} ($${agg.closedWon.gp.toLocaleString()})`;
    wonLink.onclick = () => showOpportunities(partner.partner, filter, year, 'Closed Won');
    wonCell.appendChild(wonLink);
    row.appendChild(wonCell);
    // Closed Lost (hyperlinked)
    const lostCell = document.createElement('td');
    const lostLink = document.createElement('span');
    lostLink.className = 'value-link';
    lostLink.textContent = `$${agg.closedLost.rev.toLocaleString()} ($${agg.closedLost.gp.toLocaleString()})`;
    lostLink.onclick = () => showOpportunities(partner.partner, filter, year, 'Closed Lost');
    lostCell.appendChild(lostLink);
    row.appendChild(lostCell);
    // Forecasted (hyperlinked)
    const forecastCell = document.createElement('td');
    const forecastLink = document.createElement('span');
    forecastLink.className = 'value-link';
    forecastLink.textContent = `$${agg.forecast.rev.toLocaleString()} ($${agg.forecast.gp.toLocaleString()})`;
    forecastLink.onclick = () => showOpportunities(partner.partner, filter, year, 'Forecasted');
    forecastCell.appendChild(forecastLink);
    row.appendChild(forecastCell);
    tableBody.appendChild(row);
  });
  // Add totals row
  const totalRow = document.createElement('tr');
  totalRow.className = 'totals-row';
  const totalLabel = document.createElement('td');
  totalLabel.style.fontWeight = 'bold';
  totalLabel.textContent = 'TOTALS';
  totalRow.appendChild(totalLabel);
  const totalWonCell = document.createElement('td');
  totalWonCell.style.fontWeight = 'bold';
  totalWonCell.textContent = `$${totalWon.toLocaleString()} ($${totalWonGP.toLocaleString()})`;
  totalRow.appendChild(totalWonCell);
  const totalLostCell = document.createElement('td');
  totalLostCell.style.fontWeight = 'bold';
  totalLostCell.textContent = `$${totalLost.toLocaleString()} ($${totalLostGP.toLocaleString()})`;
  totalRow.appendChild(totalLostCell);
  const totalForecastCell = document.createElement('td');
  totalForecastCell.style.fontWeight = 'bold';
  totalForecastCell.textContent = `$${totalForecast.toLocaleString()} ($${totalForecastGP.toLocaleString()})`;
  totalRow.appendChild(totalForecastCell);
  tableBody.appendChild(totalRow);
  // Update sort indicators
  clearSortIndicators();
  if (currentSort.col) {
    const th = document.querySelector(`th[data-sort="${currentSort.col}"]`);
    if (th) th.classList.add(currentSort.dir === 'asc' ? 'sorted-asc' : 'sorted-desc');
  }
}

function showOpportunities(partnerName, filter, year, status) {
  const partner = mockData.find(p => p.partner === partnerName);
  if (!partner) return;
  let opps = filterOpportunities(partner.opportunities, filter, year);
  if (status) opps = opps.filter(o => o.status === status);
  let html = `<h2>${partnerName} - Opportunities`;
  if (status) html += ` (${status})`;
  html += '</h2>';
  if (opps.length === 0) {
    html += '<p>No opportunities found for this filter.</p>';
  } else {
    let totalRev = 0, totalGP = 0;
    html += `<table><thead><tr><th>Name</th><th>Company</th><th>Status</th><th>Revenue</th><th>Gross Profit</th><th>Sales Rep</th><th>SA</th><th>Close Date</th></tr></thead><tbody>`;
    opps.forEach(opp => {
      totalRev += opp.revenue;
      totalGP += opp.grossProfit;
      html += `<tr><td>${opp.name}</td><td>${opp.company}</td><td>${opp.status}</td><td>$${opp.revenue.toLocaleString()}</td><td>$${opp.grossProfit.toLocaleString()}</td><td>${opp.salesRep}</td><td>${opp.sa}</td><td>${opp.closeDate}</td></tr>`;
    });
    // Totals row
    html += `<tr style='font-weight:bold;background:#f0f2f6;'><td colspan='3'>TOTALS</td><td>$${totalRev.toLocaleString()}</td><td>$${totalGP.toLocaleString()}</td><td colspan='3'></td></tr>`;
    html += '</tbody></table>';
  }
  modalBody.innerHTML = html;
  // Add export button
  const btn = addExportModalBtn(partnerName, filter, year, status);
  modalBody.prepend(btn);
  modal.classList.remove('hidden');
}

closeBtn.onclick = () => modal.classList.add('hidden');
window.onclick = function(event) {
  if (event.target === modal) modal.classList.add('hidden');
};

timeFilter.onchange = () => renderTable(timeFilter.value, yearSelect.value);

function populateYearSelect() {
  const thisYear = new Date().getFullYear();
  const years = [];
  for (let y = thisYear; y >= thisYear - 5; y--) years.push(y);
  yearSelect.innerHTML = years.map(y => `<option value="${y}">${y}</option>`).join('');
  yearSelect.value = thisYear;
}

document.addEventListener('DOMContentLoaded', () => {
  populateYearSelect();
  renderTable(timeFilter.value, yearSelect.value);
});

yearSelect.onchange = () => renderTable(timeFilter.value, yearSelect.value);

document.querySelectorAll('.sortable').forEach(th => {
  th.onclick = function() {
    const col = th.getAttribute('data-sort');
    if (currentSort.col === col) {
      currentSort.dir = currentSort.dir === 'asc' ? 'desc' : 'asc';
    } else {
      currentSort.col = col;
      currentSort.dir = 'asc';
    }
    renderTable(timeFilter.value, yearSelect.value);
  };
});

// --- CSV EXPORT ---
function exportDashboardCSV(filter, year) {
  let dataToRender = mockData;
  if (currentSort.col) {
    dataToRender = sortData(mockData, filter, currentSort.col, currentSort.dir, year);
  }
  let rows = [[
    'Partner',
    'Closed Won Revenue',
    'Closed Won Gross Profit',
    'Closed Lost Revenue',
    'Closed Lost Gross Profit',
    'Forecasted Revenue',
    'Forecasted Gross Profit'
  ]];
  let totalWon = 0, totalWonGP = 0, totalLost = 0, totalLostGP = 0, totalForecast = 0, totalForecastGP = 0;
  dataToRender.forEach(partner => {
    const agg = aggregate(partner, filter, year);
    rows.push([
      partner.partner,
      agg.closedWon.rev,
      agg.closedWon.gp,
      agg.closedLost.rev,
      agg.closedLost.gp,
      agg.forecast.rev,
      agg.forecast.gp
    ]);
    totalWon += agg.closedWon.rev;
    totalWonGP += agg.closedWon.gp;
    totalLost += agg.closedLost.rev;
    totalLostGP += agg.closedLost.gp;
    totalForecast += agg.forecast.rev;
    totalForecastGP += agg.forecast.gp;
  });
  // Totals row
  rows.push([
    'TOTALS',
    totalWon,
    totalWonGP,
    totalLost,
    totalLostGP,
    totalForecast,
    totalForecastGP
  ]);
  const csv = rows.map(r => r.map(x => `"${x}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `dashboard_${filter}_${year}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

document.getElementById('export-dashboard-csv').onclick = function() {
  exportDashboardCSV(timeFilter.value, yearSelect.value);
};

// --- EXPORT OPPORTUNITIES FROM MODAL ---
function exportOpportunitiesCSV(partnerName, filter, year, status) {
  const partner = mockData.find(p => p.partner === partnerName);
  if (!partner) return;
  let opps = filterOpportunities(partner.opportunities, filter, year);
  if (status) opps = opps.filter(o => o.status === status);
  let rows = [[
    'Opportunity Name', 'Company', 'Status', 'Revenue', 'Gross Profit', 'Sales Rep', 'SA', 'Close Date'
  ]];
  let totalRev = 0, totalGP = 0;
  opps.forEach(opp => {
    rows.push([
      opp.name,
      opp.company,
      opp.status,
      opp.revenue,
      opp.grossProfit,
      opp.salesRep,
      opp.sa,
      opp.closeDate
    ]);
    totalRev += opp.revenue;
    totalGP += opp.grossProfit;
  });
  // Totals row
  rows.push(['TOTALS', '', '', totalRev, totalGP, '', '', '']);
  const csv = rows.map(r => r.map(x => `"${x}"`).join(",")).join("\r\n");
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `opportunities_${partnerName.replace(/\s/g,'_')}_${filter}_${year}${status ? '_' + status.replace(/\s/g,'_') : ''}.csv`;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, 0);
}

// Add export button to modal dynamically
function addExportModalBtn(partnerName, filter, year, status) {
  let btn = document.createElement('button');
  btn.textContent = 'Export Opportunities CSV';
  btn.className = 'export-btn';
  btn.onclick = function() {
    exportOpportunitiesCSV(partnerName, filter, year, status);
  };
  return btn;
}
