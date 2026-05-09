const page = document.body?.dataset.page || '';

if (page === 'sport-match') {
  await import('./sport-match.js');
} else {
  await import('./sport-ui.js');
}
